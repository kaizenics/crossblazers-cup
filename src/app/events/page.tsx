"use client";

import { useState } from "react";
import { format, addDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion"; // Add this import
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { events } from "@/data/events/eventsData";

const startDate = new Date(2024, 10, 19);

export default function Events() {
  const [selectedDay, setSelectedDay] = useState(1);

  const getDateForDay = (day: number) => addDays(startDate, day - 1);

  // Add animation variants
  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <>
    <section id="events">
      <Navbar />
      <Container variant="fullMobileBreakpointPadded">
        <div className="py-4 sm:py-8">
          <h1 className="font-raceSport text-center text-2xl sm:text-4xl mb-4 sm:mb-8 text-emerald-500">
            List of Events
          </h1>
          <div
            className="flex flex-wrap justify-center gap-2 mb-4 sm:mb-8"
            role="tablist"
          >
            {events.map((day) => (
              <Button
                key={day.day}
                variant={selectedDay === day.day ? "default" : "outline"}
                onClick={() => setSelectedDay(day.day)}
                aria-selected={selectedDay === day.day}
                role="tab"
                className="text-sm sm:text-base font-montserrat"
              >
                Day {day.day}
              </Button>
            ))}
          </div>

          <div className="p-3 sm:p-5 rounded-lg">
            <div className="border-b border-zinc-700 py-3 sm:py-5">
              <p className="font-montserrat font-bold text-xl sm:text-3xl">
                Day {selectedDay} Events /{" "}
                <span className="block sm:inline text-base sm:text-3xl mt-1 sm:mt-0">
                  {format(getDateForDay(selectedDay), "MMMM d, yyyy")}
                </span>
              </p>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDay}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={contentVariants}
                transition={{ duration: 0.3 }}
                className="p-2 sm:p-3"
              >
                <div className="pl-2 sm:pl-6 space-y-3">
                  {events
                    .find((day) => day.day === selectedDay)
                    ?.events.map((event, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-zinc-700"
                      >
                        <div className="mb-2 sm:mb-0">
                          <p className="font-semibold font-montserrat text-lg sm:text-2xl">
                            {event.title}
                          </p>
                          {event.details.length > 0 && (
                            <ul className="list-disc mx-4 sm:mx-10 font-montserrat text-sm sm:text-base">
                              {event.details.map((detail, detailIndex) => (
                                <li key={detailIndex}>{detail}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="border border-emerald-600 rounded-full py-1 px-3 sm:px-4 self-start sm:self-center">
                          <p className="font-montserrat text-base sm:text-2xl">{event.time}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
      <Footer />
      </section>
    </>
  );
}