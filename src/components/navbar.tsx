"use client";


import { useState } from "react";




export const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleHamburgerClick = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <nav className="flex justify-between px-12 py-5 sticky top-0 bg-transparent bg-opacity-10 backdrop-filter backdrop-blur-lg z-10">
        <div className="flex-row justify-between items-center pt-1">
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
        <div className="flex justify-center items-center">
     
        </div>
      </nav>

    
    </>
  );
};