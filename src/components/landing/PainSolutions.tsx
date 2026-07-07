"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/useLanguage";

export function PainSolutions() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: t("tab1Label"),
      pains: [t("tab1Pain1"), t("tab1Pain2"), t("tab1Pain3")],
      painSummary: t("tab1Pain4"),
      solutions: [t("tab1Sol1"), t("tab1Sol2"), t("tab1Sol3")],
      solSummary: t("tab1Sol4"),
    },
    {
      label: t("tab2Label"),
      pains: [t("tab2Pain1"), t("tab2Pain2"), t("tab2Pain3")],
      painSummary: t("tab2Pain4"),
      solutions: [t("tab2Sol1"), t("tab2Sol2"), t("tab2Sol3")],
      solSummary: t("tab2Sol4"),
    },
    {
      label: t("tab3Label"),
      pains: [t("tab3Pain1"), t("tab3Pain2"), t("tab3Pain3")],
      painSummary: t("tab3Pain4"),
      solutions: [t("tab3Sol1"), t("tab3Sol2"), t("tab3Sol3")],
      solSummary: t("tab3Sol4"),
    },
  ];

  const userTypes = ["Lastnike", "Vodje", "Tajnice", "Terenske ekipe"];

  return (
    <section id="kako-deluje" className="max-w-7xl mx-auto px-6 py-20">
      {/* Outer dark card — exact Figma gradient + border + shadow */}
      <div
        className="relative overflow-hidden rounded-[44px] border border-white/10"
        style={{
          background: "linear-gradient(180deg, #172033 0%, #101827 100%)",
          boxShadow:
            "0px 40px 90px -45px rgba(15, 23, 42, 0.78), inset 0px 1px 0px 1px rgba(255, 255, 255, 0.14)",
          minHeight: "620px",
        }}
      >


        {/* Content */}
        <div className="relative z-10 px-10 md:px-16 pt-10 pb-12 md:pb-16 flex flex-col gap-0">

          {/* Heading — Figma: padding-bottom 24px */}
          <div className="text-center mb-6">
            <h2
              className="text-white"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                lineHeight: 1,
              }}
            >
              Velike koristi za vse.
            </h2>
          </div>

          {/* Tab Pills — Figma: gap-3, mb 24px before problem cards */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                id={`pain-tab-${idx}`}
                onClick={() => setActiveTab(idx)}
                className="flex items-center gap-3 rounded-full text-sm transition-all duration-300"
                style={{
                  padding: "12px 24px",
                  height: "46px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                  ...(activeTab === idx
                    ? {
                        background: "#FFFFFF",
                        color: "#0F172A",
                        boxShadow: "inset 0px 1px 0px #FFFFFF",
                      }
                    : {
                        background: "rgba(255, 255, 255, 0.07)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "inset 0px 1px 0px 1px rgba(255, 255, 255, 0.08)",
                        color: "#FFFFFF",
                      }),
                }}
              >
                {tab.label}
                {activeTab === idx && (
                  <iconify-icon
                    icon="solar:arrow-right-linear"
                    style={{ fontSize: "18px", color: "#0F172A" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Two-column comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* TRENUTNO column */}
            <div>
              <p
                className="mb-4 uppercase"
                style={{
                  fontFamily: "Roboto, Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#60A5FA",
                }}
              >
                Trenutno
              </p>
              <div className="flex flex-col gap-4">
                {tabs[activeTab].pains.map((pain, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="shrink-0 pt-[3px]">
                      {/* X circle — exact SVG from Figma */}
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.06857 8.19999L4.80583 5.93725L5.9372 4.80588L8.19994 7.06862L10.4627 4.80588L11.5941 5.93725L9.33131 8.19999L11.5941 10.4627L10.4627 11.5941L8.19994 9.33136L5.9372 11.5941L4.80583 10.4627L7.06857 8.19999ZM13.8568 13.8568C10.7326 16.981 5.66725 16.981 2.54308 13.8568C-0.581111 10.7326 -0.581111 5.66733 2.54308 2.54314C5.66725 -0.581032 10.7326 -0.581061 13.8568 2.54314C16.981 5.6673 16.981 10.7327 13.8568 13.8568ZM12.7254 12.7255C15.2248 10.2261 15.2248 6.17387 12.7254 3.67451C10.2261 1.17515 6.17382 1.17514 3.67446 3.67451C1.1751 6.17386 1.1751 10.2261 3.67446 12.7255C6.17382 15.2248 10.2261 15.2248 12.7254 12.7255Z" fill="#151E23" fillOpacity="0.6" stroke="white" strokeWidth="0.4"/>
                      </svg>
                    </span>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 300,
                        fontSize: "16px",
                        lineHeight: "28px",
                        color: "#FFFFFF",
                      }}
                    >
                      {pain}
                    </p>
                  </div>
                ))}
                {/* Summary row */}
                <div className="flex items-start gap-3 mt-2">
                  <span className="shrink-0 pt-[3px]">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.06857 8.19999L4.80583 5.93725L5.9372 4.80588L8.19994 7.06862L10.4627 4.80588L11.5941 5.93725L9.33131 8.19999L11.5941 10.4627L10.4627 11.5941L8.19994 9.33136L5.9372 11.5941L4.80583 10.4627L7.06857 8.19999ZM13.8568 13.8568C10.7326 16.981 5.66725 16.981 2.54308 13.8568C-0.581111 10.7326 -0.581111 5.66733 2.54308 2.54314C5.66725 -0.581032 10.7326 -0.581061 13.8568 2.54314C16.981 5.6673 16.981 10.7327 13.8568 13.8568ZM12.7254 12.7255C15.2248 10.2261 15.2248 6.17387 12.7254 3.67451C10.2261 1.17515 6.17382 1.17514 3.67446 3.67451C1.1751 6.17386 1.1751 10.2261 3.67446 12.7255C6.17382 15.2248 10.2261 15.2248 12.7254 12.7255Z" fill="#151E23" fillOpacity="0.6" stroke="white" strokeWidth="0.4"/>
                    </svg>
                  </span>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "28px",
                      color: "#FFFFFF",
                    }}
                  >
                    {tabs[activeTab].painSummary}
                  </p>
                </div>
              </div>
            </div>

            {/* JUTRI column */}
            <div>
              <p
                className="mb-4 uppercase"
                style={{
                  fontFamily: "Roboto, Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#60A5FA",
                }}
              >
                Jutri
              </p>
              <div className="flex flex-col gap-4">
                {tabs[activeTab].solutions.map((sol, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="shrink-0 pt-[3px]">
                      {/* Check circle — exact SVG from Figma */}
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M15 7.5C15 11.6423 11.6423 15 7.5 15C3.35775 15 0 11.6423 0 7.5C0 3.35775 3.35775 0 7.5 0C11.6423 0 15 3.35775 15 7.5ZM10.5225 5.2275C10.7418 5.44711 10.7418 5.80289 10.5225 6.0225L6.7725 9.7725C6.55289 9.99184 6.19711 9.99184 5.9775 9.7725L4.4775 8.2725C4.32701 8.13227 4.26506 7.92108 4.31596 7.72178C4.36686 7.52248 4.52248 7.36686 4.72178 7.31596C4.92108 7.26506 5.13227 7.32701 5.2725 7.4775L6.375 8.58L8.05125 6.90375L9.7275 5.2275C9.94711 5.00816 10.3029 5.00816 10.5225 5.2275Z" fill="#3B82F6"/>
                      </svg>
                    </span>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "28px",
                        color: "#FFFFFF",
                      }}
                    >
                      {sol}
                    </p>
                  </div>
                ))}
                {/* Summary row */}
                <div className="flex items-start gap-3 mt-2">
                  <span className="shrink-0 pt-[3px]">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M15 7.5C15 11.6423 11.6423 15 7.5 15C3.35775 15 0 11.6423 0 7.5C0 3.35775 3.35775 0 7.5 0C11.6423 0 15 3.35775 15 7.5ZM10.5225 5.2275C10.7418 5.44711 10.7418 5.80289 10.5225 6.0225L6.7725 9.7725C6.55289 9.99184 6.19711 9.99184 5.9775 9.7725L4.4775 8.2725C4.32701 8.13227 4.26506 7.92108 4.31596 7.72178C4.36686 7.52248 4.52248 7.36686 4.72178 7.31596C4.92108 7.26506 5.13227 7.32701 5.2725 7.4775L6.375 8.58L8.05125 6.90375L9.7275 5.2275C9.94711 5.00816 10.3029 5.00816 10.5225 5.2275Z" fill="#3B82F6"/>
                    </svg>
                  </span>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: "16px",
                      lineHeight: "28px",
                      color: "#FFFFFF",
                    }}
                  >
                    {tabs[activeTab].solSummary}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom separator + KORISTNO ZA */}
          <div
            className="pt-8 flex flex-col gap-4"
            style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
          >
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "16px",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              Koristno za
            </p>
            <div className="flex flex-wrap gap-3">
              {userTypes.map((type) => (
                <span
                  key={type}
                  style={{
                    padding: "6px 12px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "9999px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
