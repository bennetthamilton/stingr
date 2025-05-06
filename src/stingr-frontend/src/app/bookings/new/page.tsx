'use client';

import { ApplicationShell5 } from '@/components/appshell';
import { EventItemHeader11 } from '@/components/eventcreation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const artistMap: { [key: string]: string } = {
    "123": "Jane Ink",
    "456": "Mark Steel",
    "789": "Lily Rose",
  };

  const artistName = useMemo(() => {
    if (!isHydrated) return "";
    const artistId = searchParams.get("artistId");
    return artistId ? artistMap[artistId] || "Unknown Artist" : "";
  }, [isHydrated, searchParams]);

  const formattedDate = useMemo(() => {
    if (!isHydrated) return null;
    const dateParam = searchParams.get("date");

    const parseDate = (date: Date) => ({
      weekday: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
      day: date.getDate().toString().padStart(2, '0'),
      month: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date),
      year: date.getFullYear().toString(),
    });

    if (dateParam) {
      const [year, month, day] = dateParam.split('-').map(Number);
      const parsed = new Date(year, month - 1, day);
      return parseDate(parsed);
    }

    return parseDate(new Date());
  }, [isHydrated, searchParams]);

  if (!isHydrated || !formattedDate) {
    return null;
  }

  return (
    <ApplicationShell5>
      <EventItemHeader11 artist={artistName} date={formattedDate} />
    </ApplicationShell5>
  );
}
