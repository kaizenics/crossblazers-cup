"use client";

import Image from "next/image";
import { User, MoreVertical, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Dock } from "@/components/ui/dock";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { differenceInHours, isBefore, subHours } from "date-fns";

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
};

interface Note {
  id: string;
  content: string;
  user_id: string;
  user_name: string;
  created_at: string;
  is_anonymous: boolean;
  avatar_url?: string | null;
}

interface User {
  id: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export default function Notes() {
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userNote, setUserNote] = useState<Note | null>(null);
  const MAX_CHARS = 250;

  useEffect(() => {
    fetchNotes();
    getUser();
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchNotes = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching notes:", error);
      return;
    }

    // Filter notes older than 24 hours
    const twentyFourHoursAgo = subHours(new Date(), 24);
    const validNotes = data?.filter(note => 
      !isBefore(new Date(note.created_at), twentyFourHoursAgo)
    ) || [];

    setNotes(validNotes);
    
    if (user) {
      const userNote = validNotes.find(note => note.user_id === user.id);
      setUserNote(userNote || null);
    }
    
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    if (!content.trim() || !user) return;

    const noteData = {
      content,
      user_id: user.id,
      user_name: user.user_metadata?.full_name || "Unknown User",
      is_anonymous: isAnonymous,
      avatar_url: isAnonymous ? null : user.user_metadata?.avatar_url || null,
    };

    let error;

    if (userNote) {
      const { error: updateError } = await supabase
        .from("notes")
        .update(noteData)
        .eq("id", userNote.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("notes")
        .insert([noteData]);
      error = insertError;
    }

    if (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note. Please try again.");
      return;
    }

    setContent("");
    fetchNotes();
    toast.success(userNote ? "Note updated successfully!" : "Note shared successfully!", {
      description: userNote ? 
        "Your previous note has been replaced." : 
        "Your note has been posted to the feed.",
      duration: 3000,
    });
  };

  const handleDeleteNote = async (noteId: string, noteUserId: string) => {
    if (!user || user.id !== noteUserId) return;

    const { error } = await supabase.from("notes").delete().eq("id", noteId);

    if (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
      return;
    }

    toast.success("Note deleted successfully");
    fetchNotes();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= MAX_CHARS) {
      setContent(newContent);
    }
  };

  const NoteSkeleton = () => (
    <Card className="bg-white/5 border-white/10 rounded-xl sm:rounded-2xl p-2">
      <CardHeader className="p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <Skeleton className="w-9 h-9 sm:w-11 sm:h-11 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 pt-0">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <div className="min-h-screen text-white p-3 sm:p-6 md:p-8 pb-24 sm:pb-32">
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
          <h1 className="font-raceSport text-center text-xl sm:text-3xl font-bold">
            CBC Notes <span className="font-montserrat font-medium text-sm text-emerald-300">Beta</span>
          </h1>

          <div className="space-y-3 sm:space-y-4">
            <div className="relative">
              <Textarea
                placeholder="Write your note here..."
                value={content}
                onChange={handleTextChange}
                className="min-h-[120px] sm:min-h-[150px] bg-white/5 border-white/10 text-white text-sm sm:text-base rounded-xl"
                maxLength={MAX_CHARS}
              />
              <div className="absolute bottom-2 right-2 text-[10px] sm:text-xs text-gray-400">
                {content.length}/{MAX_CHARS}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                  id="anonymous-mode"
                />
                <label
                  htmlFor="anonymous-mode"
                  className="font-montserrat text-[10px] sm:text-xs text-gray-300"
                >
                  Anonymous
                </label>
              </div>

              <Button
                onClick={handleSubmit}
                className="font-montserrat text-xs sm:text-sm px-3 sm:px-4 h-8 sm:h-10"
              >
                {userNote ? "Update Note" : "Share Note"}
              </Button>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
            {isLoading ? (
              <>
                <NoteSkeleton />
                <NoteSkeleton />
                <NoteSkeleton />
              </>
            ) : (
              notes.map((note) => (
                <Card
                  key={note.id}
                  className={`bg-white/5 border-white/10 rounded-xl sm:rounded-2xl p-2 ${
                    user && user.id === note.user_id
                      ? "bg-emerald-300/10 border-emerald-500/20"
                      : ""
                  }`}
                >
                  <CardHeader className="p-3 sm:p-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden flex-shrink-0">
                        {note.is_anonymous ? (
                          <div className="w-full h-full bg-white/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-white/60" />
                          </div>
                        ) : note.avatar_url ? (
                          <Image
                            src={note.avatar_url}
                            alt="Profile"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-white/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-white/60" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-1">
                          {user && user.id === note.user_id && (
                            <span className="text-[10px] font-medium text-blue-400">
                              Your note
                            </span>
                          )}
                          <div className="flex justify-between items-center">
                            <div className="flex justify-between items-center text-sm sm:text-md text-gray-400 w-full">
                              <span className="mt-2 sm:mt-3 font-bold truncate">
                                {note.is_anonymous
                                  ? "Anonymous"
                                  : note.user_name}
                              </span>
                              <div className="flex items-center gap-1 sm:gap-2 ml-2">
                                <span className="text-[10px] sm:text-sm whitespace-nowrap">
                                  {formatTimeAgo(new Date(note.created_at))}
                                </span>
                                {user && user.id === note.user_id && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <button className="p-1 hover:bg-white/10 transition-colors">
                                        <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                                      </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      align="end"
                                      className="w-28 sm:w-32 bg-white/5 border-white/10 rounded-xl"
                                    >
                                      <DropdownMenuItem
                                        className="text-red-500 text-xs sm:text-sm focus:bg-red-400/10 cursor-pointer"
                                        onClick={() =>
                                          handleDeleteNote(
                                            note.id,
                                            note.user_id
                                          )
                                        }
                                      >
                                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 pt-0">
                    <p className="text-white/90 font-montserrat text-sm sm:text-base break-words">
                      {note.content}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
        <Dock />
      </div>
    </>
  );
}
