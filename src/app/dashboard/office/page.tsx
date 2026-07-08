"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/lib/useLanguage";
import {
  initialWorkers,
  initialOrders,
  initialMessages,
  Worker,
  Order,
  Message
} from "@/lib/mockData";
import { Check, Mic, MessageSquare, LogOut, Plus, X } from "lucide-react";
import { SummaryCard, OverviewRow, UrgentRow } from "@/components/dashboard/SummaryCard";
import { WorkerCard } from "@/components/dashboard/WorkerCard";
import { OfficeCard } from "@/components/dashboard/OfficeCard";
import { CommunicationCard } from "@/components/dashboard/CommunicationCard";
import { WorkerDetailModal } from "@/components/dashboard/WorkerDetailModal";

export default function OfficeDashboard() {
  const { t } = useLanguage();
  const router = useRouter();

  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [isWorkerDetailOpen, setIsWorkerDetailOpen] = useState(false);

  const handleToggleTask = (workerId: string, taskId: string) => {
    setWorkers(prev => prev.map(w => {
      if (w.id !== workerId) return w;
      return {
        ...w,
        tasks: w.tasks.map(t =>
          t.id === taskId
            ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" }) : undefined }
            : t
        ),
      };
    }));
  };

  const handleApprove = (orderId: string) =>
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "potrjeno" } : o));
  const handleDecline = (orderId: string) =>
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "zavrnjeno" } : o));
  const handleDismissOrder = (orderId: string) =>
    setOrders(prev => prev.filter(o => o.id !== orderId));

  const handleResolveMessage = (messageId: string) =>
    setMessages(prev => prev.filter(m => m.id !== messageId));

  const handleDismissMessage = (messageId: string) =>
    setMessages(prev => prev.filter(m => m.id !== messageId));

  const handleArchiveMessage = (messageId: string) =>
    setMessages(prev => prev.filter(m => m.id !== messageId));

  return (
    <div className="min-h-screen bg-[#f3f5f8] font-sans text-slate-800">

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/84 backdrop-blur-2xl border-b border-white/90 shadow-[0_14px_38px_-22px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,1)] h-16 flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <Logo className="h-7 w-auto" />
          <span className="h-4 w-px bg-slate-200 hidden sm:inline" />
          <span className="text-xs font-semibold text-slate-600 hidden sm:inline">{t("dashDate")}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs font-bold text-slate-900">{t("dashTitleMN")}</span>
            <span className="text-[10px] text-slate-400">{t("dashRoleMN")}</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-[0_4px_12px_rgba(59,130,246,0.35)]">MN</div>
          <button onClick={() => router.push("/")} className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* ── Top summary cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* HITRI PREGLED */}
          <SummaryCard title="HITRI PREGLED">
            <div className="space-y-[25px]">
              {workers.map(w => {
                const done = w.tasks.filter(t => t.completed).length;
                const total = w.tasks.length;
                return (
                  <OverviewRow
                    key={w.id}
                    progress={`${done}/${total}`}
                    task={w.currentTask}
                    location={w.location ?? "Ljubljana"}
                    name={w.name}
                  />
                );
              })}
            </div>
          </SummaryCard>

          {/* NUJNE ZADEVE */}
          <SummaryCard title="NUJNE ZADEVE" dark>
            <div className="space-y-[23px]">
              {orders.map(o => (
                <UrgentRow
                  key={o.id}
                  time={o.time}
                  title={o.title}
                  subtitle={o.description || undefined}
                />
              ))}
            </div>
          </SummaryCard>

        </div>

        {/* ── Three Aura-styled columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* COLUMN 1 — DANES TEREN (Aura light card + WorkerCards inside) */}
          <article className="group bg-white/70 rounded-[2rem] border border-white shadow-[0_18px_44px_-28px_rgba(15,23,42,0.34),inset_0_1px_0_white] overflow-hidden hover:bg-white/88 hover:-translate-y-1 transition-all duration-300">
            {/* Visual panel */}
            <div className="relative isolate mx-4 mt-4 rounded-[1.5rem] overflow-hidden bg-gradient-to-b from-white to-slate-100 border border-white shadow-[0_18px_42px_-30px_rgba(15,23,42,0.28),inset_0_1px_0_white] [clip-path:inset(0_round_1.5rem)]">
              <div className="absolute inset-0 z-0 opacity-[0.16]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0)", backgroundSize: "1.5rem 1.5rem" }} />
              <div className="absolute top-[-35%] right-[-20%] z-0 w-[10rem] h-[10rem] rounded-full bg-blue-200/55 blur-[4rem] pointer-events-none" />
              <div className="relative z-10 p-4 space-y-3">
                {/* Panel header */}
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] text-slate-400">DANES — TEREN</span>
                  <button className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-[0_2px_6px_rgba(15,23,42,0.06)] cursor-pointer hover:bg-slate-50 transition-colors">
                    <Plus className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                </div>
                {/* WorkerCards */}
                {workers.map((w, idx) => (
                  <WorkerCard
                    key={w.id}
                    worker={w}
                    onToggleTask={handleToggleTask}
                    date="23/05/26"
                    orderId={`#${480 + idx + 1}`}
                    onClick={() => {
                      setSelectedWorker(w);
                      setIsWorkerDetailOpen(true);
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Card footer */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <h3 className="text-xl font-normal tracking-tight text-slate-950">Danes — Teren</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500 font-light">Pregled vseh terenskih delavcev, njihovih nalog in trenutnega statusa v živo.</p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1.5 text-[11px] text-blue-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />{workers.filter(w => w.status === "v_teku").length} aktivnih delavcev
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* COLUMN 2 — DANES PISARNA (Aura light card, same as column 1, containing beige OfficeCards) */}
          <article className="group bg-white/70 rounded-[2rem] border border-white shadow-[0_18px_44px_-28px_rgba(15,23,42,0.34),inset_0_1px_0_white] overflow-hidden hover:bg-white/88 hover:-translate-y-1 transition-all duration-300">
            {/* Visual panel */}
            <div className="relative isolate mx-4 mt-4 rounded-[1.5rem] overflow-hidden bg-gradient-to-b from-white to-slate-100 border border-white shadow-[0_18px_42px_-30px_rgba(15,23,42,0.28),inset_0_1px_0_white] [clip-path:inset(0_round_1.5rem)]">
              <div className="absolute inset-0 z-0 opacity-[0.16]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0)", backgroundSize: "1.5rem 1.5rem" }} />
              <div className="absolute top-[-35%] right-[-20%] z-0 w-[10rem] h-[10rem] rounded-full bg-blue-200/55 blur-[4rem] pointer-events-none" />
              <div className="relative z-10 p-4 space-y-3">
                {/* Panel header */}
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] text-slate-400">DANES — PISARNA</span>
                  <button className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-[0_2px_6px_rgba(15,23,42,0.06)] cursor-pointer hover:bg-slate-50 transition-colors">
                    <Plus className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                </div>
                {/* OfficeCards */}
                {orders.map(o => (
                  <OfficeCard
                    key={o.id}
                    order={o}
                    onApprove={() => handleApprove(o.id)}
                    onDecline={() => handleDecline(o.id)}
                    onDismiss={() => handleDismissOrder(o.id)}
                    onCall={() => alert(`Klicanje: ${o.workerName}`)}
                  />
                ))}
              </div>
            </div>
            {/* Card footer */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>
                </div>
                <div>
                  <h3 className="text-xl font-normal tracking-tight text-slate-950">Danes — Pisarna</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500 font-light">Nalogi in akcije za danes. Potrjujte, zavračajte in usmerjajte ekipo iz ene točke.</p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1.5 text-[11px] text-blue-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />{orders.filter(o => o.status === "caka_potrditev").length} čaka potrditev
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* COLUMN 3 — KOMUNIKACIJA (Aura featured blue, swapped color from column 2) */}
          <article className="group relative bg-gradient-to-b from-blue-400 to-blue-600 rounded-[2rem] border border-blue-700 shadow-[0_24px_60px_-30px_rgba(59,130,246,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] overflow-hidden hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-[-35%] right-[-20%] w-[18rem] h-[18rem] rounded-full bg-white/25 blur-[4rem] pointer-events-none" />
            <div className="absolute bottom-[-40%] left-[-25%] w-[16rem] h-[16rem] rounded-full bg-sky-200/20 blur-[4rem] pointer-events-none" />
            {/* Visual panel */}
            <div className="relative mx-4 mt-4 rounded-[1.5rem] overflow-hidden bg-gradient-to-b from-blue-400 to-blue-600 border border-blue-700 shadow-[0_18px_42px_-24px_rgba(59,130,246,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] min-h-[14rem]">
              <div className="absolute top-[-35%] right-[-20%] w-[14rem] h-[14rem] rounded-full bg-white/24 blur-[4rem] pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)", backgroundSize: "1.35rem 1.35rem" }} />
              <div className="relative z-10 p-4 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] text-blue-100">KOMUNIKACIJA</span>
                  <button className="w-7 h-7 rounded-lg bg-white/90 border border-white flex items-center justify-center shadow-[0_4px_8px_-4px_rgba(15,23,42,0.25)] cursor-pointer hover:bg-white transition-colors">
                    <Plus className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
                {messages.slice(0, 3).map(m => (
                  <CommunicationCard
                    key={m.id}
                    message={m}
                    onResolve={() => handleResolveMessage(m.id)}
                    onDismiss={() => handleDismissMessage(m.id)}
                    onAttachmentClick={() => alert(`Showing attachments for message from ${m.workerName}`)}
                    onArchive={() => handleArchiveMessage(m.id)}
                  />
                ))}
              </div>
            </div>
            {/* Card footer */}
            <div className="relative p-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-normal tracking-tight text-white">Komunikacija</h3>
                  <p className="mt-2 text-sm leading-6 text-blue-100 font-light">Glasovna sporočila, AI prepis in vse terenske posodobitve na enem mestu.</p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3 py-1.5 text-[11px] text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />{messages.length} novih sporočil
                  </div>
                </div>
              </div>
            </div>
          </article>

        </div>
      </div>
      <WorkerDetailModal
        isOpen={isWorkerDetailOpen}
        onOpenChange={setIsWorkerDetailOpen}
        worker={selectedWorker}
      />
    </div>
  );
}
