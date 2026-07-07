"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/useLanguage";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-20 relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes aura-float-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes aura-bubble-in {
          0% { opacity: 0; transform: translateX(18px) translateY(8px) scale(0.96); filter: blur(6px); }
          100% { opacity: 1; transform: translateX(0) translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes aura-card-in {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .aura-float-bubble {
          opacity: 0;
          animation:
            aura-bubble-in 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
            aura-float-soft 4.5s ease-in-out infinite;
        }
        .aura-float-bubble:nth-child(1) { animation-delay: 300ms, 1100ms; }
        .aura-float-bubble:nth-child(2) { animation-delay: 600ms, 1400ms; }
        .aura-float-bubble:nth-child(3) { animation-delay: 900ms, 1700ms; }
        .aura-float-bubble:nth-child(4) { animation-delay: 1200ms, 2000ms; }
        .aura-hero-card {
          opacity: 0;
          animation: aura-card-in 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .aura-hero-card:nth-child(1) { animation-delay: 250ms; }
        .aura-hero-card:nth-child(2) { animation-delay: 450ms; }
        .aura-hero-card:nth-child(3) { animation-delay: 650ms; }
        .aura-hero-card:nth-child(4) { animation-delay: 850ms; }
      `}} />

      <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-12 lg:gap-16 items-center">
        {/* Hero Copy */}
        <div className="text-center lg:text-left">
          {/* Hero Label */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/75 border border-white px-3.5 py-2 shadow-[0_6px_18px_-12px_rgba(15,23,42,0.3),inset_0_1px_0_white] mb-8">
            <span className="w-7 h-7 rounded-full bg-gradient-to-b from-blue-50 to-white border border-blue-100 shadow-[inset_0_1px_0_white] flex items-center justify-center">
              <iconify-icon icon="solar:stars-linear" style={{ strokeWidth: 1.5 }} className="text-base text-blue-500" />
            </span>
            <span className="font-['JetBrains_Mono',monospace] text-[10px] md:text-xs font-semibold tracking-[-0.04em] text-slate-500 uppercase">
              {t("heroBadge")}
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-[3rem] md:text-[4.5rem] lg:text-[5.4rem] font-light tracking-[-0.075em] leading-[0.95] text-slate-950" style={{ textShadow: "0 1px 1px rgba(255,255,255,0.8)" }}>
            <span className="block">
              {t("heroTitle").split(".")[0]}.
            </span>
            <span className="block mt-2 text-[#1B3A6B] font-semibold">
              {t("heroTitle").split(".")[1] || ""}
            </span>
          </h1>

          <h2 className="mt-6 text-xl md:text-2xl font-light text-[#1B3A6B] tracking-tight">
            {t("heroSubTitleMain")}
          </h2>

          <p className="mt-6 text-base md:text-lg leading-8 text-slate-600 font-light max-w-2xl mx-auto lg:mx-0">
            {t("heroSubtitle")}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <Link href="/register" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 bg-gradient-to-b from-[#1B3A6B] to-[#12274b] border border-[#0d1e3a] text-white text-sm font-normal shadow-[0_10px_24px_rgba(27,58,107,0.26),inset_0_1px_0_rgba(255,255,255,0.35)] hover:from-[#234882] hover:to-[#1a3867] hover:-translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)] transition-all duration-300">
              {t("heroCtaMain")}
              <iconify-icon icon="solar:arrow-right-linear" style={{ strokeWidth: 1.5 }} className="text-lg" />
            </Link>

            <a href="#kako-deluje" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 bg-gradient-to-b from-white to-slate-50 border border-slate-200 text-slate-700 text-sm font-normal shadow-[0_4px_12px_rgba(15,23,42,0.05),inset_0_1px_0_white] hover:from-slate-50 hover:to-slate-100 hover:-translate-y-0.5 transition-all duration-300">
              <iconify-icon icon="solar:play-circle-linear" style={{ strokeWidth: 1.5 }} className="text-lg text-blue-500" />
              {t("heroCtaSub")}
            </a>
          </div>

          {/* Trust Row */}
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 text-[10px] md:text-xs text-slate-500 font-light">
            <span className="inline-flex items-center gap-2">
              <iconify-icon icon="solar:shield-check-linear" style={{ strokeWidth: 1.5 }} className="text-base text-blue-500" />
              {t("priceTrust1")}
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-300" />
            <span className="inline-flex items-center gap-2">
              <iconify-icon icon="solar:devices-linear" style={{ strokeWidth: 1.5 }} className="text-base text-blue-500" />
              {t("priceTrust2")}
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-300" />
            <span className="inline-flex items-center gap-2">
              <iconify-icon icon="solar:bolt-circle-linear" style={{ strokeWidth: 1.5 }} className="text-base text-blue-500" />
              {t("priceTrust3")}
            </span>
          </div>
        </div>

        {/* Hero Product Mockup */}
        <div className="relative lg:pl-4">
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-blue-200/40 via-white/20 to-sky-200/30 blur-3xl" />

          <div className="relative rounded-[2rem] bg-[#f8fafc] border border-white shadow-[0_30px_80px_-35px_rgba(15,23,42,0.35),inset_0_2px_0_rgba(255,255,255,1)] p-4 sm:p-5">
            {/* Floating Bubble Stack / Asymmetric Orbit */}
            <div className="hidden md:block absolute inset-0 z-20 pointer-events-none">
              {/* Bubble 01 — Top Right */}
              <div className="aura-float-bubble absolute -right-7 top-10 rounded-2xl bg-white/90 backdrop-blur border border-white px-4 py-3 shadow-[0_18px_38px_-20px_rgba(15,23,42,0.45),inset_0_1px_0_white] min-w-[12rem]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <iconify-icon icon="solar:bell-bing-linear" style={{ strokeWidth: 1.5 }} className="text-lg text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-900 font-normal">
                      {t("dashColTerenStatus")}
                    </p>
                    <p className="text-[10px] text-slate-400 font-light">
                      Luka · Celje
                    </p>
                  </div>
                </div>
              </div>

              {/* Bubble 02 — Mid Right */}
              <div className="aura-float-bubble absolute -right-7 top-[35%] rounded-2xl bg-white/90 backdrop-blur border border-white px-4 py-3 shadow-[0_18px_38px_-20px_rgba(15,23,42,0.45),inset_0_1px_0_white] min-w-[12rem]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <iconify-icon icon="solar:document-text-linear" style={{ strokeWidth: 1.5 }} className="text-lg text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-900 font-normal">
                      {t("showcaseSlide2CardLabel")}
                    </p>
                    <p className="text-[10px] text-slate-400 font-light">
                      Prepis v teku
                    </p>
                  </div>
                </div>
              </div>

              {/* Bubble 03 — Lower Right */}
              <div className="aura-float-bubble absolute -right-7 bottom-[26%] rounded-2xl bg-white/90 backdrop-blur border border-white px-4 py-3 shadow-[0_18px_38px_-20px_rgba(15,23,42,0.45),inset_0_1px_0_white] min-w-[12rem]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                    <iconify-icon icon="solar:calendar-mark-linear" style={{ strokeWidth: 1.5 }} className="text-lg text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-900 font-normal">
                      {t("dashDate").split(",")[0]}
                    </p>
                    <p className="text-[10px] text-slate-400 font-light">
                      Urnik posodobljen
                    </p>
                  </div>
                </div>
              </div>

              {/* Bubble 04 — Bottom Left */}
              <div className="aura-float-bubble absolute left-8 -bottom-6 rounded-2xl bg-white/90 backdrop-blur border border-white px-4 py-3 shadow-[0_18px_38px_-20px_rgba(15,23,42,0.45),inset_0_1px_0_white] min-w-[12rem]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <iconify-icon icon="solar:chat-round-dots-linear" style={{ strokeWidth: 1.5 }} className="text-lg text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-900 font-normal">
                      {t("dashColKomunikacija")}
                    </p>
                    <p className="text-[10px] text-slate-400 font-light">
                      Pisarna sinhronizirana
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-gradient-to-b from-white to-slate-50 border border-slate-200 shadow-[inset_0_1px_0_white] overflow-hidden">
              {/* Mockup Top Bar */}
              <div className="px-5 py-4 flex items-center justify-between border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                </div>
                <div className="font-['JetBrains_Mono',monospace] text-[10px] text-slate-400 tracking-[-0.05em] uppercase">
                  {t("showcaseSlide1CardTitle")}
                </div>
              </div>

              {/* Mockup Content */}
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs text-slate-400 font-light mb-1">
                      {t("dashDate")}
                    </p>
                    <h2 className="text-xl md:text-2xl font-normal tracking-tight text-slate-900">
                      {t("showcaseSlide1Title")}
                    </h2>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-[inset_0_1px_0_white]">
                    <iconify-icon icon="solar:stars-linear" style={{ strokeWidth: 1.5 }} className="text-2xl" />
                  </div>
                </div>

                <div className="grid gap-3">
                  {/* Animated Product Card 1 */}
                  <div className="aura-hero-card rounded-2xl bg-white border border-slate-200 p-4 shadow-[0_2px_8px_rgba(15,23,42,0.03),inset_0_1px_0_white]">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                        <iconify-icon icon="solar:microphone-linear" style={{ strokeWidth: 1.5 }} className="text-lg text-blue-500" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          {t("showcaseSlide2CardLabel")}
                        </p>
                        <p className="text-sm leading-5 text-slate-700 mt-1 font-light italic">
                          &ldquo;{t("showcaseSlide2CardText")}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Animated Product Card 2 */}
                  <div className="aura-hero-card rounded-2xl bg-white border border-slate-200 p-4 shadow-[0_2px_8px_rgba(15,23,42,0.03),inset_0_1px_0_white]">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center">
                        <iconify-icon icon="solar:checklist-minimalistic-linear" style={{ strokeWidth: 1.5 }} className="text-lg text-indigo-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-slate-800">
                            {t("workTasksLabel")}
                          </p>
                          <span className="text-[10px] text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5 font-bold">
                            3
                          </span>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {t("showcaseSlide1CardItem1")}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            {t("showcaseSlide1CardItem2")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Cards */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {/* Suggested Action */}
                    <div className="aura-hero-card relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-slate-200 text-slate-900 border border-blue-100 p-4 shadow-[0_12px_28px_-16px_rgba(59,130,246,0.24),inset_0_1px_0_white]">
                      <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-blue-300/30 blur-2xl pointer-events-none" />
                      <div className="relative flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.12)]" />
                            <p className="text-[10px] text-slate-500 font-light uppercase tracking-wider">
                              {t("dashColTeren")}
                            </p>
                          </div>
                          <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
                            9:00 - 17:00
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-white/80 border border-white flex items-center justify-center shadow-[inset_0_1px_0_white]">
                          <iconify-icon icon="solar:lock-keyhole-linear" style={{ strokeWidth: 1.5 }} className="text-base text-blue-500" />
                        </div>
                      </div>
                    </div>

                    {/* Suggested Reply */}
                    <div className="aura-hero-card rounded-2xl bg-gradient-to-b from-[#1B3A6B] to-[#12274b] text-white border border-[#0d1e3a] p-4 shadow-[0_10px_24px_-14px_rgba(27,58,107,0.55),inset_0_1px_0_rgba(255,255,255,0.30)] flex flex-col justify-between">
                      <p className="text-[10px] text-blue-200 font-semibold uppercase tracking-wider">
                        {t("showcaseSlide2CardStatus")}
                      </p>
                      <p className="mt-1 text-xs leading-4 font-light text-slate-100">
                        {t("heroSubText")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
