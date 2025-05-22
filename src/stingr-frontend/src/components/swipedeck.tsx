"use client";

import React, { useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import { SwipeCard } from "./swipecard";
import { FaHeart, FaTimes } from "react-icons/fa";

type Artist = {
  name: string;
  image: { src: string; alt?: string };
  bio: string;
  style: string;
};

const dummyArtists: Artist[] = [
    {
        name: "Ava Ink",
        image: { src: "/artist1.jpg", alt: "Ava Ink" },
        bio: "Linework and blackwork specialist. Based in Portland.",
        style: "Linework / Blackwork",
    },
    {
        name: "Zane Shade",
        image: { src: "/artist2.jpg", alt: "Zane Shade" },
        bio: "Neo-traditional and vibrant color pieces. Seattle based.",
        style: "Neo-traditional / Color",
    },
    {
        name: "Luna Star",
        image: { src: "/artist3.jpg", alt: "Luna Star" },
        bio: "Floral and nature-inspired tattoos. Based in San Francisco.",
        style: "Floral / Nature",
    },
    {
        name: "Max Steel",
        image: { src: "/artist4.jpg", alt: "Max Steel" },
        bio: "Realism and portrait tattoos. Based in Los Angeles.",
        style: "Realism / Portrait",
    },
    {
        name: "Raven Black",
        image: { src: "/artist5.jpg", alt: "Raven Black" },
        bio: "Black and grey realism. Based in New York.",
        style: "Black and Grey / Realism",
    },
];


export const SwipeDeck = () => {
  const [liked, setLiked] = useState<Artist[]>([]);
  const [currentIndex, setCurrentIndex] = useState(dummyArtists.length - 1);
  const cardRefs = useRef<Array<any>>([]);

  const handleSwipe = (direction: string, artist: Artist) => {
    if (direction === "right") {
      setLiked((prev) => [...prev, artist]);
    }
  };

  const swipe = async (dir: "left" | "right") => {
    if (currentIndex >= 0 && cardRefs.current[currentIndex]) {
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
                className="btn-hex text-4xl transition"
            >
                <FaTimes />
            </button>

          {/* Card Stack */}
            <div className="relative w-full max-w-md h-full flex-1 flex items-center justify-center">
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
                className="btn-hex text-4xl transition"
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
                  src={artist.image.src}
                  alt={artist.image.alt}
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
