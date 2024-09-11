import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Schedule } from "@/components/schedule";
import { BlazersTimeline } from "@/components/blazers-timeline";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <BlazersTimeline />
      <Schedule />
      <Faq />
      <Footer />
    </main>
  );
}
