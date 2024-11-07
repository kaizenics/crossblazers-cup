
"use client";

import React, { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Container } from "@/components/ui/container";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { items } from "@/data/about/aboutData";

import cnclogo from "@/assets/images/cnc-2024.png";

export const About = () => {
  const [carouselItems, setCarouselItems] = useState<(typeof items)[]>([]);

  useEffect(() => {
    const itemsPerSlide = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4;
    const newCarouselItems = [];
    for (let i = 0; i < items.length; i += itemsPerSlide) {
      newCarouselItems.push(items.slice(i, i + itemsPerSlide));
    }
    setCarouselItems(newCarouselItems);

    const handleResize = () => {
      const newItemsPerSlide = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4;
      const newCarouselItems = [];
      for (let i = 0; i < items.length; i += newItemsPerSlide) {
        newCarouselItems.push(items.slice(i, i + newItemsPerSlide));
      }
      setCarouselItems(newCarouselItems);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container variant={"fullMobileBreakpointPadded"}>
      <section id="about" className="mt-4 sm:mt-6 md:mt-10 relative">
        <div className="relative z-10">
          <h1 className="font-raceSport text-2xl sm:text-3xl md:text-4xl text-left mb-4 sm:mb-6">
            About
          </h1>

          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
            <div className="w-full md:w-2/3">
              <p className="font-raceSport text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4">
                <span className="text-emerald-500">Cross Blazers Cup</span>
              </p>
              <p className="text-base sm:text-lg font-semibold font-montserrat mb-3 sm:mb-4 md:mb-5">
                HCDC Goes G.R.E.E.N.: Celebrating Music, Sports, and Arts with a
                Commitment to the Integrity of Creation
              </p>
              <p className="font-raceSport text-xl sm:text-2xl mb-2 sm:mb-3">Sub Theme</p>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base md:text-lg lg:text-xl font-montserrat">
                <li>
                  <span className="font-bold">G - </span>
                  <span>Guardians of Mother Earth</span>
                </li>
                <li>
                  <span className="font-bold">R - </span>
                  <span>
                    Reinforcing Values of Camaraderie and Sportsmanship
                  </span>
                </li>
                <li>
                  <span className="font-bold">E - </span>
                  <span>
                    Environmental Education as Agents of Social Transformation
                  </span>
                </li>
                <li>
                  <span className="font-bold">E - </span>
                  <span>Embracing Sustainability through Creativity</span>
                </li>
                <li>
                  <span className="font-bold">N - </span>
                  <span>Nurturing and Harmonizing Environmental Advocacy</span>
                </li>
              </ul>
              <button className="bg-transparent border border-emerald-500 text-emerald-500 py-2 sm:py-3 px-3 sm:px-4 rounded-md mt-3 sm:mt-4 md:mt-5 font-montserrat font-semibold text-sm sm:text-base">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -z-10 opacity-30 w-full md:w-1/2 h-full">
          <Image
            src={cnclogo}
            alt="HCDC Pageant"
            layout="fill"
            objectFit="contain"
            objectPosition="right top"
          />
        </div>
      </section>

      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-full max-w-8xl mx-auto mt-6 sm:mt-8 md:mt-10"
      >
        <CarouselContent>
          {carouselItems.map((slideItems, slideIndex) => (
            <CarouselItem key={slideIndex}>
              <BentoGrid className="max-w-8xl mx-auto my-4 sm:my-6 md:my-10">
                {slideItems.map((item, itemIndex) => (
                  <BentoGridItem
                    key={itemIndex}
                    title={item.title}
                    description={item.description}
                    header={
                      <div className="relative w-full h-40 sm:h-48 md:h-64 lg:h-72">
                        <Image
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          fill
                          style={{ objectFit: "cover" }}
                          className="rounded-t-xl"
                        />
                      </div>
                    }
                    className={item.className}
                    icon={item.icon}
                  />
                ))}
              </BentoGrid>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </Container>
  );
};


export default function Component() {
  return <About />;
}