"use client";

import React from "react";
import { useLanguage } from "@/lib/useLanguage";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="max-w-7xl mx-auto px-6 pb-12 pt-20 mt-auto border-t border-slate-100">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand/Credits */}
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-gradient-to-b from-white to-slate-50 border border-slate-200 flex items-center justify-center shadow-[0_2px_4px_rgba(15,23,42,0.03)]">
            <span className="font-['JetBrains_Mono',monospace] text-[10px] font-semibold text-[#1B3A6B]">DN</span>
          </span>
          <p className="text-xs text-slate-400 font-light">
            {t("footerRights")}
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 text-xs text-slate-400 font-light">
          <a href="#" className="hover:text-[#1B3A6B] transition-colors">
            {t("footerTerms")}
          </a>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <a href="#" className="hover:text-[#1B3A6B] transition-colors">
            {t("footerPrivacy")}
          </a>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <a href="#" className="hover:text-[#1B3A6B] transition-colors">
            {t("footerContact")}
          </a>
        </div>
      </div>
    </footer>
  );
}
