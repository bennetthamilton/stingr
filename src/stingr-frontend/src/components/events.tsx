"use client";

import * as React from "react";
import type { ButtonProps } from "@relume_io/relume-ui";
import { Button } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ClientCalendar } from "@/components/clientcalendar";

// Rename Date type to EventDate to avoid conflict with the built-in Date
type EventDate = {
  weekday: string;
  day: string;
  month: string;
  year: string;
};

type Event = {
  url: string;
  date: EventDate;
  category: string;
  title: string;
  status: string | null;
  location: string;
  description: string;
  button: ButtonProps;
};

type FeaturedEvent = Omit<Event, "category">;

type Props = {
  heading: string;
  event: Event;
  featuredEvents: FeaturedEvent[];
};

export type EventHeader4Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const EventHeader4 = (props: EventHeader4Props) => {
  const { heading, event, featuredEvents } = {
    ...EventHeader4Defaults,
    ...props,
  };

  // Convert event.date to a Date object
  const eventDate = new Date(`${event.date.month} ${event.date.day}, ${event.date.year}`);
  const appointments = [eventDate]; // Appointments as an array of Date objects

  const handleDateChange = (selectedDate: Date) => {
    // Logic to handle selected date change
    // You can fetch or display appointments for the selected date
    console.log("Selected date:", selectedDate);
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-4xl text-heading font-bold">{heading}</h1>
            <Button>
              <a href="/bookings/new">New Event</a>
            </Button>
          </div>
        </div>

        <div className="mb-16 grid auto-cols-fr auto-rows-auto grid-cols-1 items-start gap-8 lg:grid-cols-2">
          {/* Calendar + Main Event Info */}
          <div className="border border-border-primary">
            <div className="w-full overflow-hidden">
              <ClientCalendar appointments={appointments} onDateChange={handleDateChange} />
            </div>
            <div className="flex flex-col items-start p-6">
              <p className="mb-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                {event.category}
              </p>
              <div className="flex w-full flex-col items-start justify-start">
                <div className="flex flex-wrap items-center gap-4">
                  <a href={event.url}>
                    <h2 className="text-xl font-bold md:text-2xl">{event.title}</h2>
                  </a>
                  {event?.status && (
                    <p className="bg-background-secondary px-2 py-1 text-sm font-semibold">
                      {event.status}
                    </p>
                  )}
                </div>
                <p className="mb-2">{event.location}</p>
                <p>{event.description}</p>
                <Button {...event.button} className="mt-5 md:mt-6">
                  {event.button.title}
                </Button>
              </div>
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div className="flex flex-col gap-8">
            {featuredEvents.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold">Upcoming Events</h2>
                {featuredEvents.map((event, index) => (
                  <UpcomingEvent key={index} {...event} />
                ))}
              </>
            ) : (
              <div className="flex flex-col items-start justify-center border border-border-primary px-6 py-10 text-left">
                <h2 className="text-2xl font-bold mb-4">No Upcoming Appointments</h2>
                <p className="mb-6 text-sm text-muted">
                  You don’t have any upcoming appointments. Browse artists to find a new session.
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

const UpcomingEvent: React.FC<FeaturedEvent> = ({
  date,
  url,
  title,
  status,
  location,
  description,
  button,
}) => {
  return (
    <div className="flex flex-col items-center border border-border-primary px-4 py-6 md:flex-row md:py-4">
      <EventDate
        weekday={date.weekday}
        day={date.day}
        month={date.month}
        year={date.year}
        className="min-w-24 shrink-0 p-0 text-base md:px-1 md:py-3"
      />
      <div className="mt-6 flex flex-col items-start border-t border-border-primary pt-6 md:ml-6 md:mt-0 md:border-l md:border-t-0 md:pl-6 md:pt-0">
        <div className="flex flex-wrap items-center gap-4">
          <a href={url}>
            <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
          </a>
          {status && (
            <p className="bg-background-secondary px-2 py-1 text-sm font-semibold">{status}</p>
          )}
        </div>
        <p className="mb-2 text-sm">{location}</p>
        <p>{description}</p>
        <Button {...button} className="mt-5 md:mt-6">
          {button.title}
        </Button>
      </div>
    </div>
  );
};

const EventDate: React.FC<EventDate & { className?: string }> = ({
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

export const EventHeader4Defaults: Props = {
  heading: "Your Appointments",
  event: {
    url: "/messages",
    date: {
      weekday: "Thu",
      day: "02",
      month: "May",
      year: "2024",
    },
    category: "Consultation",
    title: "Consultation Overview",
    status: "Confirmed",
    location: "",
    description:
      "You have a confirmed consultation scheduled. If you have any questions before your appointment, feel free to message the artist.",
    button: {
      title: "Message Artist",
      // variant: "default",
      // size: "medium",
      iconRight: <RxChevronRight />,
    },
  },
  featuredEvents: [], // <- triggers fallback by default
};
