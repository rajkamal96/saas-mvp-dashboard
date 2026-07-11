"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Worker } from "@/lib/mockData";
import { Paperclip, GripVertical, X } from "lucide-react";
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
  onTasksChange?: (tasks: Worker["tasks"]) => void;
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
  date: string;
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

function nowDate() {
  return new Date().toLocaleDateString("sl-SI");
}

interface SortableTaskItemProps {
  task: TaskItem;
  onClick: () => void;
  onDelete: () => void;
}

function SortableTaskItem({ task, onClick, onDelete }: SortableTaskItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-1 w-full group"
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        suppressHydrationWarning
        className="shrink-0 p-1 cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 bg-transparent border-none outline-none"
        aria-label="Premakni korak"
      >
        <GripVertical className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-2 flex-1 text-left bg-transparent border-none p-0 outline-none"
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

      <button
        type="button"
        onClick={onDelete}
        className="shrink-0 p-1 text-slate-300 hover:text-red-500 bg-transparent border-none outline-none opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Izbriši korak"
        title="Izbriši korak"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
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

  const fromWorkerTasks = (workerTasks: Worker["tasks"]): TaskItem[] =>
    workerTasks.map(t => ({
      id: t.id,
      text: t.text,
      completed: t.completed,
      time: t.completedAt,
      attachment: t.hasAttachment || false,
      requiresAttachment: t.requiresAttachment || false,
    }));

  const toWorkerTasks = (modalTasks: TaskItem[]): Worker["tasks"] =>
    modalTasks.map(t => ({
      id: t.id,
      text: t.text,
      completed: t.completed,
      completedAt: t.completed ? t.time : undefined,
      hasAttachment: t.attachment || false,
      requiresAttachment: t.requiresAttachment || false,
    }));

  // Core lists
  const [tasks, setTasks] = React.useState<TaskItem[]>(() => fromWorkerTasks(worker?.tasks || []));

  const updateTasks = (next: TaskItem[]) => {
    setTasks(next);
    onTasksChange?.(toWorkerTasks(next));
  };

  // Position where the next new step will be inserted (1-based)
  const [stepPosition, setStepPosition] = React.useState(tasks.length + 1);

  const [attachments, setAttachments] = React.useState<AttachmentItem[]>([
    { id: "a1", name: "Contract", time: "9:11", date: "21.05.2026" },
    { id: "a2", name: "Photo - start", time: "9:18", date: "21.05.2026" },
    { id: "a3", name: "Furniture Payment", time: "9:33", date: "21.05.2026" },
    { id: "a4", name: "Import document", time: "9:42", date: "21.05.2026" },
    { id: "a5", name: "Photo - damage", time: "12:18", date: "21.05.2026" },
    { id: "a6", name: "Photo - finished", time: "14:54", date: "21.05.2026" },
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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleTaskDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);
      const next = arrayMove(tasks, oldIndex, newIndex);
      setTasks(next);
      updateTasks(next);
    }
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
    setStepPosition(tasks.length + 1);
  };

  if (!worker) return null;

  const renderContentBody = () => (
    <div className="flex flex-col gap-[48px] text-[#1E293B]">
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleTaskDragEnd}
        >
          <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {tasks.map((task) => (
                <SortableTaskItem
                  key={task.id}
                  task={task}
                  onClick={() => {
                    if (task.completed) return;
                    setConfirmStepId(task.id);
                  }}
                  onDelete={() => {
                    const nextTasks = tasks.filter(t => t.id !== task.id);
                    updateTasks(nextTasks);
                    addTimeline(`Izbrisan korak: ${task.text}`, "step");
                  }}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
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
        if (open) setStepPosition(tasks.length + 1);
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
              const insertIndex = Math.min(Math.max(stepPosition - 1, 0), tasks.length);
              const nextTasks = [...tasks.slice(0, insertIndex), newTask, ...tasks.slice(insertIndex)];
              updateTasks(nextTasks);
              if (stepHasAttachment && stepAttachmentName) {
                const newAttachment: AttachmentItem = {
                  id: `a_${Date.now()}`,
                  name: stepAttachmentName,
                  time: nowTime(),
                  date: nowDate(),
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

                <div>
                  <AuraLabel>Pozicija</AuraLabel>
                  <AuraSelect
                    value={stepPosition}
                    onChange={(e) => setStepPosition(Number(e.target.value))}
                  >
                    {Array.from({ length: tasks.length + 1 }, (_, i) => i + 1).map((pos) => (
                      <option key={pos} value={pos}>
                        {pos === tasks.length + 1 ? "Na konec" : `${pos}. mesto`}
                      </option>
                    ))}
                  </AuraSelect>
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
                date: nowDate(),
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
                          setAttachments(prev => [{ id: attId, name, time: nowTime(), date: nowDate() }, ...prev]);
                          const nextTasks = tasks.map(t => t.id === task.id ? { ...t, attachment: true } : t);
                          setTasks(nextTasks);
                          updateTasks(nextTasks);
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
                        updateTasks(nextTasks);
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
                  <p className="text-xs text-slate-500">Dodano ob {previewAttachment.time} · {previewAttachment.date}</p>
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
