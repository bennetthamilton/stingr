"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { isSameDay, isWithinInterval } from "date-fns";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const ClientCalendar = ({
  appointments = [],
  unavailableDates = [],
  unavailableDateRanges = [],
  onDateChange,
}: {
  appointments: Date[];
  unavailableDates?: Date[];
  unavailableDateRanges?: [Date, Date][];
  onDateChange?: (date: Date) => void;
}) => {
  const [value, setValue] = useState<Value>(new Date());
  const [isClient, setIsClient] = useState(false);  // Track whether it's client-side

  // Client-side effect to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDateChange = (selectedDate: Value, _event: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedDate instanceof Date) {
      setValue(selectedDate);
      onDateChange?.(selectedDate);
    }
  };

  // Function to check if a date is unavailable
  const isDateUnavailable = (date: Date) =>
    unavailableDates.some(
      (unavailable) =>
        date.getFullYear() === unavailable.getFullYear() &&
        date.getMonth() === unavailable.getMonth() &&
        date.getDate() === unavailable.getDate()
    );

  // Function to check if a date is within any of the unavailable ranges
  const isDateInRangeUnavailable = (date: Date) =>
    unavailableDateRanges.some(
      ([startDate, endDate]) => isWithinInterval(date, { start: startDate, end: endDate })
    );

  const isDateAvailable = (date: Date) =>
    !isDateUnavailable(date) && !isDateInRangeUnavailable(date);

  // If the component is rendering server-side, return null to prevent hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-md rounded-xl bg-background shadow-md p-4">
        <Calendar
          onChange={handleDateChange}
          value={value}
          calendarType="gregory"
          locale="en-US"
          tileDisabled={({ date }) => !isDateAvailable(date)}
        />
      </div>
    </div>
  );
};
