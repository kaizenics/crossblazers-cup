import { Container } from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Faq = () => {
  return (
    <>
      <Container variant={"fullMobileBreakpointPadded"} className="my-20">
        <div className="md:px-10">
          <div className="md:w-2/3 space-y-2 mb-5">
            <h1 className="font-raceSport text-2xl md:text-4xl text-center md:text-left">
              Frequently Asked Questions
            </h1>
            <p className="md:2/3 font-montserrat text-sm md:text-lg text-center md:text-left leading-5">
              Have more questions? message us at itshcdc@gmail.com
            </p>
          </div>

          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it really need to attend the Cross Blazers Cup?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Container>
    </>
  );
};
