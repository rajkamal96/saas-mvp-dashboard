"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Worker } from "@/lib/mockData";
import { Paperclip } from "lucide-react";
import {
  AuraLabel,
  AuraInput,
  AuraSelect,
  AuraFileInput,
  AuraIconButton,
  auraCard,
  auraButton,
} from "./AuraForm";

interface WorkerDetailModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  worker: Worker | null;
  inlineDrawer?: boolean;
  onTasksChange?: (tasks: TaskItem[]) => void;
}

interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
  time?: string;
  attachment: boolean;
  requiresAttachment?: boolean;
}

interface AttachmentItem {
  id: string;
  name: string;
  time: string;
  url?: string;
}

interface TimelineItem {
  id: string;
  time: string;
  text: string;
  type: "step" | "attachment" | "message" | "voice";
}

function nowTime() {
  return new Date().toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" });
}

export function WorkerDetailModal({ isOpen, onOpenChange, worker, inlineDrawer = false, onTasksChange }: WorkerDetailModalProps) {
  const [addTaskOpen, setAddTaskOpen] = React.useState(false);
  const [addStepOpen, setAddStepOpen] = React.useState(false);

  // Sub-dialog: Dodaj opravilo
  const [taskOpravilo, setTaskOpravilo] = React.useState("");
  const [taskKraj, setTaskKraj] = React.useState("");
  const [taskNarocnik, setTaskNarocnik] = React.useState("");
  const [taskDatum, setTaskDatum] = React.useState("");
  const [taskOdgovorni, setTaskOdgovorni] = React.useState("");

  // Sub-dialog: Dodaj korak
  const [stepText, setStepText] = React.useState("");
  const [stepHasAttachment, setStepHasAttachment] = React.useState(false);
  const [stepAttachmentName, setStepAttachmentName] = React.useState("");

  // Confirm step completion
  const [confirmStepId, setConfirmStepId] = React.useState<string | null>(null);

  // Attachment preview
  const [previewAttachment, setPreviewAttachment] = React.useState<AttachmentItem | null>(null);

  // Attach-only dialog
  const [attachOnlyOpen, setAttachOnlyOpen] = React.useState(false);
  const [attachOnlyName, setAttachOnlyName] = React.useState("");

  // Core lists
  const [tasks, setTasks] = React.useState<TaskItem[]>([
    { id: "s1", text: "Začetek dela", completed: true, time: "9:11", attachment: true },
    { id: "s2", text: "Odstranjevanje elementov", completed: true, time: "9:18", attachment: false },
    { id: "s3", text: "Odvoz materiala - Stane", completed: true, time: "10:34", attachment: true },
    { id: "s4", text: "Menjava odvodnih cevi", completed: true, time: "10:51", attachment: false },
    { id: "s5", text: "Dostava ploščic - Adam", completed: false, time: "", attachment: false, requiresAttachment: true },
    { id: "s6", text: "Polaganje ploščic", completed: false, time: "", attachment: true },
    { id: "s7", text: "Menjava umivalnika, kadi", completed: false, time: "", attachment: false },
    { id: "s8", text: "Dnevno poročilo", completed: false, time: "", attachment: true, requiresAttachment: true },
  ]);

  const [attachments, setAttachments] = React.useState<AttachmentItem[]>([
    { id: "a1", name: "Contract", time: "9:11" },
    { id: "a2", name: "Photo - start", time: "9:18" },
    { id: "a3", name: "Furniture Payment", time: "9:33" },
    { id: "a4", name: "Import document", time: "9:42" },
    { id: "a5", name: "Photo - damage", time: "12:18" },
    { id: "a6", name: "Photo - finished", time: "14:54" },
  ]);

  const [timeline, setTimeline] = React.useState<TimelineItem[]>([
    { id: "t1", time: "9:33", text: "Prevzem tovora", type: "attachment" },
    { id: "t2", time: "11:51", text: "Dostava v Celju (11:40)", type: "message" },
    { id: "t3", time: "10:23", text: "Zvočni zapis: Prometna nesreča pri Celju. Zamuda 45 minut.", type: "voice" },
    { id: "t4", time: "10:29", text: "Zvočni zapis: Pokliči.", type: "voice" },
    { id: "t5", time: "10:41", text: "Sporočilo: Peljem nazaj. Pokliči čimprej.", type: "message" },
  ]);

  const addTimeline = (text: string, type: TimelineItem["type"]) => {
    setTimeline(prev => [{ id: `e_${Date.now()}`, time: nowTime(), text, type }, ...prev]);
  };

  const resetAddTask = () => {
    setTaskOpravilo("");
    setTaskKraj("");
    setTaskNarocnik("");
    setTaskDatum("");
    setTaskOdgovorni("");
  };

  const resetAddStep = () => {
    setStepText("");
    setStepHasAttachment(false);
    setStepAttachmentName("");
  };

  if (!worker) return null;

  const renderContentBody = () => (
    <div className="flex flex-col gap-[48px] text-[#1E293B]">
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
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
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
              {tasks.filter(t => t.completed).length}
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
              /{tasks.length}
            </span>
          </div>
        </div>

        {/* Worker Name & ID */}
        <span
          style={{
            fontFamily: "'PT Sans', sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "15px",
            color: "#64748B",
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
                color: "#020617",
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
                color: "#64748B",
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
            color: "#5A5A65",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Komunikacija
        </span>

        {/* 2x2 grid with thin blue borders, identical to mobile dashboard */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          {/* GLASOVNO */}
          <div className="flex items-center gap-3">
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
                background: "transparent",
              }}
            >
              <svg width="18" height="20" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.8542 17.1124C19.2762 18.3754 8.94271 26.6494 6.55021 28.5664L2.50471 24.5209L14.0067 10.2649L20.8542 17.1124ZM28.8177 2.31188C25.7352 -0.770625 20.7357 -0.770625 17.6532 2.31188C15.6207 4.34588 15.4482 6.57487 15.3492 7.36538L23.7642 15.7804C24.4902 15.6994 26.7672 15.5269 28.8177 13.4764C31.9017 10.3939 31.9017 5.39438 28.8177 2.31188ZM14.0667 29.2219C10.6287 29.2219 9.05821 31.3624 6.84271 32.7544C5.27371 33.7384 3.78871 33.2389 3.07471 32.3554C2.81521 32.0389 2.07421 30.8989 3.33571 29.5924L3.14821 29.4049L1.45921 27.7684C-0.598793 29.8924 -0.234293 32.4304 1.04071 34.0039C2.50321 35.8099 5.44471 36.7219 8.23321 34.9714C10.6107 33.4789 11.6637 31.8394 14.0667 31.8394C15.6207 31.8394 17.0367 32.5354 19.2942 35.9989L21.4857 34.5709C19.3962 31.3609 17.3337 29.2219 14.0667 29.2219Z" fill="#6D778E"/>
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'PT Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                color: "#5A5A65",
                letterSpacing: "0.5px",
              }}
            >
              GLASOVNO
            </span>
          </div>

          {/* SPOROČILA */}
          <div className="flex items-center gap-3">
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
                background: "transparent",
              }}
            >
              <svg width="20" height="18" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.478 25.9492C16.388 32.7082 16.002 33.714 16.002 34.5892C16.002 35.5815 16.772 36 17.256 36C17.8 36 19.472 35.3228 24.914 33.1898L18.478 25.9492ZM20.254 23.9513L26.694 31.1962L39.51 16.794C39.836 16.4272 40 15.948 40 15.4643C40 14.985 39.836 14.5035 39.51 14.1345C38.35 12.8317 36.594 10.8563 35.432 9.5535C35.106 9.18675 34.678 9.00225 34.25 9.00225C33.824 9.00225 33.394 9.18675 33.066 9.5535L20.254 23.9513ZM14 21.9375C14 21.033 13.288 20.25 12.5 20.25C7.378 20.25 6.622 20.25 1.5 20.25C0.712 20.25 0 21.033 0 21.9375C0 22.842 0.712 23.625 1.5 23.625H12.5C13.288 23.625 14 22.842 14 21.9375ZM24 15.1875C24 14.283 23.288 13.5 22.5 13.5C17.378 13.5 6.622 13.5 1.5 13.5C0.712 13.5 0 14.283 0 15.1875C0 16.092 0.712 16.875 1.5 16.875H22.5C23.288 16.875 24 16.092 24 15.1875ZM24 8.4375C24 7.533 23.288 6.75 22.5 6.75C17.378 6.75 6.622 6.75 1.5 6.75C0.712 6.75 0 7.533 0 8.4375C0 9.342 0.712 10.125 1.5 10.125H22.5C23.288 10.125 24 9.342 24 8.4375ZM24 1.6875C24 0.783 23.288 0 22.5 0C17.378 0 6.622 0 1.5 0C0.712 0 0 0.783 0 1.6875C0 2.592 0.712 3.375 1.5 3.375H22.5C23.288 3.375 24 2.592 24 1.6875Z" fill="#6D778E"/>
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'PT Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                color: "#5A5A65",
                letterSpacing: "0.5px",
              }}
            >
              SPOROČILA
            </span>
          </div>

          {/* POKLIČI */}
          <div className="flex items-center gap-3">
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
                background: "transparent",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.0818 19.7117C11.3845 22.5175 0.98909 3.99501 7.53545 0.865835L9.45091 0L12.6255 5.68084L10.7318 6.53585C8.74182 7.51418 12.8864 14.9359 14.9218 14.0309C15.0045 13.9967 16.7918 13.1917 16.7982 13.1884L20 18.8509C19.9927 18.8542 18.1918 19.6659 18.0818 19.7117ZM9.50182 17.825C8.16 18.7184 6.31455 18.8 5.75273 17.9134C5.32545 17.2392 5.47 16.4734 5.63727 15.5859C5.82 14.6184 6.02727 13.5209 5.36909 12.4942C4.26091 10.7642 1.82636 10.8417 0 11.9359L0.869091 13.155C1.62273 12.7034 2.49091 12.5092 3.13545 12.6475C4.63818 12.9709 4.18182 14.7525 4.07182 15.3384C3.87909 16.3575 3.66273 17.5134 4.37818 18.645C5.50818 20.4309 8.54091 20.375 10.5927 18.9084C10.2182 18.5692 9.85545 18.2059 9.50182 17.825Z" fill="#6D778E"/>
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'PT Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                color: "#5A5A65",
                letterSpacing: "0.5px",
              }}
            >
              POKLIČI
            </span>
          </div>

          {/* E-POŠTA */}
          <div className="flex items-center gap-3">
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
                background: "transparent",
              }}
            >
              <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.035 19C3.52417 19 0 15.0232 0 9.88904C0 4.40256 3.96833 0 11.0633 0C16.2417 0 20 3.29335 20 7.83049C20 14.9359 11.3917 16.8118 11.8233 12.7583C11.2317 13.662 10.2783 14.6782 8.44583 14.6782C6.34917 14.6782 5.04583 13.1759 5.04583 10.7576C5.04583 7.13316 7.48 4.07061 10.3617 4.07061C11.7442 4.07061 12.695 4.78507 13.0925 5.88204L13.4792 4.551H15.4275C15.2242 5.22957 13.4933 11.5055 13.4933 11.5055C12.9533 13.6799 14.6183 13.7182 16.095 12.5634C18.8692 10.4591 19.0125 4.95634 15.2633 2.66127C11.2458 0.3034 2.10083 1.76249 2.10083 9.7512C2.10083 14.3275 5.3925 17.4023 10.2917 17.4023C13.155 17.4023 14.91 16.6438 16.3708 15.8135L17.3517 17.1984C15.9258 17.9862 13.6342 19 10.035 19ZM8.08167 7.33298C7.48583 8.42587 7.10083 9.84173 7.10083 10.9411C7.10083 13.8854 10.0358 13.9042 11.4775 11.1361C12.0708 9.99914 12.4533 8.54984 12.4533 7.44226C12.4533 5.06319 9.54083 4.64153 8.08167 7.33298Z" fill="#6D778E"/>
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'PT Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                color: "#5A5A65",
                letterSpacing: "0.5px",
              }}
            >
              E-POŠTA
            </span>
          </div>
        </div>
      </div>

      {/* Section: Predvidena dela */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span
            style={{
              fontFamily: "'PT Sans', sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              color: "#5A5A65",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Predvidena dela
          </span>
          {/* Plus action icon to add a new step */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setAddStepOpen(true);
            }}
            className="w-5 h-5 flex items-center justify-center hover:scale-[1.05] transition-all bg-transparent border-none p-0 outline-none cursor-pointer"
          >
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.9705 9.48535H9.48528M9.48528 9.48535H1M9.48528 9.48535V1.00007M9.48528 9.48535V17.9706" stroke="#6D778E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Task lists with checkboxes */}
        <div className="flex flex-col gap-2">
          {tasks.map((task) => (
            <button
              key={task.id}
              type="button"
              onClick={() => {
                if (task.completed) return;
                if (task.requiresAttachment && !task.attachment) {
                  return;
                }
                setConfirmStepId(task.id);
              }}
              className="flex items-center gap-2 w-full text-left bg-transparent border-none p-0 outline-none group"
            >
              {/* Checkbox */}
              <div
                className="shrink-0 flex items-center justify-center"
                style={{
                  width: "16px",
                  height: "16px",
                  background: task.completed ? "transparent" : "#E1E4E8",
                  borderRadius: "4px",
                  border: task.completed ? "2px solid #41C46D" : "none",
                }}
              >
                {task.completed && (
                  <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                    <path d="M1 3.5L3.5 6L9 1" stroke="#41C46D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              {/* Text */}
              <span
                style={{
                  fontFamily: "'PT Sans', sans-serif",
                  fontSize: "13px",
                  color: task.completed ? "#94A3B8" : "#1E293B",
                }}
                className="flex-1 truncate"
              >
                {task.text}
                {task.requiresAttachment && !task.attachment && (
                  <span className="ml-1.5 text-[10px] text-red-500 font-semibold">*</span>
                )}
              </span>

              {/* Completion time / clip icon */}
              <div className="flex items-center gap-1.5 ml-auto">
                {task.attachment && (
                  <Paperclip className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                )}
                {task.completed && task.time && (
                  <span className="text-xs text-[#D3D3D3] font-normal">{task.time}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Section: Priponke */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span
            style={{
              fontFamily: "'PT Sans', sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              color: "#5A5A65",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Priponke
          </span>
          {/* Plus action icon to add attachment only */}
          <button
            onClick={() => setAttachOnlyOpen(true)}
            className="w-5 h-5 flex items-center justify-center hover:scale-[1.05] transition-all bg-transparent border-none p-0 outline-none cursor-pointer"
          >
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.9705 9.48535H9.48528M9.48528 9.48535H1M9.48528 9.48535V1.00007M9.48528 9.48535V17.9706" stroke="#6D778E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {attachments.map((att) => (
            <button
              key={att.id}
              type="button"
              onClick={() => setPreviewAttachment(att)}
              className="flex items-center justify-between w-full text-left bg-transparent border-none p-0 outline-none group"
            >
              <span
                style={{
                  fontFamily: "'PT Sans', sans-serif",
                  fontSize: "13px",
                  color: "#1E293B",
                }}
                className="group-hover:text-[#1B3A6B] transition-colors"
              >
                {att.name}
              </span>
              <span className="text-xs text-[#64748B] font-normal">{att.time}</span>
            </button>
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
            color: "#5A5A65",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Timeline
        </span>

        <div className="flex flex-col gap-3">
          {timeline.map((event) => (
            <div key={event.id} className="flex items-start justify-between gap-3">
              <div className="flex gap-2">
                <span className="text-xs text-[#64748B] font-normal shrink-0 mt-0.5">
                  {event.time}
                </span>
                <span
                  style={{
                    fontFamily: "'PT Sans', sans-serif",
                    fontSize: "13px",
                    color: "#1E293B",
                    lineHeight: "16px",
                  }}
                >
                  {event.text}
                </span>
              </div>
              {event.type === "attachment" && (
                <Paperclip className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
              )}
              {event.type === "voice" && (
                <svg width="12" height="12" viewBox="0 0 32 36" fill="#6D778E" className="shrink-0 mt-0.5">
                  <path d="M20.8542 17.1124C19.2762 18.3754 8.94271 26.6494 6.55021 28.5664L2.50471 24.5209L14.0067 10.2649L20.8542 17.1124ZM28.8177 2.31188C25.7352 -0.770625 20.7357 -0.770625 17.6532 2.31188C15.6207 4.34588 15.4482 6.57487 15.3492 7.36538L23.7642 15.7804C24.4902 15.6994 26.7672 15.5269 28.8177 13.4764C31.9017 10.3939 31.9017 5.39438 28.8177 2.31188ZM14.0667 29.2219C10.6287 29.2219 9.05821 31.3624 6.84271 32.7544C5.27371 33.7384 3.78871 33.2389 3.07471 32.3554C2.81521 32.0389 2.07421 30.8989 3.33571 29.5924L3.14821 29.4049L1.45921 27.7684C-0.598793 29.8924 -0.234293 32.4304 1.04071 34.0039C2.50321 35.8099 5.44471 36.7219 8.23321 34.9714C10.6107 33.4789 11.6637 31.8394 14.0667 31.8394C15.6207 31.8394 17.0367 32.5354 19.2942 35.9989L21.4857 34.5709C19.3962 31.3609 17.3337 29.2219 14.0667 29.2219Z" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        .custom-ios-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-ios-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          margin: 16px 0;
        }
        .custom-ios-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(109, 119, 142, 0.45);
          border-radius: 9999px;
        }
        .custom-ios-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(109, 119, 142, 0.65);
        }
      `}</style>
      
      {inlineDrawer ? (
        isOpen && (
          <div
            className="absolute inset-x-0 bottom-0 top-[100px] rounded-t-[32px] border-t border-slate-200/50 shadow-2xl z-30 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
            style={{
              background: "rgba(241, 245, 249, 1)",
            }}
          >
            {/* Close Bar */}
            <div className="px-5 py-4 flex items-center justify-between shrink-0 border-b border-slate-200/50 bg-slate-50/50">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Podrobnosti
              </span>
              <button 
                onClick={() => onOpenChange(false)}
                className="w-7 h-7 flex items-center justify-center hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 pt-6 custom-ios-scrollbar">
              {renderContentBody()}
            </div>
          </div>
        )
      ) : (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent
            style={{
              background: "rgba(241, 245, 249, 1)",
              border: "2px solid rgba(243, 242, 241, 0.2)",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
              borderRadius: "32px",
              padding: "24px",
              maxWidth: "375px",
              width: "90%",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            className="outline-none custom-ios-scrollbar"
          >
            {renderContentBody()}
          </DialogContent>
        </Dialog>
      )}

      {/* ── Sub-Dialog 1: Dodaj opravilo ── */}
      <Dialog open={addTaskOpen} onOpenChange={(open) => {
        setAddTaskOpen(open);
        if (!open) resetAddTask();
      }}>
        <DialogContent
          style={{
            background: "transparent",
            border: "none",
            boxShadow: "none",
            padding: 0,
            maxWidth: "380px",
            width: "90%",
          }}
          className="outline-none"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!taskOpravilo.trim()) return;
              // In a real app this would propagate upward; here we just close.
              setAddTaskOpen(false);
              resetAddTask();
            }}
            className={auraCard}
          >
            <div className="flex flex-col gap-4 text-slate-800">
              {/* Header */}
              <div className="text-center">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                  Dodaj opravilo
                </h3>
              </div>

              {/* Form */}
              <div className="flex flex-col gap-3">
                <div>
                  <AuraLabel strong>Opravilo *</AuraLabel>
                  <AuraInput
                    type="text"
                    value={taskOpravilo}
                    onChange={(e) => setTaskOpravilo(e.target.value)}
                    maxLength={22}
                    required
                    strong
                    placeholder="Npr. Kopalnica prenova"
                  />
                </div>

                <div>
                  <AuraLabel>Kraj</AuraLabel>
                  <AuraInput
                    type="text"
                    value={taskKraj}
                    onChange={(e) => setTaskKraj(e.target.value)}
                    maxLength={15}
                    placeholder="Npr. Ljubljana"
                  />
                </div>

                <div>
                  <AuraLabel>Naročnik</AuraLabel>
                  <AuraInput
                    type="text"
                    value={taskNarocnik}
                    onChange={(e) => setTaskNarocnik(e.target.value)}
                    maxLength={15}
                    placeholder="Npr. Novak d.o.o."
                  />
                </div>

                <div>
                  <AuraLabel>Datum</AuraLabel>
                  <AuraInput
                    type="text"
                    value={taskDatum}
                    onChange={(e) => setTaskDatum(e.target.value)}
                    maxLength={10}
                    placeholder="02.02.2026"
                    className="placeholder:text-slate-300"
                  />
                </div>

                <hr className="border-[#1B3A6B]/10 my-1" />

                <div>
                  <AuraLabel strong>Odgovorni *</AuraLabel>
                  <AuraSelect
                    value={taskOdgovorni}
                    onChange={(e) => setTaskOdgovorni(e.target.value)}
                    required
                    strong
                  >
                    <option value="" disabled hidden>
                      Izberite delavca
                    </option>
                    <option value="anthony">Anthony Hopkins</option>
                  </AuraSelect>
                </div>
              </div>

              <button type="submit" className={auraButton}>
                DODAJ NA URNIK
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Sub-Dialog 2: Dodaj še en korak ── */}
      <Dialog open={addStepOpen} onOpenChange={(open) => {
        setAddStepOpen(open);
        if (!open) resetAddStep();
      }}>
        <DialogContent
          style={{
            background: "transparent",
            border: "none",
            boxShadow: "none",
            padding: 0,
            maxWidth: "360px",
            width: "90%",
          }}
          className="outline-none"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!stepText.trim()) return;
              const newStepId = `s_${Date.now()}`;
              const newTask: TaskItem = {
                id: newStepId,
                text: stepText,
                completed: false,
                attachment: stepHasAttachment,
              };
              const nextTasks = [...tasks, newTask];
              setTasks(nextTasks);
              onTasksChange?.(nextTasks);
              if (stepHasAttachment && stepAttachmentName) {
                const newAttachment: AttachmentItem = {
                  id: `a_${Date.now()}`,
                  name: stepAttachmentName,
                  time: nowTime(),
                };
                setAttachments(prev => [newAttachment, ...prev]);
                addTimeline(`Priponka: ${stepAttachmentName}`, "attachment");
              }
              addTimeline(`Nov korak: ${stepText}`, "step");
              setAddStepOpen(false);
              resetAddStep();
            }}
            className={auraCard}
          >
            <div className="flex flex-col gap-4 text-slate-800">
              {/* Header */}
              <div className="text-center">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                  Dodaj še en korak
                </h3>
              </div>

              {/* Form */}
              <div className="flex flex-col gap-3">
                <div>
                  <AuraLabel strong>Korak *</AuraLabel>
                  <AuraInput
                    type="text"
                    value={stepText}
                    onChange={(e) => setStepText(e.target.value)}
                    maxLength={30}
                    required
                    strong
                    placeholder="npr. Čiščenje delovnega območja"
                  />
                  <div className="flex justify-end mt-1">
                    <span className="text-[10px] text-slate-400">
                      {stepText.length}/30
                    </span>
                  </div>
                </div>

                <AuraIconButton
                  active={stepHasAttachment}
                  onClick={() => {
                    setStepHasAttachment(!stepHasAttachment);
                    if (stepHasAttachment) setStepAttachmentName("");
                  }}
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                  }
                  label="Priponka"
                  title="Dodaj prilogo"
                />

                {stepHasAttachment && (
                  <div className="flex flex-col gap-1">
                    <AuraFileInput
                      id="detail-step-attachment"
                      onFileSelect={setStepAttachmentName}
                    />
                    {stepAttachmentName && (
                      <span className="text-[11px] text-slate-500 truncate">
                        {stepAttachmentName}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <button type="submit" className={auraButton}>
                DODAJ KORAK
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Sub-Dialog 3: Attach only (Priponke) ── */}
      <Dialog open={attachOnlyOpen} onOpenChange={(open) => {
        setAttachOnlyOpen(open);
        if (!open) setAttachOnlyName("");
      }}>
        <DialogContent
          style={{
            background: "transparent",
            border: "none",
            boxShadow: "none",
            padding: 0,
            maxWidth: "360px",
            width: "90%",
          }}
          className="outline-none"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!attachOnlyName.trim()) return;
              const newAttachment: AttachmentItem = {
                id: `a_${Date.now()}`,
                name: attachOnlyName,
                time: nowTime(),
              };
              setAttachments(prev => [newAttachment, ...prev]);
              addTimeline(`Priponka: ${attachOnlyName}`, "attachment");
              setAttachOnlyOpen(false);
              setAttachOnlyName("");
            }}
            className={auraCard}
          >
            <div className="flex flex-col gap-4 text-slate-800">
              <div className="text-center">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                  Dodaj priponko
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                <AuraFileInput
                  id="attach-only-file"
                  onFileSelect={setAttachOnlyName}
                />
                {attachOnlyName && (
                  <span className="text-[11px] text-slate-500 truncate">
                    {attachOnlyName}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAttachOnlyOpen(false);
                    setAttachOnlyName("");
                  }}
                  className="flex-1 h-9 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  Prekliči
                </button>
                <button
                  type="submit"
                  disabled={!attachOnlyName.trim()}
                  className="flex-1 h-9 rounded-xl bg-[#1B3A6B] hover:bg-[#142c52] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold transition-colors"
                >
                  Dodaj
                </button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Sub-Dialog 4: Confirm step finished ── */}
      <Dialog open={!!confirmStepId} onOpenChange={(open) => {
        if (!open) setConfirmStepId(null);
      }}>
        <DialogContent
          style={{
            background: "transparent",
            border: "none",
            boxShadow: "none",
            padding: 0,
            maxWidth: "380px",
            width: "90%",
          }}
          className="outline-none"
        >
          {(() => {
            const task = tasks.find(t => t.id === confirmStepId);
            if (!task) return null;
            const missingAttachment = task.requiresAttachment && !task.attachment;
            return (
              <div className={auraCard}>
                <div className="flex flex-col gap-4 text-slate-800">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                      Zaključi korak
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 text-center">
                    Potrdite, da je korak <strong className="text-slate-900">{task.text}</strong> zaključen.
                  </p>

                  {missingAttachment && (
                    <div className="flex flex-col gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
                      <p className="text-sm text-red-600 font-semibold text-center">
                        Priponka manjka
                      </p>
                      <p className="text-xs text-slate-500 text-center">
                        Za zaključek tega koraka morate priložiti datoteko.
                      </p>
                      <AuraFileInput
                        id="confirm-step-attachment"
                        onFileSelect={(name) => {
                          if (!name.trim()) return;
                          const attId = `a_${Date.now()}`;
                          setAttachments(prev => [{ id: attId, name, time: nowTime() }, ...prev]);
                          setTasks(prev => prev.map(t => t.id === task.id ? { ...t, attachment: true } : t));
                          addTimeline(`Priponka: ${name}`, "attachment");
                        }}
                      />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setConfirmStepId(null)}
                      className="flex-1 h-10 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                      Prekliči
                    </button>
                    <button
                      type="button"
                      disabled={missingAttachment}
                      onClick={() => {
                        const completedAt = nowTime();
                        const nextTasks = tasks.map(t => t.id === task.id ? { ...t, completed: true, time: completedAt } : t);
                        setTasks(nextTasks);
                        onTasksChange?.(nextTasks);
                        addTimeline(`Zaključen korak: ${task.text}`, "step");
                        setConfirmStepId(null);
                      }}
                      className="flex-1 h-10 rounded-xl bg-[#1B3A6B] hover:bg-[#142c52] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold transition-colors"
                    >
                      Potrdi zaključek
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* ── Sub-Dialog 5: Attachment quick view ── */}
      <Dialog open={!!previewAttachment} onOpenChange={(open) => {
        if (!open) setPreviewAttachment(null);
      }}>
        <DialogContent
          style={{
            background: "transparent",
            border: "none",
            boxShadow: "none",
            padding: 0,
            maxWidth: "420px",
            width: "90%",
          }}
          className="outline-none"
        >
          {previewAttachment && (
            <div className={auraCard}>
              <div className="flex flex-col gap-4 text-slate-800">
                <div className="text-center">
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                    Pregled priponke
                  </h3>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="aspect-video rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <Paperclip className="w-10 h-10 text-slate-300" />
                  </div>
                  <p className="text-sm font-medium text-slate-800">{previewAttachment.name}</p>
                  <p className="text-xs text-slate-500">Dodano ob {previewAttachment.time}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setPreviewAttachment(null)}
                  className="w-full h-10 rounded-xl bg-[#1B3A6B] hover:bg-[#142c52] text-white text-xs font-semibold transition-colors"
                >
                  Zapri
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
