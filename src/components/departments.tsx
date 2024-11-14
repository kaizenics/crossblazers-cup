"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

import ccje from "@/assets/logo/dept/ccje.png";
import cet from "@/assets/logo/dept/cet.png";
import chatme from "@/assets/logo/dept/chatme.png";
import come from "@/assets/logo/dept/come.png";
import husocom from "@/assets/logo/dept/husocom.png";
import sbme from "@/assets/logo/dept/sbme.png";
import ste from "@/assets/logo/dept/ste.png";

export function Departments() {
  return (
    <section id="departments">
      <HeroParallax products={products} />
    </section>
  );
}
export const products = [
  {
    title: "College of Criminal Justice Education",
    link: "",
    thumbnail: ccje.src,
  },
  {
    title: "College of Engineering and Technology",
    link: "",
    thumbnail: cet.src,
  },
  {
    title: "College of Hospitality and Tourism Management Education",
    link: "",
    thumbnail: chatme.src,
  },

  {
    title: "College of Maritime Education",
    link: "",
    thumbnail: come.src,
  },
  {
    title: "College of Humanities, Social Sciences, and Communication",
    link: "",
    thumbnail: husocom.src,
  },
  {
    title: "School of Business Management Education",
    link: "",
    thumbnail: sbme.src,
  },

  {
    title: "School of Teachers Education",
    link: "",
    thumbnail: ste.src,
  },
  {
    title: "College of Criminal Justice Education",
    link: "",
    thumbnail: ccje.src,
  },
  {
    title: "College of Engineering and Technology",
    link: "",
    thumbnail: cet.src,
  },
  {
    title: "College of Hospitality and Tourism Management Education",
    link: "",
    thumbnail: chatme.src,
  },

  {
    title: "College of Maritime Education",
    link: "",
    thumbnail: come.src,
  },
  {
    title: "College of Humanities, Social Sciences, and Communication",
    link: "",
    thumbnail: husocom.src,
  },
  {
    title: "School of Business Management Education",
    link: "",
    thumbnail: sbme.src,
  },

  {
    title: "School of Teachers Education",
    link: "",
    thumbnail: ste.src,
  },
];
