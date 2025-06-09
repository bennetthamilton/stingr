"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useSearchParams, useRouter } from "next/navigation";
import { format } from "date-fns";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const ClientDatePicker = ({
  unavailableDates = [],
  booking,
  onDateChange,
}: {
  unavailableDates?: Date[];
  booking: {
    booking_id: string;
    client: string;
    artist: string;
    phone: string;
    email: string;
    appointment_type: string;
    appointment_date: string;
  };
  onDateChange?: (date: Date) => void;
}) => {
  const [value, setValue] = useState<Value>(null);
  const [isClient, setIsClient] = useState(false);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bid");
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    fetchBookedDates();
  }, []);

  const fetchBookedDates = async () => {
    try {
      const res = await fetch("https://7lymo673b0.execute-api.us-west-2.amazonaws.com/bookings");
      if (!res.ok) throw new Error("Failed to fetch booked dates");

      const data = await res.json();
      const parsed = data
        .map((b: any) => new Date(b.appointment_date))
        .filter((date: Date) => !isNaN(date.getTime())); // Filter valid dates

      setBookedDates(parsed);
    } catch (err) {
      console.error("Error fetching booked dates", err);
    }
  };

  const handleDateChange = (selectedDate: Value, _event: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedDate instanceof Date) {
      setValue(selectedDate);
      onDateChange?.(selectedDate);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isDateUnavailable = (date: Date) => {
    const isBeforeToday = date < today;
    const isInUnavailable = unavailableDates?.some((d) => isSameDay(d, date));
    const isBooked = bookedDates.some((d) => isSameDay(d, date));
    return isBeforeToday || isInUnavailable || isBooked;
  };

  const formattedDate = value instanceof Date ? format(value, "yyyy-MMM-dd") : null;

  const handleRescheduleClick = async () => {
    if (!bookingId || !value || !(value instanceof Date)) {
      setError("Missing booking or selected date.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`https://7lymo673b0.execute-api.us-west-2.amazonaws.com/bookings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...booking,
          appointment_date: formattedDate,
        }),
      });

      if (!res.ok) throw new Error("Failed to update appointment.");

      setSuccess(true);
      setTimeout(() => {
        router.push("/bookings");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Failed to update appointment.");
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full max-w-xl rounded-xl bg-background shadow-md p-4 client-datepicker-calendar">
        <h2 className="mb-4 text-3xl font-bold md:text-3xl lg:text-4xl">
          Select an Appointment Date
        </h2>
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
            onClick={handleRescheduleClick}
            className="px-6 py-3 rounded-lg font-medium text-white"
            style={{
              backgroundColor: "var(--color-honeyGold)",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Appointment"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">Appointment updated!</p>}
        </div>
      )}
    </div>
  );
};
