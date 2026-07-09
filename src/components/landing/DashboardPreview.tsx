"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/useLanguage";
import {
  initialWorkers,
  initialOrders,
  initialMessages,
  Worker,
  Order,
  Message
} from "@/lib/mockData";
import { SummaryCard, OverviewRow, UrgentRow } from "@/components/dashboard/SummaryCard";
import { WorkerCard } from "@/components/dashboard/WorkerCard";
import { OfficeCard } from "@/components/dashboard/OfficeCard";
import { CommunicationCard } from "@/components/dashboard/CommunicationCard";

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

export function DashboardPreview() {
  const { t } = useLanguage();

  // Local state displaying all items in the summary cards, and exactly one item in the 3 columns
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

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

  const handleApprove = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "potrjeno" } : o));
  };

  const handleDecline = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "zavrnjeno" } : o));
  };

  const handleDismissOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  const handleResolveMessage = (messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
  };

  const handleDismissMessage = (messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
  };

  const handleArchiveMessage = (messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
  };

  return (
    <section id="dashboard-preview" className="max-w-7xl mx-auto px-6 py-20 relative">
      {/* Section Header */}
      <div className="text-center max-w-5xl mx-auto mb-16">
        <p className="font-['JetBrains_Mono',monospace] text-[10px] md:text-xs font-semibold tracking-[-0.04em] text-blue-500 mb-4 uppercase">
          {t("previewBadge") || "KOMANDNI CENTER V ŽIVO"}
        </p>
        <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-slate-950 max-w-3xl mx-auto">
          {t("previewTitle") || "Upravljajte celotno ekipo iz enotnega komandnega centra"}
        </h2>
        <p className="mt-4 text-sm md:text-base text-slate-500 max-w-xl mx-auto font-light leading-relaxed">
          {t("previewSubtitle") || "Preizkusite interaktivni predogled delovanja nadzorne plošče neposredno spodaj."}
        </p>
      </div>

      {/* Main Glassmorphic Wrapper */}
      <div className="relative overflow-hidden rounded-[2.75rem] bg-white/55 backdrop-blur-xl border border-white shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,1)] p-6 md:p-10">
        
        {/* Soft background glows */}
        <div className="absolute top-[-35%] left-[10%] w-[32rem] h-[32rem] rounded-full bg-blue-200/30 blur-[6rem] pointer-events-none" />
        <div className="absolute bottom-[-35%] right-[5%] w-[30rem] h-[30rem] rounded-full bg-sky-200/20 blur-[6rem] pointer-events-none" />

        {/* Outer Dashboard Shell */}
        <div className="relative">
          
          {/* Dnevni pregled heading */}
          <h2
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
          </h2>

          {/* Summary Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: "32px" }}>
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

          {/* 3 Columns Grid - with all 3 cards in each column exactly like the dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1 - Teren */}
            <div className="flex flex-col gap-3">
              <ColumnHeader title="DANES-TEREN" onAddClick={() => {}} />
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
                    orderId={idx === 2 ? "#486" : "#484"}
                    onClick={undefined}
                    disableActions={true}
                  />
                ))}
              </div>
            </div>

            {/* Column 2 - Pisarna */}
            <div className="flex flex-col gap-3">
              <ColumnHeader title="DANES-PISARNA" onAddClick={() => {}} />
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

            {/* Column 3 - Komunikacija */}
            <div className="flex flex-col gap-3">
              <ColumnHeader title="KOMUNIKACIJA" onAddClick={() => {}} />
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
                {messages.slice(0, 3).map((m, idx) => (
                  <OfficeCard
                    key={m.id}
                    message={m}
                    iconType={idx === 2 ? "document" : "mic"}
                    showRedButton={idx === 0 || idx === 1}
                    onResolve={() => handleResolveMessage(m.id)}
                    onDismiss={() => handleDismissMessage(m.id)}
                    onArchive={() => handleArchiveMessage(m.id)}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
