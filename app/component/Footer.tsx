export default function Footer() {
  return (
  <footer className="w-full  bg-[#0f1724] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center">
      <p className="text-sm text-slate-300">
  © 2025{" "}
  <span className="font-semibold text-[#d7b37c]">
    Valuation Lab
  </span>
  . All rights reserved. | Designed with ❤️ by{" "}
  <a
    href="https://bagora.agency/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#d7b37c] hover:text-[#e8c892] underline-offset-2 hover:underline transition"
  >
    Bagora Agency
  </a>
</p>


        <div className="mt-4 flex justify-center gap-6">
          <a
            href="/"
            className="text-slate-400 hover:text-[#d7b37c] transition text-sm"
          >
            Home
          </a>
          <a
            href="/contact"
            className="text-slate-400 hover:text-[#d7b37c] transition text-sm"
          >
            Contact
          </a>
          <a
            href="/report"
            className="text-slate-400 hover:text-[#d7b37c] transition text-sm"
          >
            Reports
          </a>
        </div>

        <div className="mt-6 h-[1px] w-full max-w-xs mx-auto bg-gradient-to-r from-[#d7b37c]/40 via-transparent to-[#d7b37c]/40" />
      </div>
    </footer>
  );
}
