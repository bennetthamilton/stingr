"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Label,
  Checkbox,
  Button,
} from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { BiMap, BiCalendarAlt, BiUser } from "react-icons/bi";

type DateInfo = {
  weekday: string;
  day: string;
  month: string;
  year: string | null;
};

type Props = {
  heading: string;
  description: string;
  button: ButtonProps;
  date: DateInfo;
  location: string;
  speakers: string;
};

export type EventItemHeader11Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props> & {
    onSubmit?: (data: any) => void;
  };

export const EventItemHeader11 = (props: EventItemHeader11Props) => {
  const {
    heading,
    description,
    button,
    date,
    location,
    speakers,
    onSubmit,
  } = {
    ...EventItemHeader11Defaults,
    ...props,
  };

  const [clientName, setClientName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [acceptTerms, setAcceptTerms] = useState<boolean | "indeterminate">(false);

  const appointmentOptions = [
    { value: "consultation", label: "Consultation" },
    { value: "flash", label: "Flash Tattoo" },
    { value: "custom", label: "Custom Piece" },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      clientName,
      email,
      phone,
      appointmentType,
      acceptTerms,
    };
    console.log("Event created:", payload);
    onSubmit?.(payload);
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2">
          <div className="flex flex-col items-start">
            <h1 className="text-5xl font-bold md:text-7xl lg:text-8xl">{heading}</h1>
            <p className="mt-5 text-base md:mt-6 md:text-md">{description}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm md:mt-6">
              <div className="flex items-center gap-2">
                <BiCalendarAlt className="size-6 flex-none" />
                {date.weekday} {date.day} {date.month} {date.year}
              </div>
              <div className="flex items-center gap-2">
                <BiMap className="size-6 flex-none" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <BiUser className="size-6 flex-none" />
                <span>{speakers}</span>
              </div>
            </div>
          </div>

          <div>
            <form
              className="grid gap-6 border border-border-primary px-6 py-8 sm:p-8"
              onSubmit={handleSubmit}
            >
              <div className="grid w-full items-center">
                <Label htmlFor="clientName" className="mb-2">
                  Name
                </Label>
                <Input
                  type="text"
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="grid w-full items-center">
                  <Label htmlFor="email" className="mb-2">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid w-full items-center">
                  <Label htmlFor="phone" className="mb-2">
                    Phone number
                  </Label>
                  <Input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid w-full items-center">
                <Label className="mb-2">Appointment type</Label>
                <Select onValueChange={setAppointmentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose one..." />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-3 flex items-center space-x-2 text-sm md:mb-4">
                <Checkbox id="terms" checked={acceptTerms} onCheckedChange={setAcceptTerms} />
                <Label htmlFor="terms" className="cursor-pointer">
                  I accept the{" "}
                  <a className="text-link-primary underline" href="#">
                    Terms and Conditions
                  </a>
                </Label>
              </div>

              <div className="text-left">
                <Button {...button}>{button.title}</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export const EventItemHeader11Defaults: Props = {
  heading: "Create Appointment",
  description: "Fill out the form to confirm your appointment request.",
  button: { title: "Book Now" },
  date: {
    weekday: "Sat",
    day: "10",
    month: "Feb",
    year: "2024",
  },
  location: "Tattoo Studio, Bend OR",
  speakers: "Artist: TBD",
};
