"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/useLanguage";
import { 
  Check, 
  ArrowRight, 
  ChevronRight, 
  Mic, 
  Smartphone, 
  Laptop, 
  Calendar, 
  Layers, 
  PhoneCall, 
  Sparkles, 
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const { t } = useLanguage();
  // Tabs State (Pain vs Solution)
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);

  // Feature Showcase Slider State
  const [activeSlide, setActiveSlide] = useState<0 | 1 | 2>(0);

  // Target Industries badges
  const industries = [
    t("indTitle") === "Prilagojeno za panoge na terenu" ? "Gradbeništvo" : "Construction",
    t("indTitle") === "Prilagojeno za panoge na terenu" ? "Montaža" : "Assembly / Installation",
    t("indTitle") === "Prilagojeno za panoge na terenu" ? "Elektro storitve" : "Electrical Services",
    t("indTitle") === "Prilagojeno za panoge na terenu" ? "HVAC & ogrevanje" : "HVAC & Heating",
    t("indTitle") === "Prilagojeno za panoge na terenu" ? "Vzdrževanje objektov" : "Property Maintenance",
    t("indTitle") === "Prilagojeno za panoge na terenu" ? "Čistilni servisi" : "Cleaning Services"
  ];

  // Lerp Mouse Trail Effect
  useEffect(() => {
    const glowEl = document.getElementById("aura-liquid-glow");
    if (!glowEl) return;

    let mouseX = -9999;
    let mouseY = -9999;
    let currentX = -9999;
    let currentY = -9999;
    let isInitialized = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isInitialized) {
        currentX = mouseX;
        currentY = mouseY;
        isInitialized = true;
      }
    };

    const animateGlow = () => {
      if (isInitialized) {
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;
        glowEl.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
      }
      requestAnimationFrame(animateGlow);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const animationFrameId = requestAnimationFrame(animateGlow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Spotlight card local position updates
  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] font-sans text-slate-800 dark:text-slate-100 overflow-x-hidden selection:bg-[#1B3A6B]/10 selection:text-[#1B3A6B] relative">
      
      {/* Liquid cursor glow element */}
      <div 
        id="aura-liquid-glow" 
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none -z-10 mix-blend-screen dark:mix-blend-lighten blur-[80px] opacity-0 md:opacity-80 transition-opacity duration-1000"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.08) 40%, rgba(27, 58, 107, 0.02) 80%, transparent 100%)",
          transform: "translate3d(-9999px, -9999px, 0)",
        }}
      />
      
      {/* 1. STICKY HEADER */}
      <header className="sticky top-0 w-full bg-white/80 dark:bg-[#0b0f19]/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/60 h-16 flex items-center justify-between px-6 md:px-12 z-50 transition-colors">
        <Logo className="h-7 w-auto" />
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <a href="#kako-deluje" className="hover:text-[#1B3A6B] transition-colors">{t("navHowItWorks")}</a>
          <a href="#funkcionalnosti" className="hover:text-[#1B3A6B] transition-colors">{t("navFeatures")}</a>
          <a href="#prednosti" className="hover:text-[#1B3A6B] transition-colors">{t("navBenefits")}</a>
          <a href="#cenik" className="hover:text-[#1B3A6B] transition-colors">{t("navPricing")}</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-[#1B3A6B] transition-colors cursor-pointer">
              {t("navLogin")}
            </span>
          </Link>
          <Link href="/login">
            <Button className="h-9 px-4 rounded-xl bg-[#1B3A6B] hover:bg-[#142c52] text-white text-xs font-bold transition-all shadow-sm">
              {t("navDemoBtn")}
            </Button>
          </Link>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative py-20 md:py-28 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Glow behind hero */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-100/40 dark:bg-blue-950/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <span className="text-[10px] font-bold tracking-widest text-[#1B3A6B] uppercase bg-[#1B3A6B]/5 dark:bg-[#1B3A6B]/10 px-3 py-1.5 rounded-full mb-6">
          {t("heroBadge")}
        </span>

        <h1 className="text-4xl md:text-[54px] font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight max-w-3xl">
          {t("heroTitle").split(".")[0]}.<br className="hidden sm:inline" /> {t("heroTitle").split(".")[1]}
        </h1>

        <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 mt-6 max-w-2xl font-medium leading-relaxed">
          {t("heroSubtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-8 w-full sm:w-auto">
          <Link href="/register" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto h-12 px-7 rounded-xl bg-[#1B3A6B] hover:bg-[#142c52] text-white font-bold text-sm transition-all shadow-md gap-2">
              {t("heroCtaMain")} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto h-12 px-7 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 font-bold text-sm gap-2">
              <PhoneCall className="w-4 h-4 text-[#1B3A6B]" /> {t("heroCtaSub")}
            </Button>
          </Link>
        </div>

        <p className="text-xs text-slate-400 font-medium mt-4">
          {t("heroSubText")}
        </p>
      </section>

      {/* 3. TARGET INDUSTRIES BADGES */}
      <section className="pb-16 px-6 text-center max-w-4xl mx-auto">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-4">
          {t("indTitle")}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {industries.map((ind, idx) => (
            <span 
              key={idx}
              className="px-4 py-2 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-slate-800/80 shadow-sm text-xs font-bold text-slate-600 dark:text-slate-300"
            >
              {ind}
            </span>
          ))}
        </div>
      </section>

      {/* 4. BENEFIT GRID (Dva svetova, en sistem) */}
      <section className="py-20 bg-white dark:bg-[#0c111d] border-y border-slate-200/50 dark:border-slate-800 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t("benefitsTitle")}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
              {t("benefitsSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* MOBI COLUMN */}
            <div 
              onMouseMove={handleCardMouseMove}
              className="spotlight-card p-8 rounded-3xl bg-slate-50 dark:bg-[#0f172a] border border-slate-100 dark:border-slate-800/80 relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#1B3A6B]/10 flex items-center justify-center text-[#1B3A6B]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#1B3A6B] block uppercase">{t("benefitsMobiLabel")}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t("benefitsMobiTitle")}</h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1B3A6B]/10 flex items-center justify-center text-[#1B3A6B] flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t("benefitsMobiItem1")}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1B3A6B]/10 flex items-center justify-center text-[#1B3A6B] flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t("benefitsMobiItem2")}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1B3A6B]/10 flex items-center justify-center text-[#1B3A6B] flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t("benefitsMobiItem3")}
                  </p>
                </div>
              </div>
            </div>

            {/* DESKTOP COLUMN */}
            <div 
              onMouseMove={handleCardMouseMove}
              className="spotlight-card p-8 rounded-3xl bg-slate-50 dark:bg-[#0f172a] border border-slate-100 dark:border-slate-800/80 relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#1B3A6B]/10 flex items-center justify-center text-[#1B3A6B]">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#1B3A6B] block uppercase">{t("benefitsOfficeLabel")}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t("benefitsOfficeTitle")}</h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1B3A6B]/10 flex items-center justify-center text-[#1B3A6B] flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t("benefitsOfficeItem1")}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1B3A6B]/10 flex items-center justify-center text-[#1B3A6B] flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t("benefitsOfficeItem2")}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1B3A6B]/10 flex items-center justify-center text-[#1B3A6B] flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t("benefitsOfficeItem3")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PAIN VS SOLUTION TABS (Velike koristi za vse) */}
      <section id="prednosti" className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("tabsTitle")}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
            {t("tabsSubtitle")}
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-100 dark:bg-[#0f172a] rounded-2xl max-w-md mx-auto mb-10 border border-slate-200/50 dark:border-slate-800">
          <button
            onClick={() => setActiveTab(1)}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === 1 
                ? "bg-white dark:bg-[#1B3A6B] text-[#1B3A6B] dark:text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {t("tab1Label")}
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === 2 
                ? "bg-white dark:bg-[#1B3A6B] text-[#1B3A6B] dark:text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {t("tab2Label")}
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === 3 
                ? "bg-white dark:bg-[#1B3A6B] text-[#1B3A6B] dark:text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {t("tab3Label")}
          </button>
        </div>

        {/* Tab Content comparison panels */}
        <div 
          onMouseMove={handleCardMouseMove}
          className="spotlight-card bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-md p-6 sm:p-10 transition-all duration-300"
        >
          {activeTab === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* Pain */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/5 border border-red-100/50 dark:border-red-950/20 text-xs font-semibold text-red-800 dark:text-red-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✕</span>
                    {t("tab1Pain1")}
                  </div>
                  <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/5 border border-red-100/50 dark:border-red-950/20 text-xs font-semibold text-red-800 dark:text-red-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✕</span>
                    {t("tab1Pain2")}
                  </div>
                  <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/5 border border-red-100/50 dark:border-red-950/20 text-xs font-semibold text-red-800 dark:text-red-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✕</span>
                    {t("tab1Pain3")}
                  </div>
                </div>

                {/* Solution */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-green-50/50 dark:bg-green-950/5 border border-green-100/50 dark:border-green-950/20 text-xs font-semibold text-green-800 dark:text-green-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-950 text-green-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                    {t("tab1Sol1")}
                  </div>
                  <div className="p-4 rounded-2xl bg-green-50/50 dark:bg-green-950/5 border border-green-100/50 dark:border-green-950/20 text-xs font-semibold text-green-800 dark:text-green-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-950 text-green-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                    {t("tab1Sol2")}
                  </div>
                  <div className="p-4 rounded-2xl bg-green-50/50 dark:bg-green-950/5 border border-green-100/50 dark:border-green-950/20 text-xs font-semibold text-green-800 dark:text-green-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-950 text-green-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                    {t("tab1Sol3")}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* Pain */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/5 border border-red-100/50 dark:border-red-950/20 text-xs font-semibold text-red-800 dark:text-red-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✕</span>
                    {t("tab2Pain1")}
                  </div>
                  <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/5 border border-red-100/50 dark:border-red-950/20 text-xs font-semibold text-red-800 dark:text-red-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✕</span>
                    {t("tab2Pain2")}
                  </div>
                  <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/5 border border-red-100/50 dark:border-red-950/20 text-xs font-semibold text-red-800 dark:text-red-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✕</span>
                    {t("tab2Pain3")}
                  </div>
                </div>

                {/* Solution */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-green-50/50 dark:bg-green-950/5 border border-green-100/50 dark:border-green-950/20 text-xs font-semibold text-green-800 dark:text-green-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-950 text-green-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                    {t("tab2Sol1")}
                  </div>
                  <div className="p-4 rounded-2xl bg-green-50/50 dark:bg-green-950/5 border border-green-100/50 dark:border-green-950/20 text-xs font-semibold text-green-800 dark:text-green-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-950 text-green-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                    {t("tab2Sol2")}
                  </div>
                  <div className="p-4 rounded-2xl bg-green-50/50 dark:bg-green-950/5 border border-green-100/50 dark:border-green-950/20 text-xs font-semibold text-green-800 dark:text-green-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-950 text-green-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                    {t("tab2Sol3")}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* Pain */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/5 border border-red-100/50 dark:border-red-950/20 text-xs font-semibold text-red-800 dark:text-red-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✕</span>
                    {t("tab3Pain1")}
                  </div>
                  <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/5 border border-red-100/50 dark:border-red-950/20 text-xs font-semibold text-red-800 dark:text-red-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✕</span>
                    {t("tab3Pain2")}
                  </div>
                  <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/5 border border-red-100/50 dark:border-red-950/20 text-xs font-semibold text-red-800 dark:text-red-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✕</span>
                    {t("tab3Pain3")}
                  </div>
                </div>

                {/* Solution */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-green-50/50 dark:bg-green-950/5 border border-green-100/50 dark:border-green-950/20 text-xs font-semibold text-green-800 dark:text-green-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-950 text-green-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                    {t("tab3Sol1")}
                  </div>
                  <div className="p-4 rounded-2xl bg-green-50/50 dark:bg-green-950/5 border border-green-100/50 dark:border-green-950/20 text-xs font-semibold text-green-800 dark:text-green-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-950 text-green-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                    {t("tab3Sol2")}
                  </div>
                  <div className="p-4 rounded-2xl bg-green-50/50 dark:bg-green-950/5 border border-green-100/50 dark:border-green-950/20 text-xs font-semibold text-green-800 dark:text-green-400 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-950 text-green-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                    {t("tab3Sol3")}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Highlighted Quote Statement */}
          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-[#1B3A6B] uppercase block mb-1">
              {t("tabQuoteTitle")}
            </span>
            <p className="text-xl font-black text-[#1B3A6B] dark:text-[#38bdf8] italic">
              &ldquo;{t("tabQuoteText")}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* 6. PROCESS TIMELINE (Kako poteka) */}
      <section id="kako-deluje" className="py-20 bg-slate-100/50 dark:bg-[#0c111d] border-y border-slate-200/50 dark:border-slate-800 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t("timelineTitle")}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
              {t("timelineSubtitle")}
            </p>
          </div>

          {/* Timeline steps */}
          <div className="relative border-l border-[#1B3A6B] dark:border-[#38bdf8] ml-4 md:ml-32 space-y-12 pb-2">
            
            {/* Step 1 */}
            <div className="relative pl-8 md:pl-12">
              <span className="absolute -left-4.5 top-0 w-9 h-9 rounded-full bg-[#1B3A6B] text-white font-extrabold text-sm flex items-center justify-center border-4 border-slate-100 dark:border-[#0c111d]">
                01
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t("timelineStep1Title")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
                {t("timelineStep1Desc")}
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative pl-8 md:pl-12">
              <span className="absolute -left-4.5 top-0 w-9 h-9 rounded-full bg-[#1B3A6B] text-white font-extrabold text-sm flex items-center justify-center border-4 border-slate-100 dark:border-[#0c111d]">
                02
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t("timelineStep2Title")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
                {t("timelineStep2Desc")}
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative pl-8 md:pl-12">
              <span className="absolute -left-4.5 top-0 w-9 h-9 rounded-full bg-[#1B3A6B] text-white font-extrabold text-sm flex items-center justify-center border-4 border-slate-100 dark:border-[#0c111d]">
                03
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t("timelineStep3Title")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
                {t("timelineStep3Desc")}
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative pl-8 md:pl-12">
              <span className="absolute -left-4.5 top-0 w-9 h-9 rounded-full bg-[#1B3A6B] text-white font-extrabold text-sm flex items-center justify-center border-4 border-slate-100 dark:border-[#0c111d]">
                04
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t("timelineStep4Title")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
                {t("timelineStep4Desc")}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FEATURES SHOWCASE SLIDER (Carousels) */}
      <section id="funkcionalnosti" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("showcaseTitle")}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
            {t("showcaseSubtitle")}
          </p>
        </div>

        {/* Carousel selector */}
        <div className="grid grid-cols-3 gap-2 max-w-2xl mx-auto mb-10">
          <button 
            onClick={() => setActiveSlide(0)}
            className={`p-3 rounded-2xl border text-center transition-all ${
              activeSlide === 0 
                ? "bg-white dark:bg-[#1B3A6B] border-[#1B3A6B] dark:border-transparent text-[#1B3A6B] dark:text-white shadow-md font-bold" 
                : "bg-slate-50 dark:bg-[#0f172a]/40 border-slate-200/60 dark:border-slate-800 text-slate-500"
            }`}
          >
            <Calendar className="w-5 h-5 mx-auto mb-1.5" />
            <span className="text-[11px] block">{t("showcaseSlide1Label")}</span>
          </button>
          <button 
            onClick={() => setActiveSlide(1)}
            className={`p-3 rounded-2xl border text-center transition-all ${
              activeSlide === 1 
                ? "bg-white dark:bg-[#1B3A6B] border-[#1B3A6B] dark:border-transparent text-[#1B3A6B] dark:text-white shadow-md font-bold" 
                : "bg-slate-50 dark:bg-[#0f172a]/40 border-slate-200/60 dark:border-slate-800 text-slate-500"
            }`}
          >
            <Mic className="w-5 h-5 mx-auto mb-1.5" />
            <span className="text-[11px] block">{t("showcaseSlide2Label")}</span>
          </button>
          <button 
            onClick={() => setActiveSlide(2)}
            className={`p-3 rounded-2xl border text-center transition-all ${
              activeSlide === 2 
                ? "bg-white dark:bg-[#1B3A6B] border-[#1B3A6B] dark:border-transparent text-[#1B3A6B] dark:text-white shadow-md font-bold" 
                : "bg-slate-50 dark:bg-[#0f172a]/40 border-slate-200/60 dark:border-slate-800 text-slate-500"
            }`}
          >
            <Layers className="w-5 h-5 mx-auto mb-1.5" />
            <span className="text-[11px] block">{t("showcaseSlide3Label")}</span>
          </button>
        </div>

        {/* Carousel Content Cards */}
        <div 
          onMouseMove={handleCardMouseMove}
          className="spotlight-card bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg p-6 sm:p-10 min-h-[380px] flex flex-col justify-center relative overflow-hidden"
        >
          
          {/* SLIDE 0: Daily Card */}
          {activeSlide === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-50 text-[#1B3A6B] uppercase">MODUL 1</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">{t("showcaseSlide1Title")}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t("showcaseSlide1Desc")}
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1B3A6B]">
                  {t("showcaseSlide1Link")} <ChevronRight className="w-4 h-4" />
                </div>
              </div>
              {/* Visual Mock */}
              <div className="bg-slate-50 dark:bg-[#0c111d] rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-inner">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/50">
                  <div className="font-bold text-xs">{t("showcaseSlide1CardTitle")}</div>
                  <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">{t("showcaseSlide1CardStatus")}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs bg-white dark:bg-[#151c2c] p-2.5 rounded-lg border border-slate-100">
                    <span className="w-4 h-4 bg-green-500 rounded-full text-white flex items-center justify-center text-[10px]">✓</span>
                    <span>{t("showcaseSlide1CardItem1")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs bg-white dark:bg-[#151c2c] p-2.5 rounded-lg border border-slate-100">
                    <span className="w-4 h-4 bg-green-500 rounded-full text-white flex items-center justify-center text-[10px]">✓</span>
                    <span>{t("showcaseSlide1CardItem2")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs bg-white dark:bg-[#151c2c] p-2.5 rounded-lg border border-slate-100">
                    <span className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />
                    <span className="font-bold">{t("showcaseSlide1CardItem3")}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 1: Voice transcribing */}
          {activeSlide === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-50 text-[#1B3A6B] uppercase">MODUL 2</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">{t("showcaseSlide2Title")}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t("showcaseSlide2Desc")}
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1B3A6B]">
                  {t("showcaseSlide2Link")} <ChevronRight className="w-4 h-4" />
                </div>
              </div>
              {/* Visual Mock */}
              <div className="bg-emerald-50/30 dark:bg-[#0c111d] rounded-2xl border border-emerald-100/50 dark:border-emerald-950/40 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Mic className="w-5 h-5 text-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">{t("showcaseSlide2CardLabel")}</span>
                </div>
                <div className="bg-white dark:bg-[#151c2c] p-4 rounded-xl border border-slate-100 shadow-sm text-xs space-y-2">
                  <div className="text-slate-400 font-semibold">{t("showcaseSlide2CardTime")}</div>
                  <p className="italic text-slate-800 dark:text-slate-200">
                    &ldquo;{t("showcaseSlide2CardText")}&rdquo;
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> {t("showcaseSlide2CardStatus")}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: Task Checklist Manager */}
          {activeSlide === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-50 text-[#1B3A6B] uppercase">MODUL 3</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">{t("showcaseSlide3Title")}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t("showcaseSlide3Desc")}
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1B3A6B]">
                  {t("showcaseSlide3Link")} <ChevronRight className="w-4 h-4" />
                </div>
              </div>
              {/* Visual Mock */}
              <div className="bg-slate-50 dark:bg-[#0c111d] rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-inner">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-xs font-bold">{t("showcaseSlide3CardTitle")}</span>
                  <span className="text-[10px] text-[#1B3A6B] font-bold hover:underline cursor-pointer">{t("showcaseSlide3CardSave")}</span>
                </div>
                <div className="space-y-2">
                  <div className="bg-white dark:bg-[#151c2c] p-2.5 rounded-lg border border-slate-100 flex items-center justify-between text-xs cursor-move hover:border-[#1B3A6B]">
                    <span>{t("showcaseSlide3CardItem1")}</span>
                    <span className="text-slate-300">☰</span>
                  </div>
                  <div className="bg-white dark:bg-[#151c2c] p-2.5 rounded-lg border border-slate-100 flex items-center justify-between text-xs cursor-move hover:border-[#1B3A6B]">
                    <span>{t("showcaseSlide3CardItem2")}</span>
                    <span className="text-slate-300">☰</span>
                  </div>
                  <div className="bg-[#1B3A6B]/5 border border-[#1B3A6B]/20 p-2.5 rounded-lg flex items-center justify-between text-xs cursor-move font-semibold text-[#1B3A6B]">
                    <span>{t("showcaseSlide3CardItem3")}</span>
                    <span className="text-slate-300">☰</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 8. PRICING SECTION (Apple-inspired clean card) */}
      <section id="cenik" className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("priceTitle")}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
            {t("priceSubtitle")}
          </p>
        </div>

        {/* Pricing Card: Clean Apple-inspired style, NO gradients */}
        <div 
          onMouseMove={handleCardMouseMove}
          className="spotlight-card bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl max-w-md mx-auto p-8 relative overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1"
        >
          
          <div className="text-center pb-6 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold tracking-widest text-[#1B3A6B] uppercase bg-[#1B3A6B]/5 dark:bg-[#1B3A6B]/10 px-3 py-1.5 rounded-full">
              {t("priceCardBadge")}
            </span>
            <div className="mt-5 flex items-baseline justify-center gap-1">
              <span className="text-5xl font-black text-slate-900 dark:text-white">59 €</span>
              <span className="text-slate-400 font-bold text-sm">{t("priceCardUnit")}</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold mt-2.5">
              {t("priceCardSub")}
            </p>
          </div>

          <div className="py-6 space-y-3.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
              {t("priceFeatureHeader")}
            </span>
            
            {[
              t("priceFeature1"),
              t("priceFeature2"),
              t("priceFeature3"),
              t("priceFeature4"),
              t("priceFeature5"),
              t("priceFeature6"),
              t("priceFeature7"),
              t("priceFeature8")
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span className="w-5 h-5 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link href="/register">
              <Button className="w-full h-12 rounded-xl bg-[#1B3A6B] hover:bg-[#142c52] text-white font-bold text-sm shadow-md transition-all">
                {t("priceCta")}
              </Button>
            </Link>
            
            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
              <span>{t("priceTrust1")}</span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
              <span>{t("priceTrust2")}</span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
              <span>{t("priceTrust3")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA BANNER (Unified #1B3A6B card) */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <div className="bg-[#1B3A6B] rounded-[32px] text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-xl">
          {/* Subtle glow inside banner */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-900/30 rounded-full blur-3xl pointer-events-none" />

          <span className="text-[10px] font-bold tracking-widest text-blue-200 uppercase bg-white/10 px-3 py-1.5 rounded-full mb-6 inline-block">
            {t("navDemoBtn").toUpperCase()}
          </span>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto leading-tight relative z-10">
            {t("ctaTitle")}
          </h2>

          <p className="text-sm text-blue-100 mt-4 max-w-lg mx-auto leading-relaxed relative z-10">
            {t("ctaSubtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8 w-full sm:w-auto relative z-10">
            <Link href="/register" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-12 px-8 rounded-xl bg-white hover:bg-slate-100 text-[#1B3A6B] font-bold text-sm shadow-md transition-all">
                {t("heroCtaMain")}
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-xl border-white/20 text-white hover:bg-white/10 font-bold text-sm gap-2">
                {t("heroCtaSub")} <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-white dark:bg-[#0c111d] border-t border-slate-200/50 dark:border-slate-800 py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo className="h-7 w-auto" />
          
          <p className="text-xs text-slate-400 font-semibold text-center md:text-left order-3 md:order-2">
            {t("footerRights")}
          </p>

          <div className="flex items-center gap-6 text-xs font-bold text-slate-500 dark:text-slate-400 order-2 md:order-3">
            <a href="#" className="hover:text-[#1B3A6B] transition-colors">{t("footerPrivacy")}</a>
            <a href="#" className="hover:text-[#1B3A6B] transition-colors">{t("footerTerms")}</a>
            <a href="#" className="hover:text-[#1B3A6B] transition-colors">{t("footerContact")}</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
