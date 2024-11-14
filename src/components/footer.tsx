import Image from "next/image";
import { Container } from "@/components/ui/container";
import cnchero from "@/assets/images/cnc-hero.png";

export const Footer = () => {
  return (
    <section className="mt-12 sm:mt-24">
      <div className="w-full h-[1.5px] bg-white/20" />
      <Container variant="fullMobileBreakpointPadded">
        <footer className="py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between">
            <div className="w-full sm:w-auto mb-8 sm:mb-0">
              <Image 
                src={cnchero} 
                alt="CNC Hero" 
                className="w-56 sm:w-80 h-auto mx-auto sm:mx-0" 
              />
            </div>

            <div className="flex flex-row justify-center space-x-12 sm:space-x-24">
              <div className="space-y-4">
                <h2 className="font-montserrat font-semibold text-lg text-white">
                  Socials
                </h2>
                <ul className="font-montserrat text-sm text-[#afaeaedc] space-y-3">
                  <li>
                    <a
                      href="https://www.facebook.com/hcdcssgexed"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white hover:underline"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="https://bit.ly/ssgportal" className="hover:text-white hover:underline">
                      Portal
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="font-montserrat font-semibold text-lg text-white">
                  Developers
                </h2>
                <ul className="font-montserrat text-sm text-[#afaeaedc] space-y-3">
                  <li>
                    <a href="/maintainers" className="hover:text-white hover:underline">
                      Maintainers
                    </a>
                  </li>
                  <li>
                    <a href="/report/bug" className="hover:text-white hover:underline">
                      Bug Report
                    </a>
                  </li>
                  <li>
                    <a href="/report/feature" className="hover:text-white hover:underline">
                      Feature Request
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </Container>
    </section>
  );
};
