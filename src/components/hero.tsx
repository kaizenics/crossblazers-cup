"use client";

import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { RiMapPin2Fill, RiCalendarFill } from "react-icons/ri";
import heroCover from "@/assets/cover/hero1.jpeg";
import cnchero from "@/assets/images/cnc-hero.png";

export const Hero = () => {
  const [isShimmering, setIsShimmering] = useState(false);

  const handleShimmerClick = () => {
    setIsShimmering(true);
    setTimeout(() => setIsShimmering(false), 1000);
  };

  return (
    <div
      id="#"
      className="relative w-full h-full py-36 sm:py-0 md:h-screen flex flex-col justify-center items-center"
    >
      <div className="absolute inset-0">
        <Image
          className="w-full h-full object-cover opacity-100"
          src={heroCover}
          alt="Hero Cover"
        />
        <div className="absolute -top-0.5 left-0 w-full h-3/6 bg-gradient-to-t from-transparent to-[#0a0a0a] opacity-100"></div>
        <div className="absolute -bottom-0.5 left-0 w-full h-5/6 bg-gradient-to-b from-transparent to-[#0a0a0a] opacity-100"></div>
      </div>

      <div className="z-10 text-white space-y-2 flex flex-col md:items-center md:mb-14">
       

        <div className="container space-y-2 pb-2 pt-2 px-3 md:px-0 lg:max-w-screen-md 2xl:max-w-screen-lg mx-auto">
          <Image src={cnchero} alt="CNC Hero" className="w-full h-auto" />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-2 font-montserrat px-3">
          <div className="border border-white/20 bg-white/20 backdrop-blur-md rounded-lg py-2 px-3 md:px-5 mb-2 md:mb-0">
            <div className="flex justify-center space-x-2">
              <RiMapPin2Fill className="w-5 h-5" />
              <p className="text-sm md:text-md">Holy Cross of Davao College</p>
            </div>
          </div>
          <div className="border border-white/20 bg-white/20 backdrop-blur-md rounded-lg py-2 px-3 md:px-5">
            <div className="flex justify-center space-x-2">
              <RiCalendarFill className="w-5 h-6" />
              <p className="text-sm md:text-md">November 19, 2024</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center space-x-2 px-3">
          <Link href="/events">
            <Button
              className={`relative overflow-hidden font-montserrat text-sm md:text-lg font-semibold uppercase py-5 px-12 md:py-7 md:px-8 my-5 w-full md:w-auto ${
              isShimmering
                ? "animate-shimmer bg-gradient-to-r from-primary via-primary-foreground to-primary bg-[length:400%_100%]"
                : ""
              }`}
              onClick={handleShimmerClick}
            >
              List of Events
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
