import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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

const objectives = [
  {
    num: "01",
    title: "قيادة سوق البشر الرقميين",
    tag: "Digital Humans",
    desc: "الريادة الإقليمية في تطوير ونشر البشر الرقميين الموثوقين للجهات الحكومية والمؤسسات — إنسانية حقيقية مدعومة بالذكاء الاصطناعي.",
    color: "#009245",
  },
  {
    num: "02",
    title: "منصات ذكاء اصطناعي عمودية",
    tag: "Vertical AI",
    desc: "تطوير منصات متخصصة لقطاعات الحكومة والصحة والمال والتعليم بعمق تقني حقيقي يتجاوز الحلول العامة.",
    color: "#009245",
  },
  {
    num: "03",
    title: "شراكات استراتيجية حكومية",
    tag: "Gov Partnerships",
    desc: "بناء علاقات طويلة الأمد مع الجهات الحكومية على أسس الثقة المشتركة والأثر المقاس والفهم العميق للسياق.",
    color: "#009245",
  },
  {
    num: "04",
    title: "تجربة استفادة استثنائية",
    tag: "CX Transformation",
    desc: "تحويل كل نقطة تواصل بين المواطن والحكومة إلى تجربة سلسة وذكية وموثوقة — حيث يشعر المستفيد بالفرق.",
    color: "#009245",
  },
  {
    num: "05",
    title: "ذكاء اصطناعي قابل للثقة",
    tag: "Trustworthy AI",
    desc: "الريادة في تطبيق معايير الذكاء الاصطناعي المسؤول والقابل للتفسير في السياق الحكومي السعودي والإقليمي.",
    color: "#009245",
  },
];

export function StrategicObjectives() {
  const { ref, inView } = useInView(0.08);
  const [active, setActive] = useState(0);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#0F151D",
        padding: "120px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Faded large number in bg — pure typographic system */}
      <div style={{
        position: "absolute", bottom: "-20px", left: "30px",
        fontSize: "200px", fontWeight: 700, fontFamily: "monospace",
        color: "rgba(0,146,69,0.025)",
        lineHeight: 1, pointerEvents: "none", userSelect: "none",
        direction: "ltr",
        zIndex: 0,
        transition: "all 0.5s ease",
      }}>
        {objectives[active].num}
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "380px 1fr",
          gap: "80px", alignItems: "start",
          direction: "rtl",
        }}>

          {/* Left sticky column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ position: "sticky", top: "100px" }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
              <div style={{ width: "32px", height: "1.5px", backgroundColor: "#009245" }} />
              <span style={{ color: "#009245", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em" }}>
                الأهداف الاستراتيجية
              </span>
            </div>

            <h2 style={{
              fontSize: "clamp(30px, 3.2vw, 48px)",
              fontWeight: 700, color: "rgba(255,255,255,0.9)",
              lineHeight: 1.2, letterSpacing: "-0.025em",
              marginBottom: "24px",
            }}>
              خمسة محاور لقيادة{" "}
              <span style={{ color: "#009245" }}>التحول الذكي</span>
            </h2>

            <p style={{
              fontSize: "16px", color: "rgba(255,255,255,0.4)",
              lineHeight: 1.75, marginBottom: "48px",
            }}>
              أهداف استراتيجية واضحة تُترجم رؤيتنا إلى أثر حقيقي في مشهد الذكاء الاصطناعي السعودي والإقليمي.
            </p>

            {/* Active objective detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div style={{
                  padding: "24px 28px",
                  backgroundColor: "rgba(0,146,69,0.06)",
                  border: "1px solid rgba(0,146,69,0.18)",
                  borderRadius: "16px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <span style={{
                      fontSize: "28px", fontWeight: 700,
                      color: "rgba(0,146,69,0.3)",
                      fontFamily: "monospace", lineHeight: 1,
                    }}>
                      {objectives[active].num}
                    </span>
                    <span style={{
                      fontSize: "10px", fontWeight: 600, color: "#009245",
                      backgroundColor: "rgba(0,146,69,0.12)",
                      padding: "3px 8px", borderRadius: "4px",
                      fontFamily: "monospace", letterSpacing: "0.04em",
                    }}>
                      {objectives[active].tag}
                    </span>
                  </div>
                  <p style={{
                    fontSize: "14px", color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.7,
                  }}>
                    {objectives[active].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div style={{ display: "flex", gap: "6px", marginTop: "24px", direction: "rtl" }}>
              {objectives.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    flex: i === active ? 3 : 1, height: "3px",
                    backgroundColor: i === active ? "#009245" : "rgba(255,255,255,0.1)",
                    border: "none", cursor: "pointer", borderRadius: "2px",
                    transition: "all 0.35s ease",
                    boxShadow: i === active ? "0 0 8px rgba(0,146,69,0.5)" : "none",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Objectives list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {objectives.map((obj, i) => (
              <motion.div
                key={obj.num}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.09 }}
                onClick={() => setActive(i)}
                style={{
                  padding: "32px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "32px",
                  alignItems: "start",
                  position: "relative",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  if (active !== i) {
                    (e.currentTarget as HTMLElement).style.paddingRight = "8px";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.paddingRight = "0";
                }}
              >
                {/* Number indicator */}
                <div style={{ width: "56px", textAlign: "center" }}>
                  <div style={{
                    fontSize: "13px", fontWeight: 700, fontFamily: "monospace",
                    color: active === i ? "#009245" : "rgba(255,255,255,0.18)",
                    transition: "color 0.25s ease",
                    letterSpacing: "0.04em",
                  }}>
                    {obj.num}
                  </div>
                  <div style={{
                    width: "1px", height: i === objectives.length - 1 ? "0" : "100%",
                    backgroundColor: active === i ? "rgba(0,146,69,0.3)" : "rgba(255,255,255,0.06)",
                    margin: "8px auto 0",
                    transition: "background-color 0.25s ease",
                  }} />
                </div>

                {/* Content */}
                <div style={{ paddingBottom: "0", direction: "rtl" }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    marginBottom: active === i ? "14px" : "0",
                    flexWrap: "wrap",
                  }}>
                    <span style={{
                      fontSize: "10px", fontWeight: 600,
                      color: active === i ? "#009245" : "rgba(255,255,255,0.3)",
                      backgroundColor: active === i ? "rgba(0,146,69,0.1)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${active === i ? "rgba(0,146,69,0.2)" : "rgba(255,255,255,0.07)"}`,
                      padding: "3px 9px", borderRadius: "5px",
                      fontFamily: "monospace", letterSpacing: "0.04em",
                      transition: "all 0.25s ease",
                    }}>
                      {obj.tag}
                    </span>
                    <h3 style={{
                      fontSize: "clamp(17px, 1.8vw, 22px)",
                      fontWeight: 600,
                      color: active === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.65)",
                      lineHeight: 1.3,
                      letterSpacing: "-0.01em",
                      transition: "color 0.25s ease",
                    }}>
                      {obj.title}
                    </h3>
                  </div>

                  <AnimatePresence>
                    {active === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: "auto", marginBottom: "0" }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          fontSize: "15px", color: "rgba(255,255,255,0.45)",
                          lineHeight: 1.7, overflow: "hidden",
                        }}
                      >
                        {obj.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Active accent line */}
                {active === i && (
                  <motion.div
                    layoutId="active-line"
                    style={{
                      position: "absolute",
                      right: "-40px",
                      top: "32px",
                      width: "3px",
                      height: "24px",
                      backgroundColor: "#009245",
                      borderRadius: "2px",
                      boxShadow: "0 0 10px rgba(0,146,69,0.6)",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
