"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  AuraLabel,
  AuraInput,
  auraCard,
  auraButton,
} from "./AuraForm";

interface AddWorkerCardProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddWorker: (worker: {
    name: string;
    role: string;
    phone: string;
    email: string;
  }) => void;
}

export function AddWorkerCard({ isOpen, onOpenChange, onAddWorker }: AddWorkerCardProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const sanitizePhone = (raw: string) => raw.replace(/[^0-9+\s]/g, "");
  const isValidPhone = (raw: string) => /^\+?[0-9\s]{6,}$/.test(raw.trim());
  const normalizedPhone = (raw: string) => raw.trim().replace(/\s+/g, "");

  const handlePhoneChange = (raw: string) => {
    const sanitized = sanitizePhone(raw);
    setPhone(sanitized);
    if (sanitized && !isValidPhone(sanitized)) {
      setPhoneError("Vnesite veljavno telefonsko številko.");
    } else {
      setPhoneError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    onAddWorker({
      name,
      role,
      phone: phone && isValidPhone(phone) ? normalizedPhone(phone) : "",
      email,
    });

    setName("");
    setRole("");
    setPhone("");
    setEmail("");
    setPhoneError(null);
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
                  Dodaj delavca
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {/* Ime — required */}
                <div>
                  <AuraLabel strong>Ime in priimek *</AuraLabel>
                  <AuraInput
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={25}
                    required
                    strong
                    placeholder="Npr. Janez Novak"
                  />
                </div>

                {/* Vloga / podjetje */}
                <div>
                  <AuraLabel>Podjetje / vloga</AuraLabel>
                  <AuraInput
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    maxLength={20}
                    placeholder="Npr. Novak d.o.o."
                  />
                </div>

                {/* Telefon */}
                <div>
                  <AuraLabel>Vnesite telefonsko številko za avtomatski klic</AuraLabel>
                  <div className="flex items-center gap-2">
                    <a
                      href={phone && isValidPhone(phone) ? `tel:${normalizedPhone(phone)}` : "#"}
                      onClick={(e) => {
                        if (!phone || !isValidPhone(phone)) {
                          e.preventDefault();
                        }
                      }}
                      className="shrink-0"
                      title={phone ? `Pokliči ${phone}` : "Vnesite telefonsko številko"}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                          phone && isValidPhone(phone)
                            ? "bg-[#1B3A6B] border-[#1B3A6B] text-white shadow-[0_4px_10px_-2px_rgba(27,58,107,0.3)]"
                            : "bg-white border-[#1B3A6B]/25 text-slate-500"
                        }`}
                      >
                        <svg width="16" height="16" viewBox="0 0 20 18" fill="currentColor">
                          <path d="M7.22477 1.25722C6.8873 0.497902 6.0702 0 5.16154 0H2.10521C0.942534 0 0 0.848098 0 1.89453C0 10.7892 8.01177 18 17.8945 18C19.0572 18 19.9995 17.1516 19.9995 16.1052L20 13.354C20 12.5362 19.4469 11.8009 18.6033 11.4971L15.674 10.4429C14.9161 10.1701 14.0533 10.2929 13.4263 10.7632L12.6702 11.3307C11.7873 11.9929 10.4882 11.9402 9.67552 11.2088L7.54672 9.29106C6.73403 8.55963 6.67398 7.39134 7.40975 6.59669L8.04016 5.9163C8.56268 5.35196 8.70032 4.57516 8.39719 3.89309L7.22477 1.25722Z" />
                        </svg>
                      </div>
                    </a>
                    <AuraInput
                      type="tel"
                      inputMode="tel"
                      placeholder="Telefonska številka..."
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  {phoneError && (
                    <span className="text-[11px] text-red-500">{phoneError}</span>
                  )}
                </div>

                {/* E-pošta */}
                <div>
                  <AuraLabel>E-pošta</AuraLabel>
                  <AuraInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={30}
                    placeholder="ime@podjetje.si"
                  />
                </div>
              </div>

              <button type="submit" className={auraButton}>
                DODAJ DELAVCA
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
  );
}
