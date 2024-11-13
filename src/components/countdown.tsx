"use client";

import React, { useState, useEffect, useMemo } from "react";

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  const targetEndTime = useMemo(() => {
    const date = new Date('2024-11-19T00:00:00+08:00');
    return date;
  }, []); 

  const calculateTimeLeft = (endTime: Date) => {
    const currentTime = new Date().getTime(); 
    const difference = endTime.getTime() - currentTime; 
    return Math.max(0, Math.floor(difference / 1000)); 
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetEndTime));

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0; 
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetEndTime]);

  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full mb-14 sm:mb-0 mt-4 sm:mt-6 md:mt-8 lg:mt-10 bg-gradient-to-r from-green-600 via-emerald-700 to-emerald-800 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-10">
        <div className="flex flex-row justify-center lg:justify-end w-full">
          {[
            { value: days, label: "days" },
            { value: hours, label: "hours" },
            { value: minutes, label: "minutes" },
            { value: seconds, label: "seconds" },
          ].map((item) => (
            <div key={item.label} className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 ${
  item.label === "days" ? "bg-black/[0.4]" : "bg-black/[0.3]"
} flex flex-col justify-center items-center`}>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-black">{item.value}</p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg font-montserrat font-semibold">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="w-full text-center lg:text-left">
          <p className="font-montserrat font-semibold text-md sm:text-xl mb-2">Are you ready?</p>
          <p className="font-raceSport font-bold text-2xl sm:text-4xl md:text-5xl text-balance text-white uppercase mb-2">
            Cross Blazers Cup is on the way
          </p>
          <p className="font-montserrat font-semibold text-xs sm:text-base md:text-lg">
            Holy Cross of Davao College, Sta. Ana Avenue, Davao City
          </p>
        </div>
      </div>
    </div>
  );
}
export default Countdown;