"use client";

import Link from "next/link";
import ContactPage from "../contact/page";

export default function HomeHero() {
  return (
    <>
    <section className="w-full bg-[#0f1724] text-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT: Text */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="inline-block w-10 h-10 rounded-md bg-gradient-to-br from-[#d7b37c] to-[#b48342] shadow-sm" />
              <span className="text-sm font-medium text-amber-100/90">Valuation Lab</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
              Professional{" "}
              <span className="text-[#d7b37c]">Financial Valuations</span>
            </h1>

            <p className="mt-6 text-lg text-slate-200 max-w-2xl">
              Expert, data-driven valuation reports built for investors and analysts.
              Download Excel models, read concise one-page summaries, and make
              informed decisions backed by clean financial logic.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Link
                href="/report"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d7b37c] to-[#b48342] px-6 py-3 text-sm font-semibold text-[#0f1724] shadow-md hover:brightness-95 transition"
              >
                Explore Valuations
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium border border-white/10 text-slate-100 hover:bg-white/5 transition"
              >
                Get in Touch
              </Link>
            </div>

            {/* Feature Row */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#d7b37c] flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12h4v6H3zM11 8h4v10h-4zM19 4h4v14h-4z" fill="currentColor" />
                </svg>
                <div>
                  <div className="text-sm font-semibold">Professional Models</div>
                  <div className="text-xs text-slate-300">DCF, Multiples & more</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#d7b37c] flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3 7h7l-5.5 4 2 7L12 16 5.5 20l2-7L2 9h7z" fill="currentColor" />
                </svg>
                <div>
                  <div className="text-sm font-semibold">Trusted Research</div>
                  <div className="text-xs text-slate-300">Transparent assumptions</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#d7b37c] flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM11 6h2v6h-2zM11 14h2v2h-2z" fill="currentColor" />
                </svg>
                <div>
                  <div className="text-sm font-semibold">Downloadable Files</div>
                  <div className="text-xs text-slate-300">Excel models & PDFs</div>
                </div>
              </div>
            </div>
          </div>
{/* RIGHT: Visual card with sample (logo removed, layout improved) */}
<div className="lg:col-span-5">
  <div className="relative rounded-2xl bg-gradient-to-b from-white/6 to-white/2 border border-white/6 p-6 shadow-xl overflow-hidden">
    {/* Top-right small thumbnail (decorative brand mark) */}


    {/* Top-left tiny badge */}
    <div className="inline-flex items-center gap-2 bg-white/6 px-3 py-1 rounded-full text-xs text-amber-100/90 mb-4">
      <span className="w-2 h-2 rounded-full bg-[#d7b37c]" />
      Premium
    </div>

    {/* Title + short description */}
    <div className="mt-2">
      <div className="text-lg font-semibold text-white">Valuation Lab</div>
      <div className="text-sm text-slate-300">One-page company reports</div>
    </div>

    {/* sample stat / excerpt */}
    <div className="mt-6 bg-white/5 rounded-md p-4">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-xs text-slate-300">Fair Value (INR)</div>
          <div className="text-2xl font-bold text-white leading-tight">₹ 1,234</div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-300">Upside</div>
          <div className="text-lg font-semibold text-[#d7b37c]">+24%</div>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-300">
        Concise valuation summary with downloadable model and sensitivity table.
      </p>

      {/* small horizontal mini-stats row */}
      <div className="mt-4 flex items-center gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-white/6 rounded text-slate-200">DCF</span>
          <span className="text-slate-300">Core model</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-white/6 rounded text-slate-200">PDF</span>
          <span className="text-slate-300">Downloadable</span>
        </div>
      </div>
    </div>

    {/* footer actions */}
    <div className="mt-5 flex gap-3">
      <Link
        href="/report"
        className="flex-1 rounded-md bg-[#d7b37c] px-4 py-2 text-sm font-semibold text-[#0f1724] text-center shadow-sm"
      >
        View Report
      </Link>

      <Link
        href="/contact"
        className="rounded-md border border-white/10 px-4 py-2 text-sm text-slate-200 text-center"
      >
        Contact
      </Link>
    </div>
  </div>

  {/* small decorative note */}
  <p className="mt-4 text-xs text-slate-400/80">
    Built with clean models — updated monthly.
  </p>
</div>

        </div>
      </div>
    </section>
   </>
  );
}
