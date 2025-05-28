"use client";

import React, { useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import { SwipeCard } from "./swipecard";
import { FaHeart, FaTimes } from "react-icons/fa";

type Artist = {
  name: string;
  bio: string;
  style: string;
  images: { src: string; alt?: string }[];
};

const dummyArtists: Artist[] = [
    {
        name: "Ava Ink",
        bio: "Linework and blackwork specialist. Based in Portland.",
        style: "Linework / Blackwork",
        images: [
        { src: "/portfolio/ava1.jpg", alt: "Tattoo 1" },
        { src: "/portfolio/ava2.jpg", alt: "Tattoo 2" },
        { src: "/portfolio/ava3.jpg", alt: "Tattoo 3" },
        ],
    },
    {
        name: "Liam Ink",
        bio: "Realism and portrait artist. Based in Seattle.",
        style: "Realism / Portraits",
        images: [
        { src: "/portfolio/liam1.jpg", alt: "Tattoo 1" },
        { src: "/portfolio/liam2.jpg", alt: "Tattoo 2" },
        { src: "/portfolio/liam3.jpg", alt: "Tattoo 3" },
        ],
    },
    {
        name: "Mia Ink",
        bio: "Floral and watercolor tattoo artist. Based in San Francisco.",
        style: "Floral / Watercolor",
        images: [
        { src: "/portfolio/mia1.jpg", alt: "Tattoo 1" },
        { src: "/portfolio/mia2.jpg", alt: "Tattoo 2" },
        { src: "/portfolio/mia3.jpg", alt: "Tattoo 3" },
        ],
    },
];


export const SwipeDeck = () => {
  const [liked, setLiked] = useState<Artist[]>([]);
  const [currentIndex, setCurrentIndex] = useState(dummyArtists.length - 1);

  // ref to hold card swipe functionality
  type SwipeableCard = { swipe: (dir: "left" | "right") => void };
  const cardRefs = useRef<(SwipeableCard | null)[]>([]);

  const noMoreCards = currentIndex < 0;

  const handleSwipe = (direction: string, artist: Artist) => {
    if (direction === "right") {
      setLiked((prev) => [...prev, artist]);
    }
  };

  const swipe = async (dir: "left" | "right") => {
    if (!noMoreCards && cardRefs.current[currentIndex]) {
      await cardRefs.current[currentIndex].swipe(dir);
    }
  };

  return (
    <div className="flex w-full min-h-screen p-4 gap-4">
      {/* Swipe cards and buttons */}
      <div className="w-2/3 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl h-[600px] flex items-center justify-between px-6 gap-6">
          {/* Dislike Button */}
            <button
                onClick={() => swipe("left")}
                className={`btn-hex text-4xl transition ${
                    noMoreCards
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
            >
                <FaTimes />
            </button>

          {/* Card Stack */}
            <div className="relative w-full max-w-md h-full flex-1 flex items-center justify-center">
                {/* No more matches message (base layer) */}
                <div className="absolute z-0 flex items-center justify-center w-full h-full bg-background text-neutral-400 text-lg font-semibold text-center px-4">
                    No more matches — check back later!
                </div>
                {/* Tinder cards */}
                {dummyArtists.map((artist, index) => (
                    <TinderCard
                    key={artist.name}
                    className="absolute w-full h-full"
                    preventSwipe={["up", "down"]}
                    flickOnSwipe={true}
                    swipeRequirementType="position"
                    swipeThreshold={60}
                    onSwipe={(dir) => {
                        handleSwipe(dir, artist);
                        setCurrentIndex((prev) => prev - 1);
                    }}
                    ref={(el) => { cardRefs.current[index] = el; }}
                    >
                    <SwipeCard artist={artist} />
                    </TinderCard>
                ))}
            </div>

          {/* Like Button */}
            <button
                onClick={() => swipe("right")}
                className={`btn-hex text-4xl transition ${
                    noMoreCards
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
            >
                <FaHeart />
            </button>
        </div>
      </div>

      {/* Liked profiles */}
        <div className="w-1/3 bg-background border-l border-neutral-700 px-4 py-2 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-[var(--color-honeyGold)]">Liked Artists</h2>
            {liked.length === 0 ? (
                <p className="text-neutral-500 italic">No swipes yet</p>
            ) : (
                <ul className="space-y-4">
                {liked.map((artist) => (
                    <li key={artist.name} className="flex gap-2 items-start">
                    <img
                        src={artist.images[0]?.src}
                        alt={artist.images[0]?.alt || `${artist.name}'s work`}
                        className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                        <p className="font-semibold text-[var(--color-foreground)]">{artist.name}</p>
                        <p className="text-sm text-neutral-400">{artist.style}</p>
                    </div>
                    </li>
                ))}
                </ul>
            )}
        </div>
    </div>
  );
};
