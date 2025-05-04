"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export const ClientCalendar = () => {
  const [value, setValue] = useState(new Date());

  const handleChange = (date: Date) => {
    setValue(date);
    console.log("Selected date:", date);
    // You can route or show a modal here
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-lg bg-white">
      <Calendar
        value={value}
        tileClassName={({ date, view }) => {
          if (view === 'month' && date.toDateString() === new Date().toDateString()) {
            return 'bg-yellow-300 text-black font-semibold rounded-full';
          }
          return null;
        }}
      />
    </div>
  );
};


