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
import { FaGithub, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Maintainers() {
  const maintainers = [
    {
      name: "Niko Soriano",
      role: "Lead Full-stack Developer",
      description: "In-charge of the overall project development.",
      socials: {
        github: "github.com/kaizenics",
        facebook: "facebook.com/kaizernics",
        linkedin: "linkedin.com/in/kaizenics",
        instagram: "instagram.com/kaizenics",
      },
    },
    {
      name: "Art Dela Cruz",
      role: "Back-end Developer",
      description: "In-charge of the real-time tabulation.",
      socials: {
        github: "github.com/artace23",
        facebook: "facebook.com/artace23",
      },
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
            {maintainers.map((maintainer, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-emerald-500/20 border border-emerald-500/10">
                <CardHeader>
                  <CardTitle className="font-mono text-lg sm:text-xl">
                    {maintainer.name}
                  </CardTitle>
                  <p className="font-sans text-emerald-500 text-sm sm:text-base">
                    {maintainer.role}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {maintainer.description}
                  </p>
                </CardContent>
                <CardFooter className="flex gap-4">
                  {maintainer.socials.github && (
                    <a
                      href={`https://${maintainer.socials.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-emerald-600 transition-colors"
                    >
                      <FaGithub size={20} />
                    </a>
                  )}
                  {maintainer.socials.facebook && (
                    <a
                      href={`https://${maintainer.socials.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-emerald-600 transition-colors"
                    >
                      <FaFacebook size={20} />
                    </a>
                  )}
                  {maintainer.socials.linkedin && (
                    <a
                      href={`https://${maintainer.socials.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-emerald-600 transition-colors"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  )}
                  {maintainer.socials.instagram && (
                    <a
                      href={`https://${maintainer.socials.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-emerald-600 transition-colors"
                    >
                      <FaInstagram size={20} />
                    </a>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
