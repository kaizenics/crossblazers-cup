"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RiMapPin2Fill, RiCalendarFill } from "react-icons/ri";
import heroCover from "@/assets/cover/hero.jpg";

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
    <div className="relative w-full h-screen flex flex-col justify-center items-center">
      <div className="absolute inset-0">
        <Image
          className="w-full h-full object-cover opacity-70"
          src={heroCover}
          alt="Hero Cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-screen bg-gradient-to-b from-transparent to-[#0a0a0a] opacity-100"></div>
      </div>

      <div className="z-10 text-white space-y-2 flex flex-col items-center">
        <div className="flex flex-row space-x-4 mb-3">
          <Image
            className="justify-center items-center"
            src={ccje}
            alt="ccje"
            width={60}
            height={60}
          />
          <Image
            className="justify-center items-center"
            src={cet}
            alt="ccje"
            width={60}
            height={60}
          />
          <Image
            className="justify-center items-center"
            src={chatme}
            alt="ccje"
            width={60}
            height={60}
          />
          <Image
            className="justify-center items-center"
            src={come}
            alt="ccje"
            width={60}
            height={60}
          />
          <Image
            className="justify-center items-center"
            src={husocom}
            alt="ccje"
            width={60}
            height={60}
          />
          <Image
            className="justify-center items-center"
            src={sbme}
            alt="ccje"
            width={60}
            height={60}
          />
          <Image
            className="justify-center items-center"
            src={ste}
            alt="ccje"
            width={60}
            height={60}
          />
        </div>

        <div className="container space-y-2 pb-2">
          <h1 className="text-8xl font-raceSport text-center">
            Cross Blazers Cup
          </h1>
          <p className="text-xl font-montserrat text-center">
            Join us for an unforgettable experience filled with excitement,
            sportsmanship, and community pride!
          </p>
        </div>
        <div className="flex flex-row space-x-2 font-montserrat">
          <div className="border border-white/20 bg-white/20 backdrop-blur-md rounded-lg py-2 px-5">
            <div className="flex space-x-2">
              <RiMapPin2Fill className="w-5 h-5" />
              <p>HCDC Student Lounge</p>
            </div>
          </div>
          <div className="border border-white/20 bg-white/20 backdrop-blur-md rounded-lg py-2 px-5">
          <div className="flex space-x-2">
              <RiCalendarFill className="w-5 h-6" />
              <p>November 2024</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <Button
            className={`relative overflow-hidden font-montserrat text-lg font-semibold uppercase py-7 px-8 my-5 ${
              isShimmering
                ? "animate-shimmer bg-gradient-to-r from-primary via-primary-foreground to-primary bg-[length:400%_100%]"
                : ""
            }`}
            onClick={handleShimmerClick}
          >
            Event Details
          </Button>
        </div>
      </div>
    </div>
  );
};
