"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/useLanguage";

export function PainSolutions() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: t("tab1Label"),
      pains: [t("tab1Pain1"), t("tab1Pain2"), t("tab1Pain3"), t("tab1Pain4")],
      solutions: [t("tab1Sol1"), t("tab1Sol2"), t("tab1Sol3"), t("tab1Sol4")]
    },
    {
      label: t("tab2Label"),
      pains: [t("tab2Pain1"), t("tab2Pain2"), t("tab2Pain3"), t("tab2Pain4")],
      solutions: [t("tab2Sol1"), t("tab2Sol2"), t("tab2Sol3"), t("tab2Sol4")]
    },
    {
      label: t("tab3Label"),
      pains: [t("tab3Pain1"), t("tab3Pain2"), t("tab3Pain3"), t("tab3Pain4")],
      solutions: [t("tab3Sol1"), t("tab3Sol2"), t("tab3Sol3"), t("tab3Sol4")]
    }
  ];

  return (
    <section id="kako-deluje" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="font-['JetBrains_Mono',monospace] text-[10px] md:text-xs font-semibold tracking-[-0.04em] text-blue-500 mb-4 uppercase">
          {t("tabsTitle")}
        </p>
        <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-slate-950">
          {t("tabsSubtitle")}
        </h2>
      </div>

      {/* Tab Selectors */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-6 py-3 rounded-full text-xs font-medium transition-all duration-300 ${
              activeTab === idx
                ? "bg-slate-900 text-white shadow-[0_10px_20px_-10px_rgba(15,23,42,0.35)] scale-105"
                : "bg-white/80 text-slate-600 border border-slate-200 hover:bg-white hover:text-slate-900 shadow-[0_2px_8px_rgba(15,23,42,0.02)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panel comparison */}
      <div className="grid md:grid-cols-2 gap-8 items-stretch mb-16">
        {/* Pains Column */}
        <div className="rounded-[2rem] bg-red-50/20 border border-red-100 p-8 md:p-10 shadow-[0_10px_30px_-20px_rgba(239,68,68,0.08)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                ✗
              </span>
              <span className="text-xs font-semibold text-red-600 tracking-wider uppercase font-['JetBrains_Mono',monospace]">
                Trenutno stanje
              </span>
            </div>
            <div className="space-y-6">
              {tabs[activeTab].pains.map((pain, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="text-red-400 font-bold mt-0.5 shrink-0 select-none">✕</span>
                  <p className="text-sm leading-6 text-slate-600 font-light">{pain}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Solutions Column */}
        <div className="rounded-[2rem] bg-blue-50/20 border border-blue-100 p-8 md:p-10 shadow-[0_10px_30px_-20px_rgba(59,130,246,0.08)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                ✓
              </span>
              <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase font-['JetBrains_Mono',monospace]">
                Z Dnevnik.app
              </span>
            </div>
            <div className="space-y-6">
              {tabs[activeTab].solutions.map((sol, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="text-emerald-500 font-bold mt-0.5 shrink-0 select-none">✓</span>
                  <p className="text-sm leading-6 text-slate-800 font-normal">{sol}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-900 to-[#101827] text-white border border-white/10 p-8 md:p-12 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.6)] text-center max-w-4xl mx-auto">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <p className="font-['JetBrains_Mono',monospace] text-[10px] md:text-xs font-semibold tracking-widest text-blue-400 mb-4 uppercase">
            {t("tabQuoteTitle")}
          </p>
          <p className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto italic text-slate-100">
            &ldquo;{t("tabQuoteText")}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
