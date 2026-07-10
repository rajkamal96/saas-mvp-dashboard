"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  AuraLabel,
  AuraInput,
  auraCard,
  auraButton,
} from "./AuraForm";

interface AddTaskModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (taskData: {
    delavec: string;
    opravilo: string;
    kraj: string;
    narocnik: string;
    datum: string;
  }) => void;
}

export function AddTaskModal({ isOpen, onOpenChange, onAddTask }: AddTaskModalProps) {
  const [opravilo, setOpravilo] = useState("");
  const [kraj, setKraj] = useState("");
  const [narocnik, setNarocnik] = useState("");
  const [datum, setDatum] = useState("");
  const [delavec, setDelavec] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!delavec || !opravilo) return;
    onAddTask({
      delavec,
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
    setDelavec("");
    onOpenChange(false);
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
        <div className={auraCard}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-slate-800">
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

              {/* Delavec — required, stronger styling */}
              <div>
                <AuraLabel strong>Delavec *</AuraLabel>
                <AuraInput
                  type="text"
                  value={delavec}
                  onChange={(e) => setDelavec(e.target.value)}
                  maxLength={22}
                  required
                  strong
                  placeholder="Npr. Ana Novak"
                />
              </div>
            </div>

            {/* Action button */}
            <button type="submit" className={auraButton}>
              DODAJ NA URNIK
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
