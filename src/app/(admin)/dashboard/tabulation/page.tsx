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


  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  // Fetch events and scores
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data: eventsData, error: eventsError } = await supabase
          .from("tabulationEvents")
          .select("event_name");

        if (eventsError) throw eventsError;

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

  const handleEventDelete = async (eventName: string) => {
    if (!confirm(`Are you sure you want to delete the event "${eventName}"? This action cannot be undone.`)) {
      return;
    }
  
    try {
      const { error: scoresError } = await supabase
        .from("eventScores")
        .delete()
        .match({ event_name: eventName });
  
      if (scoresError) {
        console.error("Error deleting scores:", scoresError);
        throw new Error(`Failed to delete scores: ${scoresError.message}`);
      }
  
      const { error: eventError } = await supabase
        .from("tabulationEvents")
        .delete()
        .match({ event_name: eventName });
  
      if (eventError) {
        console.error("Error deleting event:", eventError);
        throw new Error(`Failed to delete event: ${eventError.message}`);
      }
  
      // Update local state only after successful deletion
      setEvents(events.filter(e => e !== eventName));
      setScores(prevScores => {
        const newScores = { ...prevScores };
        delete newScores[eventName];
        return newScores;
      });
  
      console.log(`Successfully deleted event: ${eventName}`);
  
    } catch (error) {
      console.error("Error in deletion process:", error);
      alert(error instanceof Error ? error.message : "Failed to delete event. Please try again.");
    }
  };
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-full overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
          <h2 className="font-raceSport text-xl md:text-2xl font-bold">Events Tabulation</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="flex w-full sm:w-auto items-center gap-2">
              <input
                type="text"
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                className="font-montserrat flex-1 sm:flex-none border rounded px-3 py-2 min-w-[200px]"
                placeholder="Enter event name"
              />
              <button
                className="bg-emerald-600 hover:bg-gray-700 font-montserrat text-white px-4 py-2 rounded whitespace-nowrap"
                onClick={handleEventAdd}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="overflow-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-zinc-700 text-gray-200">
                <tr>
                  <th scope="col" className="font-montserrat px-6 py-3 whitespace-nowrap sticky left-0 bg-zinc-700 z-10">
                    Event
                  </th>
                  {Object.keys(collegeScores).map((college) => (
                    <th key={college} scope="col" className="font-montserrat px-6 py-3 text-center whitespace-nowrap">
                      {college}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={event} className={`border-b ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-800'} border-zinc-700`}>
                    <td className="font-montserrat px-6 py-3 sticky left-0 z-10 whitespace-nowrap font-medium text-white bg-inherit">
                      <div className="flex justify-between items-center gap-2">
                        <span>{event}</span>
                        <button
                          onClick={() => handleEventDelete(event)}
                          className="text-red-500 hover:text-red-700 px-2 py-1 rounded"
                          title="Delete event"
                        >
                          ×
                        </button>
                      </div>
                    </td>
                    {Object.keys(collegeScores).map((college) => (
                      <td key={`${event}-${college}`} className="px-6 py-3">
                        <input
                          type="number"
                          className="w-full p-1 bg-transparent border border-zinc-700 rounded text-center"
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-200"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegesAndEventsList;
