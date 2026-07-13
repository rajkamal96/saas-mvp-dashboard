"use client";

import React from "react";

export function Footer() {
  const linkClass =
    "underline hover:no-underline transition-all";

  return (
    <footer
      className="pb-5"
      style={{ background: "#E9F2FE" }}
    >
      {/* Horizontal divider */}
      <div
        className="h-px w-full mb-5"
        style={{
          background:
            "linear-gradient(90deg, rgba(191, 219, 254, 0) 0%, #BFDBFE 50%, rgba(191, 219, 254, 0) 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-3 md:px-6 flex flex-col items-center gap-1">
        {/* Links row */}
        <div
          className="flex flex-nowrap md:flex-wrap items-center justify-center gap-0 md:gap-1.5 w-[354px] md:w-auto text-[13px] max-[340px]:text-[11px] leading-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            color: "#1D2A3D",
          }}
        >
          <a href="#" className={linkClass}>Prijava</a>
          <span>•</span>
          <a href="#" className={linkClass}>Podpora</a>
          <span>•</span>
          <a href="#" className={linkClass}>Pogoji uporabe</a>
          <span>•</span>
          <a href="#" className={linkClass}>Politika zasebnosti</a>
        </div>

        {/* Copyright row */}
        <div
          className="flex flex-wrap items-center justify-center gap-1 text-xs max-[340px]:text-[11px] leading-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            color: "#1D2A3D",
          }}
        >
          <span>pomocnik.net</span>
          <span>© 2026 Vse pravice zadržane.</span>
        </div>
      </div>
    </footer>
  );
}
