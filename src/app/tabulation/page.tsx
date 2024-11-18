'use client';

import React, { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { supabase } from "@/lib/supabase";

import ccje from "@/assets/logo/ccje.png";
import cet from "@/assets/logo/cet.png";
import chatme from "@/assets/logo/chatme.png";
import come from "@/assets/logo/come.png";
import husocom from "@/assets/logo/husocom.png";
import sbme from "@/assets/logo/sbme.png";
import ste from "@/assets/logo/ste.png";

interface CollegeData {
  name: string;
  score: number;
  color: string;
  logo: StaticImageData;
}

// Define table-specific data
interface TableData {
  college: string;
  color: string; 
  logo: StaticImageData;
}

const collegeConfig: Omit<CollegeData, 'score'>[] = [
  { name: "SBME", color: "bg-yellow-400", logo: sbme },
  { name: "STE", color: "bg-blue-500", logo: ste },
  { name: "CET", color: "bg-orange-500", logo: cet },
  { name: "HUSOCOM", color: "bg-red-800", logo: husocom },
  { name: "CHATME", color: "bg-gray-500", logo: chatme },
  { name: "CCJE", color: "bg-blue-900", logo: ccje },
  { name: "COME", color: "bg-blue-300", logo: come },
];

const tableData: TableData[] = [
  { college: "SBME", color: "bg-yellow-400", logo: sbme },
  { college: "STE", color: "bg-blue-500", logo: ste },
  { college: "CET", color: "bg-orange-500", logo: cet },
  { college: "HUSOCOM", color: "bg-red-800", logo: husocom },
  { college: "CHATME", color: "bg-gray-500", logo: chatme },
  { college: "CCJE", color: "bg-blue-900", logo: ccje },
  { college: "COME", color: "bg-blue-300", logo: come },
];

const TabulationBarChart: React.FC = () => {
  const [data, setData] = useState<CollegeData[]>([]);
  const [eventScoreData, setEventScoreData] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) return;

        const { data: scores, error } = await supabase
          .from("eventScores")
          .select("college_name, score");

        if (error) throw error;

        const collegeTotals = collegeConfig.map((college) => {
          const collegeScores =
            scores?.filter((score) => score.college_name === college.name) || [];

          const totalScore = collegeScores.reduce(
            (sum, score) => sum + (score.score || 0),
            0
          );

          return {
            ...college,
            score: totalScore,
          };
        });

        setData(collegeTotals);
      } catch (error) {
        console.error("Error fetching scores:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScores();
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      setCurrentDateTime(formattedTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const sortedData = [...data].sort((a, b) => b.score - a.score);
  const maxScore = Math.max(...sortedData.map((college) => college.score));

  return (
    <div className="p-8 bg-card rounded-lg shadow-md">
      <h2 className="text-4xl font-semibold text-foreground mb-3 text-center">
        Intramural 2023 Tabulation
      </h2>
    <style>
        {`
          @keyframes grow {
            0% {
              height: 0%;
            }
            100% {
              height: var(--target-height);
            }
          }
        `}
      </style>
      <div className="text-center text-lg text-foreground mb-6">
        {currentDateTime}
      </div>

      <div className="flex justify-evenly mb-8">
        {sortedData.map((college, index) => {
          const targetHeight = (college.score / maxScore) * 100;

          return (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="font-semibold text-foreground">{college.score}</div>
              <div
                className="relative w-16 bg-muted rounded-md overflow-hidden h-64"
                style={{
                  ['--target-height' as string]: `${targetHeight}%`,
                }}
              >
                <div
                  className={`${college.color} absolute bottom-0 w-full rounded-md`}
                  style={{
                    animation: `grow 1.5s ease-in-out ${index * 0.2}s forwards`,
                    height: "0%",
                  }}
                ></div>
              </div>

              <div className="w-16 h-16 relative">
                <Image
                  src={college.logo}
                  alt={`${college.name} logo`}
                  fill
                  className="object-contain"
                  priority={index < 3}
                />
              </div>

              <div className="font-semibold text-foreground">{college.name}</div>
            </div>
          );
        })}
      </div>
        <br /><br /><br />
      <div className="bg-muted p-6 rounded-lg text-center">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 bg-accent text-background">College</th>
              <th className="p-2 bg-accent text-background"></th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="odd:bg-muted even:bg-muted/50">
                <td className="p-2 font-semibold" style={{ backgroundColor: row.color }}>
                  <div className="w-16 h-16 relative">
                    <Image
                      src={row.logo}
                      alt={`${row.college} logo`}
                      fill
                      className="object-contain"
                      priority={index < 3}
                    />
                  </div>
                </td>
                <td className="p-2">0</td>
                <td className="p-2">0</td>
                <td className="p-2">0</td>
                <td className="p-2">0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabulationBarChart;
