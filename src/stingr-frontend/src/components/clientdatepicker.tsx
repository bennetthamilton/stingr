"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const ClientDatePicker = ({
  unavailableDates = [],
  onDateChange,
}: {
  unavailableDates?: Date[];
  onDateChange?: (date: Date) => void;
}) => {
  const [value, setValue] = useState<Value>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const artistId = searchParams.get("artistId");

  useEffect(() => {
    setIsClient(true);
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

  const formattedDate =
    value instanceof Date ? format(value, "yyyy-MM-dd") : null;

  const handleNextClick = () => {
    if (artistId && formattedDate) {
      router.push(`/bookings/new?artistId=${artistId}&date=${formattedDate}`);
    }
  };

  if (!isClient) return null;

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full max-w-xl rounded-xl bg-background shadow-md p-4 client-datepicker-calendar">
        <h2 className="mb-4 text-3xl font-bold md:text-3xl lg:text-4xl">Select an Appointment Date</h2>
        <Calendar
          onChange={handleDateChange}
          value={value}
          calendarType="gregory"
          locale="en-US"
          tileDisabled={({ date }) => isDateUnavailable(date)}
        />
      </div>

      {value instanceof Date && (
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">
            You’ve selected: {format(value, "MMMM d, yyyy")}
          </p>
          <button
            onClick={handleNextClick}
            className="px-6 py-3 rounded-lg font-medium text-white"
            style={{
              backgroundColor: "var(--color-honeyGold)",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
