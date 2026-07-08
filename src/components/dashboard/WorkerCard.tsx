"use client";

import React from "react";
import { Worker, TaskItem } from "@/lib/mockData";

// ── Link/attachment SVG icon ──────────────────────────────────────────────────
function AttachmentIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.5 7.54918L6.15229 1.78552C7.83319 0.0714946 10.5585 0.0714946 12.2394 1.78552C13.9203 3.49954 13.9201 6.27867 12.2392 7.99269L5.71734 14.6431C4.59674 15.7858 2.7802 15.7856 1.6596 14.6429C0.538995 13.5002 0.53872 11.6478 1.65932 10.5051L8.1812 3.85471C8.7415 3.28337 9.65041 3.28337 10.2107 3.85471C10.771 4.42605 10.7706 5.35216 10.2103 5.9235L4.55802 11.6872"
        stroke="#151E23"
        strokeOpacity="0.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Single task row ───────────────────────────────────────────────────────────
interface TaskRowProps {
  task: TaskItem;
  onToggle: () => void;
}

function TaskRow({ task, onToggle }: TaskRowProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="flex items-center gap-[6px] w-full text-left cursor-pointer"
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

      {/* Task text */}
      <span
        className="flex-1 truncate"
        style={{
          fontFamily: "'PT Sans', sans-serif",
          fontWeight: 400,
          fontSize: "12px",
          lineHeight: "16px",
          letterSpacing: "-0.2px",
          color: task.completed ? "#94A3B8" : "#64748B",
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.text}
      </span>

      {/* Attachment icon (only if task has no completedAt) */}
      {!task.completed && !task.completedAt && (
        <span className="shrink-0 opacity-30">
          <AttachmentIcon />
        </span>
      )}

      {/* Completed time */}
      {task.completedAt && (
        <span
          className="shrink-0 ml-auto"
          style={{
            fontFamily: "'PT Sans', sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            letterSpacing: "0.1px",
            color: "#D3D3D3",
            textAlign: "right",
          }}
        >
          {task.completedAt}
        </span>
      )}
    </button>
  );
}

// ── Worker Card ───────────────────────────────────────────────────────────────
interface WorkerCardProps {
  worker: Worker;
  onToggleTask: (workerId: string, taskId: string) => void;
  date?: string;   // e.g. "23/05/26"
  orderId?: string; // e.g. "#484"
  onClick?: () => void;
}

export function WorkerCard({ worker, onToggleTask, date = "23/05/26", orderId = "#484", onClick }: WorkerCardProps) {
  const done = worker.tasks.filter(t => t.completed).length;
  const total = worker.tasks.length;

  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(255, 255, 255, 0.3)",
        border: "1px solid #1D4ED8",
        boxShadow:
          "0px 18px 42px -24px rgba(59, 130, 246, 0.55), inset 0px 1px 0px 1px rgba(255, 255, 255, 0.35)",
        borderRadius: "24px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {/* ── Row 1: Meta + progress badge ── */}
      <div className="flex items-center justify-between">
        <span
          style={{
            fontFamily: "'PT Sans', sans-serif",
            fontWeight: 400,
            fontSize: "10px",
            lineHeight: "15px",
            color: "#94A3B8",
          }}
        >
          {worker.name.toUpperCase()} • {date} • {orderId}
        </span>

        {/* Progress badge */}
        <div
          className="flex items-baseline justify-center"
          style={{
            width: "36px",
            height: "36px",
            background: "rgba(255, 255, 255, 0.9)",
            border: "1px solid #FFFFFF",
            borderRadius: "12px",
          }}
        >
          <span style={{ fontFamily: "'PT Sans', sans-serif", fontWeight: 700, fontSize: "14px", color: "#1D4ED8" }}>
            {done}
          </span>
          <span style={{ fontFamily: "'PT Sans', sans-serif", fontWeight: 400, fontSize: "11px", color: "#94A3B8" }}>
            /{total}
          </span>
        </div>
      </div>

      {/* ── Row 2: Task title card + task list ── */}
      <div className="flex flex-col gap-3">

        {/* Inner white card */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #DBEAFE",
            boxShadow: "0px 0px 6px rgba(59, 130, 246, 0.12), inset 0px 1px 0px #FFFFFF",
            borderRadius: "21.6px",
            padding: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "'PT Sans', sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "20px",
              color: "#0F172A",
            }}
          >
            {worker.currentTask}
          </p>
          <p
            style={{
              fontFamily: "'PT Sans', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "18px",
              color: "#151E23",
              marginTop: "2px",
            }}
          >
            {worker.location ?? "Ljubljana"} • {worker.role}
          </p>
        </div>

        {/* Task list */}
        <div
          style={{
            paddingTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "7.5px",
          }}
        >
          {worker.tasks.map(task => (
            <TaskRow
              key={task.id}
              task={task}
              onToggle={() => onToggleTask(worker.id, task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
