'use client';

import { ApplicationShell5 } from '@/components/appshell';
import { EventItemHeader11 } from '@/components/eventcreation';
import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';

function PageContent() {
  const searchParams = useSearchParams();

  const artistMap: { [key: string]: string } = {
    "123": "Jane Ink",
    "456": "Mark Steel",
    "789": "Lily Rose",
  };

  const artistName = useMemo(() => {
    const artistId = searchParams.get("artistId");
    return artistId ? artistMap[artistId] || "Unknown Artist" : "";
  }, [searchParams]);

  const formattedDate = useMemo(() => {
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
  }, [searchParams]);

  if (!formattedDate) return null;

  return (
    <EventItemHeader11 artist={artistName} date={formattedDate} />
  );
}

export default function Page() {
  return (
    <ApplicationShell5>
      <Suspense fallback={<div>Loading...</div>}>
        <PageContent />
      </Suspense>
    </ApplicationShell5>
  );
}
