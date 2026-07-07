"use client";

import React from "react";
import { useLanguage } from "@/lib/useLanguage";

export function TargetIndustries() {
  const { t } = useLanguage();

  const industries = [
    "Elektroinštalacije",
    "Vodovodne inštalacije",
    "Gradbeništvo & Montaža",
    "Urejanje okolice & Vrtnarstvo",
    "Čiščenje in vzdrževanje",
    "Servis strojev & Opreme",
    "Telekomunikacije"
  ];

  return (
    <section id="panoge" className="max-w-7xl mx-auto px-6 py-12">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-50 to-slate-100/50 border border-white p-8 md:p-10 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.15),inset_0_1px_0_white]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-md">
            <p className="font-['JetBrains_Mono',monospace] text-[10px] md:text-xs font-semibold tracking-[-0.04em] text-blue-500 mb-2 uppercase">
              {t("indTitle")}
            </p>
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-950">
              Prilagojeno za vsako ekipo na terenu
            </h3>
            <p className="mt-2 text-xs md:text-sm leading-6 text-slate-500 font-light">
              Dnevnik.app se brez težav prilagodi specifikam vaše panoge in strukturi dela.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 max-w-xl">
            {industries.map((ind, i) => (
              <span 
                key={i} 
                className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-normal text-slate-700 shadow-[0_2px_6px_rgba(15,23,42,0.03),inset_0_1px_0_white] hover:border-[#1B3A6B] hover:text-[#1B3A6B] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
