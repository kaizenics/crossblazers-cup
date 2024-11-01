'use client'

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// Mock data for events
const eventData = [
  { day: 1, events: ["Opening Ceremony", "Welcoming Party", "Networking Session"] },
  { day: 2, events: ["Keynote Speech", "Panel Discussion", "Workshop A"] },
  { day: 3, events: ["Technical Presentations", "Product Showcase", "Workshop B"] },
  { day: 4, events: ["Industry Roundtable", "Career Fair", "Evening Gala"] },
  { day: 5, events: ["Hackathon Kickoff", "Startup Pitches", "Tech Demo"] },
]

export default function Events() {
  const [selectedDay, setSelectedDay] = useState(1)

  return (
    <>
      <Navbar />
      <Container variant={"fullMobileBreakpointPadded"}>
        <div className="py-8">
          <h1 className="font-raceSport text-center text-4xl mb-8">List of Events</h1>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist">
            {eventData.map((day) => (
              <Button
                key={day.day}
                variant={selectedDay === day.day ? "default" : "outline"}
                onClick={() => setSelectedDay(day.day)}
                aria-selected={selectedDay === day.day}
                role="tab"
              >
                Day {day.day}
              </Button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Day {selectedDay} Events</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                {eventData.find(day => day.day === selectedDay)?.events.map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  )
}