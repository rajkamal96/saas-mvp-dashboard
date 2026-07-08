"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Worker } from "@/lib/mockData";
import { Info, Plus, Phone, Mail, FileText, Paperclip, Mic, MessageSquare } from "lucide-react";

interface WorkerDetailModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  worker: Worker | null;
}

export function WorkerDetailModal({ isOpen, onOpenChange, worker }: WorkerDetailModalProps) {
  if (!worker) return null;

  // Static high-fidelity mockup data matching the screenshot exactly for Anthony Hopkins
  const isAnthony = worker.name.toLowerCase().includes("hopkins");

  const tasks = [
    { text: "Začetek dela", completed: true, time: "9:11", attachment: true },
    { text: "Odstranjevanje elementov", completed: true, time: "9:18", attachment: false },
    { text: "Odvoz materiala - Stane", completed: true, time: "10:34", attachment: true },
    { text: "Menjava odvodnih cevi", completed: true, time: "10:51", attachment: false },
    { text: "Dostava ploščic - Adam", completed: false, time: "", attachment: false },
    { text: "Polaganje ploščic", completed: false, time: "", attachment: true },
    { text: "Menjava umivalnika, kadi", completed: false, time: "", attachment: false },
    { text: "Dnevno poročilo", completed: false, time: "", attachment: true },
  ];

  const attachments = [
    { name: "Contract", time: "9:11" },
    { name: "Photo - start", time: "9:18" },
    { name: "Furniture Payment", time: "9:33" },
    { name: "Import document", time: "9:42" },
    { name: "Photo - damage", time: "12:18" },
    { name: "Photo - finished", time: "14:54" },
  ];

  const timeline = [
    { time: "9:33", text: "Prevzem tovora", attachment: true },
    { time: "11:51", text: "Dostava v Celju (11:40)", attachment: false },
    { time: "10:23", text: "Zvočni zapis: Prometna nesreča pri Celju. Zamuda 45 minut.", attachment: true },
    { time: "10:29", text: "Zvočni zapis: Pokliči.", attachment: true },
    { time: "10:41", text: "Sporočilo: Peljem nazaj. Pokliči čimprej.", attachment: false },
    { time: "10:29", text: "Zvočni zapis: Pokliči.", attachment: true },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        style={{
          background: "#FFFFFF",
          border: "2px solid rgba(243, 242, 241, 0.2)",
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
          borderRadius: "9px",
          padding: "24px",
          maxWidth: "375px",
          width: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        className="outline-none"
      >
        <div className="flex flex-col gap-6 text-slate-800">
          {/* Card Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              {/* Thick yellow pill bar */}
              <div
                style={{
                  width: "32px",
                  height: "6px",
                  background: "#EAB308",
                  borderRadius: "3px",
                }}
              />
              {/* Progress */}
              <span className="text-sm font-normal text-slate-400">
                <strong className="text-red-500 font-bold">4</strong>/8
              </span>
            </div>

            {/* Worker Name & ID */}
            <span
              style={{
                fontFamily: "'PT Sans', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "15px",
                color: "#94A3B8",
                textTransform: "uppercase",
              }}
            >
              {worker.name} • #483
            </span>

            {/* Current Task Title & Subtitle */}
            <div className="flex items-start gap-2 mt-1">
              {/* Circle bullet with dot */}
              <div className="w-5 h-5 rounded-full border-2 border-[#6D778E] flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#6D778E]" />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'PT Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    lineHeight: "22px",
                    color: "#1C1A1A",
                  }}
                >
                  {worker.currentTask || "Kopalnica prenova"}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: "#94A3B8",
                    marginTop: "2px",
                  }}
                >
                  {worker.location || "Ljubljana"} • Novak • 23.05.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Komunikacija */}
          <div className="flex flex-col gap-2">
            <span
              style={{
                fontFamily: "'PT Sans', sans-serif",
                fontWeight: 700,
                fontSize: "12px",
                color: "#64748B",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Komunikacija
            </span>
            <div className="grid grid-cols-4 gap-3">
              {/* Glasovno button (Active) */}
              <div className="flex flex-col items-center gap-1.5 cursor-pointer">
                <div className="w-[52px] h-[52px] rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-100 transition-colors">
                  <Mic className="w-5 h-5 text-slate-800" />
                </div>
                <span className="text-[9px] font-bold text-slate-400 tracking-wider">GLASOVNO</span>
              </div>

              {/* Call button */}
              <div className="flex flex-col items-center gap-1.5 cursor-pointer">
                <div className="w-[52px] h-[52px] rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors">
                  <Phone className="w-5 h-5 text-slate-700" />
                </div>
              </div>

              {/* Email button */}
              <div className="flex flex-col items-center gap-1.5 cursor-pointer">
                <div className="w-[52px] h-[52px] rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors">
                  <span className="text-xl font-light text-slate-700">@</span>
                </div>
              </div>

              {/* Sporočila button (Active) */}
              <div className="flex flex-col items-center gap-1.5 cursor-pointer">
                <div className="w-[52px] h-[52px] rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-100 transition-colors">
                  <FileText className="w-5 h-5 text-slate-800" />
                </div>
                <span className="text-[9px] font-bold text-slate-400 tracking-wider">SPOROČILA</span>
              </div>
            </div>
          </div>

          {/* Section: Predvidena dela */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontFamily: "'PT Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "12px",
                  color: "#64748B",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Predvidena dela
              </span>
              <Info className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>

            {/* Checklist */}
            <div className="flex flex-col gap-3">
              {tasks.map((task, idx) => (
                <div key={idx} className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 min-w-0">
                    {/* Checkbox wrapper */}
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                        task.completed
                          ? "bg-emerald-50 border-emerald-300"
                          : "bg-slate-100 border-slate-300"
                      }`}
                    >
                      {task.completed && (
                        <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                          <path
                            d="M1 3.5L3.5 6L9 1"
                            stroke="#10B981"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    {/* Text */}
                    <span
                      style={{
                        fontFamily: "'PT Sans', sans-serif",
                        fontSize: "13px",
                        textDecoration: task.completed ? "line-through" : "none",
                        color: task.completed ? "#94A3B8" : "#334155",
                      }}
                      className="truncate"
                    >
                      {task.text}
                    </span>
                  </div>

                  {/* Attachment + Time group */}
                  <div className="flex items-center gap-2 shrink-0">
                    {task.attachment && (
                      <Paperclip className="w-3.5 h-3.5 text-slate-300" />
                    )}
                    {task.time && (
                      <span className="text-xs text-slate-400 font-normal">{task.time}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Priponke */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontFamily: "'PT Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "12px",
                  color: "#64748B",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Priponke
              </span>
              <Plus className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>

            <div className="flex flex-col gap-2">
              {attachments.map((att, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "'PT Sans', sans-serif",
                      fontSize: "13px",
                      color: "#334155",
                    }}
                  >
                    {att.name}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">{att.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Timeline */}
          <div className="flex flex-col gap-3">
            <span
              style={{
                fontFamily: "'PT Sans', sans-serif",
                fontWeight: 700,
                fontSize: "12px",
                color: "#64748B",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Timeline
            </span>

            <div className="flex flex-col gap-3">
              {timeline.map((event, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3">
                  <div className="flex gap-2">
                    <span className="text-xs text-slate-400 font-normal shrink-0 mt-0.5">
                      {event.time}
                    </span>
                    <span
                      style={{
                        fontFamily: "'PT Sans', sans-serif",
                        fontSize: "13px",
                        color: "#334155",
                        lineHeight: "16px",
                      }}
                    >
                      {event.text}
                    </span>
                  </div>
                  {event.attachment && (
                    <Paperclip className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
