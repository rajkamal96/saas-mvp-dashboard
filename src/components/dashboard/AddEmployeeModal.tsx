"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  AuraLabel,
  AuraInput,
  auraCard,
  auraButton,
} from "./AuraForm";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddEmployee: (employeeData: {
    name: string;
    phone: string;
    email: string;
    role: "Pisarna" | "Teren";
    tempPassword?: string;
  }) => void;
}

export function AddEmployeeModal({ isOpen, onOpenChange, onAddEmployee }: AddEmployeeModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"Pisarna" | "Teren">("Teren");
  const [tempPassword, setTempPassword] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setPhone("");
      setEmail("");
      setRole("Teren");
      setTempPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddEmployee({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      role,
      tempPassword: tempPassword.trim(),
    });
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
              <h3 className="text-xl font-bold tracking-tight text-slate-900">
                Dodaj sodelavca
              </h3>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-3">
              {/* Name */}
              <div>
                <AuraLabel strong>Ime</AuraLabel>
                <AuraInput
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  strong
                  placeholder="Npr. Janez Novak"
                />
              </div>

              {/* Phone */}
              <div>
                <AuraLabel>Mobilna številka:</AuraLabel>
                <AuraInput
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Npr. +386 40 123 456"
                />
              </div>

              {/* Email */}
              <div>
                <AuraLabel>Email:</AuraLabel>
                <AuraInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Npr. janez.novak@podjetje.si"
                />
              </div>

              {/* Notice note */}
              <p className="text-[10px] text-slate-400 italic leading-relaxed">
                Op. kontakti bodo omogočili direktno komunikacijo preko glasovnih sporočil in emaila
              </p>

              {/* Access Role */}
              <div>
                <AuraLabel strong>Dostop</AuraLabel>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => setRole("Pisarna")}
                    className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${
                      role === "Pisarna"
                        ? "bg-[#1B3A6B] border-[#1B3A6B] text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    PISARNA
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("Teren")}
                    className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${
                      role === "Teren"
                        ? "bg-[#1B3A6B] border-[#1B3A6B] text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    TEREN
                  </button>
                </div>
              </div>

              {/* Temporary Password */}
              <div>
                <AuraLabel>Začasno geslo: (4 številke)</AuraLabel>
                <AuraInput
                  type="text"
                  maxLength={4}
                  pattern="[0-9]{4}"
                  value={tempPassword}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setTempPassword(val);
                  }}
                  placeholder="1234"
                />
              </div>
            </div>

            {/* Action button */}
            <button type="submit" className={auraButton}>
              DODAJ
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
