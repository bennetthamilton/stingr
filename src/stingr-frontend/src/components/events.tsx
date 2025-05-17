"use client";

import * as React from "react";
import { ClientCalendar } from "@/components/clientcalendar";
import { Button } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import { FiTrash } from "react-icons/fi";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from "luxon";

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

type Props = {
  heading?: string;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
};

export const EventHeader4 = ({ heading = "Your Appointments", bookings, setBookings }: Props) => {
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [selectedBookings, setSelectedBookings] = React.useState<Booking[]>([]);

  const handleDateChange = (date: Date) => {
    const formatted = DateTime.fromJSDate(date).toFormat("yyyy-MMM-dd");
    setSelectedDate(formatted);
    const matches = bookings.filter(b => b.appointment_date === formatted);
    setSelectedBookings(matches);
  };

  const handleDelete = async (bookingId: string) => {
    try {
      const res = await fetch(
        `https://7lymo673b0.execute-api.us-west-2.amazonaws.com/bookings/${bookingId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete booking.");

      setBookings(prev => prev.filter(b => b.booking_id !== bookingId));
      setSelectedBookings(prev => prev.filter(b => b.booking_id !== bookingId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete booking.");
    }
  };

  const appointments = bookings.map(b =>
    DateTime.fromFormat(b.appointment_date, "yyyy-MMM-dd").toJSDate()
  );

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-4xl text-heading font-bold">{heading}</h1>
            <Button>
              <a href="/bookings/select">New Appointment</a>
            </Button>
          </div>
        </div>

        <div className="mb-16 grid auto-cols-fr auto-rows-auto grid-cols-1 items-start gap-8 lg:grid-cols-2">
          {/* Calendar + Selected Booking Info */}
          <div className="border border-border-primary">
            <div className="w-full overflow-hidden">
              <ClientCalendar appointments={appointments} onDateChange={handleDateChange} />
            </div>
            {selectedDate && selectedBookings.length > 0 ? (
              selectedBookings.map((booking, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-start p-6 border-t border-border-primary"
                >
                  <p className="mb-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                    {booking.appointment_type}
                  </p>
                  <div className="flex w-full flex-col items-start justify-start">
                    <div className="flex flex-wrap items-center gap-4">
                      <a href="/messages">
                        <h2 className="text-xl font-bold md:text-2xl">{booking.artist}</h2>
                      </a>
                    </div>
                    <p className="mb-2">{booking.appointment_date}</p>
                    <p>{booking.description ?? "No description provided."}</p>
                    <div className="mt-5 md:mt-6 flex w-full justify-between items-center">
                      <Button iconRight={<RxChevronRight />}>Message Artist</Button>
                      <button
                        onClick={() => handleDelete(booking.booking_id)}
                        className="btn-warn rounded-md"
                        title="Delete booking"
                      >
                        <FiTrash className="size-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : selectedDate ? (
              <div className="p-6 text-muted">No appointments found for {selectedDate}.</div>
            ) : (
              <div className="p-6 text-muted">Select a date to view appointment details.</div>
            )}
          </div>

          {/* Upcoming Bookings Section */}
          <div className="flex flex-col gap-8">
            {bookings.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
                {bookings.map((b, i) => (
                  <UpcomingBooking key={i} booking={b} onDelete={handleDelete} />
                ))}
              </>
            ) : (
              <div className="flex flex-col items-start justify-center border border-border-primary px-6 py-10 text-left">
                <h2 className="text-2xl font-bold mb-4">No Upcoming Appointments</h2>
                <p className="mb-6 text-sm text-muted">
                  You don’t have any upcoming appointments.
                </p>
                <a
                  href="/browse"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-honeyGold)] px-4 py-2 font-semibold text-[var(--color-background)] transition-colors hover:bg-[var(--color-deepHoney)]"
                >
                  Browse Artists
                  <RxChevronRight className="text-lg" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

type FormattedDate = {
  weekday: string;
  day: string;
  month: string;
  year: string;
};

const UpcomingBooking: React.FC<{ booking: Booking; onDelete: (id: string) => void }> = ({
  booking,
  onDelete
}) => {
  const dateObj = DateTime.fromFormat(booking.appointment_date, "yyyy-MMM-dd");
  const date: FormattedDate = {
    weekday: dateObj.toFormat("ccc"),
    day: dateObj.toFormat("dd"),
    month: dateObj.toFormat("MMM"),
    year: dateObj.toFormat("yyyy"),
  };

  return (
    <div className="flex flex-col items-center border border-border-primary px-4 py-6 md:flex-row md:py-4">
      <EventDate
        weekday={date.weekday}
        day={date.day}
        month={date.month}
        year={date.year}
        className="min-w-24 shrink-0 p-0 text-base md:px-1 md:py-3"
      />
      <div className="mt-6 flex flex-col items-start border-t border-border-primary pt-6 md:ml-6 md:mt-0 md:border-l md:border-t-0 md:pl-6 md:pt-0 w-full">
        <div className="flex flex-wrap items-center justify-between w-full gap-4">
          <a href="/messages">
            <h2 className="text-xl font-bold md:text-2xl">
              {booking.appointment_type} with {booking.artist}
            </h2>
          </a>
          
        </div>
        <p className="mb-2 text-sm">{booking.appointment_date}</p>
        <p>{booking.description}</p>
        <div className="mt-5 md:mt-6 flex w-full items-center justify-between">
          <Button 
            className="btn-unstyled flex items-center gap-1"
            iconRight={<RxChevronRight />}
          >
            View Details
          </Button>
          <Button
            onClick={() => onDelete(booking.booking_id)}
            className="btn-warn rounded-md"
            title="Delete booking"
          >
            <FiTrash className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const EventDate: React.FC<FormattedDate & { className?: string }> = ({
  weekday,
  day,
  month,
  year,
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "flex min-w-28 flex-col items-center bg-background-primary px-1 py-3 text-sm",
          className,
        ),
      )}
    >
      <span>{weekday}</span>
      <span className="text-2xl font-bold md:text-3xl lg:text-4xl">{day}</span>
      <span>
        {month} {year}
      </span>
    </div>
  );
};
