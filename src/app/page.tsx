"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TargetIndustries } from "@/components/landing/TargetIndustries";
import { BenefitCards } from "@/components/landing/BenefitCards";
import { PainSolutions } from "@/components/landing/PainSolutions";
import { Timeline } from "@/components/landing/Timeline";
import { FeatureCarousel } from "@/components/landing/FeatureCarousel";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  // Lerp Mouse Trail Effect for Liquid Cursor Glow
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

  // Load UnicornStudio for WebGL fluid/liquid shader background
  useEffect(() => {
    const initUnicorn = () => {
      const windowObj = window as any;
      if (windowObj.UnicornStudio) {
        try {
          windowObj.UnicornStudio.init();
        } catch (e) {
          console.error("UnicornStudio init failed:", e);
        }
      } else {
        windowObj.UnicornStudio = { isInitialized: false };
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
        script.onload = () => {
          try {
            windowObj.UnicornStudio.init();
            windowObj.UnicornStudio.isInitialized = true;
          } catch (e) {
            console.error("UnicornStudio init failed on load:", e);
          }
        };
        document.head.appendChild(script);
      }
    };

    // Initialize with a short timeout to ensure the DOM has fully painted the data-us element
    const timer = setTimeout(initUnicorn, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-100 overflow-x-hidden selection:bg-[#1B3A6B]/10 selection:text-[#1B3A6B] relative bg-transparent">
      
      {/* Solid background base */}
      <div className="fixed inset-0 -z-20 bg-slate-50 dark:bg-[#0b0f19] pointer-events-none" />

      {/* Unicorn Studio Liquid Background Effect */}
      <div 
        className="aura-background-component fixed top-0 w-full h-screen -z-10 opacity-80" 
        data-alpha-mask="80" 
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)"
        }}
      >
        <div className="aura-background-component top-0 w-full -z-10 absolute h-full">
          <div data-us-project="ty3N7ZPaIU7KlWixQFIc" className="absolute w-full h-full left-0 top-0 -z-10" />
        </div>
      </div>

      {/* Liquid cursor glow element */}
      <div 
        id="aura-liquid-glow" 
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-30 mix-blend-screen dark:mix-blend-lighten blur-[85px] opacity-0 md:opacity-75 transition-opacity duration-1000"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(99, 102, 241, 0.08) 40%, rgba(27, 58, 107, 0.02) 80%, transparent 100%)",
          transform: "translate3d(-9999px, -9999px, 0)",
        }}
      />

      {/* Ambient background glow blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Soft blue ambient glow */}
        <div className="aura-bg-blob-one absolute top-[-12%] left-[-12%] w-[52vw] h-[52vw] rounded-full bg-blue-200/35 blur-[7.5rem] will-change-transform" />
      
        {/* Soft sky/silver glow */}
        <div className="aura-bg-blob-two absolute bottom-[-18%] right-[-10%] w-[62vw] h-[62vw] rounded-full bg-sky-200/22 blur-[8.75rem] will-change-transform" />
      
        {/* White glassy light wash */}
        <div className="aura-bg-blob-three absolute top-[36%] left-[36%] w-[30vw] h-[30vw] rounded-full bg-white/55 blur-[5rem] will-change-transform" />
      
        {/* Subtle moving dot texture */}
        <div 
          className="aura-bg-dots absolute inset-0 opacity-[0.22] bg-repeat" 
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.09) 1px, transparent 0)",
            backgroundSize: "2rem 2rem"
          }}
        />
      </div>

      {/* Landing Content Blocks */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <TargetIndustries />
        <BenefitCards />
        <PainSolutions />
        <Timeline />
        <FeatureCarousel />
        <Pricing />
        <Footer />
      </div>
    </div>
  );
}
