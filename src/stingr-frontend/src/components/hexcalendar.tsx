"use client";

import React, { useState } from "react";
import { HexGrid, Layout, Hexagon, Text, Pattern, Hex } from "react-hexgrid";
import { startOfMonth, endOfMonth, eachDayOfInterval, getDay, format } from "date-fns";

export const HexCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  // Offset for the first day of the month to align in the grid (Sunday = 0)
  const offset = getDay(start);

  const hexCells = new Array(offset).fill(null).concat(days);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">{format(currentDate, "MMMM yyyy")}</h2>

      <HexGrid width={800} height={600} viewBox="-50 -50 100 100">
        <Layout size={{ x: 10, y: 10 }} flat={false} spacing={1.1} origin={{ x: 0, y: 0 }}>
          {hexCells.map((day, index) => (
            <Hexagon key={index} q={index % 7} r={Math.floor(index / 7)} s={-((index % 7) + Math.floor(index / 7))}>
              {day && (
                <Text style={{ fontSize: 2 }}>{format(day, "d")}</Text>
              )}
            </Hexagon>
          ))}
        </Layout>
      </HexGrid>
    </div>
  );
};

