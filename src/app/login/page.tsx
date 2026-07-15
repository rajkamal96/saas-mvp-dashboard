"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";
import Link from "next/link";

export default function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("info@podjetje.si");
  const [password, setPassword] = useState("••••••••");
  const [role, setRole] = useState<"office" | "worker">("office");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "office") {
      router.push("/dashboard/office");
    } else {
      router.push("/dashboard/worker");
    }
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
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-3 group mb-6">
            <span className="w-10 h-10 rounded-full bg-gradient-to-b from-white to-slate-100 border border-slate-200 shadow-[0_2px_6px_rgba(15,23,42,0.05)] flex items-center justify-center">
              <span className="font-['Inter',sans-serif] text-xs font-semibold text-[#1B3A6B]">PN</span>
            </span>
            <span className="font-['Inter',sans-serif] text-base font-semibold tracking-[-0.08em] text-slate-950">
              pomocnik.net
            </span>
          </Link>
          <h2 className="text-2xl font-light tracking-tight text-slate-950">
            {t("authLoginTitle")}
          </h2>
          <p className="text-xs text-slate-500 font-light mt-1.5 text-center leading-relaxed">
            {t("authLoginSubtitle")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-['Inter',sans-serif] text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
              {t("authEmailLabel")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/80 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-['Inter',sans-serif] text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                {t("authPasswordLabel")}
              </label>
              <a
                href="#"
                className="text-[10px] font-medium text-[#1B3A6B] hover:underline"
              >
                {t("authForgotPassword")}
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/80 text-xs text-slate-800 focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] transition-all"
            />
          </div>

          {/* Role selector to mock office/worker flow */}
          <div>
            <label className="block font-['Inter',sans-serif] text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2.5">
              {t("authDemoRoleLabel")}
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/50">
              <button
                type="button"
                onClick={() => setRole("office")}
                className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                  role === "office"
                    ? "bg-white text-[#1B3A6B] shadow-[0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_0_white]"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {t("authRoleOffice")}
              </button>
              <button
                type="button"
                onClick={() => setRole("worker")}
                className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                  role === "worker"
                    ? "bg-white text-[#1B3A6B] shadow-[0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_0_white]"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {t("authRoleWorker")}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-gradient-to-b from-[#1B3A6B] to-[#12274b] border border-[#0d1e3a] text-white text-xs font-semibold shadow-[0_8px_20px_rgba(27,58,107,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] hover:from-[#234882] hover:to-[#1a3867] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 mt-2"
          >
            {t("authLoginBtn")}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 font-light">
            {t("authNoAccount")}{" "}
            <Link
              href="/register"
              className="text-[#1B3A6B] font-semibold hover:underline"
            >
              {t("authCreateAccount")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
