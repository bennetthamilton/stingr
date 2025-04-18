import { Navbar2 } from '@/components/navbar';
import { Footer1 } from '@/components/footer';

export default function Page() {
  return (
    <>
      <Navbar2 />
      <div className="min-h-screen flex items-center justify-center text-2xl font-heading text-honeyGold">
        Browse Artists Coming Soon
      </div>
      <Footer1 />
    </>
  );
}