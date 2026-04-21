import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { AlAgentsLogo } from "./AlAgentsLogo";

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

const footerLinks = {
  company: {
    title: "الشركة",
    links: ["من نحن", "رؤيتنا ورسالتنا", "مساراتنا الاستراتيجية", "تواصل معنا"],
  },
  products: {
    title: "المنتجات",
    links: ["TX360.ai", "Fintech App", "Kyan Alam"],
  },
  services: {
    title: "الخدمات",
    links: ["ذكاء اصطناعي عمودي", "بشر رقميون", "تجربة العملاء", "حوكمة البيانات"],
  },
};

export function Footer() {
  const { ref, inView } = useInView(0.1);

  return (
    <footer
      ref={ref}
      style={{
        backgroundColor: "#050709",
        padding: "80px 0 0",
        direction: "rtl",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top accent */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "300px", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(48,181,92,0.3), transparent)",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
        {/* Top row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: "48px",
            paddingBottom: "64px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "24px" }}>
              <AlAgentsLogo height={24} style={{ opacity: 0.85 }} />
            </div>

            <p style={{
              fontSize: "14px", color: "rgba(255,255,255,0.35)",
              lineHeight: 1.75, marginBottom: "32px", maxWidth: "260px",
            }}>
              شركة سعودية مت��صصة في الذكاء الاصطناعي العمودي والبشر الرقميين الموثوقين
              لتحول حكومي حقيقي.
            </p>

            {/* Social */}
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                {
                  label: "LinkedIn",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <path d="M2 2h3v9H2zM3.5 1a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM6 5h2.5v1.2h.03C9 5.5 10 5 11.3 5 13.7 5 14 6.5 14 8.6V12h-3V9.1c0-1 0-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2V12H5V5z" />
                    </svg>
                  ),
                },
                {
                  label: "X",
                  icon: (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M9.4.5H11L7.2 4.8l4.5 6H8.3L5.6 7.4 2.5 10.8H.8l4-4.7L.6.5H3.8l2.4 3.2L9.4.5zm-.6 9.4h1L3.3 1.7H2.2l6.6 8.2z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  style={{
                    width: "34px", height: "34px", borderRadius: "8px",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(48,181,92,0.1)";
                    e.currentTarget.style.borderColor = "rgba(48,181,92,0.2)";
                    e.currentTarget.style.color = "#30B55C";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((col) => (
            <div key={col.title}>
              <h5 style={{
                fontSize: "12px", fontWeight: 600,
                color: "rgba(255,255,255,0.6)",
                marginBottom: "20px", letterSpacing: "0.06em",
              }}>{col.title}</h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontSize: "14px", color: "rgba(255,255,255,0.3)",
                      textDecoration: "none", transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "28px 0", flexWrap: "wrap", gap: "16px",
          }}
        >
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>
            © ٢٠٢٥ Al Agents · وكلاء الذكاء الاصطناعي · جميع الحقوق محفوظة
          </div>

          <div style={{ display: "flex", gap: "24px" }}>
            {["سياسة الخصوصية", "شروط الاستخدام", "سياسة الذكاء الاصطناعي"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: "12px", color: "rgba(255,255,255,0.2)",
                  textDecoration: "none", transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
              >
                {link}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              backgroundColor: "#30B55C",
              boxShadow: "0 0 6px rgba(48,181,92,0.7)",
            }} />
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>
              المملكة العربية السعودية
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}