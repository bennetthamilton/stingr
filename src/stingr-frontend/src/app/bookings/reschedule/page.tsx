import { Suspense } from "react";
import { ReschedulePageContent } from "@/components/reschedulepagecontent";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-yellow-500">Loading reschedule page…</div>}>
      <ReschedulePageContent />
    </Suspense>
  );
}
