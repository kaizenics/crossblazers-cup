import React, { useState, useEffect } from "react";

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(7 * 24 * 60 * 60); // 7 days in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0; // Stop at 0
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full h-72 lg:block hidden border border-white/[0.2] mt-10 bg-gradient-to-r from-green-600 via-emerald-700 to-emerald-800">
      <div className="flex flex-row items-center h-full space-x-10">
        <div className="flex flex-row mt-2 w-full justify-end">
          <div className="w-36 h-36 bg-black/[0.4] flex flex-col justify-center items-center">
            <p className="text-5xl font-montserrat font-black">{days}</p>
            <p className="text-lg font-montserrat font-semibold">days</p>
          </div>
          <div className="w-36 h-36 bg-black/[0.3] flex flex-col justify-center items-center">
            <p className="text-5xl font-montserrat font-black">{hours}</p>
            <p className="text-lg font-montserrat font-semibold">hours</p>
          </div>
          <div className="w-36 h-36 bg-black/[0.3] flex flex-col justify-center items-center ">
            <p className="text-5xl font-montserrat font-black">{minutes}</p>
            <p className="text-lg font-montserrat font-semibold">minutes</p>
          </div>
          <div className="w-36 h-36 bg-black/[0.3] flex flex-col justify-center items-center">
            <p className="text-5xl font-montserrat font-black">{seconds}</p>
            <p className="text-lg font-montserrat font-semibold">seconds</p>
          </div>
        </div>
        <div className="w-full">
          <p className="font-montserrat font-semibold text-xl">Are you ready?</p>
          <p className="font-raceSport font-bold text-start text-5xl text-balance text-white uppercase">
            Cross Blazers Cup is on the way
          </p>
          <p className="font-montserrat font-semibold text-lg">Holy Cross of Davao College, Sta. Ana Avenue, Davao City</p>
        </div>
      </div>
    </div>
  );
};
