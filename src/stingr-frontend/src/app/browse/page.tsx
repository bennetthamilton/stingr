import { ApplicationShell5 } from "@/components/appshell";
import { SwipeDeck } from "@/components/swipedeck";

export default function BrowsePage() {
  return (
    <ApplicationShell5>
      <div className="flex justify-center items-center min-h-screen">
        <SwipeDeck />
      </div>
    </ApplicationShell5>
  );
}