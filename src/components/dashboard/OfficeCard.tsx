"use client";

import React from "react";
import { Order } from "@/lib/mockData";

interface OfficeCardProps {
  order: Order;
  onApprove: () => void;
  onDecline: () => void;
  onCall?: () => void;
  onDismiss?: () => void;
}

export function OfficeCard({
  order,
  onApprove,
  onDecline,
  onCall = () => {},
  onDismiss = () => {},
}: OfficeCardProps) {
  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "20px",
        gap: "20px",
        width: "100%", // Fit inside column flex
        background: "#F8F2E9",
        border: "1px solid #1D4ED8",
        boxShadow:
          "0px 18px 42px -24px rgba(59, 130, 246, 0.55), inset 0px 1px 0px 1px rgba(255, 255, 255, 0.35)",
        borderRadius: "24px",
        position: "relative",
      }}
    >
      {/* Top Meta Row */}
      <div className="flex items-center justify-between w-full">
        <span
          style={{
            fontFamily: "'PT Sans', sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "15px",
            color: "#94A3B8",
            textTransform: "uppercase",
          }}
        >
          {order.workerName} • {order.time}
        </span>

        {/* Close/Dismiss Button */}
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
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.6066 14.6066L7.80336 7.80336M7.80336 7.80336L1 1M7.80336 7.80336L14.6067 1M7.80336 7.80336L1 14.6067"
              stroke="#6D778E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Middle Text Block */}
      <div className="flex flex-col gap-1 w-full">
        <p
          style={{
            fontFamily: "'PT Sans', sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "22px",
            color: "#1C1A1A",
          }}
        >
          {order.title}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#94A3B8",
          }}
        >
          {order.description || "Danes je zadnji dan."}
        </p>
      </div>

      {/* Bottom Action Row */}
      <div className="flex items-center justify-between w-full mt-2">
        {/* Time display */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "-0.6px",
            color: "#1D4ED8",
          }}
        >
          {order.time}
        </span>

        {/* Buttons group */}
        <div className="flex items-center gap-2">
          {/* Call button */}
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
              border: "0.7px solid #3B82F6",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.22477 1.25722C6.8873 0.497902 6.0702 0 5.16154 0H2.10521C0.942534 0 0 0.848098 0 1.89453C0 10.7892 8.01177 18 17.8945 18C19.0572 18 19.9995 17.1516 19.9995 16.1052L20 13.354C20 12.5362 19.4469 11.8009 18.6033 11.4971L15.674 10.4429C14.9161 10.1701 14.0533 10.2929 13.4263 10.7632L12.6702 11.3307C11.7873 11.9929 10.4882 11.9402 9.67552 11.2088L7.54672 9.29106C6.73403 8.55963 6.67398 7.39134 7.40975 6.59669L8.04016 5.9163C8.56268 5.35196 8.70032 4.57516 8.39719 3.89309L7.22477 1.25722Z"
                fill="#3B82F6"
              />
            </svg>
          </button>

          {/* Tick (Approve) button */}
          <button
            onClick={onApprove}
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
              border: "0.7px solid #3B82F6",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            <svg
              width="19"
              height="14"
              viewBox="0 0 19 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7.12813L6.36223 12.4904L17.8537 1"
                stroke="#6D778E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Cross (Decline) button */}
          <button
            onClick={onDecline}
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
              border: "0.7px solid #3B82F6",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6066 14.6066L7.80336 7.80336M7.80336 7.80336L1 1M7.80336 7.80336L14.6067 1M7.80336 7.80336L1 14.6067"
                stroke="#6D778E"
                strokeWidth="2"
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
