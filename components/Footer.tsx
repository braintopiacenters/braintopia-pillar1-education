import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-brand-dark/70 flex flex-col md:flex-row justify-between gap-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-brand-dark">Braintopia</span>
            <span className="text-xs px-2 py-0.5 rounded bg-brand-blue/10 text-brand-blue">PILLAR 1</span>
          </div>
          <div>Education &amp; Family Support</div>
          <div className="mt-1">BRAIN LOAD BY LIFE</div>
        </div>

        <div className="flex gap-8">
          <div className="space-y-1">
            <div className="font-medium text-brand-dark">Explore</div>
            <Link href="/quiz" className="block hover:text-brand-blue">Class Discovery Quiz</Link>
            <Link href="/classes" className="block hover:text-brand-blue">The 7 Classes</Link>
            <Link href="/my-classes" className="block hover:text-brand-blue">My Classes</Link>
          </div>
          <div className="space-y-1">
            <div className="font-medium text-brand-dark">Get Started</div>
            <Link href="/quiz" className="block hover:text-brand-blue">Take the Quiz</Link>
            <a href="#book" className="block hover:text-brand-blue">Request more information</a>
          </div>
        </div>

        <div className="text-xs md:text-right max-w-[220px]">
          Professional neurofeedback for the people who carry the mental and emotional load of teaching, parenting, and learning.
        </div>
      </div>
      <div className="border-t text-center text-xs py-4 text-brand-dark/50">
        © {new Date().getFullYear()} Braintopia. All rights reserved.
      </div>
    </footer>
  );
}
