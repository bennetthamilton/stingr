"use client";

import React, { useState } from "react";
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

  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to midnight

  const handleDateChange = (selectedDate: Value, _event: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedDate instanceof Date) {
      setValue(selectedDate);
      onDateChange?.(selectedDate);
    }
  };

  const isDateUnavailable = (date: Date): boolean => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);

    // Disable past dates
    if (normalized < today) return true;

    // Disable custom unavailable dates
    return unavailableDates.some((unavailable) => {
      const d = new Date(unavailable);
      d.setHours(0, 0, 0, 0);
      return normalized.getTime() === d.getTime();
    });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-md rounded-xl bg-background shadow-md p-4">
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
