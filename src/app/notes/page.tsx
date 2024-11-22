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
import { useRouter } from 'next/navigation';
import { badWords, normalizeText } from "@/lib/profanity"; 
import { Skeleton } from "@/components/ui/skeleton";

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return seconds <= 0 ? 'now' : `${seconds}s`;
};

const containsProfanity = (text: string): boolean => {
  const normalizedText = normalizeText(text.toLowerCase());
  const words = normalizedText.split(/\s+/);
  return words.some(word => badWords.includes(word));
};

const containsHarmfulContent = (text: string): boolean => {
  const normalizedText = normalizeText(text);
  const harmfulPatterns = [
    /\b(hate|kill|death|stupid|idiot|fuck|shit)\b/i,
    /\b(racist|sexist|discrimination)\b/i,
  ];

  return harmfulPatterns.some(pattern => pattern.test(normalizedText));
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
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  } | null;
}

// Add this helper function
const getUserName = (user: User | null): string => {
  return user?.user_metadata?.full_name || "Unknown User";
};

export default function Notes() {
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userNote, setUserNote] = useState<Note | null>(null);
  const MAX_CHARS = 250;

  useEffect(() => {
    const initialize = async () => {
      await getUser();
      await fetchNotes();
    };
    initialize();
  }, []);

  const getUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        throw error;
      }
      
      const user = data.user as User | null;
      setUser(user);
      return user;
    } catch (error) {
      return null;
    }
  };

  const fetchNotes = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq('archived', false)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching notes:", error);
      return;
    }

    const currentUser = await getUser();

    const sortedNotes = data?.sort((a, b) => {
      if (currentUser && a.user_id === currentUser.id) return -1;
      if (currentUser && b.user_id === currentUser.id) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }) || [];

    if (currentUser) {
      const userNote = sortedNotes.find(note => note.user_id === currentUser.id);
      if (userNote) {
        setContent(userNote.content);
        setIsAnonymous(userNote.is_anonymous);
        setUserNote(userNote);
      }
    }

    setNotes(sortedNotes);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    try {
      if (!content.trim() || !user) return;

      if (containsProfanity(content) || containsHarmfulContent(content)) {
        toast.error("Note contains inappropriate content", {
          description: "Please keep the platform friendly and respectful. Avoid profanity and harmful language.",
          duration: 5000,
        });
        return;
      }

      const noteData = {
        content: content.trim(),
        user_id: user.id,
        user_name: getUserName(user),
        is_anonymous: isAnonymous,
        avatar_url: isAnonymous ? null : user.user_metadata?.avatar_url || null,
        archived: false,
      };

      if (userNote) {
        await handleUpdateNote(noteData, userNote.id);
      } else {
        await handleCreateNote(noteData);
      }

    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("Failed to save note. Please try again.");
    }
  };

  const handleUpdateNote = async (noteData: Omit<Note, 'id' | 'created_at'>, noteId: string) => {
    try {
      // First save the current note to history
      const { error: historyError } = await supabase
        .from("note_history")
        .insert([{
          original_note_id: noteId,
          content: userNote?.content,
          is_anonymous: userNote?.is_anonymous,
          user_id: userNote?.user_id,
          user_name: userNote?.user_name,
          avatar_url: userNote?.avatar_url,
          archived_at: new Date().toISOString()
        }]);
  
      if (historyError) throw historyError;
  
      const { error: updateError } = await supabase
        .from("notes")
        .update({
          ...noteData,
          created_at: new Date().toISOString()
        })
        .eq("id", noteId);
  
      if (updateError) throw updateError;
  
      await fetchNotes();
      toast.success("Note updated successfully!");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note. Please try again.");
    }
  };
  

  const handleCreateNote = async (noteData: Omit<Note, 'id' | 'created_at'>) => {
    const { error: insertError } = await supabase
      .from("notes")
      .insert([noteData]);

    if (insertError) throw insertError;

    await fetchNotes();
    toast.success("Note shared successfully!");
  };

  const handleDeleteNote = async (noteId: string, noteUserId: string) => {
    if (!user || user.id !== noteUserId) return;

    const { error: archiveError } = await supabase
      .from("notes")
      .update({ 
        archived: true,
        archived_at: new Date().toISOString()
      })
      .eq("id", noteId);

    if (archiveError) {
      console.error("Error archiving note:", archiveError);
      toast.error("Failed to archive note");
      return;
    }

    setContent("");
    setIsAnonymous(false);
    setUserNote(null);
    toast.success("Note deleted successfully");
    fetchNotes();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= MAX_CHARS) {
      setContent(newContent);
      
      if (containsProfanity(newContent) || containsHarmfulContent(newContent)) {
        toast.warning("Content Warning", {
          description: "Your note may contain inappropriate content. Please revise before submitting.",
          duration: 3000,
        });
      }
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

  const LoginPrompt = () => {
    const router = useRouter();
    
    return (
      <Card className="bg-white/5 border-white/10 rounded-xl">
        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-white/10 rounded-full">
            <User className="w-6 h-6 text-white/60" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-lg">Login to Start Writing</h3>
            <p className="text-sm text-gray-400">
              Share your thoughts with the Cross Blazers Cup community
            </p>
          </div>
          <Button 
            onClick={() => router.push('/login')}
            className="font-montserrat mt-2"
          >
            Login with Google
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <div className="min-h-screen text-white p-3 sm:p-6 md:p-8 pb-24 sm:pb-32">
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
          <h1 className="font-raceSport text-center text-xl sm:text-3xl font-bold">
            CBC Notes <span className="font-montserrat font-medium text-sm text-emerald-300">Beta</span>
          </h1>

          <div className="space-y-3 sm:space-y-4">
            {user ? (
              <>
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
              </>
            ) : (
              // Login prompt for non-authenticated users
              <LoginPrompt />
            )}
          </div>

          {/* Notes feed - shown to all users */}
          <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
            {isLoading ? (
              <>
                <NoteSkeleton />
                <NoteSkeleton />
                <NoteSkeleton />
              </>
            ) : (
              notes.map((note) => (
                <div key={note.id}>
                  <Card
                    className={`bg-white/5 border-white/10 rounded-xl sm:rounded-2xl p-2 ${
                      user && user.id === note.user_id
                        ? "bg-emerald-400/15 border-emerald-500/20"
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
                  
                  {user && user.id === note.user_id && (
                    <div className="w-full h-[2px] border-b-2 border-muted border-dashed mt-3" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        <Dock />
      </div>
    </>
  );
}
