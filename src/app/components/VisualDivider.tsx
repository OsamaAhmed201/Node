import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

function useInView(threshold = 0.3) {
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

// Animated SVG data-flow system — pure visual, no photos
function DataFlowSVG() {
  return (
    <svg
      viewBox="0 0 1200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0, opacity: 0.55 }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="df-h" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#009245" stopOpacity="0" />
          <stop offset="20%" stopColor="#009245" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#009245" stopOpacity="0.7" />
          <stop offset="80%" stopColor="#009245" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#009245" stopOpacity="0" />
        </linearGradient>
        <filter id="df-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Horizontal flow lines */}
      {[40, 60, 80, 100, 120].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="1200" y2={y}
          stroke="rgba(0,146,69,0.06)" strokeWidth="1" />
      ))}

      {/* Main data rail */}
      <line x1="0" y1="80" x2="1200" y2="80" stroke="url(#df-h)" strokeWidth="1" />

      {/* Node clusters */}
      {[180, 360, 600, 840, 1020].map((x, i) => (
        <g key={i}>
          {/* Outer ring */}
          <circle cx={x} cy="80" r="28" stroke="rgba(0,146,69,0.12)" strokeWidth="1" fill="none" />
          <circle cx={x} cy="80" r="16" stroke="rgba(0,146,69,0.2)" strokeWidth="1" fill="rgba(0,146,69,0.04)" />
          <circle cx={x} cy="80" r="5" fill="#009245" filter="url(#df-glow)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur={`${1.8 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          {/* Vertical branch */}
          <line x1={x} y1="64" x2={x} y2="40" stroke="rgba(0,146,69,0.15)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={x} cy="36" r="3" fill="rgba(0,146,69,0.3)" stroke="rgba(0,146,69,0.5)" strokeWidth="1" />
        </g>
      ))}

      {/* Moving data packets on main rail */}
      {[0, 0.4, 0.7].map((delay, i) => (
        <circle key={i} r="3.5" fill="#009245" filter="url(#df-glow)" opacity="0.9">
          <animateMotion dur="6s" repeatCount="indefinite" begin={`${delay * 6}s`}>
            <mpath href="#df-path" />
          </animateMotion>
        </circle>
      ))}
      <path id="df-path" d="M 0 80 L 1200 80" style={{ display: "none" }} />

      {/* Tick marks along top */}
      {Array.from({ length: 40 }, (_, i) => (
        <line key={i} x1={30 + i * 30} y1="20" x2={30 + i * 30} y2={24 + (i % 3 === 0 ? 6 : 2)}
          stroke="rgba(0,146,69,0.18)" strokeWidth="1" />
      ))}
    </svg>
  );
}

export function VisualDivider() {
  const { ref, inView } = useInView(0.3);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        height: "260px",
        overflow: "hidden",
        backgroundColor: "#07090D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Top & bottom fades for seamless section transitions */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "60px",
        background: "linear-gradient(to bottom, #0F151D 0%, transparent 100%)",
        zIndex: 2, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "60px",
        background: "linear-gradient(to top, #0A0F15 0%, transparent 100%)",
        zIndex: 2, pointerEvents: "none",
      }} />

      {/* Animated SVG system */}
      <DataFlowSVG />

      {/* Center typography */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative", zIndex: 3,
          textAlign: "center",
          direction: "rtl",
          padding: "0 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {/* Monospace label row */}
        <div style={{
          display: "flex", alignItems: "center", gap: "14px", direction: "ltr",
        }}>
          <div style={{ width: "40px", height: "1px", background: "linear-gradient(to right, transparent, rgba(0,146,69,0.6))" }} />
          <span style={{
            fontSize: "10px", fontWeight: 600,
            color: "rgba(0,146,69,0.65)",
            fontFamily: "monospace",
            letterSpacing: "0.14em",
          }}>
            AGENTIC · GENERATIVE · VERTICAL AI · TRUSTED
          </span>
          <div style={{ width: "40px", height: "1px", background: "linear-gradient(to left, transparent, rgba(0,146,69,0.6))" }} />
        </div>

        {/* Main statement */}
        <p style={{
          fontSize: "clamp(20px, 3vw, 40px)",
          fontWeight: 700,
          color: "rgba(255,255,255,0.82)",
          lineHeight: 1.3,
          letterSpacing: "-0.02em",
          maxWidth: "760px",
        }}>
          كل حل نبنيه يبدأ بسؤال واحد:{" "}
          <span style={{ color: "#009245" }}>كيف يخدم هذا المستفيد السعودي؟</span>
        </p>
      </motion.div>
    </div>
  );
}
