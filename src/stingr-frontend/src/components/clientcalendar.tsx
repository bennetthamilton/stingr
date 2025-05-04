"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const ClientCalendar = () => {
  const [value, setValue] = useState<Date>(new Date());

  const handleDateChange = (selectedDate: Date) => {
    setValue(selectedDate);
    console.log("Selected date:", selectedDate);
    // Here you can route to a form, trigger a modal, etc.
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-xl overflow-hidden bg-white shadow-md p-4">
      <Calendar
        value={value}
        calendarType="gregory"
        locale="en-US"
        tileClassName={({ date, view }) => {
          const today = new Date();
          if (
            view === "month" &&
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          ) {
            return "bg-yellow-300 text-black font-semibold rounded-full";
          }
          return null;
        }}
      />
    </div>
  );
};


