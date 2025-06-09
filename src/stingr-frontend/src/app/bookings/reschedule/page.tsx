"use client";

import { Suspense } from 'react';
import { ApplicationShell5 } from '@/components/appshell';
import { ClientDatePicker } from '@/components/reschedulecalendar';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Booking = {
  booking_id: string;
  client: string;
  artist: string;
  phone: string;
  email: string;
  appointment_type: string;
  appointment_date: string;
};

export default function PageContent() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const searchParams = useSearchParams();
  const bid = searchParams.get("bid");

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bid) return;

      try {
        const res = await fetch(`https://7lymo673b0.execute-api.us-west-2.amazonaws.com/bookings/${bid}`);
        const data = await res.json();
        setBooking(data);
      } catch (err) {
        console.error("Failed to fetch booking", err);
      }
    };

    fetchBooking();
  }, [bid]);

  // Fetch all bookings for the same artist to disable their booked dates
  useEffect(() => {
    const fetchUnavailableDates = async () => {
      if (!booking?.artist) return;

      try {
        const res = await fetch(`https://7lymo673b0.execute-api.us-west-2.amazonaws.com/bookings`);
        const allBookings: Booking[] = await res.json();

        const artistBookings = allBookings.filter(b => b.artist === booking.artist && b.booking_id !== booking.booking_id);

        const dates = artistBookings.map(b => new Date(b.appointment_date));
        setUnavailableDates(dates);
      } catch (err) {
        console.error("Failed to fetch unavailable dates", err);
      }
    };

    fetchUnavailableDates();
  }, [booking]);

  return (
    <Suspense fallback={<div className="p-6 text-center text-yellow-500">Loading reschedule page…</div>}>
      <ApplicationShell5>
        <div className="p-6 flex flex-col items-center justify-center space-y-6 text-center">
          {booking ? (
            <>
              <h1 className="text-3xl font-bold">Reschedule Appointment</h1>
              <p className="text-gray-300">Fill out the form to confirm your appointment request.</p>
              <div className="bg-muted p-4 rounded-md shadow space-y-2 text-base">
                <p><strong>Client:</strong> {booking.client}</p>
                <p><strong>Artist:</strong> {booking.artist}</p>
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p><strong>Email:</strong> {booking.email}</p>
                <p><strong>Appointment Type:</strong> {booking.appointment_type}</p>
                <p><strong>Original Date:</strong> {new Date(booking.appointment_date).toDateString()}</p>
              </div>
              <ClientDatePicker
                unavailableDates={unavailableDates}
                booking={booking}
                onDateChange={(date: { toISOString: () => any; }) => {
                  console.log("Selected new date:", date.toISOString());
                  // You can optionally store the new date in state
                }}
              />
            </>
          ) : (
            <p className="text-yellow-500">Loading booking…</p>
          )}
        </div>
      </ApplicationShell5>
    </Suspense>
  );
}
