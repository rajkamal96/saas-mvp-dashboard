"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/useLanguage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  initialWorkers,
  initialOrders,
  initialMessages,
  Worker,
  Order,
  Message
} from "@/lib/mockData";
import {
  Plus,
  Phone,
  Mail,
  MessageSquare,
  Mic,
  Check,
  AlertCircle,
  FileText,
  Paperclip,
  Image as ImageIcon,
  Clock,
  ArrowRight,
  LogOut,
  Sparkles
} from "lucide-react";

export default function OfficeDashboard() {
  const { t } = useLanguage();
  const router = useRouter();

  // State Management
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const [expandedCol, setExpandedCol] = useState<number>(2); // 1 = Teren, 2 = Pisarna, 3 = Komunikacija
  const [activeTabMobile, setActiveTabMobile] = useState<number>(2); // for mobile swipe/tabs

  // Modals state
  const [isAddWorkerOpen, setIsAddWorkerOpen] = useState(false);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [isWorkerDetailOpen, setIsWorkerDetailOpen] = useState(false);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);

  // Form states
  const [newWorkerName, setNewWorkerName] = useState("");
  const [newWorkerPhone, setNewWorkerPhone] = useState("");
  const [newWorkerEmail, setNewWorkerEmail] = useState("");
  const [newWorkerRole, setNewWorkerRole] = useState("Vzdrževalec");

  const [newOrderTitle, setNewOrderTitle] = useState("");
  const [newOrderDesc, setNewOrderDesc] = useState("");
  const [newOrderPriority, setNewOrderPriority] = useState<"normalna" | "danes" | "visoka" | "nujno">("normalna");
  const [newOrderWorkerId, setNewOrderWorkerId] = useState("");

  // Selected Detail states
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Add Worker handler
  const handleAddWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkerName) return;

    const newW: Worker = {
      id: `w${workers.length + 1}`,
      name: newWorkerName,
      avatar: newWorkerName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
      role: newWorkerRole,
      currentTask: t("dashRegNamePlaceholder") === "npr. Luka Dončič" ? "Čaka na razporeditev" : "Awaiting assignment",
      status: "v_teku",
      phone: newWorkerPhone || "+386 40 000 000",
      email: newWorkerEmail || `${newWorkerName.toLowerCase().replace(" ", ".")}@podjetje.si`,
      tasks: []
    };

    setWorkers([...workers, newW]);
    setNewWorkerName("");
    setNewWorkerPhone("");
    setNewWorkerEmail("");
    setNewWorkerRole("Vzdrževalec");
    setIsAddWorkerOpen(false);
  };

  // Add Order handler
  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderTitle) return;

    const targetWorker = workers.find(w => w.id === newOrderWorkerId) || workers[0];

    const newO: Order = {
      id: `o${orders.length + 1}`,
      title: newOrderTitle,
      description: newOrderDesc,
      time: new Date().toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" }),
      priority: newOrderPriority,
      status: "caka_potrditev",
      workerId: targetWorker.id,
      workerName: targetWorker.name
    };

    // Also append a task to the worker
    const updatedWorkers = workers.map(w => {
      if (w.id === targetWorker.id) {
        return {
          ...w,
          currentTask: `${targetWorker.currentTask === "Čaka na razporeditev" || targetWorker.currentTask === "Awaiting assignment" ? "" : targetWorker.currentTask} | ${newOrderTitle}`,
          tasks: [
            ...w.tasks,
            { id: `t${w.id}_${w.tasks.length + 1}`, text: newOrderTitle, completed: false }
          ]
        };
      }
      return w;
    });

    setWorkers(updatedWorkers);
    setOrders([newO, ...orders]);
    setNewOrderTitle("");
    setNewOrderDesc("");
    setNewOrderPriority("normalna");
    setNewOrderWorkerId("");
    setIsAddOrderOpen(false);
  };

  // Toggle tasks completed status inside dashboard
  const handleToggleTask = (workerId: string, taskId: string) => {
    const updated = workers.map(w => {
      if (w.id === workerId) {
        const updatedTasks = w.tasks.map(t => {
          if (t.id === taskId) {
            return {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" }) : undefined
            };
          }
          return t;
        });
        return { ...w, tasks: updatedTasks };
      }
      return w;
    });
    setWorkers(updated);
    if (selectedWorker && selectedWorker.id === workerId) {
      const targetW = updated.find(w => w.id === workerId);
      if (targetW) setSelectedWorker(targetW);
    }
  };

  // Approve Order handler
  const handleApproveOrder = (orderId: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: "potrjeno" } : o));
    
    // Add comment to communications
    const targetOrder = orders.find(o => o.id === orderId);
    if (targetOrder) {
      const newMsg: Message = {
        id: `m${messages.length + 1}`,
        workerId: targetOrder.workerId,
        workerName: targetOrder.workerName,
        text: t("dashRegNamePlaceholder") === "npr. Luka Dončič" 
          ? `Nalog "${targetOrder.title}" je bil potrjen s strani pisarne.` 
          : `Order "${targetOrder.title}" was approved by the office.`,
        time: new Date().toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" }),
        type: "tekst"
      };
      setMessages([newMsg, ...messages]);
    }
  };

  // Decline Order handler
  const handleDeclineOrder = (orderId: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: "zavrnjeno" } : o));
  };

  const getPriorityBadge = (priority: Order["priority"]) => {
    switch (priority) {
      case "nujno":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 uppercase">{t("dashUrgent")}</span>;
      case "visoka":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 uppercase">{t("dashRegRole") === "Vloga delavca" ? "Visoka" : "High"}</span>;
      case "danes":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase">{t("dashRegRole") === "Vloga delavca" ? "Danes" : "Today"}</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 uppercase">{t("dashRegRole") === "Vloga delavca" ? "Normalna" : "Normal"}</span>;
    }
  };

  // Count active / urgent orders
  const urgentCount = orders.filter(o => o.priority === "nujno" && o.status === "caka_potrditev").length;
  const activeCount = workers.filter(w => w.status === "v_teku").length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f19] font-sans text-slate-800 dark:text-slate-200">
      {/* Sticky Top Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 h-16 flex items-center justify-between px-6 z-40">
        <div className="flex items-center gap-6">
          <Logo className="h-8 w-auto" />
          <span className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:inline" />
          <div className="hidden sm:flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{t("dashDate")}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="flex items-center gap-1.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              {urgentCount} {t("dashUrgent")}
            </span>
            <span className="flex items-center gap-1.5 bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              {activeCount} {t("dashActive")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-right">
            <div className="hidden md:block">
              <div className="text-xs font-bold">{t("dashTitleMN")}</div>
              <div className="text-[10px] text-slate-400">{t("dashRoleMN")}</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center font-bold text-sm">
              MN
            </div>
          </div>
          <button 
            onClick={() => router.push("/")}
            title="Izhod"
            className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <LogOut className="h-4.5 w-4.5" />
          </button>
        </div>
      </header>

      {/* Top Overview Bar */}
      <section className="bg-white dark:bg-[#0f172a] border-b border-slate-100 dark:border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-900 dark:text-white">{t("dashTeamLabel")}</span>
            <div className="flex items-center gap-4 overflow-x-auto py-1">
              {workers.map(w => {
                const completed = w.tasks.filter(t => t.completed).length;
                const total = w.tasks.length;
                const pct = total > 0 ? (completed / total) * 100 : 0;
                
                return (
                  <div 
                    key={w.id}
                    onClick={() => {
                      setSelectedWorker(w);
                      setIsWorkerDetailOpen(true);
                    }}
                    className="flex items-center gap-2.5 bg-slate-50 dark:bg-[#151c2c] hover:bg-slate-100 dark:hover:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-800 cursor-pointer transition-all"
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      w.status === "zakasnitev" 
                        ? "bg-amber-500" 
                        : w.status === "koncano" 
                        ? "bg-green-600" 
                        : "bg-[#1B3A6B]"
                    }`}>
                      {w.avatar}
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">{w.name}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-16 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              w.status === "zakasnitev" 
                                ? "bg-amber-500" 
                                : w.status === "koncano" 
                                ? "bg-green-600" 
                                : "bg-[#1B3A6B]"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500">{completed}/{total}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">{t("dashQuickCmd")}</span>
            <Button 
              size="sm" 
              onClick={() => setIsAddWorkerOpen(true)}
              className="h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white border-0 gap-1 text-xs"
            >
              <Plus className="h-3.5 w-3.5" /> {t("dashRegWorkerBtn")}
            </Button>
            <Button 
              size="sm"
              onClick={() => setIsAddOrderOpen(true)}
              className="h-8 rounded-lg bg-[#1B3A6B] hover:bg-[#142c52] text-white gap-1 text-xs"
            >
              <Plus className="h-3.5 w-3.5" /> {t("dashNewOrderBtn")}
            </Button>
          </div>
        </div>
      </section>

      {/* Main Command Center Grid (3 Columns Accordion) */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden max-h-[calc(100vh-10rem)]">
        
        {/* COLUMN 1: TEREN (Workers cards) */}
        <section 
          className={`flex flex-col border-r border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-[#0c111d] transition-all duration-500 ease-in-out overflow-hidden ${
            activeTabMobile === 1 ? "flex flex-1" : "hidden md:flex"
          } ${
            expandedCol === 1 ? "md:w-[60%]" : expandedCol === 2 || expandedCol === 3 ? "md:w-[20%]" : "md:w-1/3"
          }`}
          onClick={() => {
            if (expandedCol !== 1) setExpandedCol(1);
          }}
        >
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/10 cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1B3A6B]" />
              <h3 className="font-bold text-sm tracking-wide uppercase text-slate-700 dark:text-slate-300">
                {t("dashColTeren")}
              </h3>
              <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                {workers.length}
              </span>
            </div>
            {expandedCol !== 1 && (
              <span className="text-[10px] text-slate-400 font-semibold hidden md:inline">
                {t("dashRegRole") === "Vloga delavca" ? "Klikni za razširitev" : "Click to expand"}
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {workers.map(w => {
              const completed = w.tasks.filter(t => t.completed).length;
              const total = w.tasks.length;
              const pct = total > 0 ? (completed / total) * 100 : 0;

              return (
                <div 
                  key={w.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    w.status === "zakasnitev"
                      ? "border-amber-200 bg-amber-50/20 dark:border-amber-950/40 dark:bg-amber-950/5"
                      : w.status === "koncano"
                      ? "border-green-200 bg-green-50/20 dark:border-green-950/40 dark:bg-green-950/5"
                      : "border-slate-200 bg-white dark:border-slate-800 dark:bg-[#151c2c]/40 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-sm ${
                        w.status === "zakasnitev" 
                          ? "bg-amber-500" 
                          : w.status === "koncano" 
                          ? "bg-green-600" 
                          : "bg-[#1B3A6B]"
                      }`}>
                        {w.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{w.name}</h4>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-300" />
                          {w.currentTask}
                        </span>
                      </div>
                    </div>
                    
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      w.status === "zakasnitev"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        : w.status === "koncano"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}>
                      {w.status === "zakasnitev" ? t("dashColTerenDelay") : w.status === "koncano" ? t("dashColTerenDone") : t("dashColTerenStatus")}
                    </span>
                  </div>

                  {/* Tasks List snippet if expanded */}
                  {(expandedCol === 1 || activeTabMobile === 1) && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                      {w.tasks.map(t => (
                        <div 
                          key={t.id} 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleTask(w.id, t.id);
                          }}
                          className="flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 p-1.5 rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                              t.completed 
                                ? "bg-green-500 border-green-500 text-white" 
                                : "border-slate-300 dark:border-slate-600"
                            }`}>
                              {t.completed && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={t.completed ? "line-through text-slate-400" : "font-medium"}>
                              {t.text}
                            </span>
                          </div>
                          {t.completedAt && (
                            <span className="text-[10px] text-slate-400">{t.completedAt}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            w.status === "zakasnitev" 
                              ? "bg-amber-500" 
                              : w.status === "koncano" 
                              ? "bg-green-600" 
                              : "bg-[#1B3A6B]"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{completed}/{total}</span>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedWorker(w);
                        setIsWorkerDetailOpen(true);
                      }}
                      className="text-xs text-[#1B3A6B] dark:text-[#38bdf8] font-bold hover:underline flex items-center gap-0.5"
                    >
                      {t("dashColTerenReviewBtn")} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* COLUMN 2: PISARNA (Active Orders / Actions) */}
        <section 
          className={`flex flex-col border-r border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-[#0c111d] transition-all duration-500 ease-in-out overflow-hidden ${
            activeTabMobile === 2 ? "flex flex-1" : "hidden md:flex"
          } ${
            expandedCol === 2 ? "md:w-[60%]" : expandedCol === 1 || expandedCol === 3 ? "md:w-[20%]" : "md:w-1/3"
          }`}
          onClick={() => {
            if (expandedCol !== 2) setExpandedCol(2);
          }}
        >
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/10 cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              <h3 className="font-bold text-sm tracking-wide uppercase text-slate-700 dark:text-slate-300">
                {t("dashColPisarna")}
              </h3>
              <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                {orders.length}
              </span>
            </div>
            {expandedCol !== 2 && (
              <span className="text-[10px] text-slate-400 font-semibold hidden md:inline">
                {t("dashRegRole") === "Vloga delavca" ? "Klikni za razširitev" : "Click to expand"}
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {orders.map(o => (
              <div 
                key={o.id}
                onClick={(e) => {
                  setSelectedOrder(o);
                  setIsOrderDetailOpen(true);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  o.priority === "nujno" && o.status === "caka_potrditev"
                    ? "border-red-200 bg-red-50/10 dark:border-red-950/40 dark:bg-red-950/5"
                    : o.status === "potrjeno"
                    ? "border-slate-200 bg-slate-50/40 dark:border-slate-800/40 opacity-70"
                    : "border-slate-200 bg-white dark:border-slate-800 dark:bg-[#151c2c]/40 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(o.priority)}
                      <span className="text-[10px] text-slate-400">{o.time}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1.5">
                      {o.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">{o.description}</p>
                  </div>
                  
                  {o.status === "potrjeno" ? (
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase">{t("dashColTerenDone")}</span>
                  ) : o.status === "zavrnjeno" ? (
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase">{t("dashColPisarnaDecline")}</span>
                  ) : null}
                </div>

                {/* Actions inside card if expanded */}
                {(expandedCol === 2 || activeTabMobile === 2) && o.status === "caka_potrditev" && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-8 text-xs font-semibold px-3 py-0 border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Notification sent for: ${o.title}`);
                      }}
                    >
                      E-mail
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-8 text-xs font-semibold px-3 py-0 border-slate-200 text-red-600 hover:bg-red-50 dark:border-slate-700 dark:text-red-400 dark:hover:bg-red-950/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeclineOrder(o.id);
                      }}
                    >
                      {t("dashColPisarnaDecline")}
                    </Button>
                    <Button 
                      size="sm" 
                      className="h-8 text-xs font-semibold px-4 py-0 bg-[#1B3A6B] hover:bg-[#142c52] text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApproveOrder(o.id);
                      }}
                    >
                      {t("dashColPisarnaApprove")}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* COLUMN 3: KOMUNIKACIJA (Live Communications Feed) */}
        <section 
          className={`flex flex-col bg-white dark:bg-[#0c111d] transition-all duration-500 ease-in-out overflow-hidden ${
            activeTabMobile === 3 ? "flex flex-1" : "hidden md:flex"
          } ${
            expandedCol === 3 ? "md:w-[60%]" : expandedCol === 1 || expandedCol === 2 ? "md:w-[20%]" : "md:w-1/3"
          }`}
          onClick={() => {
            if (expandedCol !== 3) setExpandedCol(3);
          }}
        >
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/10 cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="font-bold text-sm tracking-wide uppercase text-slate-700 dark:text-slate-300">
                {t("dashColKomunikacija")}
              </h3>
              <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                {messages.length}
              </span>
            </div>
            {expandedCol !== 3 && (
              <span className="text-[10px] text-slate-400 font-semibold hidden md:inline">
                {t("dashRegRole") === "Vloga delavca" ? "Klikni za razširitev" : "Click to expand"}
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Quick Actions Panel if expanded */}
            {(expandedCol === 3 || activeTabMobile === 3) && (
              <div className="bg-slate-50 dark:bg-[#151c2c] p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                  {t("dashColKomunQuickBtn")}
                </span>
                <div className="grid grid-cols-4 gap-2">
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-white dark:bg-[#0c111d] border border-slate-100 dark:border-slate-800 hover:border-[#1B3A6B] hover:text-[#1B3A6B] text-slate-600 dark:text-slate-300 transition-all">
                    <Mic className="w-5 h-5 mb-1 text-slate-400" />
                    <span className="text-[9px] font-semibold">{t("dashColKomunVoiceBtn")}</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-white dark:bg-[#0c111d] border border-slate-100 dark:border-slate-800 hover:border-[#1B3A6B] hover:text-[#1B3A6B] text-slate-600 dark:text-slate-300 transition-all">
                    <Phone className="w-5 h-5 mb-1 text-slate-400" />
                    <span className="text-[9px] font-semibold">{t("dashColKomunCallBtn")}</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-white dark:bg-[#0c111d] border border-slate-100 dark:border-slate-800 hover:border-[#1B3A6B] hover:text-[#1B3A6B] text-slate-600 dark:text-slate-300 transition-all">
                    <MessageSquare className="w-5 h-5 mb-1 text-slate-400" />
                    <span className="text-[9px] font-semibold">{t("dashColKomunSmsBtn")}</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-white dark:bg-[#0c111d] border border-slate-100 dark:border-slate-800 hover:border-[#1B3A6B] hover:text-[#1B3A6B] text-slate-600 dark:text-slate-300 transition-all">
                    <Mail className="w-5 h-5 mb-1 text-slate-400" />
                    <span className="text-[9px] font-semibold">{t("dashColKomunMailBtn")}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Messages List */}
            {messages.map(m => (
              <div 
                key={m.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#151c2c]/40 border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white flex items-center justify-center text-[10px] font-bold">
                      {m.workerName.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="text-xs font-bold">{m.workerName}</span>
                    {m.targetTask && (
                      <span className="text-[9px] text-slate-400">→ {m.targetTask}</span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">{m.time}</span>
                </div>

                <div className="flex items-start gap-2 bg-slate-50 dark:bg-slate-900/20 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  {m.type === "glasovno" ? (
                    <div className="flex items-center gap-2 w-full">
                      <Mic className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">{t("dashColKomunikacijaVoice")}</span>
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                        </div>
                        <p className="text-xs italic text-slate-600 dark:text-slate-300 mt-1">
                          &ldquo;{m.text}&rdquo;
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {m.text}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Adaptive Mobile Bottom Tab bar */}
      <footer className="md:hidden sticky bottom-0 bg-white border-t border-slate-200 h-16 flex items-center justify-around z-40">
        <button 
          onClick={() => setActiveTabMobile(1)}
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            activeTabMobile === 1 ? "text-[#1B3A6B] font-bold" : "text-slate-400"
          }`}
        >
          <Sparkles className="w-5 h-5 mb-1" />
          <span className="text-[10px]">{t("dashMobileTeren")} ({workers.length})</span>
        </button>
        <button 
          onClick={() => setActiveTabMobile(2)}
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            activeTabMobile === 2 ? "text-[#1B3A6B] font-bold" : "text-slate-400"
          }`}
        >
          <FileText className="w-5 h-5 mb-1" />
          <span className="text-[10px]">{t("dashMobilePisarna")}</span>
        </button>
        <button 
          onClick={() => setActiveTabMobile(3)}
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            activeTabMobile === 3 ? "text-[#1B3A6B] font-bold" : "text-slate-400"
          }`}
        >
          <MessageSquare className="w-5 h-5 mb-1" />
          <span className="text-[10px]">{t("dashMobileKomun")}</span>
        </button>
      </footer>

      {/* MODAL 1: ADD WORKER */}
      <Dialog open={isAddWorkerOpen} onOpenChange={setIsAddWorkerOpen}>
        <DialogContent className="max-w-md bg-white rounded-2xl dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle>{t("dashRegTitle")}</DialogTitle>
            <DialogDescription>
              {t("dashRegSub")}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddWorker} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">{t("dashRegName")}</label>
              <Input 
                value={newWorkerName} 
                onChange={(e) => setNewWorkerName(e.target.value)} 
                required 
                placeholder={t("dashRegNamePlaceholder")} 
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">{t("dashRegPhone")}</label>
              <Input 
                value={newWorkerPhone} 
                onChange={(e) => setNewWorkerPhone(e.target.value)} 
                placeholder="+386 40 111 222" 
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">E-mail</label>
              <Input 
                type="email"
                value={newWorkerEmail} 
                onChange={(e) => setNewWorkerEmail(e.target.value)} 
                placeholder="luka@podjetje.si" 
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">{t("dashRegRole")}</label>
              <Input 
                value={newWorkerRole} 
                onChange={(e) => setNewWorkerRole(e.target.value)} 
                placeholder={t("dashRegRole") === "Vloga delavca" ? "npr. Serviser, Monter..." : "e.g. Technician, Mechanic..."} 
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsAddWorkerOpen(false)}>{t("dashRegCancel")}</Button>
              <Button type="submit" className="bg-[#1B3A6B] hover:bg-[#142c52] text-white">{t("dashRegSubmit")}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: ADD ORDER / NEW TASK */}
      <Dialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen}>
        <DialogContent className="max-w-md bg-white rounded-2xl dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle>{t("dashNewOrderBtn")}</DialogTitle>
            <DialogDescription>
              {t("showcaseSlide1Desc")}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddOrder} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">{t("dashOrderTitleLabel")}</label>
              <Input 
                value={newOrderTitle} 
                onChange={(e) => setNewOrderTitle(e.target.value)} 
                required 
                placeholder={t("dashOrderTitlePlaceholder")} 
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">{t("dashOrderDescLabel")}</label>
              <Input 
                value={newOrderDesc} 
                onChange={(e) => setNewOrderDesc(e.target.value)} 
                placeholder={t("dashOrderDescPlaceholder")} 
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">{t("dashOrderPriority")}</label>
                <select 
                  value={newOrderPriority} 
                  onChange={(e) => setNewOrderPriority(e.target.value as any)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151c2c] text-sm"
                >
                  <option value="normalna">{t("dashRegRole") === "Vloga delavca" ? "Normalna" : "Normal"}</option>
                  <option value="danes">{t("dashRegRole") === "Vloga delavca" ? "Danes" : "Today"}</option>
                  <option value="visoka">{t("dashRegRole") === "Vloga delavca" ? "Visoka" : "High"}</option>
                  <option value="nujno">{t("dashUrgent")}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">{t("dashOrderWorker")}</label>
                <select 
                  value={newOrderWorkerId} 
                  onChange={(e) => setNewOrderWorkerId(e.target.value)}
                  required
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151c2c] text-sm"
                >
                  <option value="">{t("dashOrderWorkerSelect")}</option>
                  {workers.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsAddOrderOpen(false)}>{t("dashRegCancel")}</Button>
              <Button type="submit" className="bg-[#1B3A6B] hover:bg-[#142c52] text-white">{t("dashOrderCreate")}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL 3: WORKER PROFILE / DAILY CARD DETAIL */}
      <Dialog open={isWorkerDetailOpen} onOpenChange={setIsWorkerDetailOpen}>
        <DialogContent className="max-w-md bg-white rounded-3xl dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 p-6 overflow-hidden">
          {selectedWorker && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center font-bold text-sm">
                    {selectedWorker.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                      {selectedWorker.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{selectedWorker.role}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  selectedWorker.status === "zakasnitev"
                    ? "bg-amber-100 text-amber-800"
                    : selectedWorker.status === "koncano"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {selectedWorker.status === "zakasnitev" ? t("dashColTerenDelay") : selectedWorker.status === "koncano" ? t("dashColTerenDone") : t("dashColTerenStatus")}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-[#151c2c] p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedWorker.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedWorker.email}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  {t("dashWorkerDetailsTitle")}
                </h4>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {selectedWorker.tasks.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">{t("dashWorkerDetailsNoTasks")}</p>
                  ) : (
                    selectedWorker.tasks.map(t => (
                      <div 
                        key={t.id}
                        onClick={() => handleToggleTask(selectedWorker.id, t.id)}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0c111d] hover:border-slate-200 cursor-pointer transition-colors text-xs font-medium"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-colors ${
                            t.completed 
                              ? "bg-green-500 border-green-500 text-white" 
                              : "border-slate-300 dark:border-slate-600"
                          }`}>
                            {t.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className={t.completed ? "line-through text-slate-400 font-normal" : "font-medium text-slate-800 dark:text-slate-100"}>
                            {t.text}
                          </span>
                        </div>
                        {t.completedAt && (
                          <span className="text-[10px] text-slate-400 font-semibold bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded-md">
                            {t.completedAt}
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Attachments Section */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  {t("dashWorkerDetailsAttachments")} (2)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer">
                    <ImageIcon className="w-5 h-5 mb-1 text-slate-400" />
                    <span className="text-[9px] font-bold">foto1.png</span>
                  </div>
                  <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer">
                    <Paperclip className="w-5 h-5 mb-1 text-slate-400" />
                    <span className="text-[9px] font-bold">racun.pdf</span>
                  </div>
                  <div className="aspect-square bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer">
                    <Plus className="w-5 h-5 mb-1 text-slate-400" />
                    <span className="text-[9px] font-bold">{t("dashWorkerDetailsAdd")}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <Button className="bg-[#1B3A6B] hover:bg-[#142c52] text-white w-full h-10 rounded-xl" onClick={() => setIsWorkerDetailOpen(false)}>
                  {t("dashWorkerDetailsClose")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* MODAL 4: ORDER DETAILS */}
      <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
        <DialogContent className="max-w-md bg-white rounded-3xl dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 p-6">
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {getPriorityBadge(selectedOrder.priority)}
                <span className="text-xs text-slate-400">{selectedOrder.time}</span>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                  {selectedOrder.title}
                </h3>
                <p className="text-sm text-slate-500 mt-2">{selectedOrder.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  {t("dashOrderWorker")}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                    {selectedOrder.workerName.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span className="text-xs font-bold">{selectedOrder.workerName}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  {t("dashOrderPriority") === "Prioriteta" ? "Status naloga" : "Order Status"}
                </span>
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                  selectedOrder.status === "potrjeno"
                    ? "bg-green-100 text-green-800"
                    : selectedOrder.status === "zavrnjeno"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {selectedOrder.status === "caka_potrditev" 
                    ? (t("dashRegRole") === "Vloga delavca" ? "Čaka potrditev" : "Pending Confirmation") 
                    : selectedOrder.status === "potrjeno" 
                    ? t("dashColTerenDone") 
                    : t("dashColPisarnaDecline")}
                </span>
              </div>

              {selectedOrder.status === "caka_potrditev" && (
                <div className="flex items-center gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-slate-200 hover:bg-slate-50 text-slate-700"
                    onClick={() => {
                      handleDeclineOrder(selectedOrder.id);
                      setIsOrderDetailOpen(false);
                    }}
                  >
                    {t("dashColPisarnaDecline")}
                  </Button>
                  <Button 
                    className="flex-1 bg-[#1B3A6B] hover:bg-[#142c52] text-white"
                    onClick={() => {
                      handleApproveOrder(selectedOrder.id);
                      setIsOrderDetailOpen(false);
                    }}
                  >
                    {t("dashColPisarnaApprove")}
                  </Button>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <Button variant="outline" className="w-full" onClick={() => setIsOrderDetailOpen(false)}>
                  {t("dashWorkerDetailsClose")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
