"use client";

import * as React from "react";
import { ApplicationShell5 } from '@/components/appshell';
import { EventHeader4 } from '@/components/events';

type Booking = {
  booking_id: string;
  date_booked: string;
  client: string;
  artist: string;
  phone: string;
  email: string;
  appointment_date: string;
  appointment_type: string;
  description: string;
};

export default function Page() {
  const [bookings, setBookings] = React.useState<Booking[]>([]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("https://7lymo673b0.execute-api.us-west-2.amazonaws.com/bookings");
      const data: Booking[] = await res.json();

      const sorted = data.sort((a, b) =>
        new Date(b.appointment_date).getTime() - new Date(a.appointment_date).getTime()
      );

      setBookings(sorted);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  React.useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <ApplicationShell5>
      <EventHeader4 bookings={bookings} setBookings={setBookings} />
    </ApplicationShell5>
  );
}
