"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { Container } from "@/components/ui/container";
import ShinyButton from "@/components/ui/shiny-button";
import hcdcLogo from "@/assets/logo/hcdclogo-white.png";
import { supabase } from "@/lib/supabase";

export const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [user] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleHamburgerClick = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }
  
      if (user) {
        console.log("Logged in user:", user);
  
        // Fetch profile to check if the user is an admin
        const { data: profile, error: profileError } = await supabase
          .from('profile')
          .select('is_admin')
          .eq('id', user.id)
          .single();
  
        if (profileError) {
          console.error("Error fetching profile:", profileError);
          return;
        }
  
        if (profile) {
          console.log("User profile:", profile);
          setIsAdmin(profile.is_admin);
        } else {
          console.warn("No profile found for user.");
        }
      } else {
        console.log("No user is logged in.");
      }
    };
  
    getUser();
  }, []);
  

  const navItems = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#schedules", label: "Schedules" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <>
      <nav className="flex justify-between md:px-12 py-5 sticky top-0 bg-transparent bg-opacity-10 backdrop-filter backdrop-blur-lg z-50">
        <Container variant={"fullMobileBreakpointPadded"}>
          <div className="hidden md:flex justify-between">
            <Image src={hcdcLogo} alt="" width={200} height={200} />
            <div className="flex justify-between items-center space-x-10">
              <div className="flex items-center space-x-5">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="font-montserrat font-semibold text-sm text-white hover:underline"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Link href="/trivia">
                  <ShinyButton text="Play Trivia Game" className="" />
                </Link>
                {user ? (
                  <>
                    <Link href="/profile">
                      <button className="font-montserrat font-semibold text-sm text-black bg-white/90 rounded-sm py-2 px-5">
                        Profile
                      </button>
                    </Link>
                    {isAdmin && (
                      <Link href="/dashboard">
                        <button className="font-montserrat font-semibold text-sm text-black bg-white/90 rounded-sm py-2 px-5">
                          Admin Dashboard
                        </button>
                      </Link>
                    )}
                  </>
                ) : (
                  <Link href="/login">
                    <button className="font-montserrat font-semibold text-sm text-black bg-white/90 rounded-sm py-2 px-5">
                      Log In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-row md:hidden justify-between items-center pt-1">
            <Image src={hcdcLogo} alt="" width={170} height={170} />
            <div className="cursor-pointer z-50" onClick={handleHamburgerClick}>
              <div
                className={`w-[30px] h-[2px] my-[6px] bg-white transition-all duration-300 ${
                  showSidebar ? "rotate-45 translate-y-2" : ""
                }`}
              ></div>
              <div
                className={`w-[30px] h-[2px] my-[6px] bg-white transition-all duration-300 ${
                  showSidebar ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-[30px] h-[2px] my-[6px] bg-white transition-all duration-300 ${
                  showSidebar ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></div>
            </div>
          </div>
        </Container>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleHamburgerClick}
      ></div>
      <div
        className={`fixed top-19 right-0 w-full h-2/5 bg-transparent bg-opacity-10 backdrop-filter backdrop-blur-lg z-50 transform transition-transform duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between p-6">
          <div className="space-y-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block font-montserrat font-semibold text-lg text-center text-white hover:text-gray-300"
                onClick={handleHamburgerClick}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="space-y-4">
            <Link href="/trivia">
              <ShinyButton text="Play Trivia Game" className="w-full" />
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="block w-full">
                  <button
                    className="w-full font-montserrat font-semibold text-sm text-black bg-white/90 rounded-sm py-2 px-5"
                    onClick={handleHamburgerClick}
                  >
                    Profile
                  </button>
                </Link>
                {isAdmin && (  // Conditionally render the Admin button in the mobile sidebar
                  <Link href="/dashboard" className="block w-full">
                    <button
                      className="w-full font-montserrat font-semibold text-sm text-black bg-white/90 rounded-sm py-2 px-5"
                      onClick={handleHamburgerClick}
                    >
                      Admin Dashboard
                    </button>
                  </Link>
                )}
              </>
            ) : (
              <Link href="/login" className="block w-full">
                <button
                  className="w-full font-montserrat font-semibold text-sm text-black bg-white/90 rounded-sm py-2 px-5"
                  onClick={handleHamburgerClick}
                >
                  Log In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
