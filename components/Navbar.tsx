"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/explore", label: "Explore Pillars" },
  { href: "/my-classes", label: "My Classes" },
] as const;

const navButtons = [
  { href: "/find-your-pillar", label: "Find Your Pillar" },
  { href: "/classes", label: "Discover Your Class" },
] as const;

const navButtonClass =
  "btn-primary px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-4">
        <Link href="/explore" className="flex items-center shrink-0 leading-none" aria-label="Explore pillars and classes">
          <img
            src="/braintopia-logo.png"
            alt="Braintopia"
            className="h-40 sm:h-48 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 min-w-0">
          <div className="flex items-center gap-5 lg:gap-8 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-dark hover:text-brand-blue transition-colors font-medium whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2.5 shrink-0 pl-2 border-l border-gray-200">
            {navButtons.map((button) => (
              <Link key={button.href} href={button.href} className={navButtonClass}>
                {button.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 shrink-0"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white px-6 py-4 flex flex-col gap-4 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-1 text-brand-dark font-medium"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex flex-col gap-2.5 pt-2 border-t border-gray-100">
            {navButtons.map((button) => (
              <Link
                key={button.href}
                href={button.href}
                className={`${navButtonClass} text-center py-2.5`}
                onClick={closeMenu}
              >
                {button.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}