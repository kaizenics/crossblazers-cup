"use client";

import React, { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import { IconNews } from "@tabler/icons-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import pageant from "@/assets/images/hcdc-pageant.jpg";
import bballWomen from "@/assets/images/basketball-women.jpg";
import sing from "@/assets/images/sing-1.jpg";
import esports from "@/assets/images/esports.jpg";
import cnclogo from "@/assets/images/cnc-2024.png";

export const About = () => {
  const [carouselItems, setCarouselItems] = useState<(typeof items)[]>([]);

  useEffect(() => {
    const itemsPerSlide = 4;
    const newCarouselItems = [];
    for (let i = 0; i < items.length; i += itemsPerSlide) {
      newCarouselItems.push(items.slice(i, i + itemsPerSlide));
    }
    setCarouselItems(newCarouselItems);
  }, []);

  return (
    <Container variant={"fullMobileBreakpointPadded"}>
      <section id="about" className="mt-4 sm:mt-6 md:mt-10 relative">
        <div className="relative z-10">
          <h1 className="font-raceSport text-2xl sm:text-3xl md:text-4xl text-center md:text-left mb-4 sm:mb-6">
            About
          </h1>

          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
            <div className="w-full md:w-2/3">
              <p className="font-raceSport text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3 md:mb-4">
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
              <BentoGrid className="max-w-8xl mx-auto md:auto-rows-[20rem] my-4 sm:my-6 md:my-10">
                {slideItems.map((item, itemIndex) => (
                  <BentoGridItem
                    key={itemIndex}
                    title={item.title}
                    description={item.description}
                    header={
                      <div className="relative w-full h-40 sm:h-48 md:h-64 lg:h-full">
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Container>
  );
};

const items = [
  {
    title: "Basketball Women Preliminaries",
    description: "Catch the action",
    imageSrc: bballWomen,
    imageAlt: "Age of Enlightenment concept image",
    className: "md:col-span-2",
    icon: <IconNews className="h-4 w-4 text-gray-400" />,
  },
  {
    title: "The Newly Crowned Queen",
    description: "Witness the crowning of the new queen of the night.",
    imageSrc: pageant,
    imageAlt: "Newly crowned queen image",
    className: "md:col-span-1",
    icon: <IconNews className="h-4 w-4 text-gray-400" />,
  },
  {
    title: "Vocal Solo Competition",
    description: "Listen to the sweet melodies of the night.",
    imageSrc: sing,
    imageAlt: "Art of Design concept image",
    className: "md:col-span-1",
    icon: <IconNews className="h-4 w-4 text-gray-400" />,
  },
  {
    title: "Mobile Legends: Bang Bang - Esports",
    description: "Experience the thrill of the game.",
    imageSrc: esports,
    imageAlt: "Power of Communication concept image",
    className: "md:col-span-2",
    icon: <IconNews className="h-4 w-4 text-gray-400" />,
  },
  // Additional items remain unchanged
];

export default function Component() {
  return <About />;
}