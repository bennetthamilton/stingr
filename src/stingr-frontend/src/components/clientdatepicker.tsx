"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const ClientDatePicker = ({
  unavailableDates = [],
  onDateChange,
}: {
  unavailableDates?: Date[];
  onDateChange?: (date: Date) => void;
}) => {
  const [value, setValue] = useState<Value>(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Trigger hydration-safe rendering
  }, []);

  const handleDateChange = (selectedDate: Value, _event: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedDate instanceof Date) {
      setValue(selectedDate);
      onDateChange?.(selectedDate);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isDateUnavailable = (date: Date) => {
    const isBeforeToday = date < today;
    const isManuallyUnavailable = unavailableDates?.some(
      (unavailable) =>
        date.getFullYear() === unavailable.getFullYear() &&
        date.getMonth() === unavailable.getMonth() &&
        date.getDate() === unavailable.getDate()
    );
    return isBeforeToday || isManuallyUnavailable;
  };

  if (!isClient) return null;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-xl rounded-xl bg-background shadow-md p-4 client-datepicker-calendar">
        <Calendar
          onChange={handleDateChange}
          value={value}
          calendarType="gregory"
          locale="en-US"
          tileDisabled={({ date }) => isDateUnavailable(date)}
        />
      </div>
    </div>
  );
};
