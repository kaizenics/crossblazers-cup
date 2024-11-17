// Add this at the top of your file
'use client';

import React, { useState, useEffect } from 'react';

import ccje from "@/assets/logo/ccje.png";
import cet from "@/assets/logo/cet.png";
import chatme from "@/assets/logo/chatme.png";
import come from "@/assets/logo/come.png";
import husocom from "@/assets/logo/husocom.png";
import sbme from "@/assets/logo/sbme.png";
import ste from "@/assets/logo/ste.png";

// Your component code...


interface CollegeData {
  name: string;
  score: number;
  color: string; // Tailwind color class
  logo: string; // Path to the logo
}

const data: CollegeData[] = [
  { name: "SBME", score: 695, color: "bg-yellow-400", logo: sbme.src },
  { name: "STE", score: 750, color: "bg-blue-500", logo: ste.src },
  { name: "CET", score: 589, color: "bg-orange-500", logo: cet.src },
  { name: "HUSOCOM", score: 552, color: "bg-red-800", logo: husocom.src },
  { name: "CHATME", score: 492, color: "bg-gray-500", logo: chatme.src },
  { name: "CCJE", score: 443, color: "bg-blue-900", logo: ccje.src },
  { name: "COME", score: 329, color: "bg-blue-300", logo: come.src },
];

const TabulationBarChart: React.FC = () => {
  // Sort the data array in descending order based on score
  const sortedData = [...data].sort((a, b) => b.score - a.score);

  const maxScore = Math.max(...sortedData.map((college) => college.score));
  
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleString('en-US', {
        month: 'long', // Full month name
        day: 'numeric', // Day of the month
        year: 'numeric', // Year
        hour: 'numeric', // Hour (12-hour format)
        minute: 'numeric', // Minute
        second: 'numeric', // Second
        hour12: true, // 12-hour clock with AM/PM
      });
      setCurrentDateTime(formattedTime); // Update the time state
    }, 1000); // Update every second

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-card rounded-lg shadow-md">
      <h2 className="text-4xl font-semibold text-foreground mb-3 text-center">
        Intramural 2023 Tabulation
      </h2>

      {/* Display current date and time below the title */}
      <div className="text-center text-lg text-foreground mb-6">
        {currentDateTime}
      </div>

      {/* Injecting keyframes animation */}
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

      <div className="flex justify-evenly">
        {sortedData.map((college, index) => {
          const targetHeight = (college.score / maxScore) * 100; // Dynamic height based on score

          return (
            <div key={index} className="flex flex-col items-center space-y-2">
              {/* Score */}
              <div className="font-semibold text-foreground">{college.score}</div>

              {/* Bar */}
              <div
                className="relative w-16 bg-muted rounded-md overflow-hidden h-64"
                style={{
                  "--target-height": `${targetHeight}%`, // Set the target height for animation (ignore if stated as warning..)
                }}
              >
                <div
                  className={`${college.color} absolute bottom-0 w-full rounded-md`}
                  style={{
                    animation: `grow 1.5s ease-in-out ${index * 0.2}s forwards`,
                    height: "0%", // Start from 0% height
                  }}
                ></div>
              </div>

              {/* College Logo */}
              <div className="w-16 h-16 relative">
                <img
                  src={college.logo}
                  alt={`${college.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* College Name */}
              <div className="font-semibold text-foreground">{college.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabulationBarChart;
