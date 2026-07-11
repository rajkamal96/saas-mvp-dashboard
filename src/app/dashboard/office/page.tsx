"use client";

import React, { useState, useCallback } from "react";
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
import { AddTaskModal } from "@/components/dashboard/AddTaskModal";
import { AddReminderModal } from "@/components/dashboard/AddReminderModal";
import { AddWorkerCard } from "@/components/dashboard/AddWorkerCard";
import { SortableItem } from "@/components/dashboard/SortableItem";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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
  const [detailKey, setDetailKey] = useState(0);
  const [isWorkerDetailOpen, setIsWorkerDetailOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);
  const [isAddWorkerOpen, setIsAddWorkerOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleWorkerDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setWorkers((prev) => {
        const oldIndex = prev.findIndex((w) => w.id === active.id);
        const newIndex = prev.findIndex((w) => w.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleOrderDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOrders((prev) => {
        const oldIndex = prev.findIndex((o) => o.id === active.id);
        const newIndex = prev.findIndex((o) => o.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleMessageDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setMessages((prev) => {
        const oldIndex = prev.findIndex((m) => m.id === active.id);
        const newIndex = prev.findIndex((m) => m.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleAddReminder = (reminderData: {
    title: string;
    description: string;
    time: string;
    date: string;
    isUrgent: boolean;
    hasAttachment: boolean;
    attachmentName: string;
    hasEmail: boolean;
    phoneNumber: string;
    hasConfirm: boolean;
    hasDecline: boolean;
  }) => {
    const newOrder: Order & {
      hasEmail?: boolean;
      hasAttachment?: boolean;
      attachmentName?: string;
      phoneNumber?: string;
      hasConfirm?: boolean;
      hasDecline?: boolean;
    } = {
      id: `o_${Date.now()}`,
      title: reminderData.title,
      description: reminderData.description,
      time: reminderData.time,
      createdAt: new Date().toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" }),
      priority: reminderData.isUrgent ? 'nujno' : 'normalna',
      status: 'caka_potrditev',
      workerId: '',
      workerName: 'Pisarna',
      hasEmail: reminderData.hasEmail,
      hasAttachment: reminderData.hasAttachment,
      attachmentName: reminderData.attachmentName,
      phoneNumber: reminderData.phoneNumber,
      hasConfirm: reminderData.hasConfirm,
      hasDecline: reminderData.hasDecline,
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const handleAddTask = (taskData: {
    workerId: string;
    opravilo: string;
    kraj: string;
    narocnik: string;
    datum: string;
  }) => {
    setWorkers(prev => prev.map(w => {
      if (w.id !== taskData.workerId) return w;
      return {
        ...w,
        currentTask: taskData.opravilo,
        location: taskData.kraj || w.location || "Ljubljana",
        role: taskData.narocnik || w.role || "Brez podjetja",
        tasks: [
          ...w.tasks,
          { id: `t_${Date.now()}`, text: taskData.opravilo, completed: false },
        ],
      };
    }));
  };

  const handleAddWorker = (workerData: {
    name: string;
    role: string;
    phone: string;
    email: string;
  }) => {
    const newWorker: Worker = {
      id: `w_${Date.now()}`,
      name: workerData.name,
      avatar: workerData.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase(),
      role: workerData.role || "Brez podjetja",
      currentTask: "Novo opravilo",
      status: "v_teku",
      phone: workerData.phone,
      email: workerData.email,
      unreadCount: 0,
      location: "Ljubljana",
      tasks: [
        { id: `t_${Date.now()}_1`, text: "Začetek del", completed: false },
        { id: `t_${Date.now()}_2`, text: "Dnevno poročilo", completed: false },
      ],
    };
    setWorkers(prev => [...prev, newWorker]);
  };

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

  const handleTasksChange = useCallback((updatedTasks: Worker["tasks"]) => {
    if (!selectedWorker) return;
    setWorkers(prev => prev.map(w =>
      w.id === selectedWorker.id
        ? { ...w, tasks: updatedTasks }
        : w
    ));
  }, [selectedWorker]);

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
              {orders.filter(o => o.priority === 'nujno').map(o => (
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
            <ColumnHeader title="DANES — TEREN" onAddClick={() => setIsAddTaskOpen(true)} />
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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleWorkerDragEnd}
              >
                <SortableContext items={workers.slice(0, 3).map(w => w.id)} strategy={verticalListSortingStrategy}>
                  {workers.slice(0, 3).map((w, idx) => (
                    <SortableItem key={w.id} id={w.id}>
                      <WorkerCard
                        worker={w}
                        onToggleTask={handleToggleTask}
                        date="23/05/26"
                        orderId={`#${480 + idx + 1}`}
                        onClick={() => {
                          setSelectedWorker(w);
                          setIsWorkerDetailOpen(true);
                          setDetailKey(k => k + 1);
                        }}
                      />
                    </SortableItem>
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>

          {/* COLUMN 2 — DANES PISARNA */}
          <div className="flex flex-col gap-3">
            {/* Column Header Row */}
            <ColumnHeader title="DANES — PISARNA" onAddClick={() => setIsAddReminderOpen(true)} />
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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleOrderDragEnd}
              >
                <SortableContext items={orders.map(o => o.id)} strategy={verticalListSortingStrategy}>
                  {orders.map((o, idx) => {
                    // Determine buttons configuration based on card properties
                    let buttonsConfig: 'call-tick-decline' | 'attachment-tick-decline' | 'none' | 'dynamic' = 'attachment-tick-decline';
                    if ('hasEmail' in o || 'hasAttachment' in o || 'phoneNumber' in o || 'hasConfirm' in o || 'hasDecline' in o) {
                      buttonsConfig = 'dynamic';
                    } else if (idx === 0) {
                      buttonsConfig = 'call-tick-decline';
                    } else if (idx === 2) {
                      buttonsConfig = 'none';
                    }

                    return (
                      <SortableItem key={o.id} id={o.id}>
                        <CommunicationCard
                          order={o}
                          buttonsConfig={buttonsConfig}
                          showRedButton={o.priority === 'nujno'}
                          onResolve={() => handleApprove(o.id)}
                          onDismiss={() => handleDismissOrder(o.id)}
                          onArchive={() => handleDecline(o.id)}
                          onCall={(phone) => alert(`Klicanje: ${phone || o.workerName}`)}
                          onAttachmentClick={(att) => alert(`Odpiranje priponke: ${att || o.title}`)}
                        />
                      </SortableItem>
                    );
                  })}
                </SortableContext>
              </DndContext>
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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleMessageDragEnd}
              >
                <SortableContext items={messages.slice(0, 3).map(m => m.id)} strategy={verticalListSortingStrategy}>
                  {messages.slice(0, 3).map((m, idx) => {
                    return (
                      <SortableItem key={m.id} id={m.id}>
                        <OfficeCard
                          message={m}
                          iconType={idx === 2 ? "document" : "mic"}
                          showRedButton={idx === 1}
                          onResolve={() => handleResolveMessage(m.id)}
                          onDismiss={() => handleDismissMessage(m.id)}
                          onArchive={() => handleArchiveMessage(m.id)}
                        />
                      </SortableItem>
                    );
                  })}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </div>
      </div>
      <WorkerDetailModal
        key={detailKey}
        isOpen={isWorkerDetailOpen}
        onOpenChange={setIsWorkerDetailOpen}
        worker={selectedWorker}
        onTasksChange={handleTasksChange}
      />
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
        workers={workers}
        onAddTask={handleAddTask}
      />
      <AddReminderModal
        isOpen={isAddReminderOpen}
        onOpenChange={setIsAddReminderOpen}
        onAddReminder={handleAddReminder}
      />
      <AddWorkerCard
        isOpen={isAddWorkerOpen}
        onOpenChange={setIsAddWorkerOpen}
        onAddWorker={handleAddWorker}
      />
    </div>
  );
}
