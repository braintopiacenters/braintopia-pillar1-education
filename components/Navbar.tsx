"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/quiz", label: "Take the Quiz" },
    { href: "/classes", label: "All Classes" },
    { href: "/my-classes", label: "My Classes" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0 leading-none" aria-label="Braintopia home">
          <img 
            src="/braintopia-logo.png" 
            alt="Braintopia" 
            className="h-40 sm:h-48 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-brand-dark hover:text-brand-blue transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/quiz" 
            className="btn-primary px-5 py-2 rounded-full text-sm"
          >
            Discover Your Class
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white px-6 py-4 flex flex-col gap-4 text-sm">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="py-1 text-brand-dark" 
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/quiz" 
            className="btn-primary text-center py-2.5 rounded-full mt-2" 
            onClick={() => setIsOpen(false)}
          >
            Discover Your Class
          </Link>
        </div>
      )}
    </nav>
  );
}
