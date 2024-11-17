'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase"; // Import your Supabase client

const CollegesAndEventsList: React.FC = () => {
  const [collegeScores, setCollegeScores] = useState<Record<string, number>>({
    SBME: 0,
    STE: 0,
    CET: 0,
    HUSOCOM: 0,
    CHATME: 0,
    CCJE: 0,
    COME: 0,
  });

  const [events, setEvents] = useState<string[]>([]);
  const [newEventName, setNewEventName] = useState<string>(''); // State to store the new event name

  const handleCollegeScoreChange = (college: string, newScore: number) => {
    setCollegeScores((prevScores) => ({
      ...prevScores,
      [college]: newScore,
    }));
  };

  const handleEventAdd = async () => {
    if (newEventName.trim() === '') {
      alert('Event name cannot be empty');
      return;
    }

    // Check if the event already exists in the database
    const { data, error } = await supabase
      .from('tabulationEvents')
      .select('event_name')
      .eq('event_name', newEventName);

    if (error) {
      console.error('Error checking for event name in database:', error);
      return;
    }

    // If the event already exists, show an alert
    if (data && data.length > 0) {
      alert('Event name already exists. Please choose a unique name.');
      return;
    }

    // If the event name is unique, add it to the database
    const { error: insertError } = await supabase
      .from('tabulationEvents')
      .insert([{ event_name: newEventName }]);

    if (insertError) {
      console.error('Error inserting event into database:', insertError);
      return;
    }

    setEvents((prevEvents) => [...prevEvents, newEventName]);
    setNewEventName('');
  };

  // Fetch events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data: eventsData, error } = await supabase
          .from('tabulationEvents')
          .select('event_name'); 

        if (error) {
          console.error('Error fetching events:', error);
        } else {
          if (eventsData) {
            setEvents(eventsData.map((event) => event.event_name));
          }
        }
      } catch (error) {
        console.error('Error during fetch operation:', error);
      }
    };

    fetchEvents();
  }, []); 

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <h2 className="text-xl font-bold mb-4">Events</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-40 text-left">Event</th>
                {Object.keys(collegeScores).map((college, index) => (
                  <th key={index} className="w-16 text-center">
                    {college}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index} className="border-b">
                  <td className="w-40 text-left">{event}</td>
                  {Object.keys(collegeScores).map((college, colIndex) => (
                    <td key={`${index}-${colIndex}`} className="w-16 text-center">
                      <input
                        type="number"
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Input field to add a new event */}
          <div className="mt-4 float-end">
            <input
              type="text"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              className="border rounded px-2 py-1 w-50"
              placeholder="Enter event name"
            />
            <button
              className="mt-2 mx-4 w-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleEventAdd}
            >
              Add Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegesAndEventsList;
