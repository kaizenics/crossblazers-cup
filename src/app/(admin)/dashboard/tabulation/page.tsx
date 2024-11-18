"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface EventScore {
  id?: number;
  event_name: string;
  college_name: string;
  score: number;
}

interface CollegeScores {
  [key: string]: number;
}

const CollegesAndEventsList: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [collegeScores] = useState<CollegeScores>({
    SBME: 0,
    STE: 0,
    CET: 0,
    HUSOCOM: 0,
    CHATME: 0,
    CCJE: 0,
    COME: 0,
  });
  const [events, setEvents] = useState<string[]>([]);
  const [newEventName, setNewEventName] = useState<string>("");
  const [scores, setScores] = useState<Record<string, Record<string, number>>>(
    {}
  );

  // Add authentication check
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
    };
    checkAuth();
  }, [router]);

  // Fetch events and scores
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) return;

        // Fetch events
        const { data: eventsData, error: eventsError } = await supabase
          .from("tabulationEvents")
          .select("event_name");

        if (eventsError) throw eventsError;

        // Fetch scores
        const { data: scoresData, error: scoresError } = await supabase
          .from("eventScores")
          .select("*");

        if (scoresError) throw scoresError;

        // Process the data
        const eventsList = eventsData?.map((event) => event.event_name) || [];
        setEvents(eventsList);

        // Transform scores into nested object
        const scoresByEvent: Record<string, Record<string, number>> = {};
        scoresData?.forEach((score: EventScore) => {
          if (!scoresByEvent[score.event_name]) {
            scoresByEvent[score.event_name] = {};
          }
          scoresByEvent[score.event_name][score.college_name] = score.score;
        });
        setScores(scoresByEvent);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleScoreUpdate = async (
    event: string,
    college: string,
    newScore: number
  ) => {
    try {
      const { error } = await supabase.from("eventScores").upsert(
        {
          event_name: event,
          college_name: college,
          score: newScore,
        },
        {
          onConflict: "event_name,college_name",
        }
      );

      if (error) {
        throw error;
      }

      setScores((prev) => ({
        ...prev,
        [event]: {
          ...prev[event],
          [college]: newScore,
        },
      }));
    } catch (error) {
      console.error("Error updating score:", error);
      alert("Failed to update score. Please try again.");
    }
  };

  const handleEventAdd = async () => {
    if (newEventName.trim() === "") {
      alert("Event name cannot be empty");
      return;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        alert("Please login to add events");
        return;
      }

      const { error } = await supabase
        .from("tabulationEvents")
        .insert([{ event_name: newEventName }]);

      if (error) throw error;

      setEvents((prev) => [...prev, newEventName]);
      setNewEventName("");
    } catch (error: unknown) {
      console.error("Error adding event:", error);
      if (error instanceof Error) {
        alert(error.message || "Failed to add event. Please try again.");
      } else {
        alert("Failed to add event. Please try again.");
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-6">
      <div>
        <div className="flex flex-row justify-between mb-4">
          <h2 className="text-2xl font-bold">Events Tabulation</h2>
          <div className=" flex items-center gap-2">
            <input
              type="text"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              className="border rounded px-3 py-2"
              placeholder="Enter event name"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={handleEventAdd}
            >
              Add Event
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-transparent">
                <th className="border p-2 text-left">Event</th>
                {Object.keys(collegeScores).map((college) => (
                  <th key={college} className="border p-2 text-center">
                    {college}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event} className="border-b hover:bg-zinc-800">
                  <td className="border p-2">{event}</td>
                  {Object.keys(collegeScores).map((college) => (
                    <td key={`${event}-${college}`} className="border p-2">
                      <input
                        type="number"
                        className="w-full p-1 border rounded"
                        value={scores[event]?.[college] || 0}
                        onChange={(e) =>
                          handleScoreUpdate(
                            event,
                            college,
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CollegesAndEventsList;
