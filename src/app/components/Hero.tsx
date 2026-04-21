import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { HeroCanvas } from "./HeroCanvas";

const STATS = [
  { num: "٣", unit: "مسارات تجارية", note: "" },
  { num: "٣+", unit: "منتجات ذكاء اصطناعي", note: "" },
  { num: "١٠٠٪", unit: "تخصص في القطاع الحكومي", note: "" },
  { num: "KSA", unit: "مبنيّ في المملكة", note: "" },
];

const AGENT_LINES = [
  { label: "Gov Agent", status: "نشط", val: 98 },
  { label: "CX Agent", status: "نشط", val: 94 },
  { label: "Finance Agent", status: "يعالج", val: 77 },
];

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [agentTick, setAgentTick] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setAgentTick((n) => n + 1), 2400);
    return () => clearInterval(iv);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#08090D",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Neural network canvas */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <HeroCanvas />
      </div>

      {/* Radial green glow — center-right for RTL text area */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 70% at 72% 48%, rgba(0,146,69,0.08) 0%, transparent 65%)",
      }} />

      {/* Bottom gradient fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "200px", zIndex: 1,
        background: "linear-gradient(to top, #08090D 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2,
        flex: 1,
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 40px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "130px",
        paddingBottom: "80px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "48px",
          alignItems: "center",
          direction: "rtl",
        }}>

          {/* ── Text Column ── */}
          <div>
            {/* Label pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                border: "1px solid rgba(0,146,69,0.22)",
                borderRadius: "100px",
                padding: "7px 18px",
                marginBottom: "36px",
                backgroundColor: "rgba(0,146,69,0.06)",
              }}
            >
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%",
                backgroundColor: "#009245", display: "block",
                boxShadow: "0 0 8px rgba(0,146,69,0.8)",
                animation: "pulse-live 2s ease-in-out infinite",
              }} />
              <span style={{ color: "#009245", fontSize: "13px", fontWeight: 600, letterSpacing: "0.02em" }}>
                ذكاء موثوق لخدمات حكومية أذكى
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 48 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{
                fontSize: "clamp(52px, 7.5vw, 108px)",
                fontWeight: 700,
                color: "rgba(255,255,255,0.95)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginBottom: "28px",
              }}
            >
              ذكاء اصطناعي{" "}
              <span style={{
                color: "#009245",
                textShadow: "0 0 60px rgba(0,146,69,0.4)",
                position: "relative",
              }}>
                موثوق.
              </span>
              <br />
              <span style={{ color: "rgba(255,255,255,0.75)" }}>تحوّل رقمي حقيقي.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              style={{
                fontSize: "clamp(16px, 1.6vw, 20px)",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.75,
                maxWidth: "560px",
                marginBottom: "52px",
              }}
            >
              نبني بشراً رقميين موثوقين وحلول ذكاء اصطناعي عملية،
              مصمّمة خصيصاً لتحويل الجهات الحكومية وتحسين تجربة المستفيد الحقيقية.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
              style={{ display: "flex", gap: "14px", direction: "rtl" }}
            >
              <button
                style={{
                  fontSize: "15px", fontWeight: 600, color: "#FFFFFF",
                  backgroundColor: "#009245", border: "none", cursor: "pointer",
                  padding: "15px 32px", borderRadius: "12px",
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  transition: "all 0.25s ease",
                  boxShadow: "0 4px 24px rgba(0,146,69,0.35)",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#30B55C";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 36px rgba(0,146,69,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#009245";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,146,69,0.35)";
                }}
              >
                استكشف حلولنا
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 8H3M7 5l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                style={{
                  fontSize: "15px", fontWeight: 500, color: "rgba(255,255,255,0.7)",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255,255,255,0.12)",
                  cursor: "pointer", padding: "15px 32px", borderRadius: "12px",
                  transition: "all 0.25s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,146,69,0.35)";
                  e.currentTarget.style.color = "#009245";
                  e.currentTarget.style.backgroundColor = "rgba(0,146,69,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                تواصل مع فريقنا
              </button>
            </motion.div>
          </div>

          {/* ── Visual Column — AI Agent Status Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="hidden lg:block"
            style={{ width: "260px", flexShrink: 0 }}
          >
            {/* Agent status panel */}
            <div style={{
              backgroundColor: "rgba(20,26,34,0.9)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(0,146,69,0.25)",
              borderRadius: "20px",
              padding: "24px",
              marginBottom: "16px",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Corner glow */}
              <div style={{
                position: "absolute", top: "-30px", right: "-30px",
                width: "100px", height: "100px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,146,69,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    backgroundColor: "#009245", display: "block",
                    boxShadow: "0 0 10px rgba(0,146,69,0.9)",
                  }} />
                  <span style={{ color: "#009245", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em" }}>
                    SYSTEM LIVE
                  </span>
                </div>
                <span style={{
                  fontSize: "10px", color: "rgba(255,255,255,0.3)",
                  fontFamily: "monospace", direction: "ltr",
                }}>v2.4.1</span>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "8px", letterSpacing: "0.04em" }}>
                  وكلاء نشطون
                </div>
                {AGENT_LINES.map((ag, i) => (
                  <div key={ag.label} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    marginBottom: "10px", direction: "ltr",
                  }}>
                    <div style={{
                      flex: 1, height: "3px", borderRadius: "2px",
                      backgroundColor: "rgba(255,255,255,0.07)",
                      overflow: "hidden",
                    }}>
                      <div style={{
                        height: "100%",
                        width: `${ag.val + ((agentTick + i) % 3) * 2}%`,
                        backgroundColor: "#009245",
                        borderRadius: "2px",
                        transition: "width 1.2s ease",
                        boxShadow: "0 0 6px rgba(0,146,69,0.6)",
                      }} />
                    </div>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", fontFamily: "monospace", flexShrink: 0 }}>
                      {ag.label}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "14px",
                display: "flex", justifyContent: "space-between",
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "white", lineHeight: 1 }}>
                    {(99.7 + ((agentTick % 4) * 0.05)).toFixed(1)}%
                  </div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", marginTop: "4px" }}>دقة</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "white", lineHeight: 1 }}>
                    {1243 + (agentTick % 7) * 11}
                  </div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", marginTop: "4px" }}>طلب/يوم</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#009245", lineHeight: 1 }}>
                    {(0.8 + ((agentTick % 5) * 0.04)).toFixed(1)}s
                  </div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", marginTop: "4px" }}>استجابة</div>
                </div>
              </div>
            </div>

            {/* Trust badge */}
            <div style={{
              backgroundColor: "rgba(20,26,34,0.75)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "14px",
              padding: "16px 20px",
              display: "flex", alignItems: "center", gap: "12px",
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                backgroundColor: "rgba(0,146,69,0.12)",
                border: "1px solid rgba(0,146,69,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1.5L2 5v5c0 4.15 3.02 8.03 7 9 3.98-.97 7-4.85 7-9V5L9 1.5z" stroke="#009245" strokeWidth="1.3" strokeLinejoin="round" />
                  <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#009245" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                  Trustworthy AI
                </div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>
                  NDMO · ISO · Vision 2030
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      <style>{`
        @keyframes pulse-live {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(0,146,69,0.9); }
          50% { opacity: 0.5; box-shadow: 0 0 4px rgba(0,146,69,0.4); }
        }
      `}</style>
    </section>
  );
}