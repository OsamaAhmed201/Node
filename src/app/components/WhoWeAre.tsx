import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

function useInView(threshold = 0.15) {
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

export function WhoWeAre() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        backgroundColor: "#141A22",
        padding: "120px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle background texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.6,
        backgroundImage: "radial-gradient(circle at 15% 50%, rgba(0,146,69,0.06) 0%, transparent 50%)",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ direction: "rtl", marginBottom: "72px" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <div style={{ width: "32px", height: "1.5px", backgroundColor: "#009245" }} />
            <span style={{ color: "#009245", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em" }}>
              من نحن
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(36px, 4.5vw, 64px)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.9)",
            lineHeight: 1.15,
            letterSpacing: "-0.025em",
            maxWidth: "720px",
          }}>
            شركة سعودية{" "}
            <span style={{ color: "#009245" }}>متخصصة</span>{" "}
            في بناء مستقبل الذكاء الاصطناعي.
          </h2>
        </motion.div>

        {/* Main content grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: "64px",
          alignItems: "center",
          direction: "rtl",
        }}>
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <p style={{
              fontSize: "18px", color: "rgba(255,255,255,0.6)", lineHeight: 1.85,
              marginBottom: "28px",
            }}>
              نحن Al Agents — شركة سعودية متخصصة في بناء حلول ذكاء اصطناعي عمودية ومتوافقة
              مع احتياجات القطاع الحكومي والمؤسسي في المملكة العربية السعودية.
            </p>
            <p style={{
              fontSize: "18px", color: "rgba(255,255,255,0.6)", lineHeight: 1.85,
              marginBottom: "56px",
            }}>
              نجمع بين الخبرة التقنية العميقة والفهم الحقيقي للسياق المحلي لتقديم أثر حقيقي
              وقابل للقياس — ليس فقط تقنية، بل تحول فعلي.
            </p>

            {/* Stats — typographic, no cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
              {[
                { num: "KSA", label: "نشأة وتخصص سعودي", sub: "Saudi-Born" },
                { num: "٣٦٠°", label: "رؤية شاملة للتحول", sub: "Full Spectrum" },
                { num: "٣+", label: "مسارات تجارية متخصصة", sub: "Business Tracks" },
                { num: "٢٠٣٠", label: "مواكبة رؤية المملكة", sub: "Vision Aligned" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                  style={{ textAlign: "right" }}
                >
                  <div style={{
                    fontSize: "clamp(28px, 3vw, 40px)",
                    fontWeight: 700, letterSpacing: "-0.03em",
                    color: "rgba(255,255,255,0.92)", lineHeight: 1.1,
                    marginBottom: "6px",
                  }}>
                    {i === 0 ? <span style={{ color: "#009245" }}>{s.num}</span> : s.num}
                  </div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "2px" }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: "10px", color: "rgba(0,146,69,0.5)", fontFamily: "monospace", letterSpacing: "0.04em" }}>
                    {s.sub}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Photo panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="hidden lg:block"
            style={{ position: "relative", borderRadius: "28px", overflow: "hidden", minHeight: "540px" }}
          >
            {/* Main photo */}
            <img
              src="https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYXVkaSUyMEFyYWJpYSUyMGZ1dHVyaXN0aWMlMjBzbWFydCUyMGNpdHklMjBuaWdodCUyMGFlcmlhbHxlbnwxfHx8fDE3NzYyNDY3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Saudi Arabia AI transformation"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover",
                filter: "brightness(0.38) saturate(0.7)",
                position: "absolute", inset: 0,
              }}
            />

            {/* Green radial glow */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 60% 40%, rgba(0,146,69,0.1) 0%, transparent 60%)",
            }} />

            {/* Bottom fade to section bg */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "200px",
              background: "linear-gradient(to top, #141A22 0%, transparent 100%)",
            }} />

            {/* Grid mesh overlay */}
            <div style={{
              position: "absolute", inset: 0, opacity: 0.04,
              backgroundImage: "linear-gradient(rgba(0,146,69,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,146,69,1) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }} />

            {/* Top-right badge */}
            <div style={{
              position: "absolute", top: "24px", right: "24px",
              display: "flex", alignItems: "center", gap: "8px",
              backgroundColor: "rgba(16,22,30,0.85)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(0,146,69,0.32)",
              borderRadius: "100px", padding: "8px 16px",
            }}>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                backgroundColor: "#009245",
                boxShadow: "0 0 8px rgba(0,146,69,0.9)",
                display: "block",
                animation: "pulseGreen 2s ease-in-out infinite",
              }} />
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#009245" }}>KSA · حلول سعودية أصيلة</span>
            </div>

            {/* Central logo mark */}
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -60%)",
              textAlign: "center",
            }}>
              <div style={{
                width: "80px", height: "80px", borderRadius: "22px",
                background: "linear-gradient(135deg, rgba(0,146,69,0.2) 0%, rgba(0,146,69,0.06) 100%)",
                border: "1.5px solid rgba(0,146,69,0.45)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto",
                boxShadow: "0 0 60px rgba(0,146,69,0.18), inset 0 1px 0 rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
              }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="4.5" fill="#009245" />
                  <circle cx="18" cy="18" r="9" stroke="rgba(0,146,69,0.3)" strokeWidth="1" fill="none" />
                  <circle cx="18" cy="18" r="14" stroke="rgba(0,146,69,0.15)" strokeWidth="1" fill="none" strokeDasharray="3 5" />
                  <circle cx="6" cy="11" r="2.5" fill="#009245" opacity="0.65" />
                  <circle cx="30" cy="11" r="2.5" fill="#009245" opacity="0.65" />
                  <circle cx="6" cy="25" r="2.5" fill="#009245" opacity="0.65" />
                  <circle cx="30" cy="25" r="2.5" fill="#009245" opacity="0.65" />
                  <line x1="18" y1="18" x2="6" y2="11" stroke="#009245" strokeWidth="1" opacity="0.4" />
                  <line x1="18" y1="18" x2="30" y2="11" stroke="#009245" strokeWidth="1" opacity="0.4" />
                  <line x1="18" y1="18" x2="6" y2="25" stroke="#009245" strokeWidth="1" opacity="0.4" />
                  <line x1="18" y1="18" x2="30" y2="25" stroke="#009245" strokeWidth="1" opacity="0.4" />
                </svg>
              </div>
              <div style={{
                marginTop: "16px",
                fontSize: "13px", fontWeight: 700,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.06em",
                fontFamily: "monospace",
              }}>Al Agents</div>
            </div>

            {/* Bottom stats row */}
            <div style={{
              position: "absolute", bottom: "28px", left: "20px", right: "20px",
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              gap: "10px",
            }}>
              {[
                { n: "KSA", l: "منشأ ومقر" },
                { n: "٣+", l: "مسارات تجارية" },
                { n: "٢٠٣٠", l: "رؤية مواكِبة" },
              ].map((s, i) => (
                <div key={i} style={{
                  backgroundColor: "rgba(16,22,30,0.88)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.11)",
                  borderRadius: "14px", padding: "14px 12px",
                  textAlign: "center",
                }}>
                  <div style={{
                    fontSize: "18px", fontWeight: 700,
                    color: i === 0 ? "#009245" : "rgba(255,255,255,0.85)",
                    lineHeight: 1, marginBottom: "6px",
                    fontFamily: i === 0 ? "monospace" : "inherit",
                  }}>{s.n}</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.38)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulseGreen {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(0,146,69,0.9); }
          50% { opacity: 0.5; box-shadow: 0 0 4px rgba(0,146,69,0.4); }
        }
      `}</style>
    </section>
  );
}