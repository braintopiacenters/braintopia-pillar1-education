import Link from "next/link";
import BookingModal from "@/components/BookingModal";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-brand-dark/70 flex flex-col md:flex-row justify-between gap-y-4">
        <div>
          <div className="font-semibold text-brand-dark">Braintopia</div>
          <div className="mt-1 tracking-wide text-brand-dark/80">Brain Load by Life</div>
        </div>

        <div className="flex gap-8">
          <div className="space-y-1">
            <div className="font-medium text-brand-dark">Explore</div>
            <Link href="/explore" className="block hover:text-brand-blue">Explore Pillars and Classes</Link>
            <Link href="/find-your-pillar" className="block hover:text-brand-blue">Find Your Pillar</Link>
            <Link href="/find-your-pillar" className="block hover:text-brand-blue">Class Discovery Quiz</Link>
            <Link href="/classes" className="block hover:text-brand-blue">All the Classes</Link>
            <Link href="/my-classes" className="block hover:text-brand-blue">My Classes</Link>
          </div>
          <div className="space-y-1">
            <div className="font-medium text-brand-dark">Get Started</div>
            <Link href="/find-your-pillar" className="block hover:text-brand-blue">Take the Quiz</Link>
            <BookingModal triggerClassName="block hover:text-brand-blue text-left" />
          </div>
        </div>

        <div className="text-xs md:text-right max-w-xs">
          Professional neurofeedback for those who carry the mental and emotional load of life,
          learning, service, performance, and recovery.
        </div>
      </div>
      <div className="border-t text-center text-xs py-4 text-brand-dark/50">
        © {new Date().getFullYear()} Braintopia. All rights reserved.
      </div>
    </footer>
  );
}
