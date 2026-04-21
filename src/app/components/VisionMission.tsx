import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const VALUES = [
  "الثقة أولاً",
  "التخصص العميق",
  "الأثر الحقيقي",
  "التعاون الاستراتيجي",
  "الابتكار المسؤول",
  "السياق المحلي",
];

// Pure geometric SVG — no image, concept: scale / structure / precision
function VisionGeometry() {
  return (
    <svg
      viewBox="0 0 1200 560"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
      }}
    >
      <defs>
        <radialGradient id="vg-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#009245" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#009245" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vg-line-h" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#009245" stopOpacity="0" />
          <stop offset="50%" stopColor="#009245" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#009245" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Central green glow fill */}
      <ellipse cx="600" cy="280" rx="440" ry="260" fill="url(#vg-center)" />

      {/* Concentric diamond rings (rotated squares) */}
      {[80, 160, 240, 320, 400].map((r, i) => (
        <rect
          key={i}
          x={600 - r} y={280 - r * 0.55}
          width={r * 2} height={r * 1.1}
          rx="2"
          stroke="#009245"
          strokeOpacity={0.06 - i * 0.01}
          strokeWidth="0.8"
          transform={`rotate(45, 600, 280)`}
        />
      ))}

      {/* Horizontal guide lines */}
      {[160, 200, 240, 280, 320, 360, 400].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="1200" y2={y}
          stroke="rgba(0,146,69,0.04)" strokeWidth="0.8" />
      ))}

      {/* Strong center horizontal line */}
      <line x1="0" y1="280" x2="1200" y2="280" stroke="url(#vg-line-h)" strokeWidth="1" />

      {/* Vertical axis */}
      <line x1="600" y1="0" x2="600" y2="560"
        stroke="rgba(0,146,69,0.08)" strokeWidth="0.8"
        strokeDasharray="4 8" />

      {/* Corner coordinate markers */}
      {[
        [120, 100], [1080, 100], [120, 460], [1080, 460],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1={x - 12} y1={y} x2={x + 12} y2={y} stroke="rgba(0,146,69,0.25)" strokeWidth="1" />
          <line x1={x} y1={y - 12} x2={x} y2={y + 12} stroke="rgba(0,146,69,0.25)" strokeWidth="1" />
        </g>
      ))}

      {/* Central node */}
      <circle cx="600" cy="280" r="5" fill="#009245" opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="600" cy="280" r="18" stroke="#009245" strokeOpacity="0.2" strokeWidth="1" fill="none" />
      <circle cx="600" cy="280" r="40" stroke="#009245" strokeOpacity="0.08" strokeWidth="1" fill="none" />

      {/* Fine dot grid — very subtle */}
      {Array.from({ length: 20 }, (_, row) =>
        Array.from({ length: 40 }, (_, col) => (
          <circle key={`${row}-${col}`}
            cx={30 + col * 30} cy={20 + row * 28}
            r="0.8" fill="rgba(0,146,69,0.08)"
          />
        ))
      )}
    </svg>
  );
}

