"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import RetroGrid from "@/components/ui/retro-grid";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  Play,
  X,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { triviaQuestions } from "@/data/trivia/triviaData";
import { Dock } from "@/components/ui/dock";

export default function LargerInteractiveTriviaGame() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">(
    "intro"
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [gameQuestions, setGameQuestions] = useState<typeof triviaQuestions>(
    []
  );

  // Add this useEffect at the top with other useEffects
  useEffect(() => {
    const preventRightClick = (e: MouseEvent) => {
      e.preventDefault();
    };

    const preventInspect = (e: KeyboardEvent) => {
      // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, F12
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
      }
    };

    // Disable right-click context menu
    document.addEventListener('contextmenu', preventRightClick);
    // Disable keyboard shortcuts
    document.addEventListener('keydown', preventInspect);

    return () => {
      document.removeEventListener('contextmenu', preventRightClick);
      document.removeEventListener('keydown', preventInspect);
    };
  }, []);

  // Function to shuffle array using Fisher-Yates algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getRandomQuestions = () => {
    const shuffledQuestions = shuffleArray(triviaQuestions);
    return shuffledQuestions.slice(0, 10);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && gameState === "playing") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      handleNextQuestion();
    }
  }, [timeLeft, gameState]);

  const handleAnswerClick = (selectedIndex: number) => {
    setSelectedAnswer(selectedIndex);
    if (selectedIndex === gameQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const saveScoreToSupabase = async (
    score: number,
    finishedAt: Date,
    elapsedTime: number
  ) => {
    if (!isLoggedIn) return;

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError.message);
      return;
    }
    if (!user) return;

    // Get the user's name from metadata
    const playerName = user.user_metadata?.full_name || "Anonymous";

    const { data, error } = await supabase.from("trivia_scores").insert([
      {
        user_id: user.id,
        player_name: playerName, 
        score: score,
        finished_at: finishedAt.toISOString(),
        elapsed_time: elapsedTime,
      },
    ]);

    if (error) {
      console.error("Error saving score:", error.message);
    } else {
      console.log("Score saved successfully:", data);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestion < gameQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(15);
    } else {
      setGameState("result");
      if (startTime) {
        const endTime = new Date().getTime();
        const elapsedTime = (endTime - startTime) / 1000;
        saveScoreToSupabase(score, new Date(), elapsedTime);
      }
    }
  };

  const startGame = () => {
    if (isLoggedIn) {
      setGameQuestions(getRandomQuestions());
      setGameState("playing");
      setStartTime(new Date().getTime());
      setTimeLeft(15);
    } else {
      setIsModalOpen(true);
    }
  };

  const resetGame = () => {
    setGameState("intro");
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(15);
    setSelectedAnswer(null);
    setStartTime(null);
    setGameQuestions([]);
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-2 sm:p-4 md:p-6">
      <RetroGrid />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[65vw] xl:max-w-[55vw] select-none"
      >
        <Card className="border border-emerald-400/30 bg-emerald-400/30 text-white overflow-hidden">
          <CardHeader className="p-3 sm:p-4 md:p-6">
            {gameState !== "intro" && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
                <CardTitle className="font-raceSport text-xl sm:text-2xl lg:text-3xl font-bold">
                  Trivia Challenge
                </CardTitle>
                <Badge
                  variant="secondary"
                  className="font-montserrat bg-white/10 text-base sm:text-lg lg:text-xl px-2 py-1 sm:px-3 sm:py-1"
                >
                  Score: {score}/{gameQuestions.length}
                </Badge>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <AnimatePresence mode="wait">
              {gameState === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <h2 className="font-raceSport text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-4 sm:mb-6">
                    Trivia Challenge
                  </h2>
                  <p className="font-montserrat text-sm sm:text-base lg:text-lg xl:text-xl mb-6 sm:mb-8">
                    Test your knowledge with 10 exciting questions and win
                    exciting prizes.
                  </p>
                  <div className="flex flex-row justify-center items-center gap-2">
                    <Button
                      onClick={startGame}
                      className="text-base sm:text-lg lg:text-xl py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8"
                    >
                      <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />{" "}
                      Start Game
                    </Button>
                    <Link href="leaderboard">
                      <Button className="text-base sm:text-lg lg:text-xl py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8">
                        Leaderboards
                      </Button>
                    </Link>
                  </div>
                  <CardFooter className="flex justify-center items-center py-4 sm:py-6 lg:py-8">
                    <Link href="/">
                      <Button
                        variant="ghost"
                        className="font-montserrat text-white hover:text-gray-300 transition-colors text-sm sm:text-base"
                      >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back to Home
                      </Button>
                    </Link>
                  </CardFooter>
                </motion.div>
              )}
              {gameState === "playing" && (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="mb-3 sm:mb-4">
                    <Progress
                      value={(timeLeft / 15) * 100}
                      className="h-2 bg-black/20"
                    />
                    <p className="font-montserrat text-right mt-1 text-xs sm:text-sm text-gray-300">
                      Time left: {timeLeft}s
                    </p>
                  </div>
                  <h2 className="font-montserrat text-base sm:text-lg md:text-xl lg:text-2xl mb-3 sm:mb-4">
                    {gameQuestions[currentQuestion].question}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                    {gameQuestions[currentQuestion].options.map(
                      (option, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Button
                            variant={
                              selectedAnswer === index ? "secondary" : "default"
                            }
                            className="font-montserrat w-full min-h-[44px] h-auto py-2 px-3 text-left justify-start text-sm sm:text-base break-words"
                            onClick={() => handleAnswerClick(index)}
                            disabled={selectedAnswer !== null}
                          >
                            <span className="flex-1 mr-2">{option}</span>
                            {selectedAnswer === index && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 30,
                                }}
                              >
                                {index ===
                                gameQuestions[currentQuestion].correctAnswer ? (
                                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" />
                                ) : (
                                  <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 flex-shrink-0" />
                                )}
                              </motion.span>
                            )}
                          </Button>
                        </motion.div>
                      )
                    )}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="mt-4 sm:mt-6 flex justify-center"
                  >
                    <Button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null}
                      className="font-montserrat text-sm sm:text-base py-2 px-4"
                    >
                      Next Question
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
              {gameState === "result" && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h2 className="font-montserrat text-xl sm:text-2xl lg:text-3xl xl:text-4xl mb-4 sm:mb-6">
                    Quiz Completed!
                  </h2>
                  <p className="font-montserrat text-lg sm:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8">
                    Your score: {score} out of {gameQuestions.length}
                  </p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      delay: 0.2,
                    }}
                  >
                    {score === gameQuestions.length ? (
                      <div className="flex items-center justify-center text-green-500 mb-4 sm:mb-6">
                        <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 xl:h-16 xl:w-16 mr-2 sm:mr-3 lg:mr-4" />
                        <span className="font-montserrat text-lg sm:text-xl lg:text-2xl xl:text-3xl">
                          Perfect Score!
                        </span>
                      </div>
                    ) : score >= gameQuestions.length / 2 ? (
                      <div className="flex items-center justify-center text-yellow-500 mb-4 sm:mb-6">
                        <AlertCircle className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 xl:h-16 xl:w-16 mr-2 sm:mr-3 lg:mr-4" />
                        <span className="font-montserrat text-lg sm:text-xl lg:text-2xl xl:text-3xl">
                          Good Job!
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-red-500 mb-4 sm:mb-6">
                        <XCircle className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 xl:h-16 xl:w-16 mr-2 sm:mr-3 lg:mr-4" />
                        <span className="font-montserrat text-lg sm:text-xl lg:text-2xl xl:text-3xl">
                          Better Luck Next Time!
                        </span>
                      </div>
                    )}
                  </motion.div>
                  <div className="flex flex-row justify-center items-center gap-2">
                    <Button
                      onClick={resetGame}
                      className="font-montserrat text-sm sm:text-lg lg:text-xl py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8"
                    >
                      Play Again
                    </Button>
                    <Link href="leaderboard">
                      <Button className="font-montserrat text-sm sm:text-lg lg:text-xl py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8">
                        Leaderboards
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Dock component */}
      <Dock />

      {/* Modal for login warning */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-800 p-4 rounded-lg shadow-lg w-full max-w-[90vw] sm:max-w-[400px]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-end mb-2">
                <button
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <h2 className="font-montserrat text-lg font-bold mb-2">
                Login Required
              </h2>
              <p className="font-montserrat text-sm text-gray-300 mb-4">
                You need to log in to start the game. Please log in to proceed.
              </p>
              <Link href="/login" className="block">
                <Button variant={"default"} className="w-full text-sm py-2">
                  Login
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
