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

const reasons = [
  {
    num: "01",
    title: "ذكاء اصطناعي موثوق",
    desc: "نبني حلولاً يمكن الوثوق بها — شفافة، قابلة للتفسير، ومتوافقة مع معايير الذكاء الاصطناعي المسؤول دولياً وسعودياً.",
  },
  {
    num: "02",
    title: "تخصص عميق وحقيقي",
    desc: "لا نقدم حلولاً عامة. نخوض عمقاً في كل قطاع نخدمه لنفهم تحدياته الفعلية ونبني لها حلولاً مُصمّمة بدقة.",
  },
  {
    num: "03",
    title: "أثر قابل للقياس",
    desc: "كل مشروع نبنيه مرتبط بمؤشرات أداء واضحة — نجاحنا يُقاس بالنتائج الحقيقية لعملائنا، لا بعدد الميزات.",
  },
  {
    num: "04",
    title: "شراكة مستدامة",
    desc: "لسنا مزودي خدمة، بل شركاء استراتيجيون — نرافق عملاءنا في كل مرحلة من رحلة التحول الرقمي.",
  },
  {
    num: "05",
    title: "فهم السياق الحكومي",
    desc: "نفهم اللوائح والمتطلبات والثقافة التنظيمية للقطاع الحكومي السعودي — هذا يُختصر زمن التنفيذ ويرفع الجودة.",
  },
  {
    num: "06",
    title: "سعودي الهوية والتوجه",
    desc: "نُصمّم لمستفيد سعودي، بلغته وثقافته وتوقعاته — حلول تعكس هوية المملكة وطموح رؤية 2030.",
  },
];

const compliance = ["NDMO Aligned", "ISO Ready", "Vision 2030", "Saudi-First", "Gov-Grade"];

export function WhyAlAgents() {
  const { ref, inView } = useInView(0.06);

  return (
    <section
      id="why"
      ref={ref}
      style={{
        backgroundColor: "#0D1419",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── Section Header — pure typography, no image ── */}
      <div style={{
        padding: "100px 0 60px",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        {/* Subtle grid bg — CSS only */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(0,146,69,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,146,69,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />
        {/* Left-side green line accent */}
        <div style={{
          position: "absolute", top: 0, right: "50%", bottom: 0,
          width: "1px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,146,69,0.15) 30%, rgba(0,146,69,0.15) 70%, transparent 100%)",
          pointerEvents: "none",
        }} />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: "1280px", margin: "0 auto",
            padding: "0 40px",
            display: "flex", flexDirection: "column",
            alignItems: "center", textAlign: "center",
            direction: "rtl",
            position: "relative", zIndex: 1,
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <div style={{ width: "32px", height: "1.5px", backgroundColor: "#009245" }} />
            <span style={{ color: "#009245", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em" }}>لماذا Al Agents</span>
            <div style={{ width: "32px", height: "1.5px", backgroundColor: "#009245" }} />
          </div>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 72px)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: "900px",
          }}>
            ست أسباب تجعلنا{" "}
            <span style={{ color: "#009245" }}>الاختيار الصحيح</span>
          </h2>
          <p style={{
            fontSize: "clamp(15px, 1.4vw, 18px)",
            color: "rgba(255,255,255,0.42)",
            lineHeight: 1.7,
            maxWidth: "600px",
            marginTop: "20px",
          }}>
            لا نؤمن بالادعاءات المجردة. كل سبب مبني على منهجية واضحة ومقياس حقيقي نلتزم به في كل مشروع.
          </p>
        </motion.div>
      </div>

      {/* ── Reasons List ── */}
      <div style={{ padding: "80px 0 120px", position: "relative" }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "20%", left: 0,
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(0,146,69,0.03) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>

          {/* Reasons — editorial list, NOT cards */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "0 80px", direction: "rtl",
            marginBottom: "80px",
          }}>
            {reasons.map((r, i) => (
              <motion.div
                key={r.num}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.07 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr",
                  gap: "20px",
                  padding: "36px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  alignItems: "start",
                }}
              >
                {/* Number */}
                <div style={{
                  fontSize: "13px", fontWeight: 700,
                  color: "rgba(0,146,69,0.4)",
                  fontFamily: "monospace", letterSpacing: "0.04em",
                  paddingTop: "3px",
                }}>
                  {r.num}
                </div>

                <div>
                  <h3 style={{
                    fontSize: "clamp(17px, 1.6vw, 21px)",
                    fontWeight: 700, color: "rgba(255,255,255,0.88)",
                    letterSpacing: "-0.01em", marginBottom: "12px",
                    lineHeight: 1.3,
                  }}>
                    {r.title}
                  </h3>
                  <p style={{
                    fontSize: "14px", color: "rgba(255,255,255,0.42)",
                    lineHeight: 1.75,
                  }}>
                    {r.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Compliance strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{
              padding: "36px 48px",
              backgroundColor: "#181E26",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              direction: "rtl",
              gap: "24px", flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontSize: "17px", fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: "6px" }}>
                جاهزون لبدء رحلتكم؟
              </div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)" }}>
                انضموا إلى المؤسسات الرائدة التي تثق في Al Agents.
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {compliance.map((badge) => (
                <span key={badge} style={{
                  fontSize: "11px", fontWeight: 600, color: "#009245",
                  backgroundColor: "rgba(0,146,69,0.07)",
                  border: "1px solid rgba(0,146,69,0.18)",
                  padding: "7px 14px", borderRadius: "7px",
                  fontFamily: "monospace", letterSpacing: "0.04em",
                }}>{badge}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}