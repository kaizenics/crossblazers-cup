import React from "react";
import { Navbar } from "@/components/navbar";
import { Container } from "@/components/ui/container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function Maintainers() {
  const maintainers = [
    {
      name: "Niko Soriano",
      role: "Lead Full-stack Developer",
      description: "In-charge of the overall project development.",
      github: "github.com/kaizenics",
    },
    {
      name: "Art Dela Cruz",
      role: "Back-end Developer",
      description: "In-charge on maintaining seamless integration of the real-time tabulation.",
      github: "github.com/artace23",
    },
  ];

  return (
    <>
      <Navbar />
      <Container variant={"fullMobileBreakpointPadded"}>
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <h1 className="font-mono text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">
            Developers
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {maintainers.map((maintainer, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="font-mono text-lg sm:text-xl">
                    {maintainer.name}
                  </CardTitle>
                  <p className="font-sans text-emerald-500 text-sm sm:text-base">
                    {maintainer.role}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {maintainer.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <a
                    href={`https://${maintainer.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline text-sm sm:text-base"
                  >
                    GitHub Profile
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
