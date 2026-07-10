"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Worker } from "@/lib/mockData";

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
  }) => void;
}

export function AddTaskModal({ isOpen, onOpenChange, workers, onAddTask }: AddTaskModalProps) {
  const [opravilo, setOpravilo] = useState("");
  const [kraj, setKraj] = useState("");
  const [narocnik, setNarocnik] = useState("");
  const [datum, setDatum] = useState("");
  const [selectedWorkerId, setSelectedWorkerId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkerId || !opravilo) return;
    onAddTask({
      workerId: selectedWorkerId,
      opravilo,
      kraj,
      narocnik,
      datum
    });
    // Reset fields
    setOpravilo("");
    setKraj("");
    setNarocnik("");
    setDatum("");
    setSelectedWorkerId("");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        style={{
          background: "rgba(241, 245, 249, 1)",
          border: "1px solid rgba(29, 78, 216, 1)",
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
          borderRadius: "9px",
          padding: "20px",
          maxWidth: "320px",
          width: "90%",
        }}
        className="outline-none"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-slate-800">
          {/* Header */}
          <h3
            style={{
              fontFamily: "'PT Sans', sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              textAlign: "center",
              color: "#334155",
            }}
          >
            Dodaj opravilo
          </h3>

          {/* Form */}
          <div className="flex flex-col gap-3">
            {/* Opravilo */}
            <div className="grid grid-cols-[1fr_2.2fr] items-center gap-3">
              <span className="text-xs text-[#718797] font-semibold">Opravilo</span>
              <input
                type="text"
                value={opravilo}
                onChange={e => setOpravilo(e.target.value)}
                maxLength={22}
                required
                style={{
                  background: "#EBEFF2",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  fontSize: "13px",
                  color: "#1E293B",
                  outline: "none",
                }}
              />
            </div>

            {/* Kraj */}
            <div className="grid grid-cols-[1fr_2.2fr] items-center gap-3">
              <span className="text-xs text-[#718797] font-semibold">Kraj</span>
              <input
                type="text"
                value={kraj}
                onChange={e => setKraj(e.target.value)}
                maxLength={15}
                style={{
                  background: "#EBEFF2",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  fontSize: "13px",
                  color: "#1E293B",
                  outline: "none",
                }}
              />
            </div>

            {/* Naročnik */}
            <div className="grid grid-cols-[1fr_2.2fr] items-center gap-3">
              <span className="text-xs text-[#718797] font-semibold">Naročnik</span>
              <input
                type="text"
                value={narocnik}
                onChange={e => setNarocnik(e.target.value)}
                maxLength={15}
                style={{
                  background: "#EBEFF2",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  fontSize: "13px",
                  color: "#1E293B",
                  outline: "none",
                }}
              />
            </div>

            {/* Datum */}
            <div className="grid grid-cols-[1fr_2.2fr] items-center gap-3">
              <span className="text-xs text-[#718797] font-semibold">Datum</span>
              <input
                type="text"
                value={datum}
                onChange={e => setDatum(e.target.value)}
                maxLength={10}
                style={{
                  background: "#EBEFF2",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  fontSize: "13px",
                  color: "#1E293B",
                  outline: "none",
                }}
              />
            </div>

            {/* Divider */}
            <hr className="border-[#1D4ED8]/20 my-1" />

            {/* Odgovorni */}
            <div className="grid grid-cols-[1fr_2.2fr] items-center gap-3">
              <span className="text-xs text-[#718797] font-semibold">Odgovorni</span>
              <div className="relative w-full">
                <select
                  value={selectedWorkerId}
                  onChange={e => setSelectedWorkerId(e.target.value)}
                  required
                  style={{
                    background: "#EBEFF2",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 28px 6px 12px",
                    fontSize: "13px",
                    color: selectedWorkerId ? "#1E293B" : "#718797",
                    outline: "none",
                    width: "100%",
                    appearance: "none",
                  }}
                >
                  <option value="" disabled hidden></option>
                  {workers.map(w => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="#718797" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              style={{
                background: "rgba(29, 78, 216, 1)",
                color: "#FFFFFF",
                fontSize: "11px",
                fontWeight: 700,
                padding: "8px 24px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.5px",
                textTransform: "uppercase"
              }}
              className="hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              DODAJ NA URNIK
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
