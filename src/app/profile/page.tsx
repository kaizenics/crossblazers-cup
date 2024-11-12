"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Ticket, Mail, TrendingUpIcon, User } from "lucide-react";
import { Dock } from "@/components/ui/dock";
import { format } from "date-fns";
import { Container } from "@/components/ui/container";

export default function UserProfileDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [highestElapsedTime, setHighestElapsedTime] = useState<string>("Loading...");
  const [highestScore, setHighestScore] = useState<number | null>(null);
  const [createdAt, setCreatedAt] = useState<string>("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push("/login");
      } else {
        setUser(data.user);
        fetchUserStats(data.user.id);
        if (data.user.created_at) {
          setCreatedAt(format(new Date(data.user.created_at), "MMMM dd, yyyy"));
        }
      }
    };
    getUser();
  }, [router]);

  const fetchUserStats = async (userId: string) => {
    const { data: elapsedTimeData, error: elapsedTimeError } = await supabase
      .from('trivia_scores')
      .select('elapsed_time')
      .eq('user_id', userId)
      .order('elapsed_time', { ascending: false })
      .limit(1)
      .single();

    if (elapsedTimeError) {
      console.error('Error fetching highest elapsed time:', elapsedTimeError.message);
    } else {
      if (elapsedTimeData) {
        const seconds = Math.floor(elapsedTimeData.elapsed_time % 60);
        const minutes = Math.floor(elapsedTimeData.elapsed_time / 60);
        setHighestElapsedTime(`${minutes} min. ${seconds} sec.`);
      }
    }

    const { data: scoreData, error: scoreError } = await supabase
      .from('trivia_scores')
      .select('score')
      .eq('user_id', userId)
      .order('score', { ascending: false })
      .limit(1)
      .single();

    if (scoreError) {
      console.error('Error fetching highest score:', scoreError.message);
    } else {
      setHighestScore(scoreData?.score || 0);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.setItem("logout", "true"); 
    router.push("/login"); 
  };

  return (
    <Container variant={"fullMobileBreakpointPadded"}>
      <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
          <header className="flex flex-col items-center sm:flex-row sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full sm:w-auto">
              <div className="relative w-24 h-24 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white/20">
                {user?.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-white/60" />
                  </div>
                )}
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {user?.user_metadata?.full_name || "User"}
                </h1>
                <p className="text-gray-400 flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Joined on {createdAt}
                </p>
              </div>
            </div>

            <Button
              variant="destructive"
              className="font-montserrat w-full sm:w-auto"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <Card className="bg-white/25 border border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:p-4">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Highest Elapsed Time
                </CardTitle>
                <Timer className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="text-xl sm:text-2xl font-bold">{highestElapsedTime}</div>
                <p className="text-xs text-gray-400">
                  What a highest elapsed time!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/25 border border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:p-4">
                <CardTitle className="text-xs sm:text-sm font-medium">Highest Score</CardTitle>
                <Ticket className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="text-xl sm:text-2xl font-bold">{highestScore}</div>
                <p className="text-xs text-gray-400">Great job!</p>
              </CardContent>
            </Card>

            <Card className="bg-white/25 border border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:p-4">
                <CardTitle className="text-xs sm:text-sm font-medium">Trivia Rank</CardTitle>
                <TrendingUpIcon className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="text-xl sm:text-2xl font-bold">#42</div>
                <p className="text-xs text-gray-400">Top 5% of users</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-white/20 border border-white/20">
              <CardHeader className="p-3 sm:p-4">
                <CardTitle className="text-sm sm:text-base">My Tickets</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="mt-2 sm:mt-4 flex flex-wrap gap-2 sm:gap-4">
                  <Badge
                    icon={<Ticket className="w-3 h-3 sm:w-4 sm:h-4" />}
                    text={user?.email || "No email available"}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Dock />
      </div>
    </Container>
  );
}

const Badge = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 bg-gray-700 text-gray-200 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
    {icon}
    <span className="truncate max-w-[200px] sm:max-w-none">{text}</span>
  </div>
);
