import Image from "next/image";
import { Navbar } from "@/components/navbar";
import heroCover from "@/assets/images/hero.jpg";

export const Hero = () => {
  return (
    <>
      
      <div className="relative w-full h-screen">
      <Navbar />
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
          src={heroCover}
          alt="Hero Cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-screen bg-gradient-to-b from-transparent to-[#0a0a0a] opacity-100"></div>
      </div>
      
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white space-y-2">
        <h1 className="text-7xl font-raceSport text-center">
          Cross Blazers Cup 2024
        </h1>
        <p className="text-xl font-montserrat text-center">Join the exciting event only here at Holy Cross of Davao College</p>
      </div>
      <div>
        <h1>Test</h1>
      </div>
    </>
  );
};
