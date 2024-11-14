"use client";

import { Hero } from "@/components/hero";
import { BlazersTimeline } from "@/components/blazers-timeline";
import { About } from "@/components/about";
import { Countdown } from "@/components/countdown";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Departments } from "@/components/departments"

export default function Home() {

  return (
    <main>
      <Navbar />
      <Hero />
      <Countdown />
      <About />
      <Departments />
      <BlazersTimeline />
      <Faq />
      <Footer />
    </main>
  );
}
