"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/useLanguage";
import { FloatingBubble } from "./FloatingBubble";

// ── Shared text styles ────────────────────────────────────────────────────────
const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "16px",
  letterSpacing: "-0.48px",
  color: "#93C5FD",
  marginBottom: "12px",
};

const LABEL_STYLE_SLIDE_2: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "16px",
  letterSpacing: "-0.48px",
  color: "#93C5FD",
  marginBottom: "16px",
};

const TITLE_STYLE: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 300,
  fontSize: "32px",
  lineHeight: "48px",
  letterSpacing: "-1.2px",
  color: "#FFFFFF",
  margin: "0 0 20px 0",
};

const BODY_STYLE: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 300,
  fontSize: "18px",
  lineHeight: "24px",
  color: "#CBD5E1",
};

const EXAMPLE_STYLE: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  color: "#CBD5E1",
};

// ── Shared button styles ──────────────────────────────────────────────────────
const BTN_WHITE: React.CSSProperties = {
  background: "#FFFFFF",
  boxShadow: "inset 0px 1px 0px #FFFFFF",
  borderRadius: "9999px",
  padding: "12px 24px",
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
  color: "#0F172A",
  cursor: "default",
  border: "none",
  whiteSpace: "nowrap" as const,
};

const BTN_GLASS: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.07)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "inset 0px 1px 0px 1px rgba(255, 255, 255, 0.08)",
  borderRadius: "9999px",
  padding: "12px 24px",
  display: "inline-flex",
  alignItems: "center",
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
  color: "#FFFFFF",
  cursor: "pointer",
  whiteSpace: "nowrap" as const,
};

