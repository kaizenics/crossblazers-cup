import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";

import mtApo from "@/assets/cover/mt-apo.png";

export default function Details() {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-full py-36 sm:py-0 md:h-[500px] flex flex-col justify-center items-center">
        <div className="absolute inset-0">
          <Image
            className="w-full h-full object-cover opacity-100"
            src={mtApo}
            alt="mtApo"
          />
          <div className="absolute -top-0.5 left-0 w-full h-4/6 bg-gradient-to-t from-transparent to-[#0a0a0a] opacity-100"></div>
          <div className="absolute -bottom-0.5 left-0 w-full h-4/6 bg-gradient-to-b from-transparent to-[#0a0a0a] opacity-100"></div>
        </div>
        <div className="z-10 text-white text-center px-4">
          <h1 className="font-raceSport text-3xl md:text-6xl mb-4">Integrity of Creation</h1>
          <p className="font-montserrat text-lg md:text-2xl">Mt. Apo as Habitat for Humanity</p>
        </div>
      </div>

      <Container variant={"fullMobileBreakpointPadded"}>
        <div className='max-w-3xl mx-auto py-16 space-y-20'>
          <section>
            <h2 className='font-raceSport text-xl md:text-3xl text-emerald-500 mb-6'>
              Mount Apo: The Crown of Mindanao
            </h2>
            <p className='font-montserrat text-gray-200 leading-relaxed text-md'>
              Mount Apo stands as the highest peak in the Philippines, reaching an impressive elevation 
              of 2,954 meters (9,692 feet) above sea level. Located in the heart of Mindanao, this 
              majestic mountain spans across Davao del Sur and Cotabato, serving as a defining 
              landmark of the Davao Region.
            </p>
          </section>

          <section>
            <h2 className='font-raceSport text-xl md:text-3xl text-emerald-500 mb-6'>
              Conservation and Protection
            </h2>
            <p className='font-montserrat text-gray-200 leading-relaxed text-md'>
              The Mount Apo Natural Park was established to protect its rich biodiversity and natural 
              resources. Ongoing conservation efforts are vital for maintaining the ecological balance 
              and ensuring sustainable tourism practices in the area. 
            </p>
          </section>

          <section>
            <h2 className='font-raceSport text-xl md:text-3xl text-emerald-500 mb-6'>
              Symbol of Resilience and Hope
            </h2>
            <p className='font-montserrat text-gray-200 leading-relaxed text-md'>
              Mount Apo&apos;s towering presence symbolizes resilience and hope, reflecting core values of 
              Habitat for Humanity. As a home to numerous species, it demonstrates how diverse lives 
              can thrive together, emphasizing the importance of protecting all forms of life.
            </p>
          </section>

          <section>
            <h2 className='font-raceSport text-xl md:text-3xl text-emerald-500 mb-6'>
              Cultural Significance
            </h2>
            <p className='font-montserrat text-gray-200 leading-relaxed text-md'>
              For Davaoenos, Mount Apo holds deep cultural and spiritual importance. It provides 
              essential resources for daily living, supports local tourism and economic opportunities, 
              and serves as a constant reminder of our responsibility for environmental stewardship. 
              The mountain&apos;s diverse ecosystems provide crucial habitats for wildlife, contributing to 
              the region&apos;s ecological balance and biodiversity.
            </p>
          </section>
        </div>
      </Container>
      <Footer />
    </>
  );
}