export function VisionMission() {
  const { ref, inView } = useInView(0.06);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#0D1419",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── VISION — Pure geometric system block ── */}
      <div style={{ position: "relative", minHeight: "560px", display: "flex", alignItems: "center", overflow: "hidden" }}>

        {/* Pure geometric SVG — no photo */}
        <VisionGeometry />

        {/* Top + bottom fade for seamless transition */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "80px",
          background: "linear-gradient(to bottom, #0D1419 0%, transparent 100%)",
          zIndex: 1, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
          background: "linear-gradient(to top, #0D1419 0%, transparent 100%)",
          zIndex: 1, pointerEvents: "none",
        }} />

        {/* Large faded VISION watermark */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(80px, 16vw, 200px)", fontWeight: 700,
          color: "rgba(0,146,69,0.03)",
          lineHeight: 1, pointerEvents: "none",
          fontFamily: "monospace",
          userSelect: "none",
          direction: "ltr",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}>
          VISION
        </div>

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 2,
          maxWidth: "1280px", margin: "0 auto",
          padding: "100px 40px",
          width: "100%",
          direction: "rtl",
        }}>
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {/* Section label top */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "32px", height: "1.5px", backgroundColor: "#009245" }} />
                <span style={{ color: "#009245", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em" }}>
                  رؤيتنا · رسالتنا · قيمنا
                </span>
                <div style={{ width: "32px", height: "1.5px", backgroundColor: "#009245" }} />
              </div>
            </div>

            {/* Vision label pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: "rgba(0,146,69,0.1)",
              border: "1px solid rgba(0,146,69,0.25)",
              borderRadius: "8px", padding: "7px 16px", marginBottom: "36px",
            }}>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                backgroundColor: "#009245", display: "block",
              }} />
              <span style={{ color: "#009245", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em" }}>
                رؤيتنا
              </span>
            </div>

            <p style={{
              fontSize: "clamp(30px, 4.5vw, 64px)",
              fontWeight: 700,
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.25,
              letterSpacing: "-0.025em",
              maxWidth: "960px",
            }}>
              قيادة التحول الرقمي{" "}
              <span style={{
                color: "#009245",
                textShadow: "0 0 60px rgba(0,146,69,0.3)",
              }}>الموثوق</span>{" "}
              في المملكة والمنطقة من خلال ذكاء اصطناعي يُبنى على الثقة والقيم الإنسانية.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── MISSION + VALUES — text section below ── */}
      <div style={{ padding: "80px 0 100px", position: "relative" }}>
        {/* Subtle bg grid */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <svg width="100%" height="100%" style={{ opacity: 0.03 }}>
            <defs>
              <pattern id="vmgrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,146,69,1)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vmgrid)" />
          </svg>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>

          {/* MISSION — Two column */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{
              direction: "rtl",
              marginBottom: "72px",
              paddingBottom: "72px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
            }}
          >
            {/* Mission text */}
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px", padding: "6px 14px", marginBottom: "28px",
              }}>
                <span style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.4)", display: "block",
                }} />
                <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em" }}>
                  رسالتنا
                </span>
              </div>
              <p style={{
                fontSize: "clamp(20px, 2.5vw, 34px)",
                fontWeight: 600,
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.55,
                letterSpacing: "-0.015em",
              }}>
                بناء أنظمة ذكاء اصطناعي عملية وموثوقة تُحوّل تجربة الاستفادة من الخدمات الحكومية
                وتُطوّر كفاءة المؤسسات.
              </p>
            </div>

            {/* Mission visual — clean data bar system, no image */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "Trust Layer", desc: "ذكاء موثوق وشفاف", pct: 100 },
                { label: "Gov Alignment", desc: "متوافق مع رؤية 2030", pct: 100 },
                { label: "AI Depth", desc: "تخصص تقني حقيقي", pct: 94 },
                { label: "Local Context", desc: "فهم سعودي عميق", pct: 98 },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.07 }}
                  style={{ direction: "ltr" }}
                >
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    marginBottom: "8px",
                  }}>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", letterSpacing: "0.04em" }}>
                      {item.label}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
                        {item.desc}
                      </span>
                      <span style={{ fontSize: "11px", color: "#009245", fontFamily: "monospace" }}>
                        {item.pct}%
                      </span>
                    </div>
                  </div>
                  <div style={{ height: "2px", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "1px" }}>
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={inView ? { width: `${item.pct}%` } : {}}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 + i * 0.1 }}
                      style={{
                        height: "100%", backgroundColor: "#009245", borderRadius: "1px",
                        boxShadow: "0 0 6px rgba(0,146,69,0.5)",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* VALUES */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{ direction: "rtl" }}
          >
            <div style={{ marginBottom: "40px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px", padding: "6px 14px", marginBottom: "0",
              }}>
                <span style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.4)", display: "block",
                }} />
                <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em" }}>
                  قيمنا
                </span>
              </div>
            </div>

            {/* Values — pure typographic flow, no cards */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}>
              {VALUES.map((val, i) => (
                <motion.div
                  key={val}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
                  style={{
                    padding: "28px 0 28px 48px",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    borderLeft: i % 3 !== 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    width: "33.333%",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    direction: "rtl",
                  }}
                >
                  <span style={{
                    fontSize: "10px", fontWeight: 700,
                    color: "rgba(0,146,69,0.5)",
                    fontFamily: "monospace",
                    letterSpacing: "0.02em",
                    flexShrink: 0,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{
                    fontSize: "clamp(14px, 1.4vw, 18px)",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.75)",
                    letterSpacing: "-0.01em",
                  }}>
                    {val}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
