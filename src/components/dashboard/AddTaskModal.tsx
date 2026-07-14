"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Worker } from "@/lib/mockData";
import {
  AuraLabel,
  AuraInput,
  AuraSelect,
  auraCard,
  auraButton,
} from "./AuraForm";

interface AddTaskModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  workers: Worker[];
  onAddTask: (taskData: {
    workerId: string;
    opravilo: string;
    kraj: string;
    narocnik: string;
    datum: string;
    tasks: { text: string; requiresAttachment: boolean }[];
  }) => void;
}

export function AddTaskModal({ isOpen, onOpenChange, workers, onAddTask }: AddTaskModalProps) {
  const [step, setStep] = useState(1);
  const [opravilo, setOpravilo] = useState("");
  const [kraj, setKraj] = useState("");
  const [narocnik, setNarocnik] = useState("");
  const [datum, setDatum] = useState("");
  const [workerId, setWorkerId] = useState("");

  const [tasksList, setTasksList] = useState([
    { text: "", requiresAttachment: false },
    { text: "", requiresAttachment: false },
    { text: "", requiresAttachment: false },
    { text: "", requiresAttachment: false },
  ]);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setOpravilo("");
      setKraj("");
      setNarocnik("");
      setDatum("");
      setWorkerId("");
      setTasksList([
        { text: "", requiresAttachment: false },
        { text: "", requiresAttachment: false },
        { text: "", requiresAttachment: false },
        { text: "", requiresAttachment: false },
      ]);
    }
  }, [isOpen]);

  const selectedWorker = workers.find((w) => w.id === workerId);
  const workerNameUpper = selectedWorker ? selectedWorker.name.toUpperCase() : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!workerId || !opravilo) return;
      setStep(2);
    } else {
      const finalTasks = tasksList
        .filter((t) => t.text.trim() !== "")
        .map((t) => ({
          text: t.text.trim(),
          requiresAttachment: t.requiresAttachment,
        }));
      
      onAddTask({
        workerId,
        opravilo,
        kraj,
        narocnik,
        datum,
        tasks: finalTasks,
      });

      onOpenChange(false);
    }
  };

  const handleAddTaskRow = () => {
    setTasksList((prev) => [...prev, { text: "", requiresAttachment: false }]);
  };

  const toggleAttachment = (index: number) => {
    setTasksList((prev) =>
      prev.map((t, idx) => (idx === index ? { ...t, requiresAttachment: !t.requiresAttachment } : t))
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
        <style dangerouslySetInnerHTML={{ __html: `
          .custom-ios-scrollbar::-webkit-scrollbar {
            width: 5px;
          }
          .custom-ios-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-ios-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(109, 119, 142, 0.45);
            border-radius: 9999px;
          }
          .custom-ios-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(109, 119, 142, 0.65);
          }
        `}} />

        <div className={auraCard}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-slate-800">
            {step === 1 ? (
              <>
                {/* Header */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                    Dodaj opravilo
                  </h3>
                </div>

                {/* Form */}
                <div className="flex flex-col gap-3">
                  {/* Opravilo — required, stronger styling */}
                  <div>
                    <AuraLabel strong>Opravilo *</AuraLabel>
                    <AuraInput
                      type="text"
                      value={opravilo}
                      onChange={(e) => setOpravilo(e.target.value)}
                      maxLength={22}
                      required
                      strong
                      placeholder="Npr. Kopalnica prenova"
                    />
                  </div>

                  {/* Kraj */}
                  <div>
                    <AuraLabel>Kraj</AuraLabel>
                    <AuraInput
                      type="text"
                      value={kraj}
                      onChange={(e) => setKraj(e.target.value)}
                      maxLength={15}
                      placeholder="Npr. Ljubljana"
                    />
                  </div>

                  {/* Naročnik */}
                  <div>
                    <AuraLabel>Naročnik</AuraLabel>
                    <AuraInput
                      type="text"
                      value={narocnik}
                      onChange={(e) => setNarocnik(e.target.value)}
                      maxLength={15}
                      placeholder="Npr. Novak d.o.o."
                    />
                  </div>

                  {/* Datum */}
                  <div>
                    <AuraLabel>Datum</AuraLabel>
                    <AuraInput
                      type="text"
                      value={datum}
                      onChange={(e) => setDatum(e.target.value)}
                      maxLength={10}
                      placeholder="02.02.2026"
                      className="placeholder:text-slate-300"
                    />
                  </div>

                  {/* Delavec — required worker dropdown */}
                  <div>
                    <AuraLabel strong>Delavec *</AuraLabel>
                    <AuraSelect
                      value={workerId}
                      onChange={(e) => setWorkerId(e.target.value)}
                      required
                      strong
                    >
                      <option value="" disabled>Izberi delavca</option>
                      {workers.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.name}
                        </option>
                      ))}
                    </AuraSelect>
                  </div>
                </div>

                {/* Action button */}
                <button type="submit" className={auraButton}>
                  DODAJ NA URNIK
                </button>
              </>
            ) : (
              <>
                {/* Header Part 2 - Center aligned */}
                <div className="text-center flex flex-col gap-1 pb-2 border-b border-slate-100/80">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    {workerNameUpper || "DELAVEC"}
                  </span>
                  
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                    Dodaj nalogo
                  </h3>
                </div>

                {/* Tasks List with padding to show borders properly and iOS style scrollbar */}
                <div className="flex flex-col gap-3.5 max-h-[320px] overflow-y-auto p-1.5 custom-ios-scrollbar">
                  {tasksList.map((task, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <AuraLabel strong className="text-[10px]">
                          NALOGA {idx + 1}:
                        </AuraLabel>
                        {idx === 0 && (
                          <div className="w-[38px] flex justify-center mb-1" title="Zahtevana priponka">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <AuraInput
                          type="text"
                          value={task.text}
                          onChange={(e) => {
                            const val = e.target.value;
                            setTasksList((prev) =>
                              prev.map((t, i) => (i === idx ? { ...t, text: val } : t))
                            );
                          }}
                          placeholder={`Vnesite nalogo ${idx + 1}...`}
                          className="bg-slate-50 border-none ring-1 ring-[#1B3A6B]/15 focus:ring-2 focus:ring-[#1B3A6B]"
                          strong
                        />
                        <button
                          type="button"
                          onClick={() => toggleAttachment(idx)}
                          className="shrink-0 flex items-center justify-center rounded-xl border transition-all duration-200"
                          style={{
                            width: "38px",
                            height: "38px",
                            background: task.requiresAttachment ? "#1B3A6B" : "white",
                            borderColor: task.requiresAttachment ? "#1B3A6B" : "#E2E8F0",
                            cursor: "pointer",
                          }}
                        >
                          {task.requiresAttachment && (
                            <svg width="12" height="10" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Row Button */}
                <div>
                  <button
                    type="button"
                    onClick={handleAddTaskRow}
                    className="w-12 h-9 rounded-xl border border-[#3B82F6]/20 bg-slate-50 text-slate-700 font-semibold text-sm hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                  >
                    +1
                  </button>
                </div>

                {/* Submit button - Same theme style as the rest of the form */}
                <button type="submit" className={auraButton}>
                  DODAJ NA URNIK
                </button>
              </>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
