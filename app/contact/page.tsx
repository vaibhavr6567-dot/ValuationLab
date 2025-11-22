// app/contact/page.tsx
import Link from "next/link";
import React from "react";
import Footer from "../component/Footer";

export const metadata = {
  title: "Contact — Valuation Lab",
  description: "Contact details for Valuation Lab",
};

export default function ContactPage() {
  return (
    <>
    <main className="min-h-screen flex flex-col justify-between bg-[#0f1724] text-slate-100">
      <section className="max-w-7xl mx-auto w-full px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT: About / Description */}
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="inline-block w-10 h-10 rounded-md bg-gradient-to-br from-[#d7b37c] to-[#b48342] shadow-sm" />
              <span className="text-sm font-medium text-amber-100/90">Valuation Lab</span>
            </div>

            <h1 className="text-4xl font-extrabold text-white mb-6">
              Get in Touch with Us
            </h1>

            <p className="text-base md:text-lg text-slate-300 leading-7 max-w-2xl">
              Valuation Lab is committed to delivering transparent, data-driven
              research. Whether you're an investor, student, or professional,
              feel free to reach out for queries, collaborations, or feedback.
            </p>

            <p className="text-base md:text-lg text-slate-300 leading-7 max-w-2xl mt-4">
              We aim to respond within 24 hours for all professional inquiries.
            </p>

            <Link href="/" className="inline-block mt-10">
              <button
                aria-label="Back to Home"
                className="flex items-center gap-3 bg-gradient-to-r from-[#d7b37c] to-[#b48342] text-[#0f1724] px-6 py-3 rounded-full text-lg font-semibold shadow-sm hover:brightness-95 transition"
              >
                <span className="text-xl leading-none">←</span>
                <span>Back to Home</span>
              </button>
            </Link>
          </div>

          {/* RIGHT: Contact Card */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-extrabold text-white mb-8">
              Contact Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-semibold tracking-wide text-[#d7b37c] uppercase mb-2">
                  Phone
                </p>
                <p className="text-lg font-medium text-slate-100">
                  +91 8100065968
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold tracking-wide text-[#d7b37c] uppercase mb-2">
                  Email
                </p>
                <p className="text-lg font-medium text-slate-100 break-all">
                  vaibhavrai6567@gmail.com
                </p>
              </div>
            </div>

   
          </div>

        </div>
      </section>

 
    </main>
    <Footer/>

   </>
  );
}
