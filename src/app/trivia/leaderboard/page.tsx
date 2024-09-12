'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from 'lucide-react'

interface LeaderboardEntry {
  rank: number
  name: string
  score: number
  gamesPlayed: number
}

export default function TriviaLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const mockLeaderboard: LeaderboardEntry[] = [
      { rank: 1, name: "Alice", score: 950, gamesPlayed: 10 },
      { rank: 2, name: "Bob", score: 920, gamesPlayed: 12 },
      { rank: 3, name: "Charlie", score: 890, gamesPlayed: 9 },
      { rank: 4, name: "David", score: 850, gamesPlayed: 11 },
      { rank: 5, name: "Eve", score: 820, gamesPlayed: 8 },
      { rank: 6, name: "Frank", score: 800, gamesPlayed: 10 },
      { rank: 7, name: "Grace", score: 780, gamesPlayed: 7 },
      { rank: 8, name: "Henry", score: 760, gamesPlayed: 9 },
      { rank: 9, name: "Ivy", score: 740, gamesPlayed: 6 },
      { rank: 10, name: "Jack", score: 720, gamesPlayed: 8 },
    ]
    setLeaderboard(mockLeaderboard)
  }, [])

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

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="bg-gray-800 text-white">
          <CardHeader className="p-6">
            <CardTitle className="text-3xl font-bold text-center">Trivia Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Rank</TableHead>
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Score</TableHead>
                  <TableHead className="text-white">Games Played</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {leaderboard.map((entry, index) => (
                    <motion.tr
                      key={entry.rank}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {getRankIcon(entry.rank)}
                          <span className="ml-2">{entry.rank}</span>
                        </div>
                      </TableCell>
                      <TableCell>{entry.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{entry.score}</Badge>
                      </TableCell>
                      <TableCell>{entry.gamesPlayed}</TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}