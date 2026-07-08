"use client";

import React from "react";
import { Order } from "@/lib/mockData";

interface CommunicationCardProps {
  order: Order;
  onResolve: () => void;
  onDismiss: () => void;
  onAttachmentClick?: () => void;
  onArchive?: () => void;
  onCall?: () => void;
  buttonsConfig?: "call-tick-decline" | "attachment-tick-decline" | "none";
  showRedButton?: boolean;
}

export function CommunicationCard({
  order,
  onResolve,
  onDismiss,
  onAttachmentClick = () => {},
  onArchive = () => {},
  onCall = () => {},
  buttonsConfig = "attachment-tick-decline",
  showRedButton = false,
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
          {order.workerName} • {order.time}
        </span>

        {/* Top-Right Buttons */}
        <div className="flex items-center gap-2">
          {showRedButton && (
            <button
              style={{
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                background: "transparent",
                border: "none",
              }}
              title="Options"
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="34" height="34" rx="11" fill="#FF0000" stroke="white" strokeWidth="2"/>
                <circle cx="18" cy="12" r="1.5" fill="white" />
                <circle cx="18" cy="18" r="1.5" fill="white" />
                <circle cx="18" cy="24" r="1.5" fill="white" />
              </svg>
            </button>
          )}

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
          }}
          title={order.title}
        >
          {order.title.slice(0, 35) + (order.title.length > 35 ? "..." : "")}
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
          }}
        >
          {(() => {
            const desc = order.description || "";
            return desc.slice(0, 100) + (desc.length > 100 ? "..." : "");
          })()}
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
          {order.time}
        </span>

        {/* Right: Three buttons group */}
        {buttonsConfig !== "none" && (
          <div className="flex items-center gap-2">
            {/* Button 1: Call (only if call-tick-decline) */}
            {buttonsConfig === "call-tick-decline" && (
              <button
                onClick={onCall}
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
                title="Call"
              >
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.22477 1.25722C6.8873 0.497902 6.0702 0 5.16154 0H2.10521C0.942534 0 0 0.848098 0 1.89453C0 10.7892 8.01177 18 17.8945 18C19.0572 18 19.9995 17.1516 19.9995 16.1052L20 13.354C20 12.5362 19.4469 11.8009 18.6033 11.4971L15.674 10.4429C14.9161 10.1701 14.0533 10.2929 13.4263 10.7632L12.6702 11.3307C11.7873 11.9929 10.4882 11.9402 9.67552 11.2088L7.54672 9.29106C6.73403 8.55963 6.67398 7.39134 7.40975 6.59669L8.04016 5.9163C8.56268 5.35196 8.70032 4.57516 8.39719 3.89309L7.22477 1.25722Z"
                    fill="#6D778E"
                  />
                </svg>
              </button>
            )}

            {/* Button 2: Paperclip (only if attachment-tick-decline) */}
            {buttonsConfig === "attachment-tick-decline" && (
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
            )}

            {/* Button 3: Checkmark (Resolve) */}
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

            {/* Button 4: Archive / Decline */}
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
        )}
      </div>
    </div>
  );
}
