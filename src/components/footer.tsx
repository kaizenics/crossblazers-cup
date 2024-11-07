import { Container } from "@/components/ui/container";

export const Footer = () => {
  return (
    <section className="mt-12 sm:mt-24 md:mt-56">
      <div className="w-full h-[1.5px] bg-white/20" />
      <Container variant="fullMobileBreakpointPadded">
        <footer className="py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between">
            <div className="w-full sm:w-auto mt-8 sm:mt-0">
              <p className="font-raceSport text-3xl sm:text-5xl md:text-5xl text-center sm:text-right">
                Cross Blazers Cup
              </p>
            </div>

            <div className="flex flex-row space-x-28 sm:space-x-16 mb-8 sm:mb-0 justify-center pt-10 sm:pt-0">
              <div className="space-y-4">
                <h2 className="font-montserrat font-semibold text-lg text-white">
                  Resources
                </h2>
                <ul className="font-montserrat text-sm sm:text-md text-[#afaeaedc] space-y-2">
                  <li>
                    <a href="#" className="hover:text-white hover:underline">
                      Help
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white hover:underline">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white hover:underline">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="font-montserrat font-semibold text-lg text-white">
                  Socials
                </h2>
                <ul className="font-montserrat text-sm sm:text-md text-[#afaeaedc] space-y-2">
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
                    <a href="#" className="hover:text-white hover:underline">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white hover:underline">
                      GitHub
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
