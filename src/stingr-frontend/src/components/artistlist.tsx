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
} from "@relume_io/relume-ui";

import { RxChevronLeft, RxChevronRight } from "react-icons/rx";

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
  const { tagline, heading, description } = {
    ...ArtistListDefaults,
    ...props,
  };

  const [api, setApi] = useState<CarouselApi>();
  const [_select, setCurrent] = useState<number>(0);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const router = useRouter();
  const [likedArtists, setLikedArtists] = useState<ArtistCardProps[]>([]);

  // Load liked artists from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("likedArtists");
    if (stored) {
      const parsed = JSON.parse(stored);

      const mapped: ArtistCardProps[] = parsed.map((artist: any) => ({
        artistId: artist.id || artist.name,
        image: artist.images?.[0] || {
          src: "/portfolio/placeholder.jpg",
          alt: `${artist.name} artwork`,
        },
        name: artist.name,
        bio: artist.bio,
        style: artist.style,
      }));

      setLikedArtists(mapped);
    }
  }, []);

  // Remove duplicate artists based on artistId
  const uniqueArtists = [...new Map(likedArtists.map((a) => [a.artistId, a])).values()];

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleNext = () => {
    if (selectedArtistId) {
      router.push(`/bookings/select-date?artistId=${selectedArtistId}`);
    }
  };

  return (
    <section id="relume" className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-end gap-12 md:mb-18 md:grid-cols-[1fr_max-content] lg:mb-20 lg:gap-20">
          <div className="max-w-lg">
            <p className="mb-4 text-sm font-semibold text-neutral-600">{tagline}</p>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-5xl">{heading}</h1>
            <p className="md:text-md">{description}</p>
          </div>
          <Button
            onClick={handleNext}
            disabled={!selectedArtistId}
            className="hidden md:flex"
            style={{
              backgroundColor: selectedArtistId ? "var(--color-honeyGold)" : "var(--color-brown)",
              cursor: selectedArtistId ? "pointer" : "not-allowed",
              color: "var(--color-background)",
            }}
          >
            Next
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
              {uniqueArtists.map((artist) => (
                <CarouselItem
                  key={artist.artistId}
                  className="basis-[95%] pl-0 pr-6 sm:basis-4/5 md:basis-1/2 md:pr-8 lg:basis-1/4"
                >
                  <ArtistCard
                    {...artist}
                    isSelected={selectedArtistId === artist.artistId}
                    onSelect={() => setSelectedArtistId(artist.artistId)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-0 left-0 flex items-end gap-4">
                <RxChevronLeft className="size-6 text-[var(--color-lightHoney)]" />
                <RxChevronRight className="size-6 text-[var(--color-lightHoney)]" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

type ArtistCardExtendedProps = ArtistCardProps & {
  isSelected: boolean;
  onSelect: () => void;
};

const ArtistCard: React.FC<ArtistCardExtendedProps> = ({
  image,
  name,
  bio,
  style,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={clsx(
        "cursor-pointer font-semibold md:text-md border-2 rounded-xl p-2 transition-shadow",
        isSelected ? "border-[var(--color-honeyGold)] shadow-lg" : "border-transparent"
      )}
    >
      <div className="mb-3 block aspect-[5/6] md:mb-4">
        <img src={image.src} alt={image.alt} className="size-full object-cover rounded-lg" />
      </div>
      <div className="mb-2">
        <h3 className="text-lg font-bold">{name}</h3>
        <div className="text-sm font-normal italic">{style}</div>
      </div>
      <p className="text-sm text-neutral-600 line-clamp-3">{bio}</p>
    </div>
  );
};

export const ArtistListDefaults: Props = {
  tagline: "Matched Artists",
  heading: "Choose Your Artist",
  description: "Select an artist you matched with to start your booking request.",
  button: {
    variant: "secondary",
    size: "primary",
    title: "Next",
  },
  artists: [],
};
