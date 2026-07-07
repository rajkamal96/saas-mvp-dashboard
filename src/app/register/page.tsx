"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";
import Link from "next/link";

export default function RegisterPage() {
  const { t } = useLanguage();
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/office");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b0f19] px-4 py-12 relative overflow-hidden font-sans text-slate-800 dark:text-slate-100">
      
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="aura-bg-blob-one absolute top-[5%] left-[-15%] w-[40rem] h-[40rem] rounded-full bg-blue-200/20 blur-[8rem]" />
        <div className="aura-bg-blob-two absolute bottom-[5%] right-[-15%] w-[45rem] h-[45rem] rounded-full bg-sky-200/18 blur-[9rem]" />
      </div>

      {/* Dots Grid overlay */}
      <div 
        className="aura-bg-dots pointer-events-none absolute inset-0 z-0 opacity-[0.04] bg-repeat" 
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.15) 1px, transparent 0)",
          backgroundSize: "2rem 2rem"
        }}
      />

      {/* Main Glass Card container */}
      <div className="relative z-10 w-full max-w-md rounded-[2.5rem] bg-white/75 backdrop-blur-2xl border border-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.3),inset_0_2px_0_white] p-8 sm:p-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="flex items-center gap-3 group mb-6">
            <span className="w-10 h-10 rounded-full bg-gradient-to-b from-white to-slate-50 border border-slate-200 shadow-[0_2px_6px_rgba(15,23,42,0.05)] flex items-center justify-center">
              <span className="font-['JetBrains_Mono',monospace] text-xs font-semibold text-[#1B3A6B]">DN</span>
            </span>
            <span className="font-['JetBrains_Mono',monospace] text-base font-semibold tracking-[-0.08em] text-slate-950">
              Dnevnik.app
            </span>
          </Link>
          <h2 className="text-2xl font-light tracking-tight text-slate-950">
            {t("authRegisterTitle")}
          </h2>
          <p className="text-xs text-slate-500 font-light mt-1 text-center leading-relaxed">
            {t("authRegisterSubtitle")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block font-['JetBrains_Mono',monospace] text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
              {t("authCompanyName")}
            </label>
            <input
              type="text"
              placeholder={t("authCompanyNamePlaceholder")}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/80 text-xs text-slate-800 focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] transition-all"
            />
          </div>

          <div>
            <label className="block font-['JetBrains_Mono',monospace] text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
              {t("authFullName")}
            </label>
            <input
              type="text"
              placeholder={t("authFullNamePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/80 text-xs text-slate-800 focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] transition-all"
            />
          </div>

          <div>
            <label className="block font-['JetBrains_Mono',monospace] text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
              {t("authEmailLabel")}
            </label>
            <input
              type="email"
              placeholder={t("authEmailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/80 text-xs text-slate-800 focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] transition-all"
            />
          </div>

          <div>
            <label className="block font-['JetBrains_Mono',monospace] text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
              {t("authPasswordLabel")}
            </label>
            <input
              type="password"
              placeholder={t("authPassPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/80 text-xs text-slate-800 focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] transition-all"
            />
          </div>

          <div className="flex items-start gap-2.5 py-1">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1 rounded border-slate-200 text-[#1B3A6B] focus:ring-[#1B3A6B] h-4 w-4 shrink-0"
            />
            <label htmlFor="terms" className="text-[10px] text-slate-500 leading-normal">
              {t("authAgreeTerms")}
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-gradient-to-b from-[#1B3A6B] to-[#12274b] border border-[#0d1e3a] text-white text-xs font-semibold shadow-[0_8px_20px_rgba(27,58,107,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] hover:from-[#234882] hover:to-[#1a3867] hover:-translate-y-0.5 transition-all duration-300 mt-2"
          >
            {t("authRegisterBtn")}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 font-light">
            {t("authHasAccount")}{" "}
            <Link
              href="/login"
              className="text-[#1B3A6B] font-semibold hover:underline"
            >
              {t("authLoginBtn")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
