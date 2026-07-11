"use client";

import React from "react";
import { useLanguage } from "@/lib/useLanguage";
import type { Worker, Order, Message } from "@/lib/mockData";
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

  // Hardcoded preview data — completely independent from /dashboard/office state
  const workers: Worker[] = [
    {
      id: "pw1",
      name: "Anthony H",
      avatar: "AH",
      role: "Novak d.o.o.",
      currentTask: "Kopalnica prenova",
      status: "v_teku",
      phone: "+386 40 123 456",
      email: "anthony.hopkins@dnevnik.app",
      unreadCount: 1,
      location: "Ljubljana",
      tasks: [
        { id: "pt1_1", text: "Odvoz materiala - Stane", completed: true, completedAt: "10:34", hasAttachment: true },
        { id: "pt1_2", text: "Začetek del", completed: true, completedAt: "08:20" },
        { id: "pt1_3", text: "Odstranjevanje elementov", completed: true, completedAt: "09:10" },
        { id: "pt1_4", text: "Odvoz odpadkov", completed: true, completedAt: "09:55" },
        { id: "pt1_5", text: "Dostava ploščic - Adam", completed: false, requiresAttachment: true },
        { id: "pt1_6", text: "Polaganje ploščic", completed: false },
        { id: "pt1_7", text: "Menjava umivalnika, kadi", completed: false },
        { id: "pt1_8", text: "Dnevno poročilo", completed: false, requiresAttachment: true }
      ]
    },
    {
      id: "pw2",
      name: "ANA NOVAK",
      avatar: "AN",
      role: "JGD d.o.o.",
      currentTask: "Čiščenje prostorov",
      status: "zakasnitev",
      phone: "+386 31 987 654",
      email: "alec.navarro@dnevnik.app",
      unreadCount: 0,
      location: "Ljubljana",
      tasks: [
        { id: "pt2_1", text: "Čiščenje tal", completed: true, completedAt: "10:51", hasAttachment: true },
        { id: "pt2_2", text: "Čiščenje oken", completed: true, completedAt: "09:00" },
        { id: "pt2_3", text: "Čiščenje kopalnic", completed: true, completedAt: "09:45" },
        { id: "pt2_4", text: "Čiščenje kuhinje", completed: true, completedAt: "10:20" },
        { id: "pt2_5", text: "Dnevno poročilo", completed: false }
      ]
    },
    {
      id: "pw3",
      name: "PAVLE",
      avatar: "BD",
      role: "FxG d.o.o.",
      currentTask: "Dostava cvetja",
      status: "v_teku",
      phone: "+386 41 555 666",
      email: "bo.derek@dnevnik.app",
      unreadCount: 0,
      location: "Celje",
      tasks: [
        { id: "pt3_1", text: "Prevzem cvetja", completed: true, completedAt: "08:00" },
        { id: "pt3_2", text: "Dostava", completed: false },
        { id: "pt3_3", text: "Potrdilo o dostavi", completed: false, hasAttachment: true },
        { id: "pt3_4", text: "Dnevno poročilo", completed: false }
      ]
    }
  ];

  const orders: Order[] = [
    {
      id: "po1",
      title: "Pokliči Maksa za rezervacijo",
      description: "Danes je zadnji dan.",
      time: "10:30",
      createdAt: "09:02",
      priority: "nujno",
      status: "caka_potrditev",
      workerId: "pw1",
      workerName: "LIAM"
    },
    {
      id: "po2",
      title: "Podpiši izvozne dokumente",
      description: "",
      time: "12:00",
      createdAt: "11:34",
      priority: "visoka",
      status: "caka_potrditev",
      workerId: "pw2",
      workerName: "SIMON"
    },
    {
      id: "po3",
      title: "Meeting at USC",
      description: "",
      time: "13:00",
      createdAt: "11:38",
      priority: "danes",
      status: "caka_potrditev",
      workerId: "pw3",
      workerName: "ADAM"
    }
  ];

  const messages: Message[] = [
    {
      id: "pm1",
      workerId: "pw1",
      workerName: "ANA NOVAK",
      text: "Stranke ni bilo na naslovu. Začenjam pol ure kasneje.",
      time: "09:18",
      type: "glasovno",
      targetTask: "Čiščenje prostorov"
    },
    {
      id: "pm2",
      workerId: "pw2",
      workerName: "ANTHONY H",
      text: "Prometna nesreča pri Celju. Zaprta cesta do 13:30.",
      time: "10:53",
      type: "glasovno",
      targetTask: "Kopalnica prenova"
    },
    {
      id: "pm3",
      workerId: "pw3",
      workerName: "ALEKS",
      text: "Preveri dokumente za Graz. Pokliči Ano.",
      time: "11:02",
      type: "glasovno",
      targetTask: "Popravilo dvigala"
    }
  ];

  const noop = () => {};

  return (
    <section id="dashboard-preview" className="max-w-7xl mx-auto px-6 py-20 relative">
      <style>{`
        .dashboard-preview-scale {
          zoom: 1;
        }
        @media (min-width: 768px) {
          .dashboard-preview-scale {
            zoom: 0.85;
          }
        }
        @media (min-width: 1024px) {
          .dashboard-preview-scale {
            zoom: 0.75;
          }
        }
      `}</style>

      {/* Section Header */}
      <div className="text-center max-w-5xl mx-auto mb-16">
        <p className="font-['Inter',sans-serif] text-[10px] md:text-xs font-semibold tracking-[-0.04em] text-blue-500 mb-4 uppercase">
          {"ZA PISARNO"}
        </p>
        <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-slate-950 max-w-3xl mx-auto">
          {"Komandni center"}
        </h2>
        <p className="mt-4 text-sm md:text-base text-slate-500 max-w-xl mx-auto font-light leading-relaxed">
          {"Vsak delovni dan je bolje organiziran. Ekipa dela samostojneje, komunikacije je manj, a je hitrejša, pregled nad deli je boljši in vodenje lažje."}
        </p>
      </div>

      {/* Main Glassmorphic Wrapper */}
      <div className="dashboard-preview-scale relative overflow-hidden rounded-[2.75rem] bg-white/55 backdrop-blur-xl border border-white shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,1)] p-6 md:p-10">
        
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
                    onToggleTask={noop}
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
                      showRedButton={idx === 0}
                      onResolve={noop}
                      onDismiss={noop}
                      onArchive={noop}
                      onCall={noop}
                      onAttachmentClick={noop}
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
                    showRedButton={idx === 1}
                    onResolve={noop}
                    onDismiss={noop}
                    onArchive={noop}
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
