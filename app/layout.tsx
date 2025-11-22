import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Fixed metadata (SEO-friendly, supports page-level overrides)
export const metadata: Metadata = {
  title: {
    default: "Valuation Lab",
    template: "%s | Valuation Lab",
  },
  description: "Valuation Lab — Latest valuation reports, summaries, and insights.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />

        {/* main expands so footer stays at the bottom */}
        <main className="flex-1">{children}</main>

    
      </body>
    </html>
  );
}
