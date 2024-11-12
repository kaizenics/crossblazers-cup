"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer, Ticket, Mail, TrendingUpIcon, User } from "lucide-react";
import { Dock } from "@/components/ui/dock";
import { format } from "date-fns";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfileDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [highestElapsedTime, setHighestElapsedTime] = useState<string>("Loading...");
  const [highestScore, setHighestScore] = useState<number | null>(null);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
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

  const ProfileSkeleton = () => (
    <div className="space-y-4 sm:space-y-6">
      <header className="flex flex-col items-center sm:flex-row sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full sm:w-auto">
          <Skeleton className="w-24 h-24 sm:w-20 sm:h-20 rounded-full" />
          <div className="space-y-2 text-center sm:text-left">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="h-10 w-full sm:w-24" />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-white/25 border border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:p-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded" />
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="h-12 w-full grid grid-cols-2 bg-transparent border-b-2 rounded-lg">
            <Skeleton className="h-full" />
            <Skeleton className="h-full" />
          </TabsList>
          <div className="mt-4">
            <Card className="bg-transparent border-2">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </div>
    </div>
  );

  return (
    <Container variant={"fullMobileBreakpointPadded"}>
      <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <ProfileSkeleton />
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {/* Header section */}
              <header className="flex flex-col items-center sm:flex-row sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full">
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
              </header>

              {/* Stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {/* Elapsed Time Card */}
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

                {/* Score Card */}
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

                {/* Rank Card */}
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

              {/* Tabs section */}
              <div>
                <Tabs defaultValue="history" className="w-full">
                  <TabsList className="h-12 w-full grid grid-cols-2 bg-transparent border-b-2 rounded-lg">
                    <TabsTrigger 
                      value="history"
                      className="font-montserrat data-[state=active]:text-white/20 data-[state=active]:text-white text-gray-400 rounded-lg transition-all duration-300"
                    >
                      <span className="relative px-3 py-1.5 text-xs">
                        Game History
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform origin-left scale-x-0 transition-transform data-[state=active]:scale-x-100" />
                      </span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="achievements"
                      className="font-montserrat data-[state=active]:text-white/20 data-[state=active]:text-white text-gray-400 rounded-lg transition-all duration-300"
                    >
                      <span className="relative px-3 py-1.5 text-xs">
                        Achievements
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform origin-left scale-x-0 transition-transform data-[state=active]:scale-x-100" />
                      </span>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="history" className="mt-4">
                    <Card className="bg-transparent border-2">
                      <CardContent className="p-4">
                        <p className="font-montserrat text-xs text-gray-300">
                          Your recent game history will appear here.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="achievements" className="mt-4">
                    <Card className="bg-transparent border-2">
                      <CardContent className="p-4">
                        <p className="font-montserrat text-xs text-gray-300">
                          Your achievements will be displayed here.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </div>
        <Dock />
      </div>
    </Container>
  );
}

