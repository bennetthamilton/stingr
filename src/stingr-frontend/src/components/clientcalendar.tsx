"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const ClientCalendar = ({
  unavailableDates = [],
  onDateChange,
}: {
  unavailableDates?: Date[];
  onDateChange?: (date: Date) => void;
}) => {
  const [value, setValue] = useState<Value>(new Date());

  const handleDateChange = (selectedDate: Value, _event: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedDate instanceof Date) {
      setValue(selectedDate);
      onDateChange?.(selectedDate);
    }
  };

  const isDateUnavailable = (date: Date) =>
    unavailableDates.some(
      (unavailable) =>
        date.getFullYear() === unavailable.getFullYear() &&
        date.getMonth() === unavailable.getMonth() &&
        date.getDate() === unavailable.getDate()
    );

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-md rounded-xl bg-background shadow-md p-4">
        <Calendar
          onChange={handleDateChange}
          value={value}
          calendarType="gregory"
          locale="en-US"
          tileDisabled={({ date }) =>
            unavailableDates.length > 0 && isDateUnavailable(date)
          }
        />
      </div>
    </div>
  );
};
