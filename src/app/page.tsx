import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Schedule } from "@/components/schedule";
import { BlazersTimeline } from "@/components/blazers-timeline";
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <BlazersTimeline />
      <Schedule />
    </main>
  );
}
