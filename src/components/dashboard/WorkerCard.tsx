"use client";

import React from "react";
import { Worker, TaskItem } from "@/lib/mockData";

// ── Link/attachment SVG icon ──────────────────────────────────────────────────
function AttachmentIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 8.51912L7.08708 2.37122C8.89729 0.542928 11.8323 0.542928 13.6425 2.37122C15.4527 4.19951 15.4524 7.16391 13.6422 8.9922L6.61868 16.0859C5.41188 17.3048 3.4556 17.3046 2.2488 16.0858C1.04199 14.8669 1.0417 12.891 2.2485 11.6721L9.27206 4.57836C9.87546 3.96893 10.8543 3.96893 11.4577 4.57836C12.0611 5.18779 12.0607 6.17563 11.4573 6.78506L5.37018 12.933"
        stroke="#151E23"
        strokeOpacity="0.3"
        strokeWidth="2"
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
          fontSize: task.completed ? "12px" : "14px",
          lineHeight: task.completed ? "16px" : "18px",
          letterSpacing: task.completed ? "-0.2px" : "0.1px",
          color: task.completed ? "#94A3B8" : "#64748B",
          textDecoration: "none",
        }}
      >
        {task.text}
      </span>

      {/* Attachment and Time for Completed tasks */}
      {task.completed && (
        <div className="flex items-center gap-[6px] shrink-0 ml-auto">
          <span className="shrink-0">
            <AttachmentIcon />
          </span>
          {task.completedAt && (
            <span
              className="shrink-0"
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
        </div>
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
          style={{
            width: "36px",
            height: "36px",
            background: "#EFF6FF",
            border: "1px solid rgba(29, 78, 216, 0.5)",
            boxShadow: "0px 8px 18px -12px rgba(15, 23, 42, 0.35), inset 0px 1px 0px 1px #FFFFFF",
            borderRadius: "12px",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            paddingTop: "3px",
          }}
        >
          <span
            style={{
              fontFamily: "'PT Sans', sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              color: "#EB1D1D",
              lineHeight: "27.25px"
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
              lineHeight: "27.25px"
            }}
          >
            /{total}
          </span>
        </div>
      </div>

      {/* ── Row 2: Task title card + task list ── */}
      <div className="flex flex-col gap-3">

        {/* Inner white card */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            border: "1px solid #FFFFFF",
            boxShadow: "0px 0px 6px rgba(59, 130, 246, 0.05)",
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
            {worker.currentTask.slice(0, 35) + (worker.currentTask.length > 35 ? "..." : "")}
          </p>
          <p
            style={{
              fontFamily: "'PT Sans', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "18px",
              color: "#465467",
              marginTop: "2px",
            }}
          >
            {(() => {
              const sub = `${worker.location ?? "Ljubljana"} • ${worker.role}`;
              return sub.slice(0, 100) + (sub.length > 100 ? "..." : "");
            })()}
          </p>
        </div>

        {/* Task list */}
        <div
          style={{
            paddingTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {(() => {
            const completedTasks = worker.tasks.filter(t => t.completed);
            const uncompletedTasks = worker.tasks.filter(t => !t.completed);

            return (
              <>
                {/* Completed task (max 1) */}
                {completedTasks.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {completedTasks.slice(0, 1).map(task => (
                      <TaskRow
                        key={task.id}
                        task={task}
                        onToggle={() => onToggleTask(worker.id, task.id)}
                      />
                    ))}
                  </div>
                )}

                {/* Incomplete tasks (max 2) with 8px gap */}
                {uncompletedTasks.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      paddingBottom: "12px",
                    }}
                  >
                    {uncompletedTasks.slice(0, 2).map(task => (
                      <TaskRow
                        key={task.id}
                        task={task}
                        onToggle={() => onToggleTask(worker.id, task.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
