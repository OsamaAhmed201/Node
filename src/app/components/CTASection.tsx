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

export function CTASection() {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        backgroundColor: "#0F151D",
        padding: "80px 0 120px",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative",
            borderRadius: "28px",
            overflow: "hidden",
            direction: "rtl",
            textAlign: "center",
            border: "1px solid rgba(0,146,69,0.15)",
            minHeight: "520px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Background photo */}
          <img
            src="https://images.unsplash.com/photo-1762278804798-dd7e493db051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZGlnaXRhbCUyMGRhdGElMjB2aXN1YWxpemF0aW9uJTIwYWJzdHJhY3QlMjBkYXJrfGVufDF8fHx8MTc3NjI0NjczMHww&ixlib=rb-4.1.0&q=80&w=1920"
            alt=""
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              filter: "brightness(0.14) saturate(0.4)",
            }}
          />

          {/* Green center glow */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 65% 70% at 50% 50%, rgba(0,146,69,0.12) 0%, transparent 70%)",
          }} />

          {/* Top + Bottom fades */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "120px",
            background: "linear-gradient(to bottom, rgba(15,21,29,0.85) 0%, transparent 100%)",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
            background: "linear-gradient(to top, rgba(15,21,29,0.85) 0%, transparent 100%)",
          }} />

          {/* Grid texture overlay */}
          <svg style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none" }} width="100%" height="100%">
            <defs>
              <pattern id="cta-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>

          {/* Top accent line */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "200px", height: "2px",
            background: "linear-gradient(90deg, transparent, #009245, transparent)",
          }} />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, padding: "80px 40px" }}>
            {/* Label */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              backgroundColor: "rgba(0,146,69,0.1)",
              border: "1px solid rgba(0,146,69,0.22)",
              borderRadius: "100px", padding: "8px 20px",
              marginBottom: "36px",
            }}>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                backgroundColor: "#009245", display: "block",
                boxShadow: "0 0 8px rgba(0,146,69,0.8)",
                animation: "ctaPulse 2s ease-in-out infinite",
              }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#009245" }}>تواصل مع فريقنا المتخصص</span>
            </div>

            <h2 style={{
              fontSize: "clamp(32px, 4.5vw, 72px)",
              fontWeight: 700, color: "rgba(255,255,255,0.95)",
              lineHeight: 1.15, letterSpacing: "-0.03em",
              marginBottom: "20px",
            }}>
              مستعدون لتحويل{" "}
              <span style={{
                color: "#009245",
                textShadow: "0 0 60px rgba(0,146,69,0.35)",
              }}>مؤسستكم؟</span>
            </h2>

            <p style={{
              fontSize: "clamp(15px, 1.5vw, 18px)",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.8, maxWidth: "580px",
              margin: "0 auto 52px",
            }}>
              انضموا إلى الجهات الرائدة التي تثق في Al Agents لتحقيق التحول الرقمي الذكي.
              نبدأ بجلسة استراتيجية مجانية لفهم تحدياتكم الحقيقية.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: "flex", gap: "16px",
              justifyContent: "center", marginBottom: "64px", flexWrap: "wrap",
            }}>
              <button
                style={{
                  fontFamily: "inherit",
                  fontSize: "15px", fontWeight: 700, color: "#FFFFFF",
                  backgroundColor: "#009245", border: "none", cursor: "pointer",
                  padding: "18px 48px", borderRadius: "14px",
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  transition: "all 0.25s ease",
                  boxShadow: "0 4px 28px rgba(0,146,69,0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#30B55C";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 12px 48px rgba(0,146,69,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#009245";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 28px rgba(0,146,69,0.4)";
                }}
              >
                تحدث مع خبرائنا
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 8H3M7 5l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                style={{
                  fontFamily: "inherit",
                  fontSize: "15px", fontWeight: 500, color: "rgba(255,255,255,0.65)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  cursor: "pointer", padding: "17px 40px", borderRadius: "14px",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,146,69,0.3)";
                  e.currentTarget.style.color = "#009245";
                  e.currentTarget.style.backgroundColor = "rgba(0,146,69,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                }}
              >
                اطلع على دراسات الحالة
              </button>
            </div>

            {/* Contact info */}
            <div style={{
              display: "flex", gap: "40px",
              justifyContent: "center",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingTop: "40px", flexWrap: "wrap",
            }}>
              {[
                {
                  icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 5 6-5M2 4h12v9H2V4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>,
                  text: "hello@aiagents.sa",
                  href: "mailto:hello@aiagents.sa",
                  ltr: true,
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" /><path d="M2 8h12M8 2c-2 2-2 8 0 12M8 2c2 2 2 8 0 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>,
                  text: "www.aiagents.sa",
                  href: "https://www.aiagents.sa",
                  ltr: true,
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6c0-2.5-2-4.5-4.5-4.5zm0 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>,
                  text: "المملكة العربية السعودية",
                  href: "#",
                  ltr: false,
                },
              ].map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    textDecoration: "none", color: "rgba(255,255,255,0.35)",
                    transition: "color 0.2s ease", fontSize: "13px",
                    direction: c.ltr ? "ltr" : "rtl",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#009245")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                >
                  {c.icon}
                  <span>{c.text}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes ctaPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(0,146,69,0.9); }
          50% { opacity: 0.5; box-shadow: 0 0 4px rgba(0,146,69,0.4); }
        }
      `}</style>
    </section>
  );
}
