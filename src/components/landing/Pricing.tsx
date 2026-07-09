"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/useLanguage";

export function Pricing() {
  const { t } = useLanguage();
  const [isYearly, setIsYearly] = useState(false);
  const [displayPrice, setDisplayPrice] = useState(59);

  useEffect(() => {
    const target = isYearly ? 49 : 59;
    if (displayPrice === target) return;

    const duration = 260;
    const steps = Math.abs(target - displayPrice);
    const stepTime = Math.max(6, Math.floor(duration / steps));

    const timer = setInterval(() => {
      setDisplayPrice((prev) => {
        if (prev === target) {
          clearInterval(timer);
          return prev;
        }
        return prev < target ? prev + 1 : prev - 1;
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, [isYearly, displayPrice]);

  const sections = [
    {
      title: t("priceSec1Title"),
      items: [t("priceSec1Item1"), t("priceSec1Item2"), t("priceSec1Item3")],
    },
    {
      title: t("priceSec2Title"),
      items: [t("priceSec2Item1"), t("priceSec2Item2"), t("priceSec2Item3")],
    },
    {
      title: t("priceSec3Title"),
      items: [
        t("priceSec3Item1"),
        t("priceSec3Item2"),
        t("priceSec3Item3"),
        t("priceSec3Item4"),
      ],
    },
  ];

  return (
    <section id="cenik" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="font-['JetBrains_Mono',monospace] text-[10px] md:text-xs font-semibold tracking-[-0.04em] text-blue-500 mb-4 uppercase">
          {t("priceTitle")}
        </p>
        <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-slate-950">
          {t("priceSubtitle")}
        </h2>
      </div>

      {/* Skeuomorphic Toggle */}
      <div className="mb-12 flex justify-center">
        <label className="relative flex items-center p-1 bg-[#e2e8f0] rounded-full cursor-pointer w-[16rem] shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_1px_rgba(255,255,255,1)] border border-slate-300">
          <input
            type="checkbox"
            className="sr-only"
            checked={isYearly}
            onChange={(e) => setIsYearly(e.target.checked)}
          />
          {/* Toggle Pill */}
          <div
            className={`absolute left-1 top-1 bottom-1 w-[calc(50%-0.25rem)] bg-gradient-to-b from-white to-slate-50 rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,1)] border border-slate-200 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isYearly ? "translate-x-full" : "translate-x-0"
            }`}
          />
          <span
            className={`relative w-1/2 text-center text-xs font-normal transition-colors duration-300 py-2.5 z-10 ${
              isYearly ? "text-slate-400" : "text-slate-800"
            }`}
          >
            {t("billingMonthly")}
          </span>
          <span
            className={`relative w-1/2 flex items-center justify-center gap-1.5 text-center text-xs font-normal transition-colors duration-300 py-2.5 z-10 ${
              isYearly ? "text-slate-800" : "text-slate-400"
            }`}
          >
            {t("billingAnnually")}
          </span>
        </label>
      </div>

      <div className="flex justify-center items-center">
        {/* Single Premium Pricing Card */}
        <div className="relative w-full max-w-2xl rounded-[2.5rem] bg-gradient-to-b from-blue-50/50 to-[#f8fafc] border border-white p-8 md:p-12 shadow-[0_30px_70px_-30px_rgba(27,58,107,0.18),inset_0_2px_0_white] transition-all duration-500 hover:shadow-[0_40px_80px_-35px_rgba(27,58,107,0.22)]">
          {/* Floating Recommended/Celoten dostop Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-b from-[#1B3A6B] to-[#12274b] text-white text-[10px] font-semibold rounded-full shadow-[0_4px_10px_rgba(27,58,107,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] border border-[#0d1e3a] tracking-wider uppercase z-10">
            {t("priceCardBadge")}
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start md:items-stretch">
            {/* Price block info */}
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <p className="font-['JetBrains_Mono',monospace] text-[10px] text-blue-500 font-semibold uppercase tracking-widest">
                  FLAT RATE
                </p>
                <div className="flex items-baseline text-slate-950 mt-4">
                  <span className="text-[3rem] md:text-[4rem] font-light tracking-tight">{displayPrice}</span>
                  <span className="text-[2rem] font-light tracking-tight ml-1">€</span>
                  <span className="text-xs font-light text-slate-400 ml-2">
                    {isYearly ? t("priceCardUnitYearly") : t("priceCardUnit")}
                  </span>
                </div>
                <p className="mt-4 text-xs leading-6 text-slate-500 font-light">
                  {t("priceCardSub")}
                </p>
              </div>

              <div className="mt-8">
                <Link href="/register" className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 bg-gradient-to-b from-[#1B3A6B] to-[#12274b] border border-[#0d1e3a] text-white text-xs font-semibold shadow-[0_8px_20px_rgba(27,58,107,0.25),inset_0_1px_0_rgba(255,255,255,0.3)] hover:from-[#234882] hover:to-[#1a3867] hover:-translate-y-0.5 transition-all duration-300">
                  {t("priceCta")}
                  <iconify-icon icon="solar:arrow-right-linear" style={{ strokeWidth: 1.5 }} className="text-base" />
                </Link>
                
                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 justify-center md:justify-start text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">✓ {t("priceTrust1")}</span>
                  <span className="flex items-center gap-1">✓ {t("priceTrust2")}</span>
                  <span className="flex items-center gap-1">✓ {t("priceTrust3")}</span>
                </div>
              </div>
            </div>

            {/* Divider line */}
            <div className="hidden md:block w-px bg-slate-200" />

            {/* Features checkmark list */}
            <div className="md:w-1/2 flex flex-col justify-between">
              <div className="space-y-6">
                {sections.map((section, idx) => (
                  <div key={idx}>
                    <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5 text-xs text-slate-600 font-light">
                          <iconify-icon
                            icon="solar:check-circle-linear"
                            style={{ strokeWidth: 1.5 }}
                            className="text-blue-500 text-lg shrink-0 mt-0.5"
                          />
                          <span className="mt-[2px]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Cancel Anytime with extra gap from top */}
              <div className="mt-8 pt-4 border-t border-slate-200/60">
                <div className="flex items-start gap-2.5 text-xs text-slate-600 font-light">
                  <iconify-icon
                    icon="solar:check-circle-linear"
                    style={{ strokeWidth: 1.5 }}
                    className="text-blue-500 text-lg shrink-0 mt-0.5"
                  />
                  <span className="font-medium text-slate-900 mt-[2px]">{t("priceCancelAnytime")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
