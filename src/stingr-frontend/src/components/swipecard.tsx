import React from "react";
import clsx from "clsx";

type Artist = {
  name: string;
  image: {
    src: string;
    alt?: string;
  };
  bio: string;
  style: string;
  isSelected?: boolean;
};

export const SwipeCard = ({ artist }: { artist: Artist }) => {
  return (
    <div
      className={clsx(
        "cursor-pointer font-semibold md:text-md border-1 rounded-lg p-2 bg-background text-foreground shadow-lg w-100 h-[600px]"
      )}
    >
      <div className="mb-3 block aspect-[5/6] md:mb-4">
        <img
          src={artist.image.src}
          alt={artist.image.alt || artist.name}
          className="size-full object-cover rounded-lg"
        />
      </div>
      <div className="mb-2">
        <h3 className="text-xl text-[var(--color-honeyGold)] font-bold ">{artist.name}</h3>
        <div className="text-sm font-normal italic">{artist.style}</div>
      </div>
      <p className="text-sm font-normal">{artist.bio}</p>
    </div>
  );
};
