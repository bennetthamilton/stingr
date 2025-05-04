"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
// No need to import default styles if using globals.css

export const ClientCalendar = () => {
  const [value, setValue] = useState<Date>(new Date());

  const handleDateChange = (selectedDate: Date) => {
    setValue(selectedDate);
    console.log("Selected date:", selectedDate);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-md rounded-xl bg-background shadow-md p-4">
        <Calendar
          // onChange={handleDateChange}
          value={value}
          calendarType="gregory"
          locale="en-US"
          tileClassName={({ date, view }) => {
            const today = new Date();
            const isToday =
              view === "month" &&
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear();

            return isToday ? "react-calendar__tile--active" : null;
          }}
        />
      </div>
    </div>
  );
};