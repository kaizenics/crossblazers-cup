"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import ShinyButton from "@/components/ui/shiny-button";
import hcdcLogo from "@/assets/logo/hcdclogo-white.png";

export const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleHamburgerClick = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <nav className="flex justify-between md:px-12 py-5 sticky top-0 bg-transparent bg-opacity-10 backdrop-filter backdrop-blur-lg z-10">
        <Container variant={"fullMobileBreakpointPadded"}>
          <div className="hidden md:flex justify-between">
            <Image src={hcdcLogo} alt="" width={200} height={200} />
            <div className="flex justify-between items-center space-x-10 ">
              <div className="flex items-center space-x-5">
                <a href="#" className="font-montserrat font-semibold text-sm text-white hover:underline">
                  Home
                </a>
                <a href="#" className="font-montserrat font-semibold text-sm text-white hover:underline">
                  About
                </a>
                <a href="#" className="font-montserrat font-semibold text-sm text-white hover:underline">
                  Schedules
                </a>
                <a href="#" className="font-montserrat font-semibold text-sm text-white hover:underline">
                  FAQ
                </a>
                </div>
              <div className="flex items-center space-x-2">
                <ShinyButton text="Play Trivia Game" className="" />
                <button className="font-montserrat font-semibold text-sm text-black bg-white/90 rounded-sm py-2 px-5">
                  Log In
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-row md:hidden justify-between items-center pt-1">
          <Image src={hcdcLogo} alt="" width={200} height={200} />
            <div className="cursor-pointer" onClick={handleHamburgerClick}>
              {!showSidebar ? (
                <>
                  <div className="w-[30px] h-[2px] my-[6px] bg-white -translate-y-0  duration-200"></div>
                  <div className="w-[30px] h-[2px] my-[6px] bg-white  duration-200"></div>
                  <div className="w-[30px] h-[2px] my-[6px] bg-white translate-y-0 duration-200"></div>
                </>
              ) : (
                <>
                  <div className="w-[30px] h-[2px] my-[6px] opacity-0  translate-y-2 duration-300"></div>
                  <div className="w-[30px] h-[2px] my-[6px] bg-white duration-400"></div>
                  <div className="w-[30px] h-[2px] my-[6px] opacity-0 -translate-y-2 duration-300"></div>
                </>
              )}
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};
