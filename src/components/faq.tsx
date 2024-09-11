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
      <section id="faq">
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
                <AccordionTrigger>
                  Is it really need to attend the Cross Blazers Cup?
                </AccordionTrigger>
                <AccordionContent>
                  This is a school event and it is mandatory for all students
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is there an attendance for each college department?</AccordionTrigger>
                <AccordionContent>
                    Yes. there will be an attendance for each college department. You can proceed to the respective rooms for the attendance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>I cannot go to the event, how can i get an attendance slip?</AccordionTrigger>
                <AccordionContent>
                    You can get the attendance slip from the office of the student affairs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Container>
      </section>
    </>
  );
};
