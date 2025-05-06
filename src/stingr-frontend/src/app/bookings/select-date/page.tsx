import { ApplicationShell5 } from '@/components/appshell';
import { ClientDatePicker } from '@/components/clientdatepicker';

export default function Page() {
  const unavailableDates = [
    new Date(2025, 4, 7),
    new Date(2025, 4, 10),
    new Date(2025, 4, 15),
  ];

  return (
    <ApplicationShell5>
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4">Select an Appointment Date</h2>
        <ClientDatePicker unavailableDates={unavailableDates} />
      </div>
    </ApplicationShell5>
  );
}