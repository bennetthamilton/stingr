"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import type { ButtonProps, CarouselApi } from "@relume_io/relume-ui";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@relume_io/relume-ui";

type ImageProps = {
  src: string;
  alt?: string;
};

type ArtistCardProps = {
  artistId: string;
  image: ImageProps;
  name: string;
  bio: string;
  style: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  button: ButtonProps;
  artists: ArtistCardProps[];
};

export type ArtistListProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const ArtistList = (props: ArtistListProps) => {
  const { tagline, heading, description, button, artists } = {
    ...ArtistListDefaults,
    ...props,
  };

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section id="relume" className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-end gap-12 md:mb-18 md:grid-cols-[1fr_max-content] lg:mb-20 lg:gap-20">
          <div className="max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h1 className="mb-3 text-5xl font-bold md:mb-4 md:text-7xl lg:text-8xl">{heading}</h1>
            <p className="md:text-md">{description}</p>
          </div>
          <Button {...button} className="hidden md:flex">
            {button.title}
          </Button>
        </div>
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <div className="relative pb-24">
            <CarouselContent className="ml-0">
              {artists.map((artist, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[95%] pl-0 pr-6 sm:basis-4/5 md:basis-1/2 md:pr-8 lg:basis-1/4"
                >
                  <ArtistCard key={index} {...artist} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-0 flex w-full items-end justify-between">
              <div className="flex h-7 pt-[10px]">
                {artists.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={clsx(
                      "mx-[3px] size-2 rounded-full",
                      current === index + 1 ? "bg-black" : "bg-neutral-light",
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-2 md:gap-4">
                <CarouselPrevious className="static size-12 -translate-y-0" />
                <CarouselNext className="static size-12 -translate-y-0" />
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

const ArtistCard: React.FC<ArtistCardProps> = ({ artistId, image, name, bio, style }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/bookings/select-date?artistId=${artistId}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer font-semibold md:text-md">
      <div className="mb-3 block aspect-[5/6] md:mb-4">
        <img src={image.src} alt={image.alt} className="size-full object-cover rounded-xl" />
      </div>
      <div className="mb-2">
        <h3 className="text-lg font-bold">{name}</h3>
        <div className="text-sm font-normal italic">{style}</div>
      </div>
      <p className="text-sm text-neutral-600 line-clamp-3">{bio}</p>
    </div>
  );
};

// Dummy data for testing
const exampleArtist = {
  artistId: "123",
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
    alt: "Artist profile image",
  },
  name: "Jane Ink",
  bio: "Specializes in floral and linework tattoos. Based in Brooklyn.",
  style: "Floral / Linework",
};

export const ArtistListDefaults: Props = {
  tagline: "Matched Artists",
  heading: "Choose Your Artist",
  description: "Select an artist you matched with to start your booking request.",
  button: {
    variant: "secondary",
    size: "primary",
    title: "View All Artists",
  },
  artists: [exampleArtist, exampleArtist, exampleArtist, exampleArtist],
};