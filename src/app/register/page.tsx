"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b0f19] px-4 py-12 relative overflow-hidden font-sans">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/40 dark:bg-blue-950/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-md bg-white dark:bg-[#0f172a] rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 sm:p-10 relative">
        <div className="flex flex-col items-center mb-6">
          <Link href="/">
            <Logo className="h-10 w-auto" />
          </Link>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-6">
            {t("authRegisterTitle")}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 text-center">
            {t("authRegisterSubtitle")}
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              {t("authCompanyName")}
            </label>
            <Input
              type="text"
              placeholder={t("authCompanyNamePlaceholder")}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-[#1B3A6B] focus:border-[#1B3A6B] bg-slate-50 dark:bg-[#151c2c]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              {t("authFullName")}
            </label>
            <Input
              type="text"
              placeholder={t("authFullNamePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-[#1B3A6B] focus:border-[#1B3A6B] bg-slate-50 dark:bg-[#151c2c]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              {t("authEmailLabel")}
            </label>
            <Input
              type="email"
              placeholder={t("authEmailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-[#1B3A6B] focus:border-[#1B3A6B] bg-slate-50 dark:bg-[#151c2c]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              {t("authPasswordLabel")}
            </label>
            <Input
              type="password"
              placeholder={t("authPassPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-[#1B3A6B] focus:border-[#1B3A6B] bg-slate-50 dark:bg-[#151c2c]"
            />
          </div>

          <div className="flex items-start gap-2.5 py-1">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1 rounded border-slate-300 dark:border-slate-800 text-[#1B3A6B] focus:ring-[#1B3A6B] h-4 w-4"
            />
            <label htmlFor="terms" className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              {t("authAgreeTerms")}
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#1B3A6B] hover:bg-[#142c52] text-white font-medium text-sm transition-all mt-2"
          >
            {t("authRegisterBtn")}
          </Button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t("authHasAccount")}{" "}
            <Link
              href="/login"
              className="text-[#1B3A6B] dark:text-[#38bdf8] font-semibold hover:underline"
            >
              {t("authLoginBtn")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
