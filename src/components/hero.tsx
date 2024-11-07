"use client";

import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { RiMapPin2Fill, RiCalendarFill } from "react-icons/ri";
import heroCover from "@/assets/cover/hero1.jpeg";

import ccje from "@/assets/logo/ccje.png";
import cet from "@/assets/logo/cet.png";
import chatme from "@/assets/logo/chatme.png";
import come from "@/assets/logo/come.png";
import husocom from "@/assets/logo/husocom.png";
import sbme from "@/assets/logo/sbme.png";
import ste from "@/assets/logo/ste.png";

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

      <div className="z-10 text-white space-y-2 flex flex-col md:items-center">
        <div className="flex flex-row flex-wrap justify-center items-start gap-2 px-3">
          <Image
            className="w-8 h-8 sm:w-14 sm:h-14 md:w-16 md:h-16"
            src={ccje}
            alt="ccje"
            width={60}
            height={60}
          />
          <Image
            className="w-8 h-8 sm:w-14 sm:h-14 md:w-16 md:h-16"
            src={cet}
            alt="cet"
            width={60}
            height={60}
          />
          <Image
            className="w-8 h-8 sm:w-14 sm:h-14 md:w-16 md:h-16"
            src={chatme}
            alt="chatme"
            width={60}
            height={60}
          />
          <Image
            className="w-8 h-8 sm:w-14 sm:h-14 md:w-16 md:h-16"
            src={come}
            alt="come"
            width={60}
            height={60}
          />
          <Image
            className="w-8 h-8 sm:w-14 sm:h-14 md:w-16 md:h-16"
            src={husocom}
            alt="husocom"
            width={60}
            height={60}
          />
          <Image
            className="w-8 h-8 sm:w-14 sm:h-14 md:w-16 md:h-16"
            src={sbme}
            alt="sbme"
            width={60}
            height={60}
          />
          <Image
            className="w-8 h-8 sm:w-14 sm:h-14 md:w-16 md:h-16"
            src={ste}
            alt="ste"
            width={60}
            height={60}
          />
        </div>

        <div className="container space-y-2 pb-2 pt-2 px-3 md:px-0">
          <h1 className="text-[9vw] md:text-5xl lg:text-7xl font-raceSport text-center leading-tight md:leading-none">
            Cross Blazers Cup
          </h1>
          <p className="font-montserrat text-[3vw] md:text-xl text-center md:text-center">
            Join us for an unforgettable experience filled with excitement,
            sportsmanship, and community pride!
          </p>
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
              className={`relative overflow-hidden font-montserrat text-sm md:text-lg font-semibold uppercase py-5 px-7 md:py-7 md:px-8 my-5 ${
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
