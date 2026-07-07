"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/useLanguage";

export function Pricing() {
  const { t } = useLanguage();

  const features = [
    t("priceFeature1"),
    t("priceFeature2"),
    t("priceFeature3"),
    t("priceFeature4"),
    t("priceFeature5"),
    t("priceFeature6"),
    t("priceFeature7"),
    t("priceFeature8")
  ];

  return (
    <section id="cenik" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="font-['JetBrains_Mono',monospace] text-[10px] md:text-xs font-semibold tracking-[-0.04em] text-blue-500 mb-4 uppercase">
          {t("priceTitle")}
        </p>
        <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-slate-950">
          {t("priceSubtitle")}
        </h2>
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
                  <span className="text-[3rem] md:text-[4rem] font-light tracking-tight">59</span>
                  <span className="text-[2rem] font-light tracking-tight ml-1">€</span>
                  <span className="text-xs font-light text-slate-400 ml-2">{t("priceCardUnit")}</span>
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
            <div className="md:w-1/2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                {t("priceFeatureHeader")}
              </p>
              <ul className="space-y-3.5">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-light">
                    <iconify-icon icon="solar:check-circle-linear" style={{ strokeWidth: 1.5 }} className="text-blue-500 text-lg shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