// ── Main component ────────────────────────────────────────────────────────────
export function TransformationSlider() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("cenik");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        paddingBottom: "80px",
        paddingRight: "24px",
        paddingLeft: "24px",
        position: "relative",
        zIndex: 20,
      }}
    >
      <style>{`
        @media (max-width: 1024px) {
          .ts-outer-card {
            padding: 40px !important;
          }
          .ts-slide {
            gap: 32px !important;
          }
        }
        @media (max-width: 768px) {
          .ts-outer-card {
            padding: 24px !important;
            border-radius: 28px !important;
            background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%) !important;
          }
          .ts-slide {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 24px !important;
          }
          .ts-slide-image {
            width: 100% !important;
            display: flex;
            justify-content: center;
          }
          .ts-slide-image img {
            width: 260px !important;
            height: auto !important;
            max-width: 100%;
          }
          .ts-slide-image img.ts-mobile-mockup {
            width: calc(100% + 48px) !important;
            max-width: none !important;
            margin-left: -24px;
            margin-right: -24px;
          }
          .ts-slide-content {
            height: auto !important;
            padding-top: 0 !important;
            align-items: stretch !important;
          }
          .ts-title {
            font-size: 24px !important;
            line-height: 32px !important;
            letter-spacing: -0.5px !important;
          }
          .ts-body {
            font-size: 15px !important;
            line-height: 22px !important;
          }
          .ts-button-row {
            padding-left: 0 !important;
            padding-bottom: 0 !important;
            margin-top: 24px;
            justify-content: center !important;
          }
        }
      `}</style>

      {/* ── Outer card wrapper (allows bubble to hang outside) ─────────────── */}
      <div style={{ position: "relative" }}>
        {/* ── Outer card ──────────────────────────────────────────────────────── */}
        <div
        className="ts-outer-card"
        style={{
          background: "linear-gradient(180deg, #172033 0%, #101827 100%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow:
            "0px 40px 90px -45px rgba(15, 23, 42, 0.78), inset 0px 1px 0px 1px rgba(255, 255, 255, 0.14)",
          borderRadius: "44px",
          padding: "64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Glow blobs ─────────────────────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            left: "-12%",
            bottom: "-25%",
            width: "45%",
            height: "45%",
            borderRadius: "9999px",
            background: "rgba(125, 211, 252, 0.1)",
            filter: "blur(40px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "42%",
            top: "20%",
            width: "25%",
            height: "25%",
            borderRadius: "9999px",
            background: "rgba(255, 255, 255, 0.05)",
            filter: "blur(32px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── Slide content ──────────────────────────────────────────────────── */}
        <div style={{ position: "relative", zIndex: 10 }}>

          {/* ─────────────────── SLIDE 1 ─────────────────── */}
          {activeSlide === 0 && (
            <div
              className="ts-slide"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: "64px",
              }}
            >
              {/* Left: phone image */}
              <div className="ts-slide-image" style={{ flexShrink: 0, width: "318px" }}>
                <img
                  src="/mobile.png"
                  alt="Zaslon za terence"
                  className="ts-mobile-mockup"
                  style={{
                    width: "318px",
                    height: "600px",
                    objectFit: "contain",
                    objectPosition: "top",
                    display: "block",
                  }}
                />
              </div>

              {/* Right: text + buttons */}
              <div
                className="ts-slide-content"
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  height: "600px",
                  paddingTop: "18px",
                }}
              >
                <div style={LABEL_STYLE}>PLATFORMA ZA TERENCE</div>
                <h3 className="ts-title" style={TITLE_STYLE}>En zaslon - vse je dosegljivo z enim dotikom</h3>

                <div className="ts-body" style={{ ...BODY_STYLE, flex: 1, lineHeight: "28px" }}>
                  <p style={{ margin: "0 0 4px 0" }}>Prilagojen zaslon, ki bo v pomoč terencem.</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {[
                      "Enostavno dodajanje novih korakov",
                      "pod ikonico 'Podrobno' so vse informacije in dokumentacija, ki je vezana na to delovno nalogo",
                      "Komunikacija s pisarno/vodjo na štiri načine. Klik na ikonico s telefonom avtomatično kliče pisarno/vodjo, klik na glasovno sporočilo avtomatično pošlje sporočilo po končanem pisku.",
                    ].map((txt, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          marginBottom: "2px",
                        }}
                      >
                        <span style={{ color: "#60A5FA", flexShrink: 0 }}>•</span>
                        <span>{txt}</span>
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontWeight: 400, margin: "16px 0 0 0" }}>
                    Pomembno: Terenci se ne učijo novega sistema. Samo opravijo svoje delo.
                  </p>
                  <p style={{ margin: "16px 0 0 0" }}>
                    Ne dodajamo še ene nove aplikacije, ampak samo optimiziramo način dela.
                  </p>
                </div>

                {/* Buttons — left-aligned at the bottom */}
                <div
                  className="ts-button-row"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "16px",
                    paddingBottom: "40px",
                    paddingLeft: "50px",
                    width: "100%",
                  }}
                >
                  <button onClick={() => setActiveSlide(1)} style={{ ...BTN_WHITE, cursor: "pointer" }}>
                    Glasovna sporočila
                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                      <path
                        d="M0.5625 5.0625H12.5625M12.5625 5.0625L8.0625 0.5625M12.5625 5.0625L8.0625 9.5625"
                        stroke="#0F172A"
                        strokeWidth="1.125"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────── SLIDE 2 ─────────────────── */}
          {activeSlide === 1 && (
            <div
              className="ts-slide"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",  /* vertically center both columns relative to each other */
                gap: "64px",
              }}
            >
              {/* Left: all text content */}
              <div
                className="ts-slide-content"
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div style={LABEL_STYLE_SLIDE_2}>GLASOVNA SPOROČILA</div>
                <h3 className="ts-title" style={TITLE_STYLE}>Teren govori. Pisarna ukrepa. Delo teče hitreje.</h3>

                {/* Intro paragraph */}
                <p className="ts-body" style={{ ...BODY_STYLE, margin: "0 0 36px 0" }}>
                  Namesto telefonskega klica terenec govori v mikrofon. AI iz govora pripravi
                  kratek, jasen zapis, ki je takoj prikazan na delovni tabli pisarne. Informacije
                  postanejo uporabne takoj in pisarna lahko ukrepa.
                </p>

                {/* Example 1 */}
                <div style={{ marginBottom: "16px" }}>
                  {/* Label + quoted speech: weight 400 */}
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#EEF4FB", margin: "0 0 4px 0" }}>
                    Primer. Terenec govori:
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: "20px", color: "#CBD5E1", margin: "0 0 16px 0" }}>
                    &ldquo;Poslušaj, prišlo je do prometne nesreče na obvoznici, premikamo se s polžjo hitrostjo in zabijam čas tukaj, ko se mudi. Zgleda, da bom lahko prevzel šele okrog enajstih namesto ob desetih.&rdquo;
                  </p>
                  {/* AI label + AI output: weight 400 for label, 300 for quote */}
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#EEF4FB", margin: "0 0 4px 0" }}>
                    AI sporočilo pretvori v tekst, ki se prikaže na delovni tabli pisarne.
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: "20px", color: "#CBD5E1", margin: "0 0 16px 0" }}>
                    &ldquo;Prometna nesreča na obvoznici. Prevzem okrog 11:00.&rdquo;
                  </p>
                  {/* Outcome: weight 400 */}
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#EEF4FB", margin: "0 0 24px 0" }}>
                    Pisarna je obveščena, naročnika lahko obvesti o zamudi ali organizira prevzem tovora preko drugega.
                  </p>
                </div>

                {/* Example 2 */}
                <div style={{ marginBottom: "16px" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#EEF4FB", margin: "0 0 4px 0" }}>
                    Drug primer: Terenec govori:
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: "20px", color: "#CBD5E1", margin: "0 0 16px 0" }}>
                    &ldquo;Evo, vse smo zaključil. Aja, porabil smo še dve kartuši silikona pa eno PU peno. Ne vem, če je še kaj ostalo v kakem kombiju al če mamo v skladišču.&rdquo;
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#EEF4FB", margin: "0 0 4px 0" }}>
                    AI prepozna porabljen material in pripravi zapis, ki se prikaže na delovni tabli pisarne.
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: "20px", color: "#CBD5E1", margin: "0 0 16px 0" }}>
                    &ldquo;Porabljeno: 2× kartuša silikona, 1× PU pena. Preveri zalogo.&rdquo;
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#EEF4FB", margin: "0 0 24px 0" }}>
                    Pisarna posodobi zalogo in doda artikle na seznam za naročilo.
                  </p>
                </div>

                {/* Example 3 */}
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#EEF4FB", margin: 0 }}>
                  Tretji primer: Terenci konec dneva v 15 sekundah povzamejo opravljena dela v dnevnem poročilu.
                </p>
              </div>

              {/* Right: voiceToText.jpg image — vertically centered (alignItems:center on parent handles this) */}
              <div className="ts-slide-image" style={{ flexShrink: 0, width: "304px" }}>
                <img
                  src="/voiceToText.jpg"
                  alt="Voice to text demo"
                  style={{
                    width: "304px",
                    height: "419px",
                    objectFit: "cover",
                    objectPosition: "top",
                    borderRadius: "21.6px",
                    border: "1px solid #FFFFFF",
                    display: "block",
                  }}
                />
              </div>
            </div>
          )}

        </div>

        {/* ── Navigation dots ─────────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginTop: "40px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {[0, 1].map((i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "9999px",
                background: activeSlide === i ? "#FFFFFF" : "rgba(255,255,255,0.3)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                transform: activeSlide === i ? "scale(1.1)" : "scale(1)",
                padding: 0,
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {activeSlide === 0 && (
          <FloatingBubble
            title="Platforma ne doda dela."
            subtitle="Samo šum odstrani."
            rotation={3}
            className="right-8 bottom-8 hidden md:block"
          />
        )}
      </div>
      </div>
    </section>
  );
}
