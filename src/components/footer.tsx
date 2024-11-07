import { Container } from "@/components/ui/container";

export const Footer = () => {
  return (
    <>
      <section className="mt-56 sm:mt-0">
        <div className="w-[100%] h-[1.5px] bg-white/20">
          <div className="px-2" />
        </div>
        <Container variant={"fullMobileBreakpointPadded"}>
          <footer>
            <div className="sm:flex sm:flex-wrap sm:space-x-36">
              <div>
                <div className="sm:mx-[10px] my-[8%] align-left space-y-4">
                  <h1 className="font-montserrat font-semibold text-lg sm:mb-4 text-white content-start">
                    Resources
                  </h1>
                  <div className="font-montserrat text-md items-start text-[#afaeaedc] inline-block mb-[5px]">
                    <p className="mb-3">Help</p>
                    <p className="mb-3">Privacy</p>
                    <p className="mb-3">FAQ</p>
                  </div>
                </div>
                <div className="sm:mx-[10px] my-[8%] align-left space-y-4">
                  <h1 className="font-montserrat font-semibold text-lg sm:mb-4 text-white content-start">
                    Socials
                  </h1>
                  <div className="font-montserrat text-md items-start text-[#afaeaedc] inline-block mb-[5px] whitespace-nowrap">
                    <a
                      href="https://www.facebook.com/hcdcits"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="mb-3 hover:underline hover:text-white">
                        Facebook
                      </p>
                    </a>
                    <p className="mb-3">Instagram</p>
                    <a
                      href="https://github.com/hcdc-its"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="mb-3">GitHub</p>
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative hidden md:block w-[300px] h-[50px] sm:w-[650px] sm:h-[100px] my-10 sm:my-28">
                <p className="font-raceSport text-6xl text-center">
                  Cross Blazers Cup
                </p>
              </div>
            </div>
          </footer>
        </Container>
      </section>
    </>
  );
};
