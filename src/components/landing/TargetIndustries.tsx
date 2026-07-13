"use client";

import React from "react";

export function TargetIndustries() {
  const row1 = [
    "Gradbena podjetja",
    "Slikopleskarstvo",
    "Keramika in zaključna dela",
    "Fasaderstvo",
    "Montaže",
    "Akviziterstvo",
    "Varnostne službe"
  ];

  const row2 = [
    "Servisi",
    "Vodovodne inštalacije",
    "Elektro inštalacije",
    "Avtovleka in avtoservis",
    "Čistilni servisi",
    "Energetika",
    "Dostava in logistika"
  ];

  const row3 = [
    "Vzdrževalna dela",
    "Urejanje okolice",
    "Upravniki stavb",
    "Inženiringi in projektiranje",
    "Organizatorji prireditev, porok",
    "Zavarovalništvo"
  ];

  const row4 = [
    "Inšpekcije in pregledi",
    "Selitve",
    "Komunalna podjetja",
    "Kurirske službe"
  ];

  const renderRow = (items: string[]) => (
    <div 
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        width: "100%"
      }}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          style={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "6px 12px",
            background: "rgba(255, 255, 255, 0.04)",
            border: "0.7px solid #1D4ED8",
            borderRadius: "9999px",
            transition: "all 0.3s ease"
          }}
          className="hover:scale-[1.03] hover:bg-blue-500/5 hover:border-blue-600 transition-all cursor-default"
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "16px",
              display: "flex",
              alignItems: "center",
              color: "rgba(29, 78, 216, 0.6)",
              transition: "color 0.3s ease"
            }}
            className="hover:text-blue-600"
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section 
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "80px 24px",
        gap: "40px",
        background: "transparent"
      }}
      className="relative z-10"
    >
      {/* Intro Title & Subtitle */}
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0px",
          gap: "16px",
          maxWidth: "768px",
          width: "100%",
          textAlign: "center"
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            letterSpacing: "-0.48px",
            color: "#3B82F6",
            textTransform: "uppercase"
          }}
        >
          USTVARJENO ZA
        </span>
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "32px",
            lineHeight: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            letterSpacing: "-1.5px",
            color: "#020617",
            margin: 0
          }}
        >
          Podjetja, ki želijo več pregleda in lažje vodenje
        </h2>
      </div>

      {/* Grid of Industry Pills */}
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0px",
          gap: "20px",
          width: "100%",
          maxWidth: "1100px"
        }}
      >
        {renderRow(row1)}
        {renderRow(row2)}
        {renderRow(row3)}
        {renderRow(row4)}
      </div>

      {/* Footer Text */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontStyle: "normal",
          fontWeight: 300,
          fontSize: "16px",
          lineHeight: "28px",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          color: "#475569",
          // marginTop: "12px"
        }}
      >
        in druga.
      </div>
    </section>
  );
}
