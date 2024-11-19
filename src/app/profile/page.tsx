"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer, Ticket, Mail, TrendingUpIcon, User, Trophy } from "lucide-react";
import { Dock } from "@/components/ui/dock";
import { format } from "date-fns";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface TriviaScore {
  id: number;
  user_id: string;
  score: number;
  finished_at: string;
  elapsed_time: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedAt?: string;
}

interface UserRankInfo {
  rank: number;
  totalPlayers: number;
  percentile: number;
}

export default function UserProfileDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [highestElapsedTime, setHighestElapsedTime] = useState<string>("0 min. 0 sec.");
  const [earliestElapsedTime, setEarliestElapsedTime] = useState<string>("0 min. 0 sec.");
  const [highestScore, setHighestScore] = useState<number | null>(0);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [gameHistory, setGameHistory] = useState<TriviaScore[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userRank, setUserRank] = useState<UserRankInfo | null>(null);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push("/login");
      } else {
        setUser(data.user);
        fetchUserStats(data.user.id);
        fetchGameHistory(data.user.id);
        fetchAchievements(data.user.id);
        fetchUserRank(data.user.id);
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

    const { data: earliestTimeData, error: earliestTimeError } = await supabase
      .from('trivia_scores')
      .select('elapsed_time')
      .eq('user_id', userId)
      .order('elapsed_time', { ascending: true })
      .limit(1)
      .single();

    if (earliestTimeError) {
      console.error('Error fetching earliest elapsed time:', earliestTimeError.message);
    } else {
      if (earliestTimeData) {
        const seconds = Math.floor(earliestTimeData.elapsed_time % 60);
        const minutes = Math.floor(earliestTimeData.elapsed_time / 60);
        setEarliestElapsedTime(`${minutes} min. ${seconds} sec.`);
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

  const fetchGameHistory = async (userId: string) => {
    const { data, error } = await supabase
      .from('trivia_scores')
      .select('*')
      .eq('user_id', userId)
      .order('finished_at', { ascending: false });

    if (error) {
      console.error('Error fetching game history:', error.message);
    } else {
      setGameHistory(data || []);
    }
  };

  const fetchAchievements = async (userId: string) => {
    // Fetch all trivia scores for the user
    const { data: triviaGames, error: triviaError } = await supabase
      .from('trivia_scores')
      .select('*')
      .eq('user_id', userId);

    if (triviaError) {
      console.error('Error fetching trivia games:', triviaError.message);
      return;
    }

    // Check various conditions
    const hasPlayedTrivia = triviaGames && triviaGames.length > 0;
    const firstGameDate = hasPlayedTrivia ? triviaGames[0].finished_at : undefined;
    
    const hasPerfectScore = triviaGames?.some(game => game.score === 10);
    const perfectScoreGame = triviaGames?.find(game => game.score === 10);

    const hasFastTime = triviaGames?.some(game => game.elapsed_time < 20);
    const fastestGame = triviaGames?.find(game => game.elapsed_time < 20);

    const userAchievements: Achievement[] = [
      {
        id: 'first-trivia',
        title: 'Trivia Newcomer',
        description: 'Completed your first trivia game',
        icon: <Trophy className="h-6 w-6 text-yellow-500" />,
        unlocked: hasPlayedTrivia,
        unlockedAt: firstGameDate,
      },
      {
        id: 'perfect-score',
        title: 'Perfect Score',
        description: 'Achieved a perfect 10/10 score in trivia',
        icon: <Trophy className="h-6 w-6 text-yellow-500" />,
        unlocked: hasPerfectScore,
        unlockedAt: perfectScoreGame?.finished_at,
      },
      {
        id: 'speed-thinkerer',
        title: 'Speed Thinkerer',
        description: 'Completed a trivia game in under 20 seconds',
        icon: <Trophy className="h-6 w-6 text-yellow-500" />,
        unlocked: hasFastTime,
        unlockedAt: fastestGame?.finished_at,
      },
    ];

    setAchievements(userAchievements);
  };

  const fetchUserRank = async (userId: string) => {
    try {
      // First, get all users' best scores
      const { data: allScores, error: scoresError } = await supabase
        .from('trivia_scores')
        .select('user_id, score, elapsed_time');

      if (scoresError) throw scoresError;

      // Get best score per user
      const bestScoresMap = new Map();
      allScores?.forEach((entry) => {
        if (!bestScoresMap.has(entry.user_id) || 
            bestScoresMap.get(entry.user_id).score < entry.score) {
          bestScoresMap.set(entry.user_id, entry);
        }
      });

      const rankedScores = Array.from(bestScoresMap.values())
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return a.elapsed_time - b.elapsed_time;
        });

      // Find user's position
      const userPosition = rankedScores.findIndex(score => score.user_id === userId) + 1;
      const totalPlayers = rankedScores.length;
      const percentile = Math.round(((totalPlayers - userPosition) / totalPlayers) * 100);

      setUserRank({
        rank: userPosition,
        totalPlayers,
        percentile
      });
    } catch (error) {
      console.error('Error fetching user rank:', error);
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
              <header className="flex flex-col items-center sm:flex-row sm:justify-between gap-4">
                <div className="flex flex-row items-center sm:items-start gap-4 sm:gap-6 w-full">
                  <div className="relative w-20 h-20 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white/20">
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
                  <div className="text-left">
                    <h1 className="text-lg sm:text-3xl font-bold">
                      {user?.user_metadata?.full_name || "User"}
                    </h1>
                    <p className="text-gray-400 flex items-center justify-center sm:justify-start gap-1 sm:gap-2 text-xs sm:text-base">
                      <Mail className="w-4 h-4" />
                      {user?.email}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1">
                      Joined on {createdAt}
                    </p>
                  </div>
                </div>
              </header>

              <div className="relative overflow-x-auto sm:overflow-x-visible -mx-4 sm:mx-0 px-4 sm:px-0">
                <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pb-4 sm:pb-0">
                  <Card className="bg-emerald-500/25 border border-emerald-500/20 flex-shrink-0 w-[280px] sm:w-auto">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:p-4">
                      <CardTitle className="text-xs sm:text-sm font-medium">
                        Highest Time
                      </CardTitle>
                      <Timer className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <div className="text-xl sm:text-2xl font-bold">{highestElapsedTime}</div>
                      <p className="text-xs text-gray-400">
                        Longest completion time
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-emerald-500/25 border border-emerald-500/20  flex-shrink-0 w-[280px] sm:w-auto">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:p-4">
                      <CardTitle className="text-xs sm:text-sm font-medium">
                        Fastest Time
                      </CardTitle>
                      <Timer className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <div className="text-xl sm:text-2xl font-bold">{earliestElapsedTime}</div>
                      <p className="text-xs text-gray-400">
                        Quickest completion time
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-emerald-500/25 border border-emerald-500/20  flex-shrink-0 w-[280px] sm:w-auto">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:p-4">
                      <CardTitle className="text-xs sm:text-sm font-medium">Highest Score</CardTitle>
                      <Ticket className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <div className="text-xl sm:text-2xl font-bold">{highestScore}</div>
                      <p className="text-xs text-gray-400">Great job!</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-emerald-500/25 border border-emerald-500/20  flex-shrink-0 w-[280px] sm:w-auto">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:p-4">
                      <CardTitle className="text-xs sm:text-sm font-medium">Trivia Rank</CardTitle>
                      <TrendingUpIcon className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      {userRank ? (
                        <>
                          <div className="text-xl sm:text-2xl font-bold">#{userRank.rank}</div>
                          <p className="text-xs text-gray-400">
                            Top {userRank.percentile}% of {userRank.totalPlayers} players
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="text-xl sm:text-2xl font-bold">--</div>
                          <p className="text-xs text-gray-400">Play to get ranked!</p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

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
                        {gameHistory.length > 0 ? (
                          <div className="space-y-4">
                            {gameHistory.map((game) => (
                              <div
                                key={game.id}
                                className="bg-white/10 p-4 rounded-lg flex justify-between items-center"
                              >
                                <div className="space-y-1">
                                  <p className="font-montserrat text-sm text-white">
                                    Score: {game.score}/10
                                  </p>
                                  <p className="font-montserrat text-xs text-gray-400">
                                    {format(new Date(new Date(game.finished_at).getTime() + (8 * 60 * 60 * 1000)), "MMMM dd, yyyy - h:mm a")}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-montserrat text-xs text-white">
                                   {Math.floor(game.elapsed_time / 60)}m {Math.floor(game.elapsed_time % 60)}s
                                  </p>
                                
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="font-montserrat text-xs text-gray-300">
                            No game history available. Start playing to see your results here!
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="achievements" className="mt-4">
                    <Card className="bg-transparent border-2">
                      <CardContent className="p-4">
                        {achievements.length > 0 ? (
                          <div className="space-y-4">
                            {achievements.map((achievement) => (
                              <div
                                key={achievement.id}
                                className={`bg-white/10 p-4 rounded-lg flex items-center justify-between ${
                                  achievement.unlocked ? 'opacity-100' : 'opacity-50'
                                }`}
                              >
                                <div className="flex items-center space-x-4">
                                  <div className="flex-shrink-0">
                                    {achievement.icon}
                                  </div>
                                  <div>
                                    <h3 className="font-montserrat text-sm font-semibold text-white">
                                      {achievement.title}
                                    </h3>
                                    <p className="font-montserrat text-xs text-gray-400">
                                      {achievement.description}
                                    </p>
                                    {achievement.unlocked && achievement.unlockedAt && (
                                      <p className="font-montserrat text-xs text-gray-500 mt-1">
                                        Unlocked on {format(new Date(achievement.unlockedAt), "MMMM dd, yyyy")}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  {achievement.unlocked ? (
                                    <Badge className="bg-green-500/20 text-green-300">
                                      Unlocked
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-gray-500/20 text-gray-300">
                                      Locked
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="font-montserrat text-xs text-gray-300">
                            No achievements available yet.
                          </p>
                        )}
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

