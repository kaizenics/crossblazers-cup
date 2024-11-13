'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from 'lucide-react'
import { supabase } from "@/lib/supabase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LeaderboardEntry {
  id: number;
  rank?: number;
  player_name: string;
  score: number;
  elapsed_time: number;
  finished_at: string;
  user_id: string;
}

export default function TriviaLeaderboard() {
  const [scoreLeaderboard, setScoreLeaderboard] = useState<LeaderboardEntry[]>([])
  const [timeLeaderboard, setTimeLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboardData()
  }, [])

  const fetchLeaderboardData = async () => {
    setIsLoading(true);

    try {
      // First, get the best score for each user
      const { data: scoreData, error: scoreError } = await supabase
        .from('trivia_scores')
        .select('*')
        .order('score', { ascending: false });

      if (scoreError) throw scoreError;

      // Filter to keep only the highest score per user
      const bestScoresMap = new Map();
      scoreData?.forEach((entry) => {
        if (!bestScoresMap.has(entry.user_id) || 
            bestScoresMap.get(entry.user_id).score < entry.score) {
          bestScoresMap.set(entry.user_id, entry);
        }
      });
      
      const bestScores = Array.from(bestScoresMap.values());
      bestScores.sort((a, b) => {
        // Sort by score first, then by time for tiebreaker
        if (b.score !== a.score) return b.score - a.score;
        return a.elapsed_time - b.elapsed_time;
      });

      // Get fastest times for users with high scores (≥7)
      const { data: timeData, error: timeError } = await supabase
        .from('trivia_scores')
        .select('*')
        .gte('score', 7)
        .order('elapsed_time', { ascending: true });

      if (timeError) throw timeError;

      // Filter to keep only the fastest time per user
      const bestTimesMap = new Map();
      timeData?.forEach((entry) => {
        if (!bestTimesMap.has(entry.user_id) || 
            bestTimesMap.get(entry.user_id).elapsed_time > entry.elapsed_time) {
          bestTimesMap.set(entry.user_id, entry);
        }
      });

      const bestTimes = Array.from(bestTimesMap.values());
      bestTimes.sort((a, b) => {

        if (a.elapsed_time !== b.elapsed_time) return a.elapsed_time - b.elapsed_time;
        return b.score - a.score;
      });

      const processedScoreData = bestScores
        .slice(0, 10)
        .map((entry, index) => ({
          ...entry,
          rank: index + 1,
        }));

      const processedTimeData = bestTimes
        .slice(0, 10)
        .map((entry, index) => ({
          ...entry,
          rank: index + 1,
        }));

      setScoreLeaderboard(processedScoreData);
      setTimeLeaderboard(processedTimeData);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}m ${secs}s`
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return null
    }
  }

  const LeaderboardCard = ({ entry }: { entry: LeaderboardEntry }) => (
    <div className="bg-white/10 p-4 rounded-lg space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getRankIcon(entry.rank!)}
          <span className="font-bold">#{entry.rank}</span>
        </div>
        <Badge variant="secondary" className={`font-bold ${
          entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-300' : ''
        }`}>
          {entry.score}/10
        </Badge>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-300">{entry.player_name}</span>
        <span className="text-sm text-gray-300">{formatTime(entry.elapsed_time)}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto"
      >
        <Card className="border border-white/30 bg-white/20 text-white">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="font-raceSport text-2xl sm:text-3xl font-bold text-center">
              Trivia Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-white/60">Loading leaderboard data...</p>
              </div>
            ) : (
              <Tabs defaultValue="score" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="score">High Scores</TabsTrigger>
                  <TabsTrigger value="time">Fastest Times</TabsTrigger>
                </TabsList>
                
                <div className="hidden sm:block">
                  <TabsContent value="score">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-montserrat text-white">Rank</TableHead>
                          <TableHead className="font-montserrat text-white">Player</TableHead>
                          <TableHead className="font-montserrat text-white">Score</TableHead>
                          <TableHead className="font-montserrat text-white">Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {scoreLeaderboard.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-white/60">
                              No scores available yet
                            </TableCell>
                          </TableRow>
                        ) : (
                          scoreLeaderboard.map((entry) => (
                            <TableRow key={entry.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  {getRankIcon(entry.rank!)}
                                  <span>{entry.rank}</span>
                                </div>
                              </TableCell>
                              <TableCell>{entry.player_name}</TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="font-bold">
                                  {entry.score}/10
                                </Badge>
                              </TableCell>
                              <TableCell>{formatTime(entry.elapsed_time)}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  <TabsContent value="time">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-montserrat text-white">Rank</TableHead>
                          <TableHead className="font-montserrat text-white">Player</TableHead>
                          <TableHead className="font-montserrat text-white">Time</TableHead>
                          <TableHead className="font-montserrat text-white">Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeLeaderboard.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-white/60">
                              No qualifying times available yet
                            </TableCell>
                          </TableRow>
                        ) : (
                          timeLeaderboard.map((entry) => (
                            <TableRow key={entry.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  {getRankIcon(entry.rank!)}
                                  <span>{entry.rank}</span>
                                </div>
                              </TableCell>
                              <TableCell>{entry.player_name}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant="secondary" 
                                  className={`font-bold ${
                                    entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-300' : ''
                                  }`}
                                >
                                  {formatTime(entry.elapsed_time)}
                                </Badge>
                              </TableCell>
                              <TableCell>{entry.score}/10</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </div>

                {/* Mobile View */}
                <div className="sm:hidden">
                  <TabsContent value="score">
                    <div className="space-y-4">
                      {scoreLeaderboard.length === 0 ? (
                        <p className="text-center text-white/60">No scores available yet</p>
                      ) : (
                        scoreLeaderboard.map((entry) => (
                          <LeaderboardCard key={entry.id} entry={entry} />
                        ))
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="time">
                    <div className="space-y-4">
                      {timeLeaderboard.length === 0 ? (
                        <p className="text-center text-white/60">No qualifying times available yet</p>
                      ) : (
                        timeLeaderboard.map((entry) => (
                          <LeaderboardCard key={entry.id} entry={entry} />
                        ))
                      )}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}