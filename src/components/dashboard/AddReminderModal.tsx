"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AddReminderModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddReminder: (reminderData: {
    title: string;
    description: string;
    time: string;
    date: string;
    isUrgent: boolean;
    hasAttachment: boolean;
    attachmentName: string;
    hasEmail: boolean;
    phoneNumber: string;
    hasConfirm: boolean;
    hasDecline: boolean;
  }) => void;
}

export function AddReminderModal({ isOpen, onOpenChange, onAddReminder }: AddReminderModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  // Dynamic icon selections
  const [hasAttachment, setHasAttachment] = useState(false);
  const [attachmentName, setAttachmentName] = useState("");
  const [hasEmail, setHasEmail] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hasConfirm, setHasConfirm] = useState(false);
  const [hasDecline, setHasDecline] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onAddReminder({
      title,
      description,
      time: time || new Date().toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" }),
      date: date || new Date().toLocaleDateString("sl-SI"),
      isUrgent,
      hasAttachment,
      attachmentName: hasAttachment ? (attachmentName || "priponka.pdf") : "",
      hasEmail,
      phoneNumber,
      hasConfirm,
      hasDecline,
    });
    
    // Reset fields
    setTitle("");
    setDescription("");
    setTime("");
    setDate("");
    setIsUrgent(false);
    setHasAttachment(false);
    setAttachmentName("");
    setHasEmail(false);
    setPhoneNumber("");
    setHasConfirm(false);
    setHasDecline(false);
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
          padding: "24px",
          maxWidth: "350px",
          width: "90%",
        }}
        className="outline-none"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-slate-800">
          <h3
            style={{
              fontFamily: "'PT Sans', sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              textAlign: "center",
              color: "#334155",
            }}
          >
            Dodaj opomnik
          </h3>

          <div className="flex flex-col gap-3">
            {/* Opomnik */}
            <div className="flex flex-col gap-1">
              <span className="text-xs text-[#6D778E] font-semibold">Opomnik</span>
              <input
                type="text"
                placeholder="Napišite opomnik..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength={20}
                required
                style={{
                  background: "#EBEFF2",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  color: "#1E293B",
                  outline: "none",
                }}
              />
            </div>

            {/* Description / Field under that */}
            <div className="flex flex-col gap-1">
              <textarea
                placeholder="Lahko dodate kratek opomnik, lahko naslov, datume..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                maxLength={50}
                rows={2}
                style={{
                  background: "#EBEFF2",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  color: "#1E293B",
                  outline: "none",
                  resize: "none",
                }}
              />
            </div>

            <hr className="border-[#9C24FF]/10 my-1" />

            {/* Čas, datum */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#6D778E] font-semibold w-16">Čas, datum</span>
              <input
                type="text"
                placeholder="16:48"
                value={time}
                onChange={e => setTime(e.target.value)}
                maxLength={5}
                style={{
                  background: "#EBEFF2",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 8px",
                  fontSize: "13px",
                  color: "#1E293B",
                  outline: "none",
                  width: "60px",
                  textAlign: "center",
                }}
              />
              <input
                type="text"
                placeholder="02.02.2026"
                value={date}
                onChange={e => setDate(e.target.value)}
                maxLength={10}
                style={{
                  background: "#EBEFF2",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 8px",
                  fontSize: "13px",
                  color: "#1E293B",
                  outline: "none",
                  width: "100px",
                  textAlign: "center",
                }}
              />
            </div>

            {/* Nujno */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#6D778E] font-semibold w-16">Nujno</span>
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={e => setIsUrgent(e.target.checked)}
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              />
            </div>

            <hr className="border-[#9C24FF]/10 my-1" />

            {/* Dodaj ikone section */}
            <span className="text-xs text-[#6D778E] font-semibold">Dodaj ikone</span>

            <div className="flex flex-col gap-3">
              {/* Row 1: Priponka & E-posta */}
              <div className="flex gap-4">
                {/* Priponka */}
                <button
                  type="button"
                  onClick={() => setHasAttachment(!hasAttachment)}
                  className="flex items-center gap-2 flex-1 text-left"
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "0.7px solid rgba(96, 165, 250, 0.5)",
                      borderRadius: "6px",
                      background: hasAttachment ? "rgba(34, 197, 94, 0.1)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6D778E" strokeWidth="2">
                      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                  </div>
                  <span className="text-[12px] text-[#6D778E]">Priponka</span>
                </button>

                {/* E-posta */}
                <button
                  type="button"
                  onClick={() => setHasEmail(!hasEmail)}
                  className="flex items-center gap-2 flex-1 text-left"
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "0.7px solid rgba(96, 165, 250, 0.5)",
                      borderRadius: "6px",
                      background: hasEmail ? "rgba(34, 197, 94, 0.1)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="text-sm font-semibold text-[#6D778E]">@</span>
                  </div>
                  <span className="text-[12px] text-[#6D778E]">E-pošta</span>
                </button>
              </div>

              {/* Attachment name input if priponka is checked */}
              {hasAttachment && (
                <input
                  type="text"
                  placeholder="Ime priponke (npr. Mike_Niagara.pdf)"
                  value={attachmentName}
                  onChange={e => setAttachmentName(e.target.value)}
                  style={{
                    background: "#EBEFF2",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 10px",
                    fontSize: "12px",
                    color: "#1E293B",
                    outline: "none",
                  }}
                  required
                />
              )}

              {/* Row 2: Telefon */}
              <div className="flex items-center gap-3">
                <div
                  onClick={() => {}}
                  style={{
                    width: "32px",
                    height: "32px",
                    border: "0.7px solid rgba(96, 165, 250, 0.5)",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "default",
                  }}
                  className="shrink-0"
                >
                  <svg width="16" height="16" viewBox="0 0 20 18" fill="none">
                    <path
                      d="M7.22477 1.25722C6.8873 0.497902 6.0702 0 5.16154 0H2.10521C0.942534 0 0 0.848098 0 1.89453C0 10.7892 8.01177 18 17.8945 18C19.0572 18 19.9995 17.1516 19.9995 16.1052L20 13.354C20 12.5362 19.4469 11.8009 18.6033 11.4971L15.674 10.4429C14.9161 10.1701 14.0533 10.2929 13.4263 10.7632L12.6702 11.3307C11.7873 11.9929 10.4882 11.9402 9.67552 11.2088L7.54672 9.29106C6.73403 8.55963 6.67398 7.39134 7.40975 6.59669L8.04016 5.9163C8.56268 5.35196 8.70032 4.57516 8.39719 3.89309L7.22477 1.25722Z"
                      fill="rgba(29, 78, 216, 1)"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Telefonska številka..."
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  style={{
                    background: "#EBEFF2",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    fontSize: "13px",
                    color: "#1E293B",
                    outline: "none",
                    flex: 1,
                  }}
                />
              </div>

              {/* Row 3: Potrdi & Zavrni */}
              <div className="flex gap-4">
                {/* Potrdi */}
                <button
                  type="button"
                  onClick={() => setHasConfirm(!hasConfirm)}
                  className="flex items-center gap-2 flex-1 text-left"
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "0.7px solid rgba(96, 165, 250, 0.5)",
                      borderRadius: "6px",
                      background: hasConfirm ? "rgba(34, 197, 94, 0.1)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#6D778E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[12px] text-[#6D778E]">Potrdi</span>
                </button>

                {/* Zavrni */}
                <button
                  type="button"
                  onClick={() => setHasDecline(!hasDecline)}
                  className="flex items-center gap-2 flex-1 text-left"
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "0.7px solid rgba(96, 165, 250, 0.5)",
                      borderRadius: "6px",
                      background: hasDecline ? "rgba(34, 197, 94, 0.1)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M14.6066 14.6066L7.80336 7.80336M7.80336 7.80336L1 1M7.80336 7.80336L14.6067 1M7.80336 7.80336L1 14.6067" stroke="#6D778E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[12px] text-[#6D778E]">Zavrni</span>
                </button>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-3">
            <button
              type="submit"
              style={{
                background: "rgba(29, 78, 216, 1)",
                color: "#FFFFFF",
                fontSize: "11px",
                fontWeight: 700,
                padding: "10px 24px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.5px",
                textTransform: "uppercase"
              }}
              className="hover:bg-purple-700 active:scale-[0.98] transition-all"
            >
              DODAJ NA URNIK
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
