"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-xl shadow-sm group-hover:scale-105 transition-transform">
            B
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              Botty<span className="text-primary">.ai</span>
            </span>
          </div>
        </a>

        {/* Center Nav (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {["Features", "Industries", "Pricing", "Integrations", "Resources"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/login"
            className="text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors"
          >
            Login
          </a>
          <a
            href="#demo"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-slate-900 hover:bg-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            Book Demo
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-slate-950 transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200/80 shadow-lg py-6 px-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-5 duration-200">
          {["Features", "Industries", "Pricing", "Integrations", "Resources"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-600 hover:text-slate-900 py-2"
            >
              {item}
            </a>
          ))}
          <hr className="border-slate-100 my-2" />
          <div className="flex flex-col gap-3">
            <a
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-center py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              Login
            </a>
            <a
              href="#demo"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-center py-3 text-sm font-semibold text-white rounded-xl bg-slate-900 hover:bg-slate-800"
            >
              Book Demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
