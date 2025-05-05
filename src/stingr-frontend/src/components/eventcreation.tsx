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
  Textarea,
} from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { BiCalendarAlt } from "react-icons/bi";

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
};

export type EventFormData = Partial<Props>;

export type EventItemHeader11Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props> & {
    onSubmit?: (data: EventFormData) => void;
  };

export const EventItemHeader11 = (props: EventItemHeader11Props) => {
  const {
    heading,
    description,
    button,
    date,
    onSubmit,
  } = {
    ...EventItemHeader11Defaults,
    ...props,
  };

  const [clientName, setClientName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [tattooDescription, setTattooDescription] = useState<string>("");
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
      artist,
      appointmentType,
      tattooDescription: appointmentType === "consultation" ? tattooDescription : undefined,
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
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">{heading}</h1>
            <p className="mt-4 text-base md:mt-5 md:text-md">{description}</p>
            <div className="mt-4 flex items-center gap-2 text-sm md:mt-5">
              <BiCalendarAlt className="size-6 flex-none" />
              {date.weekday} {date.day} {date.month} {date.year}
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
                <Label htmlFor="artist" className="mb-2">
                  Preferred artist
                </Label>
                <Input
                  type="text"
                  id="artist"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  placeholder="Enter artist name (optional)"
                />
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

              {appointmentType === "consultation" && (
                <div className="grid w-full items-center">
                  <Label htmlFor="tattooDescription" className="mb-2">
                    Tattoo description
                  </Label>
                  <Textarea
                    id="tattooDescription"
                    value={tattooDescription}
                    onChange={(e) => setTattooDescription(e.target.value)}
                    placeholder="Describe your tattoo idea or consultation goals"
                  />
                </div>
              )}

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
};
