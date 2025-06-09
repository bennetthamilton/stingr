"use client";

import React, { useState, useEffect, useRef } from "react";
import TinderCard from "react-tinder-card";
import { SwipeCard } from "./swipecard";
import { FaHeart, FaTimes } from "react-icons/fa";

type Artist = {
  name: string;
  bio: string;
  style: string;
  images: { src: string; alt?: string }[];
};

export const SwipeDeck = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [liked, setLiked] = useState<Artist[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  type SwipeableCard = { swipe: (dir: "left" | "right") => void };
  const cardRefs = useRef<(SwipeableCard | null)[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch("https://16juj9qjsj.execute-api.us-west-2.amazonaws.com/profile");
        const data = await res.json();

        const mapped: Artist[] = data.map((artist: any) => ({
          name: artist.name,
          bio: artist.bio,
          style: artist.styles.join(" / "),
          images: artist.art_pictures.map((url: string, index: number) => {
            const filename = url.split("/").pop();
            return {
              src: `/portfolio/${filename ?? "placeholder.jpg"}`,
              alt: `${artist.name} artwork ${index + 1}`,
            };
          }),
        }));

        cardRefs.current = Array(mapped.length).fill(null); // reset refs
        setArtists(mapped);
        setCurrentIndex(mapped.length - 1);
      } catch (err) {
        console.error("Failed to fetch artists", err);
      }
    };

    fetchArtists();
  }, []);

  const noMoreCards = currentIndex < 0;

  const handleSwipe = (direction: string, artist: Artist) => {
    if (direction === "right") {
      setLiked((prev) => [...prev, artist]);
    }
  };

  const swipe = async (dir: "left" | "right") => {
    if (!noMoreCards && cardRefs.current[currentIndex]) {
      await cardRefs.current[currentIndex]?.swipe(dir);
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
            className={`btn-hex text-4xl transition ${noMoreCards ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FaTimes />
          </button>

          {/* Card Stack */}
          <div className="relative w-full max-w-md h-full flex-1 flex items-center justify-center">
            {/* No more matches message */}
            <div className="absolute z-0 flex items-center justify-center w-full h-full bg-background text-neutral-400 text-lg font-semibold text-center px-4">
              No more matches — check back later!
            </div>

            {/* Tinder Cards */}
            {artists.map((artist, index) => (
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
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
              >
                <div style={{ zIndex: index }}>
                  <SwipeCard artist={artist} />
                </div>
              </TinderCard>
            ))}
          </div>

          {/* Like Button */}
          <button
            onClick={() => swipe("right")}
            className={`btn-hex text-4xl transition ${noMoreCards ? "opacity-50 cursor-not-allowed" : ""}`}
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
                  src={artist.images[0]?.src || "/portfolio/placeholder.jpg"}
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
