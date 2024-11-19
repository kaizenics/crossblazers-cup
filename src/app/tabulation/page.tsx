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

const collegeLogos: { [key: string]: StaticImageData } = {
  SBME: sbme,
  STE: ste,
  CET: cet,
  HUSOCOM: husocom,
  CHATME: chatme,
  CCJE: ccje,
  COME: come,
};

// Define table-specific data


interface EventScore {
  id: number;  // Add id field
  event_name: string;
  college_name: string;
  score: number;
  created_at?: string;
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


const TabulationBarChart: React.FC = () => {
  const [data, setData] = useState<CollegeData[]>([]);
  const [eventNames, setEventNames] = useState<string[]>([]);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [scoresData, setScoresData] = useState<Record<string, Record<string, number>>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setIsLoading(true);
        const { data: scores, error: scoresError } = await supabase
          .from("eventScores")
          .select("*");

        if (scoresError) {
          throw scoresError;
        }

        if (!scores) {
          setData([]);
          return;
        }

        // Type assert scores as EventScore[]
        const typedScores = scores as EventScore[];

        const collegeTotals = collegeConfig.map((college) => {
          const collegeScores = typedScores.filter(
            (score) => score.college_name === college.name
          );
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
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch scores");
      } finally {
        setIsLoading(false);
      }
    };

    fetchScores();
  }, []);

  useEffect(() => {
    const fetchEventScores = async () => {
      try {
        const { data: eventScores, error: eventError } = await supabase
          .from('eventScores')
          .select('*')
          .order('event_name', { ascending: true });

        if (eventError) throw eventError;

        if (!eventScores) return;

        // Type assertion and data processing
        const typedEventScores = eventScores as EventScore[];
        const tempData: Record<string, Record<string, number>> = {};
        const uniqueEventNames = new Set<string>();

        typedEventScores.forEach((entry) => {
          if (!tempData[entry.college_name]) {
            tempData[entry.college_name] = {};
          }
          tempData[entry.college_name][entry.event_name] = entry.score;
          uniqueEventNames.add(entry.event_name);
        });

        setScoresData(tempData);
        setEventNames(Array.from(uniqueEventNames).sort());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch event scores");
      }
    };

    fetchEventScores();
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 bg-red-100 p-4 rounded-md">
          Error: {error}
        </div>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => b.score - a.score);
  const maxScore = Math.max(...sortedData.map((college) => college.score));

  return (
    <div className="p-4 md:p-8 bg-card rounded-lg shadow-md">
      <h2 className="font-raceSport text-2xl md:text-4xl font-semibold text-foreground mb-3 text-center">
        CBC 2024 Tabulation
      </h2>
      
      <style>
        {`
          @keyframes growHorizontal {
            0% {
              width: 0%;
            }
            100% {
              width: var(--target-width);
            }
          }
          
          @keyframes growVertical {
            0% {
              height: 0%;
            }
            100% {
              height: var(--target-height);
            }
          }
        `}
      </style>

      <div className="font-montserrat text-center text-base md:text-lg text-foreground mb-6">
        {currentDateTime}
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center items-stretch h-[500px] md:h-[400px]">
        {sortedData.map((college, index) => {
          const targetPercent = (college.score / maxScore) * 100;

          return (
            <div key={index} className="flex md:flex-col items-center gap-2 md:justify-end">
              <div className="w-12 h-12 md:w-16 md:h-16 relative order-1">
                <Image
                  src={college.logo}
                  alt={`${college.name} logo`}
                  fill
                  className="object-contain"
                  priority={index < 3}
                />
              </div>

              <div className="font-raceSport font-semibold text-foreground text-sm md:text-base order-2 min-w-[80px] text-center">
                {college.name}
              </div>

              <div className="font-montserrat font-semibold text-foreground order-4 md:order-3 min-w-[40px] text-center">
                {college.score}
              </div>

              <div className="relative h-12 md:h-64 bg-muted rounded-md overflow-hidden order-3 md:order-4 flex-1 md:w-16 md:flex-none">
                <div
                  className={`${college.color} absolute md:bottom-0 rounded-md ${
                    // Mobile: grow horizontally from left
                    // Desktop: grow vertically from bottom
                    "md:w-full md:left-0 h-full md:h-0"
                  }`}
                  style={{
                    ['--target-width' as string]: `${targetPercent}%`,
                    ['--target-height' as string]: `${targetPercent}%`,
                    animation: `
                      ${window.innerWidth < 768 ? 'growHorizontal' : 'growVertical'} 
                      1.5s ease-out ${index * 0.2}s forwards
                    `,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
        <br /><br /><br />
        <div className="mt-8 -mx-4 md:mx-0">
        <div className="overflow-x-auto bg-muted p-3 md:p-6 rounded-lg">
          <table className="w-full border-collapse table-auto min-w-[640px]">
            <thead>
              <tr>
                <th className="font-montserrat p-2 md:p-3 bg-accent text-background font-semibold text-sm md:text-base">College</th>
                {eventNames.map((event, index) => (
                  <th key={index} className="font-montserrat p-2 md:p-3 bg-accent text-background font-semibold text-sm md:text-base">
                    {event}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(scoresData).map(([collegeName, scores], index) => (
                <tr key={index} className="border-b border-muted-foreground/20">
                  <td className="p-2 md:p-3">
                    <div className="flex items-center space-x-3 px-2">
                      <div className="w-6 h-6 md:w-12 md:h-12 relative flex-shrink-0">
                        <Image
                          src={collegeLogos[collegeName]}
                          alt={`${collegeName} logo`}
                          fill
                          className="object-contain"
                          priority={index < 3}
                        />
                      </div>
                      <span className="font-raceSport font-medium text-sm md:text-base whitespace-nowrap">
                        {collegeName}
                      </span>
                    </div>
                  </td>
                  {eventNames.map((event, i) => (
                    <td key={i} className="font-montserrat p-2 md:p-3 text-center text-sm md:text-base">
                      {scores[event] || 0}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default TabulationBarChart;