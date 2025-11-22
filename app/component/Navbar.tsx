"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: "Report", path: "/report" }, // ✅ Added Report to main nav
  ];

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-[#0f1724]/95 backdrop-blur-sm border-b border-black/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ---------- LOGO (SVG) ---------- */}
            <Link href="/" aria-label="Valuation Lab home" className="flex items-center">
              <svg
                width="200"
                height="46"
                viewBox="0 0 300 64"
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-auto"
              >
                {/* Icon */}
                <g transform="translate(0,8)">
                  <rect x="0" y="26" width="7" height="22" rx="2" fill="#d7b37c" />
                  <rect x="12" y="18" width="7" height="30" rx="2" fill="#e8cca1" />
                  <rect x="24" y="8" width="7" height="40" rx="2" fill="#b48342" />
                  <path d="M4 18 L29 4" stroke="#b48342" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* Valuation */}
                <text
                  x="44"
                  y="48"
                  fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto"
                  fontSize="32"
                  fontWeight="700"
                  fill="#f8fafc"
                >
                  Valuation
                </text>

                {/* Lab */}
                <text
                  x="192"
                  y="48"
                  fontFamily="Georgia, serif"
                  fontSize="34"
                  fontWeight="700"
                  fill="#d7b37c"
                >
                  Lab
                </text>
              </svg>
            </Link>

            {/* ---------- DESKTOP NAV LINKS ---------- */}
            <div className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`text-sm font-medium px-3 py-1 rounded-md transition ${
                    pathname === item.path
                      ? "text-white bg-white/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* ---------- DESKTOP CTA BUTTON ---------- */}
            <div className="hidden md:block">
              <Link
                href="/report"
                className="rounded-full bg-gradient-to-r from-[#d7b37c] to-[#b48342] px-4 py-2 text-sm font-semibold text-[#0f1724] shadow hover:brightness-95 transition"
              >
                Explore Valuations
              </Link>
            </div>

            {/* ---------- MOBILE MENU BUTTON ---------- */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-slate-200 hover:bg-white/10 p-2 rounded"
            >
              <svg
                className={`h-6 w-6 transition ${open ? "rotate-90" : ""}`}
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>

          {/* ---------- MOBILE DROPDOWN ---------- */}
          <div
            className={`md:hidden overflow-hidden transition-all ${
              open ? "max-h-72" : "max-h-0"
            }`}
          >
            <div className="flex flex-col mt-3 pb-4 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className={`mx-3 px-4 py-2 rounded-lg text-base font-medium transition ${
                    pathname === item.path
                      ? "bg-white/10 text-white"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/report"
                onClick={() => setOpen(false)}
                className="mx-3 mt-1 text-center rounded-full bg-gradient-to-r from-[#d7b37c] to-[#b48342] px-4 py-2 text-sm font-semibold text-[#0f1724] shadow"
              >
                Explore Valuations
              </Link>
            </div>
          </div>
        </div>

        {/* Accent Line */}
        <div className="h-[2px] bg-gradient-to-r from-[#d7b37c]/40 via-transparent to-transparent" />
      </nav>
    </header>
  );
}
