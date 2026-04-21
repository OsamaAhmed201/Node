import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

function useInView(threshold = 0.08) {
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

// ── VISUAL 1: Agent Network Topology ── Innovation track
function AgentNetworkVisual() {
  const center = { x: 200, y: 200 };
  const agents = [
    { x: 200, y: 70, label: "PERCEPTION", active: true },
    { x: 320, y: 135, label: "PLANNING", active: true },
    { x: 320, y: 265, label: "ACTION", active: false },
    { x: 200, y: 330, label: "MEMORY", active: true },
    { x: 80, y: 265, label: "TOOLS", active: false },
    { x: 80, y: 135, label: "OUTPUT", active: true },
  ];

  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", maxHeight: "380px" }}>
      <defs>
        <radialGradient id="an-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#009245" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#009245" stopOpacity="0" />
        </radialGradient>
        <filter id="an-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Ambient glow at center */}
      <circle cx="200" cy="200" r="120" fill="url(#an-core)" />

      {/* Outer orbit ring */}
      <circle cx="200" cy="200" r="130" stroke="rgba(0,146,69,0.07)" strokeWidth="1" strokeDasharray="3 6" />

      {/* Connection lines: center → agents */}
      {agents.map((a, i) => (
        <line key={i}
          x1={center.x} y1={center.y}
          x2={a.x} y2={a.y}
          stroke={a.active ? "rgba(0,146,69,0.35)" : "rgba(0,146,69,0.12)"}
          strokeWidth="1"
          strokeDasharray={a.active ? "none" : "3 5"}
        />
      ))}

      {/* Cross-connections (selected pairs) */}
      {[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]].map(([a, b], i) => (
        <line key={`cc-${i}`}
          x1={agents[a].x} y1={agents[a].y}
          x2={agents[b].x} y2={agents[b].y}
          stroke="rgba(0,146,69,0.06)" strokeWidth="0.8"
        />
      ))}

      {/* Animated data packets on active lines */}
      {agents.filter(a => a.active).map((a, i) => (
        <circle key={`pkt-${i}`} r="2.5" fill="#009245" opacity="0.9">
          <animateMotion
            dur={`${2.5 + i * 0.6}s`}
            repeatCount="indefinite"
            begin={`${i * 0.5}s`}
          >
            <mpath href={`#an-path-${i}`} />
          </animateMotion>
        </circle>
      ))}
      {agents.filter(a => a.active).map((a, i) => (
        <path key={`path-${i}`}
          id={`an-path-${i}`}
          d={`M ${center.x} ${center.y} L ${a.x} ${a.y}`}
          style={{ display: "none" }}
        />
      ))}

      {/* Agent nodes */}
      {agents.map((a, i) => (
        <g key={`node-${i}`}>
          <circle cx={a.x} cy={a.y} r={a.active ? 18 : 14}
            fill={a.active ? "rgba(0,146,69,0.12)" : "rgba(11,15,20,0.8)"}
            stroke={a.active ? "#009245" : "rgba(0,146,69,0.25)"}
            strokeWidth={a.active ? "1.5" : "0.8"}
          />
          {a.active && (
            <circle cx={a.x} cy={a.y} r="6" fill="#009245" filter="url(#an-glow)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur={`${1.8 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          )}
          {!a.active && (
            <circle cx={a.x} cy={a.y} r="4" fill="rgba(0,146,69,0.3)" />
          )}
          {/* Label */}
          <text
            x={a.x} y={a.y + (a.y > 200 ? 32 : -26)}
            textAnchor="middle"
            fontSize="8" fontFamily="monospace"
            fill={a.active ? "rgba(0,146,69,0.75)" : "rgba(255,255,255,0.2)"}
            letterSpacing="0.06em"
          >{a.label}</text>
        </g>
      ))}

      {/* Central core node */}
      <circle cx="200" cy="200" r="32" fill="rgba(11,15,20,0.9)"
        stroke="#009245" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="18" fill="rgba(0,146,69,0.15)"
        stroke="rgba(0,146,69,0.4)" strokeWidth="1" />
      <circle cx="200" cy="200" r="8" fill="#009245">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="200" y="248" textAnchor="middle"
        fontSize="8" fontFamily="monospace"
        fill="rgba(0,146,69,0.6)" letterSpacing="0.1em">
        AI CORE
      </text>
    </svg>
  );
}

// ── VISUAL 2: Service Journey (CX track) ──
function JourneyFlowVisual() {
  const stages = [
    { x: 60, label: "طلب", en: "REQUEST" },
    { x: 160, label: "تحليل", en: "ANALYZE" },
    { x: 260, label: "استجابة", en: "RESPOND" },
    { x: 360, label: "تكيّف", en: "ADAPT" },
    { x: 460, label: "رضا", en: "RESOLVE" },
  ];
  const cy = 130;

  return (
    <svg viewBox="0 50 520 200" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", maxHeight: "300px" }}>
      <defs>
        <linearGradient id="jf-track" x1="60" y1="0" x2="460" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#009245" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#009245" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#009245" stopOpacity="0.9" />
        </linearGradient>
        <filter id="jf-glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Baseline track */}
      <line x1="60" y1={cy} x2="460" y2={cy}
        stroke="rgba(0,146,69,0.08)" strokeWidth="1.5" />

      {/* Active progress line */}
      <line x1="60" y1={cy} x2="360" y2={cy}
        stroke="url(#jf-track)" strokeWidth="1.5" />

      {/* Moving packet along the journey */}
      <circle r="3" fill="#009245" filter="url(#jf-glow)">
        <animateMotion dur="5s" repeatCount="indefinite">
          <mpath href="#jf-full-path" />
        </animateMotion>
      </circle>
      <path id="jf-full-path" d={`M 60 ${cy} L 460 ${cy}`} style={{ display: "none" }} />

      {/* Stage nodes */}
      {stages.map((s, i) => (
        <g key={i}>
          {/* Vertical tick */}
          <line x1={s.x} y1={cy - 40} x2={s.x} y2={cy - 22}
            stroke={i <= 3 ? "rgba(0,146,69,0.3)" : "rgba(0,146,69,0.1)"}
            strokeWidth="1" strokeDasharray="2 3" />

          {/* Node circle */}
          <circle cx={s.x} cy={cy} r={i === 4 ? 16 : i === 0 ? 10 : 12}
            fill={i <= 3 ? "rgba(0,146,69,0.12)" : "rgba(0,146,69,0.04)"}
            stroke={i <= 3 ? "#009245" : "rgba(0,146,69,0.2)"}
            strokeWidth={i <= 3 ? "1.5" : "0.8"} />

          {i <= 3 && (
            <circle cx={s.x} cy={cy} r="4" fill="#009245" opacity={i === 3 ? "0.5" : "1"}>
              {i === 3 && (
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" />
              )}
            </circle>
          )}

          {/* Arabic label below */}
          <text x={s.x} y={cy + 30} textAnchor="middle"
            fontSize="11" fontFamily="'IBM Plex Sans Arabic', sans-serif"
            fill={i <= 3 ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.2)"}>
            {s.label}
          </text>

          {/* EN label above */}
          <text x={s.x} y={cy - 48} textAnchor="middle"
            fontSize="7" fontFamily="monospace"
            fill={i <= 3 ? "rgba(0,146,69,0.5)" : "rgba(0,146,69,0.15)"}
            letterSpacing="0.08em">
            {s.en}
          </text>
        </g>
      ))}

      {/* "AI Transformation" label at midpoint */}
      <text x="260" y="215" textAnchor="middle"
        fontSize="8" fontFamily="monospace"
        fill="rgba(0,146,69,0.35)" letterSpacing="0.1em">
        AI-POWERED CX JOURNEY
      </text>
    </svg>
  );
}

// ── VISUAL 3: AI Build/Deploy Pipeline ── AI Solutions track
function PipelineVisual() {
  const stages = [
    { label: "DATA", ar: "البيانات", y: 40, active: true },
    { label: "BUILD", ar: "البناء", y: 120, active: true },
    { label: "EVALUATE", ar: "التقييم", y: 200, active: true },
    { label: "DEPLOY", ar: "النشر", y: 280, active: false },
    { label: "GOVERN", ar: "الحوكمة", y: 360, active: false },
  ];

  return (
    <svg viewBox="0 0 320 420" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", maxHeight: "420px" }}>
      <defs>
        <linearGradient id="pl-vert" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#009245" stopOpacity="0.7" />
          <stop offset="55%" stopColor="#009245" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#009245" stopOpacity="0.08" />
        </linearGradient>
        <filter id="pl-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Central vertical pipeline rail */}
      <line x1="160" y1="40" x2="160" y2="380"
        stroke="rgba(0,146,69,0.08)" strokeWidth="2" />
      <line x1="160" y1="40" x2="160" y2="240"
        stroke="url(#pl-vert)" strokeWidth="2" />

      {/* Moving data packet down the pipeline */}
      <circle r="3" fill="#009245" filter="url(#pl-glow)">
        <animateMotion dur="4s" repeatCount="indefinite">
          <mpath href="#pl-path" />
        </animateMotion>
      </circle>
      <path id="pl-path" d="M 160 40 L 160 380" style={{ display: "none" }} />

      {/* Stage blocks */}
      {stages.map((s, i) => (
        <g key={i}>
          {/* Horizontal connector from rail to box */}
          <line x1="160" y1={s.y + 20} x2={i % 2 === 0 ? 190 : 130} y2={s.y + 20}
            stroke={s.active ? "rgba(0,146,69,0.3)" : "rgba(0,146,69,0.1)"}
            strokeWidth="1" />

          {/* Stage box */}
          <rect
            x={i % 2 === 0 ? 192 : 40}
            y={s.y + 2}
            width={108}
            height={36}
            rx="6"
            fill={s.active ? "rgba(0,146,69,0.08)" : "rgba(255,255,255,0.03)"}
            stroke={s.active ? "rgba(0,146,69,0.3)" : "rgba(255,255,255,0.07)"}
            strokeWidth="0.8"
          />

          {/* Stage label (EN) */}
          <text
            x={i % 2 === 0 ? 246 : 94}
            y={s.y + 16}
            textAnchor="middle"
            fontSize="8" fontFamily="monospace"
            fill={s.active ? "rgba(0,146,69,0.8)" : "rgba(255,255,255,0.2)"}
            letterSpacing="0.1em"
          >{s.label}</text>

          {/* Stage label (AR) */}
          <text
            x={i % 2 === 0 ? 246 : 94}
            y={s.y + 28}
            textAnchor="middle"
            fontSize="9" fontFamily="'IBM Plex Sans Arabic', sans-serif"
            fill={s.active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)"}
          >{s.ar}</text>

          {/* Node on rail */}
          <circle cx="160" cy={s.y + 20} r={s.active ? 6 : 4}
            fill={s.active ? "rgba(0,146,69,0.2)" : "rgba(11,15,20,0.9)"}
            stroke={s.active ? "#009245" : "rgba(0,146,69,0.2)"}
            strokeWidth="1.5" />
          {s.active && (
            <circle cx="160" cy={s.y + 20} r="2.5" fill="#009245">
              {i === 2 && (
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
              )}
            </circle>
          )}

          {/* Status dot */}
          {s.active && (
            <circle
              cx={i % 2 === 0 ? 288 : 56}
              cy={s.y + 20}
              r="2.5"
              fill="#009245"
              opacity="0.6"
            />
          )}
        </g>
      ))}

      {/* "NDMO COMPLIANT" badge at bottom */}
      <rect x="100" y="395" width="120" height="18" rx="4"
        fill="rgba(0,146,69,0.06)"
        stroke="rgba(0,146,69,0.2)" strokeWidth="0.8" />
      <text x="160" y="407" textAnchor="middle"
        fontSize="7" fontFamily="monospace"
        fill="rgba(0,146,69,0.55)" letterSpacing="0.1em">
        NDMO COMPLIANT
      </text>
    </svg>
  );
}

const tracks = [
  {
    id: "innovation",
    badge: "Innovation",
    arabicBadge: "الابتكار",
    subtitle: "نُعيد تعريف الممكن",
    description: "نبني حلولاً ذكاء اصطناعي رائدة لا تتبع الاتجاهات السائدة، بل تُنشئ اتجاهات جديدة — حلول مُصمّمة لتحديات القطاع الحكومي والمؤسسي الحقيقية.",
    offerings: [
      "وكلاء ذكاء اصطناعي عملياتي",
      "بشر رقميون موثوقون ومتكاملون",
      "حلول ذكاء اصطناعي توليدي مخصصة",
      "أبحاث وتطوير ذكاء اصطناعي تطبيقي",
    ],
    flip: false,
    stat: { value: "٣+", label: "حلول وكيلة نشطة" },
    Visual: AgentNetworkVisual,
    visualBg: "rgba(0,146,69,0.03)",
  },
  {
    id: "cx",
    badge: "Customer Experience",
    arabicBadge: "تجربة المستفيد",
    subtitle: "من إجراء إلى تجربة",
    description: "نُحوّل رحلة الاستفادة من خدمة حكومية تقليدية إلى تجربة استثنائية — ذكية، سلسة، مبنية على فهم عميق لاحتياجات المستفيد السعودي.",
    offerings: [
      "تصميم رحلة المستفيد الذكية",
      "منصات CX مدعومة بالذكاء الاصطناعي",
      "قياس الرضا وتحسين المسار التلقائي",
      "بشر رقميون لنقاط الخدمة والتواصل",
    ],
    flip: true,
    stat: { value: "٩٨٪", label: "رضا المستفيدين" },
    Visual: JourneyFlowVisual,
    visualBg: "rgba(0,146,69,0.02)",
  },
  {
    id: "ai-solutions",
    badge: "AI Solutions",
    arabicBadge: "حلول الذكاء الاصطناعي",
    subtitle: "حلول مُنجزة. أثر مقاس.",
    description: "نقدم حلول ذكاء اصطناعي مخصصة قابلة للتوسع — من التصوّر إلى النشر الفعلي — مع ضمان التكامل مع البنية التحتية الحكومية الرقمية.",
    offerings: [
      "بناء نماذج ذكاء اصطناعي متخصصة",
      "تكامل مع الأنظمة الحكومية القائمة",
      "حوكمة بيانات وذكاء اصطناعي مسؤول",
      "دعم ما بعد النشر والتحسين المستمر",
    ],
    flip: false,
    stat: { value: "١٠٠٪", label: "متوافق مع NDMO" },
    Visual: PipelineVisual,
    visualBg: "rgba(0,146,69,0.02)",
  },
];

export function BusinessTracks() {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      id="tracks"
      ref={ref}
      style={{
        backgroundColor: "#0A0F15",
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ direction: "rtl", marginBottom: "96px" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <div style={{ width: "32px", height: "1.5px", backgroundColor: "#009245" }} />
            <span style={{ color: "#009245", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em" }}>
              مسارات الأعمال
            </span>
            <div style={{ width: "32px", height: "1.5px", backgroundColor: "#009245" }} />
          </div>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 56px)",
            fontWeight: 700, color: "rgba(255,255,255,0.92)",
            lineHeight: 1.2, letterSpacing: "-0.025em",
          }}>
            ثلاثة مسارات.{" "}
            <span style={{ color: "rgba(255,255,255,0.35)" }}>قيمة واحدة.</span>
          </h2>
        </motion.div>

        {/* Tracks — alternating layout */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {tracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.15 }}
              style={{
                display: "grid",
                gridTemplateColumns: track.flip ? "1fr 1.1fr" : "1.1fr 1fr",
                gap: "72px",
                alignItems: "center",
                padding: "80px 0",
                borderBottom: i < tracks.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                direction: "rtl",
              }}
            >
              {/* Text side */}
              {!track.flip && (
                <div style={{ direction: "rtl" }}>
                  <TrackTextContent track={track} />
                </div>
              )}

              {/* SVG visual panel — pure code, no photo */}
              <div style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                minHeight: "400px",
                border: "1px solid rgba(0,146,69,0.12)",
                backgroundColor: track.visualBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px",
              }}>
                {/* Very subtle grid texture */}
                <div style={{
                  position: "absolute", inset: 0, opacity: 0.03,
                  backgroundImage: "linear-gradient(rgba(0,146,69,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,146,69,1) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                  pointerEvents: "none",
                }} />

                {/* Badge top corner */}
                <div style={{
                  position: "absolute", top: "16px",
                  ...(track.flip ? { left: "16px" } : { right: "16px" }),
                  display: "flex", alignItems: "center", gap: "7px",
                  backgroundColor: "rgba(16,22,30,0.92)",
                  border: "1px solid rgba(0,146,69,0.22)",
                  borderRadius: "100px", padding: "6px 12px",
                }}>
                  <span style={{
                    width: "5px", height: "5px", borderRadius: "50%",
                    backgroundColor: "#009245", display: "block",
                  }} />
                  <span style={{
                    fontSize: "9px", fontWeight: 600,
                    color: "rgba(255,255,255,0.55)",
                    fontFamily: "monospace", letterSpacing: "0.06em",
                  }}>
                    {track.badge.toUpperCase()}
                  </span>
                </div>

                {/* Stat bottom corner */}
                <div style={{
                  position: "absolute",
                  bottom: "16px",
                  ...(track.flip ? { left: "16px" } : { right: "16px" }),
                  backgroundColor: "rgba(16,22,30,0.92)",
                  border: "1px solid rgba(0,146,69,0.22)",
                  borderRadius: "12px", padding: "14px 18px",
                  textAlign: "center",
                  direction: "rtl",
                }}>
                  <div style={{
                    fontSize: "22px", fontWeight: 700, color: "#009245",
                    lineHeight: 1, marginBottom: "4px", letterSpacing: "-0.02em",
                  }}>
                    {track.stat.value}
                  </div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>
                    {track.stat.label}
                  </div>
                </div>

                {/* SVG visual */}
                <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
                  <track.Visual />
                </div>
              </div>

              {/* Text side (flipped) */}
              {track.flip && (
                <div style={{ direction: "rtl" }}>
                  <TrackTextContent track={track} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrackTextContent({ track }: { track: typeof tracks[0] }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
        <span style={{
          fontSize: "10px", fontWeight: 600, color: "#009245",
          backgroundColor: "rgba(0,146,69,0.1)",
          border: "1px solid rgba(0,146,69,0.22)",
          padding: "4px 12px", borderRadius: "5px",
          fontFamily: "monospace", letterSpacing: "0.06em",
        }}>{track.badge}</span>
      </div>

      <h3 style={{
        fontSize: "clamp(28px, 3.2vw, 46px)",
        fontWeight: 700, color: "rgba(255,255,255,0.9)",
        lineHeight: 1.2, letterSpacing: "-0.025em",
        marginBottom: "10px",
      }}>
        {track.arabicBadge}
      </h3>

      <p style={{
        fontSize: "15px", color: "rgba(255,255,255,0.35)",
        marginBottom: "24px", fontWeight: 500, letterSpacing: "0.01em",
      }}>
        {track.subtitle}
      </p>

      <p style={{
        fontSize: "16px", color: "rgba(255,255,255,0.55)",
        lineHeight: 1.8, marginBottom: "36px", maxWidth: "520px",
      }}>
        {track.description}
      </p>

      {/* Offerings as minimal list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {track.offerings.map((o, j) => (
          <div key={j} style={{
            display: "flex", alignItems: "center", gap: "14px",
            direction: "rtl",
          }}>
            <div style={{
              width: "20px", height: "1px",
              backgroundColor: "#009245", flexShrink: 0,
            }} />
            <span style={{
              fontSize: "14px", color: "rgba(255,255,255,0.6)",
              lineHeight: 1.5,
            }}>{o}</span>
          </div>
        ))}
      </div>
    </>
  );
}
