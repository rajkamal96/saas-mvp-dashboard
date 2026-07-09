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

interface ColumnHeaderProps {
  title: string;
  onAddClick?: () => void;
}

function ColumnHeader({ title, onAddClick }: ColumnHeaderProps) {
  return (
    <div className="flex items-center justify-between pl-0 pr-6 mb-2">
      <span
        style={{
          fontFamily: "'PT Sans', sans-serif",
          fontWeight: 700,
          fontSize: "24px",
          lineHeight: "24px",
        }}
        className="text-slate-900"
      >
        {title}
      </span>
      <button
        onClick={onAddClick}
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.002)",
          border: "0.7px solid rgba(96, 165, 250, 0.5)",
          boxShadow: "0px 8px 18px -12px rgba(15, 23, 42, 0.35), inset 0px 1px 0px 1px #FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        className="hover:bg-slate-50/50 transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.9705 9.48535H9.48528M9.48528 9.48535H1M9.48528 9.48535V1.00007M9.48528 9.48535V17.9706"
            stroke="#6D778E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

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
    <div className="min-h-screen bg-[#f3f5f8] text-slate-800 dashboard-page">

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

      <div className="max-w-7xl mx-auto px-6" style={{ paddingTop: "32px" }}>

        {/* ── Dnevni pregled heading ── */}
        <h1
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "60px",
            lineHeight: "36px",
            letterSpacing: "-0.75px",
            color: "#0F172A",
            marginBottom: "42px",
            textAlign: "center",
          }}
        >
          Dnevni pregled
        </h1>

        {/* ── Top summary cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: "32px" }}>

          {/* HITRI PREGLED */}
          <SummaryCard title="HITRI PREGLED">
            <div className="flex flex-col gap-[4px]">
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
            <div className="flex flex-col gap-[6px]">
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

          {/* COLUMN 1 — DANES TEREN */}
          <div className="flex flex-col gap-3">
            {/* Column Header Row */}
            <ColumnHeader title="DANES — TEREN" />
            <div
              style={{
                background: "linear-gradient(180deg, rgba(96, 165, 250, 0.08) 0%, rgba(37, 99, 235, 0.08) 100%)",
                border: "1px solid #1D4ED8",
                boxShadow: "0px 24px 60px -30px rgba(59, 130, 246, 0.55), inset 0px 1px 0px 1px rgba(255, 255, 255, 0.35)",
                borderRadius: "32px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
              className="group hover:-translate-y-1 transition-all duration-300"
            >
              {workers.slice(0, 3).map((w, idx) => (
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

          {/* COLUMN 2 — DANES PISARNA */}
          <div className="flex flex-col gap-3">
            {/* Column Header Row */}
            <ColumnHeader title="DANES — PISARNA" />
            <div
              style={{
                background: "linear-gradient(180deg, #60A5FA 0%, #2563EB 100%)",
                border: "1px solid #1D4ED8",
                boxShadow: "0px 24px 60px -30px rgba(59, 130, 246, 0.55), inset 0px 1px 0px 1px rgba(255, 255, 255, 0.35)",
                borderRadius: "32px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
              className="group hover:-translate-y-1 transition-all duration-300"
            >
              {orders.slice(0, 3).map((o, idx) => {
                // Determine buttons configuration based on card index
                let buttonsConfig: 'call-tick-decline' | 'attachment-tick-decline' | 'none' = 'attachment-tick-decline';
                if (idx === 0) {
                  buttonsConfig = 'call-tick-decline';
                } else if (idx === 2) {
                  buttonsConfig = 'none';
                }

                return (
                  <CommunicationCard
                    key={o.id}
                    order={o}
                    buttonsConfig={buttonsConfig}
                    showRedButton={idx === 0 || idx === 1}
                    onResolve={() => handleApprove(o.id)}
                    onDismiss={() => handleDismissOrder(o.id)}
                    onArchive={() => handleDecline(o.id)}
                    onCall={() => alert(`Klicanje: ${o.workerName}`)}
                    onAttachmentClick={() => alert(`Showing attachments for ${o.title}`)}
                  />
                );
              })}
            </div>
          </div>

          {/* COLUMN 3 — KOMUNIKACIJA */}
          <div className="flex flex-col gap-3">
            {/* Column Header Row */}
            <ColumnHeader title="KOMUNIKACIJA" />
            <div
              style={{
                background: "linear-gradient(180deg, rgba(241, 241, 255, 0.19) 0%, rgba(241, 241, 255, 0.19) 100%)",
                border: "0.6px solid #1D4ED8",
                boxShadow: "0px 24px 60px -30px rgba(59, 130, 246, 0.55), inset 0px 1px 0px 1px rgba(255, 255, 255, 0.35)",
                borderRadius: "32px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
              className="group hover:-translate-y-1 transition-all duration-300"
            >
              {messages.slice(0, 3).map((m, idx) => {
                return (
                  <OfficeCard
                    key={m.id}
                    message={m}
                    iconType={idx === 2 ? "document" : "mic"}
                    showRedButton={idx === 0 || idx === 1}
                    onResolve={() => handleResolveMessage(m.id)}
                    onDismiss={() => handleDismissMessage(m.id)}
                    onArchive={() => handleArchiveMessage(m.id)}
                  />
                );
              })}
            </div>
          </div>
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
