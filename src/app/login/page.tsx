"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b0f19] px-4 py-12 relative overflow-hidden font-sans">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/40 dark:bg-blue-950/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-md bg-white dark:bg-[#0f172a] rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 sm:p-10 relative">
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <Logo className="h-10 w-auto" />
          </Link>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-6">
            {t("authLoginTitle")}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 text-center">
            {t("authLoginSubtitle")}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              {t("authEmailLabel")}
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-[#1B3A6B] focus:border-[#1B3A6B] bg-slate-50 dark:bg-[#151c2c]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {t("authPasswordLabel")}
              </label>
              <a
                href="#"
                className="text-xs text-[#1B3A6B] dark:text-[#38bdf8] hover:underline"
              >
                {t("authForgotPassword")}
              </a>
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-[#1B3A6B] focus:border-[#1B3A6B] bg-slate-50 dark:bg-[#151c2c]"
            />
          </div>

          {/* Role selector to mock office/worker flow */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
              {t("authDemoRoleLabel")}
            </label>
            <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 dark:bg-[#151c2c] rounded-xl">
              <button
                type="button"
                onClick={() => setRole("office")}
                className={`py-2 px-3 text-xs font-medium rounded-lg transition-all ${
                  role === "office"
                    ? "bg-white dark:bg-[#1B3A6B] text-[#1B3A6B] dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                {t("authRoleOffice")}
              </button>
              <button
                type="button"
                onClick={() => setRole("worker")}
                className={`py-2 px-3 text-xs font-medium rounded-lg transition-all ${
                  role === "worker"
                    ? "bg-white dark:bg-[#1B3A6B] text-[#1B3A6B] dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                {t("authRoleWorker")}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#1B3A6B] hover:bg-[#142c52] text-white font-medium text-sm transition-all"
          >
            {t("authLoginBtn")}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t("authNoAccount")}{" "}
            <Link
              href="/register"
              className="text-[#1B3A6B] dark:text-[#38bdf8] font-semibold hover:underline"
            >
              {t("authCreateAccount")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
