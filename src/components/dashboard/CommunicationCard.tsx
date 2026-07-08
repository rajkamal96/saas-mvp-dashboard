"use client";

import React from "react";
import { Message } from "@/lib/mockData";

interface CommunicationCardProps {
  message: Message;
  onResolve: () => void;
  onDismiss: () => void;
  onAttachmentClick?: () => void;
  onArchive?: () => void;
}

export function CommunicationCard({
  message,
  onResolve,
  onDismiss,
  onAttachmentClick = () => {},
  onArchive = () => {},
}: CommunicationCardProps) {
  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "20px",
        gap: "20px",
        width: "100%",
        height: "253px",
        minHeight: "208px",
        background: "linear-gradient(180deg, #60A5FA 0%, #2563EB 100%)",
        border: "1px solid #1D4ED8",
        boxShadow:
          "0px 18px 42px -24px rgba(59, 130, 246, 0.55), inset 0px 1px 0px 1px rgba(255, 255, 255, 0.35)",
        borderRadius: "24px",
        isolation: "isolate",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blue depth glows */}
      <div
        style={{
          position: "absolute",
          left: "56.56%",
          right: "-19.6%",
          top: "-34.37%",
          bottom: "51.41%",
          borderRadius: "9999px",
          background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(20px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Top row: Meta + Close/Dismiss */}
      <div className="flex items-center justify-between w-full z-10">
        <span
          style={{
            fontFamily: "'PT Sans', sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "15px",
            color: "#DBEAFE",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
          }}
        >
          {message.workerName} • {message.time}
        </span>

        {/* Dismiss Button */}
        <button
          onClick={onDismiss}
          style={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px",
            width: "36px",
            height: "36px",
            background: "rgba(255, 255, 255, 0.9)",
            border: "1px solid #FFFFFF",
            borderRadius: "12px",
            boxShadow:
              "0px 8px 18px -12px rgba(15, 23, 42, 0.35), inset 0px 1px 0px 1px #FFFFFF",
            cursor: "pointer",
          }}
          title="Dismiss"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.6066 14.6066L7.80336 7.80336M7.80336 7.80336L1 1M7.80336 7.80336L14.6067 1M7.80336 7.80336L1 14.6067"
              stroke="#6D778E"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Middle: Inner white card (Meeting Prep) */}
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "16px",
          width: "100%",
          height: "77px",
          background: "rgba(255, 255, 255, 0.95)",
          border: "1px solid #FFFFFF",
          borderRadius: "21.6px",
          boxShadow:
            "0px 12px 28px -18px rgba(15, 23, 42, 0.26), inset 0px 1px 0px 1px #FFFFFF",
          zIndex: 1,
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'PT Sans', sans-serif",
            fontWeight: 700,
            fontSize: "15px",
            lineHeight: "20px",
            color: "#1C1A1A",
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={message.text}
        >
          {message.text}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#64748B",
            marginTop: "2px",
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {message.targetTask || "Danes je zadnji dan."}
        </p>
      </div>

      {/* Bottom: Focus Window */}
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          width: "100%",
          height: "66px",
          background: "rgba(255, 255, 255, 0.002)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "inset 0px 1px 0px 1px rgba(255, 255, 255, 0.18)",
          backdropFilter: "blur(2px)",
          borderRadius: "21.6px",
          zIndex: 1,
        }}
      >
        {/* Left: Time display */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "-0.6px",
            color: "#FFFFFF",
          }}
        >
          {message.time}
        </span>

        {/* Right: Three buttons group */}
        <div className="flex items-center gap-2">
          {/* Button 1: Paperclip */}
          <button
            onClick={onAttachmentClick}
            style={{
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px",
              width: "32px",
              height: "32px",
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid #FFFFFF",
              boxShadow: "inset 0px 1px 0px 1px #FFFFFF",
              borderRadius: "12px",
              cursor: "pointer",
            }}
            title="Attachments"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6D778E"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>

          {/* Button 2: Checkmark (Resolve) */}
          <button
            onClick={onResolve}
            style={{
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px",
              width: "32px",
              height: "32px",
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid #FFFFFF",
              boxShadow: "inset 0px 1px 0px 1px #FFFFFF",
              borderRadius: "12px",
              cursor: "pointer",
            }}
            title="Approve / Resolve"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3333 4L6 11.3333L2.66667 8"
                stroke="#6D778E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Button 3: Archive / Decline */}
          <button
            onClick={onArchive}
            style={{
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px",
              width: "32px",
              height: "32px",
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid #FFFFFF",
              boxShadow: "inset 0px 1px 0px 1px #FFFFFF",
              borderRadius: "12px",
              cursor: "pointer",
            }}
            title="Archive"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6066 14.6066L7.80336 7.80336M7.80336 7.80336L1 1M7.80336 7.80336L14.6067 1M7.80336 7.80336L1 14.6067"
                stroke="#6D778E"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
