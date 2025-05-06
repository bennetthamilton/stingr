"use client";

import { ApplicationShell5 } from '@/components/appshell';
import { ClientCalendar } from '@/components/clientcalendar';
import { useState } from 'react';

// Sample unavailable dates — in real use, these could be fetched from an API or passed in
const unavailableDates = [
  new Date(2025, 4, 10), // May 10, 2025
  new Date(2025, 4, 15), // May 15, 2025
];

export default function Page() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
    // Optionally, route or show time selection here
  };

  return (
    <ApplicationShell5>
      <div className="max-w-2xl mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Choose a Date</h2>
        <ClientCalendar
          unavailableDates={unavailableDates}
          onDateChange={handleDateChange}
        />
        {selectedDate && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            You selected: {selectedDate.toDateString()}
          </p>
        )}
      </div>
    </ApplicationShell5>
  );
}