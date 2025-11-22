// app/report/page.tsx
"use client";

import { useEffect, useState } from "react";

type Report = {
  id: string;
  title: string;
  subtitle?: string;
  fairValue?: string | null;
  upsideDownside?: string | null;
  driveLink?: string | null;
  excelLink?: string | null;
  createdAt?: string | null; // API will return ISO string
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/reports");
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: "unknown" }));
          throw new Error(err?.error || `HTTP ${res.status}`);
        }
        const data = await res.json();
        // defensive: ensure array
        setReports(Array.isArray(data) ? data : []);
      } catch (e: any) {
        console.error("Failed to fetch reports:", e);
        setError(e?.message || "Failed to load reports");
        setReports([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main className="min-h-screen bg-[#0f1724] text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold">Reports</h1>
          <p className="mt-2 text-slate-300">Latest valuation reports — click to view sources.</p>
        </div>

        {loading ? (
          <div className="text-slate-400">Loading...</div>
        ) : error ? (
          <div className="text-red-400">Error: {error}</div>
        ) : reports.length === 0 ? (
          <div className="text-slate-400">No reports yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((r) => (
              <article
                key={r.id}
                className="bg-white/5 rounded-xl p-5 shadow flex flex-col justify-between"
              >
                <div>
                  {/* Title + subtitle */}
                  <h2 className="text-xl font-semibold text-white">{r.title}</h2>
                  {r.subtitle && <p className="text-sm text-slate-300 mt-1">{r.subtitle}</p>}

                  {/* Stats */}
                  <div className="mt-4 text-sm text-slate-300 space-y-1">
                    {r.fairValue && (
                      <div>
                        Fair Value: <span className="font-medium text-white">{r.fairValue}</span>
                      </div>
                    )}
                    {r.upsideDownside && (
                      <div>
                        Upside/Downside:{" "}
                        <span className="font-medium text-[#d7b37c]">{r.upsideDownside}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Buttons Block — full width, bottom section */}
                <div className="mt-6 space-y-3">
                  {r.driveLink && (
                    <a
                      href={r.driveLink ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full text-center rounded-md bg-[#d7b37c] text-[#0f1724] font-semibold py-2"
                    >
                      View Summary
                    </a>
                  )}

                  {r.excelLink && (
                    <a
                      href={r.excelLink ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full text-center rounded-md border border-white/10 text-slate-100 font-semibold py-2"
                    >
                      Download Report
                    </a>
                  )}
                </div>

                {/* Footer info */}
                <div className="mt-4 text-xs text-slate-400">
                  Published:{" "}
                  {r.createdAt
                    ? new Date(r.createdAt).toLocaleString()
                    : "Unknown"}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
