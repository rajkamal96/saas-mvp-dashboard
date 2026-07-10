"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";
import { Button } from "@/components/ui/button";
import { WorkerDetailModal } from "@/components/dashboard/WorkerDetailModal";
import {
  AuraLabel,
  AuraInput,
  AuraFileInput,
  AuraIconButton,
  auraCard,
} from "@/components/dashboard/AuraForm";
import { initialWorkers, Worker } from "@/lib/mockData";

interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
  completedAt?: string;
  hasAttachment?: boolean;
  requiresAttachment?: boolean;
}

interface ChatMessage {
  id: string;
  sender: "worker" | "office";
  text: string;
  time: string;
  voiceUrl?: boolean;
}

export default function WorkerDashboard() {
  const { t } = useLanguage();
  const router = useRouter();

  // Tasks state matching the Figma screenshot and mockup
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: "t1", text: "Odvoz materiala", completed: true, completedAt: "10:34", hasAttachment: true },
    { id: "t2", text: "Dostava ploščic - Adam", completed: false },
    { id: "t3", text: "Polaganje ploščic", completed: false }
  ]);

  // Modal / bottom sheet controls inside the device
  const [chatOpen, setChatOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailKey, setDetailKey] = useState(0);
  const [addStepOpen, setAddStepOpen] = useState(false);
  const [newStepText, setNewStepText] = useState("");
  const [newStepHasAttachment, setNewStepHasAttachment] = useState(false);
  const [newStepAttachmentName, setNewStepAttachmentName] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "c1", sender: "office", text: "Luka, ne pozabi fotografirati končanega stanja pred odhodom.", time: "08:30" },
    { id: "c2", sender: "worker", text: "Razumem, bom uredil.", time: "08:32" }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Voice recording simulation
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const recordingTimer = useRef<NodeJS.Timeout | null>(null);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, chatOpen]);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      recordingTimer.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }
      setRecordingSeconds(0);
    }
    return () => {
      if (recordingTimer.current) clearInterval(recordingTimer.current);
    };
  }, [isRecording]);

  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed
                ? new Date().toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" })
                : undefined
            }
          : task
      )
    );
    showToast("Status opravila posodobljen!");
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg: ChatMessage = {
      id: `c_${Date.now()}`,
      sender: "worker",
      text: chatInput,
      time: new Date().toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" })
    };
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput("");
  };

  const handleStartRecord = () => {
    setIsRecording(true);
  };

  const handleStopRecord = () => {
    setIsRecording(false);
    setTimeout(() => {
      const voiceMsg: ChatMessage = {
        id: `c_voice_${Date.now()}`,
        sender: "worker",
        text: "Zaključil sem z delom na območju A. Vse je pokošeno in pospravljeno. Nalagam slike.",
        time: new Date().toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" }),
        voiceUrl: true
      };
      setChatMessages((prev) => [...prev, voiceMsg]);
      showToast("Glasovno sporočilo poslano!");
    }, 400);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const done = tasks.filter(t => t.completed).length;
  const total = tasks.length;

  const completedTasks = tasks.filter(t => t.completed);
  const upcomingTasks = tasks.filter(t => !t.completed);
  const displayTasks = [
    ...completedTasks.slice(-1),
    ...upcomingTasks.slice(0, 2),
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0b0f19] flex items-center justify-center p-4 font-sans antialiased text-slate-800 dark:text-slate-200">
      
      {/* ── Mobile Screen 2 Frame (Figma: Group 1000003975) ── */}
      <div 
        style={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "8px",
          isolation: "isolate",
          width: "391px",
          height: "828px",
          background: "#F1F5F9",
          border: "8px solid #FFFFFF",
          boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.1)",
          borderRadius: "48px",
          position: "relative",
          overflow: "hidden",
          gap: "20px"
        }}
        className="select-none"
      >
        
        {/* Toast alerts */}
        {toastMessage && (
          <div className="absolute top-[80px] left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[11px] font-semibold py-2 px-4 rounded-full shadow-lg z-40 animate-in fade-in duration-200">
            {toastMessage}
          </div>
        )}

        {/* ── Status Bar ── */}
        <div 
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px 8px",
            width: "100%",
            height: "48px"
          }}
          className="shrink-0"
        >
          {/* Time */}
          <span 
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "20px",
              color: "#1E293B"
            }}
          >
            10:24
          </span>

          {/* Right side connection & battery icons */}
          <div className="flex items-center gap-1.5 text-[#1E293B]">
            {/* Network Icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 14.6665H14" stroke="#1E293B" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 7.33301C2 6.70434 2 6.39034 2.19533 6.19501C2.39067 5.99967 2.70467 5.99967 3.33333 5.99967C3.962 5.99967 4.276 5.99967 4.47133 6.19501C4.66667 6.39034 4.66667 6.70434 4.66667 7.33301V11.333C4.66667 11.9617 4.66667 12.2757 4.47133 12.471C4.276 12.6663 3.962 12.6663 3.33333 12.6663C2.70467 12.6663 2.39067 12.6663 2.19533 12.471C2 12.2757 2 11.9617 2 11.333V7.33301M6.66667 4.66634C6.66667 4.03767 6.66667 3.72367 6.862 3.52834C7.05733 3.33301 7.37133 3.33301 8 3.33301C8.62867 3.33301 8.94267 3.33301 9.138 3.52834C9.33333 3.72367 9.33333 4.03767 9.33333 4.66634V11.333C9.33333 11.9617 9.33333 12.2757 9.138 12.471C8.94267 12.6663 8 12.6663 7.37133 12.6663C7.05733 12.6663 6.862 12.471C6.66667 12.2757 6.66667 11.9617 6.66667 11.333V4.66634M11.3333 2.66634C11.3333 2.03767 11.3333 1.72367 11.5287 1.52834C11.724 1.33301 12.038 1.33301 12.6667 1.33301C13.2953 1.33301 13.6093 1.33301 13.8047 1.52834C14 1.72367 14 2.03767 14 2.66634V11.333C14 11.9617 14 12.2757 13.8047 12.471C13.6093 12.6663 13.2953 12.6663 12.6667 12.6663C12.038 12.6663 11.724 12.6663 11.5287 12.471C11.3333 12.2757 11.3333 11.9617 11.3333 11.333V2.66634" stroke="#1E293B"/>
            </svg>

            {/* Charge Icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.66602 9.99967C1.66602 6.85717 1.66602 5.28551 2.64268 4.30967C3.61935 3.33384 5.19018 3.33301 8.33268 3.33301H9.58268C12.7252 3.33301 14.2968 3.33301 15.2727 4.30967C16.2485 5.28634 16.2493 6.85717 16.2493 9.99967C16.2493 13.1422 16.2493 14.7138 15.2727 15.6897C14.296 16.6655 12.7252 16.6663 9.58268 16.6663H8.33268C5.19018 16.6663 3.61852 16.6663 2.64268 15.6897C1.66685 14.713 1.66602 13.1422 1.66602 9.99967V9.99967M16.666 8.33301C17.4518 8.33301 17.8443 8.33301 18.0885 8.57717C18.3327 8.8222 18.3327 9.21384 18.3327 9.99967C18.3327 10.7855 18.3327 11.178 18.0885 11.4222C17.8443 11.6663 17.4518 11.6663 16.666 11.6663V8.33301" stroke="#1E293B" strokeWidth="1.25"/>
              <path d="M9.58333 7.5L7.5 10H10.4167L8.33333 12.5" stroke="#1E293B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* ── Header Row ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 20px 16px",
            width: "100%",
            height: "56px"
          }}
          className="shrink-0"
        >
          <h2
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 600,
              fontSize: "30px",
              lineHeight: "36px",
              letterSpacing: "-0.75px",
              color: "#0F172A"
            }}
          >
            Zaslon za terence
          </h2>

          {/* Settings / Signout confirm Button */}
          <button 
            onClick={() => router.push("/login")}
            style={{
              boxSizing: "border-box",
              width: "36px",
              height: "36px",
              // background: "rgba(255, 255, 255, 0.9)",
              border: "0.7px solid rgba(96, 165, 250, 0.5)",
              boxShadow: "0px 8px 18px -12px rgba(15, 23, 42, 0.35), inset 0px 1px 0px 1px #FFFFFF",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748B"
            }}
            className="hover:bg-slate-100 transition-colors shrink-0"
          >
            <iconify-icon icon="solar:settings-linear" className="text-lg"></iconify-icon>
          </button>
        </div>

        {/* Scrollable middle container to keep components in viewport */}
        <div className="flex-1 w-full overflow-y-auto px-3 pb-4 flex flex-col gap-5">

          {/* ── Main Task Card ── */}
          <div
            style={{
              // background: "linear-gradient(180deg, rgba(96, 165, 250, 0.08) 0%, rgba(37, 99, 235, 0.08) 100%)",
              border: "1px solid #1D4ED8",
              boxShadow: "0px 24px 60px -30px rgba(59, 130, 246, 0.55), inset 0px 1px 0px 1px rgba(255, 255, 255, 0.35)",
              borderRadius: "32px 32px 4px 4px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              overflow: "hidden",
              gap: "10px"
            }}
          >
            {/* Meta information & progress indicator */}
            <div 
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px 20px 12px 20px"
              }}
            >
              <span
                style={{
                  fontFamily: "'PT Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "10px",
                  lineHeight: "15px",
                  color: "#94A3B8"
                }}
              >
                ANTHONY H. • 23/05/26 • #484
              </span>

              {/* Progress badge */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid rgba(29, 78, 216, 0.5)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                  paddingTop: "3px"
                }}
              >
                <span
                  style={{
                    fontFamily: "'PT Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#EB1D1D",
                    lineHeight: "27px"
                  }}
                >
                  {done}
                </span>
                <span
                  style={{
                    fontFamily: "'PT Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "#5A5A65",
                    lineHeight: "27px"
                  }}
                >
                  /{total}
                </span>
              </div>
            </div>

            {/* Inner white details block - width same as outer card, without border radius */}
            <div
              style={{
                background: "#FFFFFF",
                borderTop: "1px solid rgba(29, 78, 216, 0.15)",
                borderBottom: "1px solid rgba(29, 78, 216, 0.15)",
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "2px"
              }}
            >
              <p 
                style={{ 
                  fontFamily: "'Source Sans 3', sans-serif", 
                  fontWeight: 400, 
                  fontSize: "16px", 
                  color: "#0F172A", 
                  lineHeight: "20px" 
                }}
              >
                Kopalnica prenova
              </p>
              <p 
                style={{ 
                  fontFamily: "'Source Sans 3', sans-serif", 
                  fontWeight: 400, 
                  fontSize: "14px", 
                  color: "#465467", 
                  lineHeight: "20px", 
                  marginTop: "2px" 
                }}
              >
                Ljubljana • Novak d.o.o.
              </p>
            </div>

            {/* Bottom block (tasks list) - same background as top, padded */}
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: "10px", 
                padding: "20px 20px 20px 20px" 
              }}
            >
              {displayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-2 w-full group"
                >
                  {/* Checkbox */}
                  <button
                    type="button"
                    onClick={() => handleToggleTask(task.id)}
                    className="shrink-0 flex items-center justify-center transition-all"
                    style={{
                      width: "16px",
                      height: "16px",
                      background: task.completed ? "transparent" : "#E1E4E8",
                      borderRadius: "4px",
                      border: task.completed ? "2px solid #41C46D" : "none"
                    }}
                  >
                    {task.completed && (
                      <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                        <path d="M1 3.5L3.5 6L9 1" stroke="#41C46D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>

                  {/* Task text */}
                  <button
                    type="button"
                    onClick={() => handleToggleTask(task.id)}
                    className="flex-1 text-left truncate transition-all bg-transparent border-none p-0 outline-none"
                    style={{
                      fontFamily: "'PT Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: task.completed ? "12px" : "14px",
                      lineHeight: task.completed ? "16px" : "18px",
                      letterSpacing: task.completed ? "-0.2px" : "0.1px",
                      color: "#64748B"
                    }}
                  >
                    {task.text}
                  </button>

                  {/* Meta labels (Time + Attachment icon) */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {task.hasAttachment && (
                      <svg width="13" height="15" viewBox="0 0 14 16" fill="none" className="text-slate-400">
                        <path d="M0.5 7.54918L6.15229 1.78552C7.83319 0.0714946 10.5585 0.0714946 12.2394 1.78552C13.9203 3.49954 13.9201 6.27867 12.2392 7.99269L5.71734 14.6431C4.59674 15.7858 2.7802 15.7856 1.6596 14.6429C0.538995 13.5002 0.53872 11.6478 1.65932 10.5051L8.1812 3.85471C8.7415 3.28337 9.65041 3.28337 10.2107 3.85471C10.771 4.42605 10.7706 5.35216 10.2103 5.9235L4.55802 11.6872" stroke="currentColor" strokeOpacity="0.15" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {task.completed && task.completedAt && (
                      <span 
                        style={{
                          fontFamily: "'PT Sans', sans-serif",
                          fontWeight: 400,
                          fontSize: "12px",
                          lineHeight: "16px",
                          letterSpacing: "0.1px",
                          color: "#D3D3D3",
                          textAlign: "right"
                        }}
                      >
                        {task.completedAt}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Quick Actions Grid ── */}
          <div className="flex flex-col gap-[30px] mt-[10px] px-1.5">
            {/* Row 1 */}
            <div className="flex justify-between items-center w-full">
              {/* PODROBNO */}
              <button 
                onClick={() => {
                  setIsDetailModalOpen(true);
                  setDetailKey(k => k + 1);
                }}
                className="flex items-center gap-3 w-1/2 text-left hover:opacity-80 transition-opacity bg-transparent border-none p-0 outline-none"
                style={{ background: "transparent", border: "none", padding: 0 }}
              >
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "36px",
                    height: "36px",
                    border: "0.7px solid rgba(96, 165, 250, 0.5)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent"
                  }}
                  className="shrink-0"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.2917 8.95833C17.2917 13.5608 13.5608 17.2917 8.95833 17.2917C4.35583 17.2917 0.625 13.5608 0.625 8.95833C0.625 4.35583 4.35583 0.625 8.95833 0.625C13.5608 0.625 17.2917 4.35583 17.2917 8.95833V8.95833" stroke="#3B82F6" strokeWidth="1.25"/>
                    <path d="M0.625 8.95833H3.125M14.7917 8.95833H17.2917M8.95833 17.2917V14.7917M8.95833 3.125V0.625" stroke="#3B82F6" strokeWidth="1.25" strokeLinecap="round"/>
                    <path d="M7.29199 8.95817H10.6253M8.95866 10.6248V7.2915" stroke="#3B82F6" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-sans font-medium text-[11px] text-[#5A5A65] tracking-wide uppercase">PODROBNO</span>
              </button>

              {/* DODAJ KORAK */}
              <button 
                onClick={() => setAddStepOpen(true)}
                className="flex items-center justify-end gap-3 w-1/2 text-right hover:opacity-80 transition-opacity bg-transparent border-none p-0 outline-none"
                style={{ background: "transparent", border: "none", padding: 0 }}
              >
                <span className="font-sans font-medium text-[11px] text-[#5A5A65] tracking-wide uppercase">DODAJ KORAK</span>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "36px",
                    height: "36px",
                    border: "0.7px solid rgba(96, 165, 250, 0.5)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent"
                  }}
                  className="shrink-0"
                >
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.9705 9.48535H9.48528M9.48528 9.48535H1M9.48528 9.48535V1.00007M9.48528 9.48535V17.9706" stroke="#6D778E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            </div>

            {/* Row 2 */}
            <div className="flex justify-between items-center w-full">
              {/* POKLIČI */}
              <button 
                onClick={() => window.location.href = "tel:+38640123456"}
                className="flex items-center gap-3 w-1/2 text-left hover:opacity-80 transition-opacity bg-transparent border-none p-0 outline-none"
                style={{ background: "transparent", border: "none", padding: 0 }}
              >
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "36px",
                    height: "36px",
                    border: "0.7px solid rgba(96, 165, 250, 0.5)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent"
                  }}
                  className="shrink-0"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.0818 19.7117C11.3845 22.5175 0.98909 3.99501 7.53545 0.865835L9.45091 0L12.6255 5.68084L10.7318 6.53585C8.74182 7.51418 12.8864 14.9359 14.9218 14.0309C15.0045 13.9967 16.7918 13.1917 16.7982 13.1884L20 18.8509C19.9927 18.8542 18.1918 19.6659 18.0818 19.7117ZM9.50182 17.825C8.16 18.7184 6.31455 18.8 5.75273 17.9134C5.32545 17.2392 5.47 16.4734 5.63727 15.5859C5.82 14.6184 6.02727 13.5209 5.36909 12.4942C4.26091 10.7642 1.82636 10.8417 0 11.9359L0.869091 13.155C1.62273 12.7034 2.49091 12.5092 3.13545 12.6475C4.63818 12.9709 4.18182 14.7525 4.07182 15.3384C3.87909 16.3575 3.66273 17.5134 4.37818 18.645C5.50818 20.4309 8.54091 20.375 10.5927 18.9084C10.2182 18.5692 9.85545 18.2059 9.50182 17.825Z" fill="#6D778E"/>
                  </svg>
                </div>
                <span className="font-sans font-medium text-[11px] text-[#5A5A65] tracking-wide uppercase">POKLIČI</span>
              </button>

              {/* E-POŠTA */}
              <button 
                onClick={() => window.location.href = "mailto:pisarna@dnevnik.app"}
                className="flex items-center justify-end gap-3 w-1/2 text-right hover:opacity-80 transition-opacity bg-transparent border-none p-0 outline-none"
                style={{ background: "transparent", border: "none", padding: 0 }}
              >
                <span className="font-sans font-medium text-[11px] text-[#5A5A65] tracking-wide uppercase">E-POŠTA</span>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "36px",
                    height: "36px",
                    border: "0.7px solid rgba(96, 165, 250, 0.5)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent"
                  }}
                  className="shrink-0"
                >
                  <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.035 19C3.52417 19 0 15.0232 0 9.88904C0 4.40256 3.96833 0 11.0633 0C16.2417 0 20 3.29335 20 7.83049C20 14.9359 11.3917 16.8118 11.8233 12.7583C11.2317 13.662 10.2783 14.6782 8.44583 14.6782C6.34917 14.6782 5.04583 13.1759 5.04583 10.7576C5.04583 7.13316 7.48 4.07061 10.3617 4.07061C11.7442 4.07061 12.695 4.78507 13.0925 5.88204L13.4792 4.551H15.4275C15.2242 5.22957 13.4933 11.5055 13.4933 11.5055C12.9533 13.6799 14.6183 13.7182 16.095 12.5634C18.8692 10.4591 19.0125 4.95634 15.2633 2.66127C11.2458 0.3034 2.10083 1.76249 2.10083 9.7512C2.10083 14.3275 5.3925 17.4023 10.2917 17.4023C13.155 17.4023 14.91 16.6438 16.3708 15.8135L17.3517 17.1984C15.9258 17.9862 13.6342 19 10.035 19ZM8.08167 7.33298C7.48583 8.42587 7.10083 9.84173 7.10083 10.9411C7.10083 13.8854 10.0358 13.9042 11.4775 11.1361C12.0708 9.99914 12.4533 8.54984 12.4533 7.44226C12.4533 5.06319 9.54083 4.64153 8.08167 7.33298Z" fill="#6D778E"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* ── Bottom Voice / Message Control Panel ── */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.3)",
              border: "1px solid #1D4ED8",
              boxShadow: "inset 0px 1px 0px 1px rgba(255, 255, 255, 0.35)",
              borderRadius: "4px 4px 32px 32px",
              padding: "16px 20px",
              display: "flex",
              gap: "20px",
              width: "100%",
              marginTop: "auto"
            }}
          >
            {/* GLASOVNO */}
            <button
              onClick={handleStartRecord}
              className="flex-1 flex flex-col items-center gap-2 group cursor-pointer bg-transparent border-none p-0 outline-none"
              style={{ background: "transparent", border: "none", padding: 0 }}
            >
              <div
                style={{
                  boxSizing: "border-box",
                  width: "72px",
                  height: "72px",
                  border: "0.7px solid rgba(96, 165, 250, 0.5)",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent"
                }}
                className="group-hover:scale-[1.03] transition-transform"
              >
                <svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.8542 17.1124C19.2762 18.3754 8.94271 26.6494 6.55021 28.5664L2.50471 24.5209L14.0067 10.2649L20.8542 17.1124ZM28.8177 2.31188C25.7352 -0.770625 20.7357 -0.770625 17.6532 2.31188C15.6207 4.34588 15.4482 6.57487 15.3492 7.36538L23.7642 15.7804C24.4902 15.6994 26.7672 15.5269 28.8177 13.4764C31.9017 10.3939 31.9017 5.39438 28.8177 2.31188ZM14.0667 29.2219C10.6287 29.2219 9.05821 31.3624 6.84271 32.7544C5.27371 33.7384 3.78871 33.2389 3.07471 32.3554C2.81521 32.0389 2.07421 30.8989 3.33571 29.5924L3.14821 29.4049L1.45921 27.7684C-0.598793 29.8924 -0.234293 32.4304 1.04071 34.0039C2.50321 35.8099 5.44471 36.7219 8.23321 34.9714C10.6107 33.4789 11.6637 31.8394 14.0667 31.8394C15.6207 31.8394 17.0367 32.5354 19.2942 35.9989L21.4857 34.5709C19.3962 31.3609 17.3337 29.2219 14.0667 29.2219Z" fill="#6D778E"/>
                </svg>
              </div>
              <span className="font-sans font-medium text-[11px] text-[#5A5A65] uppercase tracking-wide">GLASOVNO</span>
            </button>

            {/* SPOROČILA */}
            <button
              onClick={() => setChatOpen(true)}
              className="flex-1 flex flex-col items-center gap-2 group cursor-pointer bg-transparent border-none p-0 outline-none"
              style={{ background: "transparent", border: "none", padding: 0 }}
            >
              <div
                style={{
                  boxSizing: "border-box",
                  width: "72px",
                  height: "72px",
                  border: "0.7px solid rgba(96, 165, 250, 0.5)",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent"
                }}
                className="group-hover:scale-[1.03] transition-transform"
              >
                <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.478 25.9492C16.388 32.7082 16.002 33.714 16.002 34.5892C16.002 35.5815 16.772 36 17.256 36C17.8 36 19.472 35.3228 24.914 33.1898L18.478 25.9492ZM20.254 23.9513L26.694 31.1962L39.51 16.794C39.836 16.4272 40 15.948 40 15.4643C40 14.985 39.836 14.5035 39.51 14.1345C38.35 12.8317 36.594 10.8563 35.432 9.5535C35.106 9.18675 34.678 9.00225 34.25 9.00225C33.824 9.00225 33.394 9.18675 33.066 9.5535L20.254 23.9513ZM14 21.9375C14 21.033 13.288 20.25 12.5 20.25C7.378 20.25 6.622 20.25 1.5 20.25C0.712 20.25 0 21.033 0 21.9375C0 22.842 0.712 23.625 1.5 23.625H12.5C13.288 23.625 14 22.842 14 21.9375ZM24 15.1875C24 14.283 23.288 13.5 22.5 13.5C17.378 13.5 6.622 13.5 1.5 13.5C0.712 13.5 0 14.283 0 15.1875C0 16.092 0.712 16.875 1.5 16.875H22.5C23.288 16.875 24 16.092 24 15.1875ZM24 8.4375C24 7.533 23.288 6.75 22.5 6.75C17.378 6.75 6.622 6.75 1.5 6.75C0.712 6.75 0 7.533 0 8.4375C0 9.342 0.712 10.125 1.5 10.125H22.5C23.288 10.125 24 9.342 24 8.4375ZM24 1.6875C24 0.783 23.288 0 22.5 0C17.378 0 6.622 0 1.5 0C0.712 0 0 0.783 0 1.6875C0 2.592 0.712 3.375 1.5 3.375H22.5C23.288 3.375 24 2.592 24 1.6875Z" fill="#6D778E"/>
                </svg>
              </div>
              <span className="font-sans font-medium text-[11px] text-[#5A5A65] uppercase tracking-wide">SPOROČILA</span>
            </button>
          </div>

        </div>

        {/* ── Home Indicator capsule ── */}
        <div 
          style={{
            width: "128px",
            height: "4px",
            background: "#0F172A",
            borderRadius: "9999px",
            alignSelf: "center",
            marginTop: "12px",
            marginBottom: "8px"
          }}
          className="shrink-0"
        />

        {/* ── Slide-up drawer: Klepet s pisarno ── */}
        {chatOpen && (
          <div className="absolute inset-x-0 bottom-0 top-[100px] bg-white rounded-t-[32px] border-t border-slate-200 shadow-2xl z-30 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h4 className="font-bold text-sm text-slate-800">Klepet s pisarno</h4>
                <p className="text-[10px] text-slate-400">Povezava vzpostavljena</p>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="w-7 h-7 flex items-center justify-center hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <iconify-icon icon="solar:close-circle-linear" className="text-xl"></iconify-icon>
              </button>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
              {chatMessages.map(m => (
                <div 
                  key={m.id}
                  className={`flex flex-col max-w-[85%] ${
                    m.sender === "worker" ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <div className={`p-3 rounded-2xl text-xs leading-normal shadow-sm ${
                    m.sender === "worker"
                      ? "bg-[#1B3A6B] text-white rounded-tr-none"
                      : "bg-white border border-slate-200/60 rounded-tl-none text-slate-800"
                  }`}>
                    {m.voiceUrl && (
                      <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-white/10">
                        <iconify-icon icon="solar:microphone-large-bold" className="text-[10px] text-emerald-400 animate-pulse"></iconify-icon>
                        <span className="text-[8px] font-bold tracking-wider text-emerald-300 uppercase">AI PREPIS</span>
                      </div>
                    )}
                    <p className={m.voiceUrl ? "italic" : ""}>{m.text}</p>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">{m.time}</span>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Input row */}
            <div className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
              <input 
                type="text"
                placeholder="Vpišite sporočilo..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                className="flex-1 h-10 text-xs px-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
              />
              <button 
                onClick={handleSendMessage}
                className="w-10 h-10 rounded-xl bg-[#1B3A6B] hover:bg-[#142c52] text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <iconify-icon icon="solar:send-bold" className="text-lg"></iconify-icon>
              </button>
            </div>
          </div>
        )}

        {/* ── Slide-up drawer: Podrobnosti naloga ── */}
        {detailOpen && (
          <div className="absolute inset-x-0 bottom-0 top-[150px] bg-white rounded-t-[32px] border-t border-slate-200 shadow-2xl z-30 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h4 className="font-bold text-sm text-slate-800">Podrobnosti delovnega naloga</h4>
                <p className="text-[10px] text-slate-400">Pregled celotnih navodil</p>
              </div>
              <button 
                onClick={() => setDetailOpen(false)}
                className="w-7 h-7 flex items-center justify-center hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <iconify-icon icon="solar:close-circle-linear" className="text-xl"></iconify-icon>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-slate-700">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">DELOVNI NALOG</span>
                <h3 className="text-base font-bold text-slate-900 mt-1">Kopalnica prenova</h3>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">NAROČNIK & LOKACIJA</span>
                <p className="text-xs font-semibold text-slate-800 mt-1">Novak d.o.o. · Ljubljana</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">OPIS IN NAVODILA</span>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Celotna prenova glavne kopalnice v pritličju. Odstranite stare ploščice, pripravite podlago, izvedite dostavo novih ploščic (Adam) ter polaganje po načrtu. Bodite pozorni na hidroizolacijo pri tuš kabini.
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">VODJA PROJEKTA</span>
                <p className="text-xs text-slate-600 mt-1">Maks Novak (Vodja pisarne)</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Popup modal: Dodaj nov korak ── */}
        {addStepOpen && (
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm z-30 flex items-center justify-center p-4">
            <div className={auraCard}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newStepText.trim()) return;
                  setTasks(prev => [
                    ...prev,
                    {
                      id: `t_${Date.now()}`,
                      text: newStepText,
                      completed: false,
                      hasAttachment: newStepHasAttachment,
                    },
                  ]);
                  showToast("Korak uspešno dodan!");
                  setAddStepOpen(false);
                  setNewStepText("");
                  setNewStepHasAttachment(false);
                  setNewStepAttachmentName("");
                }}
                className="w-full max-w-[280px] flex flex-col gap-4"
              >
                <div className="text-center">
                  <h4 className="text-lg font-semibold tracking-tight text-slate-900">
                    Dodaj nov korak
                  </h4>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <AuraLabel strong>Naziv koraka *</AuraLabel>
                    <AuraInput
                      type="text"
                      placeholder="npr. Čiščenje delovnega območja"
                      value={newStepText}
                      onChange={(e) => setNewStepText(e.target.value)}
                      maxLength={30}
                      required
                      strong
                    />
                    <div className="flex justify-end mt-1">
                      <span className="text-[10px] text-slate-400">
                        {newStepText.length}/30
                      </span>
                    </div>
                  </div>

                  <AuraIconButton
                    active={newStepHasAttachment}
                    onClick={() => {
                      setNewStepHasAttachment(!newStepHasAttachment);
                      if (newStepHasAttachment) setNewStepAttachmentName("");
                    }}
                    icon={
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                      </svg>
                    }
                    label="Priponka"
                    title="Dodaj prilogo"
                  />

                  {newStepHasAttachment && (
                    <div className="flex flex-col gap-1">
                      <AuraFileInput
                        id="step-attachment"
                        onFileSelect={setNewStepAttachmentName}
                      />
                      {newStepAttachmentName && (
                        <span className="text-[11px] text-slate-500 truncate">
                          {newStepAttachmentName}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAddStepOpen(false);
                      setNewStepText("");
                      setNewStepHasAttachment(false);
                      setNewStepAttachmentName("");
                    }}
                    className="flex-1 h-9 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    Prekliči
                  </button>
                  <button type="submit" className="flex-1 h-9 rounded-xl bg-[#1B3A6B] hover:bg-[#142c52] text-white text-xs font-semibold transition-colors">
                    Dodaj
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── Audio Recording Overlay ── */}
        {isRecording && (
          <div className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-white px-6 text-center rounded-[40px]">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-6 animate-pulse shadow-lg">
              <iconify-icon icon="solar:microphone-large-bold" className="text-3xl text-white"></iconify-icon>
            </div>
            
            <h3 className="font-bold text-base tracking-wide">Snemam glasovno...</h3>
            <span className="text-sm font-semibold text-slate-400 mt-1">
              00:{recordingSeconds.toString().padStart(2, "0")}
            </span>
            
            <p className="text-xs text-slate-500 max-w-[220px] mt-3 leading-normal">
              Prepis se samodejno sinhronizira z delovnim nalogom v pisarni.
            </p>

            <Button 
              onClick={handleStopRecord}
              className="mt-10 rounded-full h-11 px-6 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs cursor-pointer"
            >
              Ustavi in pošlji transkript
            </Button>
          </div>
        )}

        <WorkerDetailModal
          key={detailKey}
          isOpen={isDetailModalOpen}
          onOpenChange={setIsDetailModalOpen}
          worker={{
            ...initialWorkers[0],
            id: `mobile-${initialWorkers[0].id}`,
            tasks,
          } as Worker}
          onTasksChange={(updatedTasks) => setTasks(updatedTasks as TaskItem[])}
          inlineDrawer={true}
        />
      </div>
    </div>
  );
}
