'use client';

import { ApplicationShell5 } from '@/components/appshell';
import { ClientDatePicker } from '@/components/clientdatepicker';
import { Suspense } from 'react';

export default function Page() {
  const unavailableDates = [
    new Date(2025, 4, 7),
    new Date(2025, 4, 10),
    new Date(2025, 4, 15),
  ];

  return (
    <ApplicationShell5>
      <div className="max-w-2xl mx-auto px-4">
        <Suspense fallback={<div>Loading calendar...</div>}>
          <ClientDatePicker unavailableDates={unavailableDates} />
        </Suspense>
      </div>
    </ApplicationShell5>
  );
}