import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { TX360Logo } from "../components/TX360Logo";

/* ─── Shared hook ─── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Navigation ─── */
function TX360Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "all 0.4s ease",
      backgroundColor: scrolled ? "rgba(7,9,13,0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,207,138,0.08)" : "1px solid transparent",
    }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto", padding: "0 48px",
        height: "68px", display: "flex", alignItems: "center",
        justifyContent: "space-between", direction: "rtl",
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <TX360Logo height={26} />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link to="/"
            style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", textDecoration: "none", letterSpacing: "0.01em", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#00CF8A")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
          >
            ← Al Agents
          </Link>
          <a href="#demo-cta" style={{
            fontSize: "13px", fontWeight: 600, color: "#07090D",
            backgroundColor: "#00CF8A", padding: "9px 22px",
            borderRadius: "8px", textDecoration: "none",
            transition: "all 0.2s", boxShadow: "0 2px 20px rgba(0,207,138,0.3)",
          }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#0ae09b"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#00CF8A"; e.currentTarget.style.transform = "translateY(0)"; }}
          >احجز Demo</a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero Dashboard Mockup ─── */
function HeroDashboardMockup({ mounted }: { mounted: boolean }) {
  const W = 480, H = 88;
  const data = [65, 70, 67, 75, 72, 80, 76, 84, 80, 88, 91, 89];
  const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * W, y: H - (v / 100) * H }));
  const line = `M ${pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L ")}`;
  const area = `M 0,${H} L ${pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L ")} L ${W},${H} Z`;
  const lastPt = pts[pts.length - 1];

  return (
    <div style={{
      backgroundColor: "#050A10",
      border: "1px solid rgba(0,207,138,0.12)",
      borderRadius: "14px",
      overflow: "hidden",
      boxShadow: "0 60px 120px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.04)",
    }}>
      {/* Browser bar */}
      <div style={{
        height: 40, backgroundColor: "#030710",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        display: "flex", alignItems: "center", padding: "0 14px", gap: 8,
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: c, opacity: 0.65 }} />
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{
            fontSize: 10, color: "rgba(255,255,255,0.18)", fontFamily: "monospace",
            backgroundColor: "rgba(255,255,255,0.03)", padding: "3px 16px", borderRadius: 5,
          }}>app.tx360.ai / dashboard</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#00CF8A", boxShadow: "0 0 6px rgba(0,207,138,0.9)", animation: "txPulse 2s infinite" }} />
          <span style={{ fontSize: 9, color: "rgba(0,207,138,0.55)", fontFamily: "monospace" }}>LIVE</span>
        </div>
      </div>

      {/* Dashboard body */}
      <div style={{ display: "flex", height: 450, direction: "rtl" }}>
        {/* Sidebar */}
        <div style={{
          width: 148, flexShrink: 0, backgroundColor: "#030810",
          borderLeft: "1px solid rgba(255,255,255,0.04)",
          display: "flex", flexDirection: "column", padding: "16px 0",
        }}>
          <div style={{ padding: "0 14px", marginBottom: 22 }}>
            <TX360Logo height={14} />
          </div>
          {[
            { label: "الرئيسية", active: true },
            { label: "الأهداف", active: false },
            { label: "المشاريع", active: false },
            { label: "التقارير", active: false },
            { label: "توصيات AI", active: false },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "9px 14px", fontSize: 11, direction: "rtl",
              color: item.active ? "#00CF8A" : "rgba(255,255,255,0.26)",
              backgroundColor: item.active ? "rgba(0,207,138,0.07)" : "transparent",
              borderRight: item.active ? "2px solid #00CF8A" : "2px solid transparent",
              cursor: "default",
            }}>{item.label}</div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ padding: "0 14px 10px" }}>
            <div style={{
              padding: "8px 10px", fontSize: 9,
              backgroundColor: "rgba(0,207,138,0.05)", border: "1px solid rgba(0,207,138,0.1)",
              borderRadius: 7, color: "rgba(0,207,138,0.55)", fontFamily: "monospace", lineHeight: 1.5,
            }}>
              ● نظام متصل<br />
              <span style={{ opacity: 0.6, fontSize: 8 }}>AI يحلل البيانات</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "18px 18px 14px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>لوحة التحكم الاستراتيجية</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 2 }}>الربع الثاني — 2025</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["تصدير", "مشاركة"].map((btn, i) => (
                <div key={i} style={{
                  fontSize: 9, padding: "4px 10px", borderRadius: 5, cursor: "default",
                  backgroundColor: i === 0 ? "rgba(0,207,138,0.07)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${i === 0 ? "rgba(0,207,138,0.18)" : "rgba(255,255,255,0.06)"}`,
                  color: i === 0 ? "#00CF8A" : "rgba(255,255,255,0.35)",
                }}>{btn}</div>
              ))}
            </div>
          </div>

          {/* KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 7, marginBottom: 13 }}>
            {[
              { label: "الأهداف الكلية", val: "24", delta: "+3 هذا الربع", pos: true },
              { label: "المشاريع النشطة", val: "67", delta: "12 للمراجعة", pos: false },
              { label: "الإنجاز الكلي", val: "82%", delta: "+8% عن الهدف", pos: true },
              { label: "توصيات AI", val: "9", delta: "3 عاجلة", pos: false },
            ].map((kpi, i) => (
              <div key={i} style={{
                backgroundColor: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: 8, padding: "9px 10px 8px", textAlign: "right",
              }}>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.26)", marginBottom: 4 }}>{kpi.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "rgba(255,255,255,0.86)", lineHeight: 1.1, marginBottom: 3 }}>{kpi.val}</div>
                <div style={{ fontSize: 8, color: kpi.pos ? "#00CF8A" : "rgba(255,170,60,0.8)" }}>{kpi.delta}</div>
              </div>
            ))}
          </div>

          {/* Content area */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 155px", gap: 10, flex: 1, minHeight: 0 }}>
            {/* Chart + goals */}
            <div style={{
              backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.045)",
              borderRadius: 9, padding: "12px 14px", overflow: "hidden",
            }}>
              <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.25)", marginBottom: 7, letterSpacing: "0.03em" }}>الأداء الاستراتيجي — 12 شهراً</div>
              <svg width="100%" height="88" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00CF8A" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#00CF8A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[25, 50, 75].map(p => (
                  <line key={p} x1="0" y1={H - (p / 100) * H} x2={W} y2={H - (p / 100) * H}
                    stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
                ))}
                <path d={area} fill="url(#hg)" />
                <path d={line} fill="none" stroke="#00CF8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx={lastPt.x} cy={lastPt.y} r="3.5" fill="#00CF8A" />
                <circle cx={lastPt.x} cy={lastPt.y} r="8" fill="rgba(0,207,138,0.15)" />
              </svg>
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { name: "التحول الرقمي الشامل", pct: 94, color: "#00CF8A" },
                  { name: "تحسين تجربة المستفيد", pct: 87, color: "#00CF8A" },
                  { name: "رفع كفاءة العمليات", pct: 62, color: "#fbbf24" },
                  { name: "تطوير الكوادر البشرية", pct: 73, color: "#60a5fa" },
                ].map((g, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.35)", flex: 1, textAlign: "right" }}>{g.name}</div>
                    <div style={{ width: 72, height: 2.5, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 2, flexShrink: 0 }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={mounted ? { width: `${g.pct}%` } : {}}
                        transition={{ duration: 1.4, ease: "easeOut", delay: 0.8 + i * 0.12 }}
                        style={{ height: "100%", backgroundColor: g.color, borderRadius: 2 }}
                      />
                    </div>
                    <div style={{ fontSize: 8.5, fontFamily: "monospace", color: g.color, width: 26, textAlign: "left", flexShrink: 0 }}>{g.pct}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI panel */}
            <div style={{
              backgroundColor: "rgba(0,207,138,0.03)", border: "1px solid rgba(0,207,138,0.1)",
              borderRadius: 9, padding: "12px 10px", overflow: "hidden",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#00CF8A", animation: "txPulse 2s infinite" }} />
                <div style={{ fontSize: 8, color: "#00CF8A", fontFamily: "monospace", letterSpacing: "0.05em" }}>توصيات AI</div>
              </div>
              {[
                { level: "عاجل", text: "مراجعة هدف كفاءة العمليات", color: "rgba(255,90,90,0.8)" },
                { level: "تنبيه", text: "تعارض موارد في 3 مشاريع", color: "#fbbf24" },
                { level: "فرصة", text: "تسريع التحول الرقمي 15%", color: "#00CF8A" },
              ].map((r, i) => (
                <div key={i} style={{
                  backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
                  borderRadius: 6, padding: "7px 8px", marginBottom: 5,
                }}>
                  <div style={{ fontSize: 7.5, color: r.color, fontFamily: "monospace", marginBottom: 3 }}>◈ {r.level}</div>
                  <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.42)", lineHeight: 1.45 }}>{r.text}</div>
                </div>
              ))}
              <div style={{
                marginTop: 8, padding: "7px 8px", borderRadius: 6,
                backgroundColor: "rgba(0,207,138,0.05)", fontSize: 8,
                color: "rgba(0,207,138,0.55)", lineHeight: 1.45, fontFamily: "monospace",
              }}>تحليل كامل متاح →</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section style={{
      position: "relative", minHeight: "100vh", backgroundColor: "#07090D",
      overflow: "hidden", display: "flex", alignItems: "center", paddingTop: "68px",
    }}>
      {/* Background grid */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <svg style={{ width: "100%", height: "100%", opacity: 1 }}>
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(0,207,138,0.04)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 70% at 30% 50%, rgba(0,207,138,0.05) 0%, transparent 65%)",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "200px", zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to top, #07090D 0%, transparent 100%)",
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto", padding: "80px 48px 100px", width: "100%" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.15fr",
          gap: "72px", alignItems: "center", direction: "rtl",
        }}>
          {/* Text side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: "36px" }}
            >
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                border: "1px solid rgba(0,207,138,0.22)", backgroundColor: "rgba(0,207,138,0.06)",
                borderRadius: "100px", padding: "7px 20px",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#00CF8A", display: "block", boxShadow: "0 0 8px rgba(0,207,138,0.9)", animation: "txPulse 2s infinite" }} />
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#00CF8A", fontFamily: "monospace", letterSpacing: "0.1em" }}>
                  TX360.ai — منصة الاستراتيجية الذكية
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              style={{
                fontSize: "clamp(38px, 4.5vw, 68px)", fontWeight: 700,
                color: "rgba(255,255,255,0.94)", lineHeight: 1.18,
                letterSpacing: "-0.03em", marginBottom: "24px",
              }}
            >
              تحكم كامل في<br />
              استراتيجيتك —{" "}
              <span style={{ color: "#00CF8A", textShadow: "0 0 80px rgba(0,207,138,0.35)" }}>
                من التخطيط<br />إلى الأثر الحقيقي
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                fontSize: "clamp(15px, 1.5vw, 18px)", color: "rgba(255,255,255,0.44)",
                lineHeight: 1.8, marginBottom: "44px", maxWidth: "440px",
              }}
            >
              منصة موحدة تربط أهدافك الاستراتيجية بمشاريعك ومؤشراتك وتوصيات الذكاء الاصطناعي — في نظام حي واحد.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              style={{ display: "flex", gap: "12px", marginBottom: "56px", flexWrap: "wrap" }}
            >
              <a href="#demo-cta" style={{
                fontSize: "14px", fontWeight: 700, color: "#07090D",
                backgroundColor: "#00CF8A", padding: "14px 32px",
                borderRadius: "10px", display: "inline-flex", alignItems: "center", gap: "9px",
                transition: "all 0.25s ease", boxShadow: "0 4px 28px rgba(0,207,138,0.4)", textDecoration: "none",
              }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#0ae09b"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 44px rgba(0,207,138,0.55)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#00CF8A"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 28px rgba(0,207,138,0.4)"; }}
              >
                احجز عرض النظام
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M10 7.5H3M7 4.5l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#how-it-works" style={{
                fontSize: "14px", fontWeight: 500, color: "rgba(255,255,255,0.6)",
                backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.1)",
                padding: "14px 32px", borderRadius: "10px",
                display: "inline-flex", alignItems: "center", gap: "8px",
                transition: "all 0.25s ease", textDecoration: "none",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,207,138,0.3)"; e.currentTarget.style.color = "#00CF8A"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
              >
                شاهد كيف يعمل
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={mounted ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.65 }}
              style={{ display: "flex", gap: "36px", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              {[
                { val: "90%", label: "معدل إنجاز الأهداف" },
                { val: "0.8s", label: "سرعة التحليل" },
                { val: "97%", label: "دقة التوصيات" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 700, color: "#00CF8A", lineHeight: 1.1, marginBottom: "4px", fontFamily: "monospace" }}>{s.val}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dashboard mockup side */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.97 }}
            animate={mounted ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <HeroDashboardMockup mounted={mounted} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Problem: Fragmentation Diagram ─── */
function ProblemSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} style={{ backgroundColor: "#07090D", padding: "160px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,207,138,0.12), transparent)" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "80px", direction: "rtl" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "40px", height: "1px", backgroundColor: "rgba(255,90,90,0.4)" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,90,90,0.6)", letterSpacing: "0.12em", fontFamily: "monospace" }}>المشكلة</span>
            <div style={{ width: "40px", height: "1px", backgroundColor: "rgba(255,90,90,0.4)" }} />
          </div>
          <h2 style={{
            fontSize: "clamp(34px, 4vw, 64px)", fontWeight: 700,
            color: "rgba(255,255,255,0.92)", lineHeight: 1.18, letterSpacing: "-0.03em",
            marginBottom: "20px",
          }}>
            الاستراتيجية تُكتب…{" "}
            <br />
            <span style={{ color: "rgba(255,80,80,0.75)" }}>لكنها لا تصل إلى التنفيذ</span>
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.36)", lineHeight: 1.75, maxWidth: "560px", margin: "0 auto" }}>
            الفجوة بين التخطيط الاستراتيجي والأثر الحقيقي هي التحدي الأكبر الذي تواجهه المؤسسات اليوم
          </p>
        </motion.div>

        {/* Chaos Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ display: "flex", justifyContent: "center", marginBottom: "80px" }}
        >
          <svg width="100%" height="320" viewBox="0 0 900 320" fill="none" style={{ maxWidth: "900px" }}>
            {/* Background subtle */}
            <rect width="900" height="320" fill="rgba(13,5,5,0.0)" />

            {/* Broken connections — dashed, orange-red */}
            {/* تخطيط → center */}
            <line x1="200" y1="68" x2="370" y2="148" stroke="rgba(255,90,90,0.22)" strokeWidth="1" strokeDasharray="7 5" />
            {/* أهداف → center */}
            <line x1="700" y1="60" x2="530" y2="145" stroke="rgba(255,90,90,0.22)" strokeWidth="1" strokeDasharray="7 5" />
            {/* مشاريع → center */}
            <line x1="180" y1="240" x2="368" y2="180" stroke="rgba(255,90,90,0.22)" strokeWidth="1" strokeDasharray="7 5" />
            {/* قرارات → center */}
            <line x1="720" y1="248" x2="532" y2="178" stroke="rgba(255,90,90,0.22)" strokeWidth="1" strokeDasharray="7 5" />
            {/* بيانات → center */}
            <line x1="450" y1="270" x2="450" y2="200" stroke="rgba(255,90,90,0.18)" strokeWidth="1" strokeDasharray="6 5" />

            {/* Break markers — × at midpoints */}
            {[
              { x: 290, y: 108 }, { x: 620, y: 100 },
              { x: 272, y: 212 }, { x: 628, y: 215 },
            ].map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={9} fill="rgba(255,90,90,0.06)" stroke="rgba(255,90,90,0.2)" strokeWidth="0.8" />
                <text x={p.x} y={p.y + 4} textAnchor="middle" fill="rgba(255,90,90,0.5)" fontSize="10" fontFamily="monospace">✕</text>
              </g>
            ))}

            {/* Silo: الأهداف (top right) */}
            <rect x="580" y="18" width="154" height="62" rx="9" fill="rgba(13,18,26,0.9)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            <text x="657" y="44" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="13" fontFamily="'Rubik', sans-serif" fontWeight="600">الأهداف</text>
            <text x="657" y="62" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="'Rubik', sans-serif">غير مرتبطة بالتنفيذ</text>

            {/* Silo: تخطيط (top left) */}
            <rect x="46" y="28" width="154" height="62" rx="9" fill="rgba(13,18,26,0.9)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            <text x="123" y="54" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="13" fontFamily="'Rubik', sans-serif" fontWeight="600">التخطيط</text>
            <text x="123" y="72" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="'Rubik', sans-serif">وثائق معزولة</text>

            {/* Silo: مشاريع (bottom left) */}
            <rect x="36" y="222" width="160" height="62" rx="9" fill="rgba(13,18,26,0.9)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            <text x="116" y="248" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="13" fontFamily="'Rubik', sans-serif" fontWeight="600">المشاريع</text>
            <text x="116" y="266" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="'Rubik', sans-serif">بدون ربط بالأهداف</text>

            {/* Silo: قرارات (bottom right) */}
            <rect x="600" y="232" width="160" height="62" rx="9" fill="rgba(13,18,26,0.9)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            <text x="680" y="258" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="13" fontFamily="'Rubik', sans-serif" fontWeight="600">القرارات</text>
            <text x="680" y="276" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="'Rubik', sans-serif">معلومات غير مكتملة</text>

            {/* Silo: بيانات (bottom center) */}
            <rect x="348" y="258" width="154" height="56" rx="9" fill="rgba(13,18,26,0.9)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            <text x="425" y="282" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="13" fontFamily="'Rubik', sans-serif" fontWeight="600">البيانات</text>
            <text x="425" y="300" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="'Rubik', sans-serif">مشتتة وغير منظمة</text>

            {/* CENTER: Execution gap */}
            <rect x="348" y="128" width="204" height="72" rx="12" fill="rgba(255,40,40,0.04)" stroke="rgba(255,80,80,0.25)" strokeWidth="1.2" />
            <text x="450" y="157" textAnchor="middle" fill="rgba(255,80,80,0.65)" fontSize="14" fontFamily="'Rubik', sans-serif" fontWeight="700">فجوة التنفيذ</text>
            <text x="450" y="177" textAnchor="middle" fill="rgba(255,80,80,0.4)" fontSize="11" fontFamily="'Rubik', sans-serif">Execution Gap</text>
          </svg>
        </motion.div>

        {/* Four pain points — no cards, just text with lines */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ direction: "rtl" }}
        >
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { title: "أهداف بدون متابعة فعلية", desc: "تُحدَّد الأهداف في بداية السنة، لكنها تبقى وثائق لا يُتابَع تنفيذها بشكل منهجي." },
              { title: "مشاريع غير مرتبطة بالأثر", desc: "يُنجَز العمل الميداني دون ربطه الواضح بالمؤشرات الاستراتيجية أو الأهداف الكلية." },
              { title: "تقارير متأخرة ومجتزأة", desc: "المعلومات تصل متأخرة ولا تعكس الواقع الحقيقي للأداء في اللحظة الحاسمة." },
              { title: "قرارات بدون صورة كاملة", desc: "صانع القرار يفتقر إلى رؤية شاملة وآنية تمكنه من التصرف بثقة وبيانات موثوقة." },
            ].map((item, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: "40px", padding: "28px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                alignItems: "baseline",
              }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
                  <span style={{ fontSize: "11px", color: "rgba(255,80,80,0.45)", fontFamily: "monospace", flexShrink: 0 }}>0{i + 1}</span>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "-0.01em" }}>{item.title}</h3>
                </div>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)", lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Solution: Unified System ─── */
function SolutionSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} style={{ backgroundColor: "#0A0F14", padding: "160px 0", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,207,138,0.04) 0%, transparent 65%)",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
        {/* Label + headline */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "88px", direction: "rtl" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#00CF8A", opacity: 0.4 }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(0,207,138,0.7)", letterSpacing: "0.12em", fontFamily: "monospace" }}>الحل</span>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#00CF8A", opacity: 0.4 }} />
          </div>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 64px)", fontWeight: 700,
            color: "rgba(255,255,255,0.92)", lineHeight: 1.18, letterSpacing: "-0.03em",
            marginBottom: "20px",
          }}>
            TX360 يجمع الكل في{" "}
            <span style={{ color: "#00CF8A" }}>نظام واحد حي</span>
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.36)", lineHeight: 1.75, maxWidth: "540px", margin: "0 auto" }}>
            من التخطيط الجامد إلى منظومة ديناميكية تنبض بالبيانات وتُنتج توصيات ذكية لحظياً
          </p>
        </motion.div>

        {/* Hub + capabilities split */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", direction: "rtl" }}>
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div style={{ borderTop: "1px solid rgba(0,207,138,0.12)" }}>
              {[
                { num: "01", title: "بناء الاستراتيجية", desc: "صياغة وهيكلة الأهداف الاستراتيجية بدقة، مدعومة بالذكاء الاصطناعي ومعايير المؤسسة." },
                { num: "02", title: "ربط المشاريع بالأهداف", desc: "كل مشروع ومبادرة مرتبط بهدفه الاستراتيجي الواضح مع مؤشر قياس محدد وقابل للتتبع." },
                { num: "03", title: "متابعة الأداء لحظياً", desc: "لوحة تحكم تنفيذية توفر صورة كاملة عن حال المؤشرات والمشاريع في الوقت الفعلي." },
                { num: "04", title: "توصيات ذكية استباقية", desc: "TX360 يحلل الأنماط ويكتشف الانحرافات ليُقدّم توصيات قبل أن تصبح مشكلة." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.1 }}
                  style={{
                    display: "grid", gridTemplateColumns: "44px 1fr",
                    gap: "20px", padding: "28px 0",
                    borderBottom: "1px solid rgba(0,207,138,0.08)",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "rgba(0,207,138,0.45)", fontFamily: "monospace", paddingTop: "2px" }}>{item.num}</span>
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "rgba(255,255,255,0.82)", marginBottom: "8px", letterSpacing: "-0.01em" }}>{item.title}</h3>
                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.75 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hub diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <svg width="440" height="440" viewBox="0 0 440 440" fill="none">
              {/* Outer ring glow */}
              <circle cx="220" cy="220" r="160" stroke="rgba(0,207,138,0.06)" strokeWidth="1" />
              <circle cx="220" cy="220" r="130" stroke="rgba(0,207,138,0.05)" strokeWidth="0.5" />

              {/* Spokes — solid green */}
              {/* Top */}
              <line x1="220" y1="140" x2="220" y2="60" stroke="rgba(0,207,138,0.35)" strokeWidth="1.2" />
              {/* Right */}
              <line x1="300" y1="220" x2="380" y2="220" stroke="rgba(0,207,138,0.35)" strokeWidth="1.2" />
              {/* Bottom */}
              <line x1="220" y1="300" x2="220" y2="380" stroke="rgba(0,207,138,0.35)" strokeWidth="1.2" />
              {/* Left */}
              <line x1="140" y1="220" x2="60" y2="220" stroke="rgba(0,207,138,0.35)" strokeWidth="1.2" />
              {/* Diagonals */}
              <line x1="277" y1="163" x2="340" y2="100" stroke="rgba(0,207,138,0.18)" strokeWidth="0.8" />
              <line x1="163" y1="163" x2="100" y2="100" stroke="rgba(0,207,138,0.18)" strokeWidth="0.8" />
              <line x1="277" y1="277" x2="340" y2="340" stroke="rgba(0,207,138,0.18)" strokeWidth="0.8" />
              <line x1="163" y1="277" x2="100" y2="340" stroke="rgba(0,207,138,0.18)" strokeWidth="0.8" />

              {/* Center circle */}
              <circle cx="220" cy="220" r="65" fill="rgba(0,207,138,0.05)" stroke="rgba(0,207,138,0.25)" strokeWidth="1.5" />
              <circle cx="220" cy="220" r="52" fill="rgba(0,207,138,0.04)" stroke="rgba(0,207,138,0.12)" strokeWidth="0.8" />

              {/* TX360 text at center */}
              <text x="220" y="213" textAnchor="middle" fill="#00CF8A" fontSize="13" fontFamily="monospace" fontWeight="700" letterSpacing="0.05em">TX360</text>
              <text x="220" y="232" textAnchor="middle" fill="rgba(0,207,138,0.5)" fontSize="9" fontFamily="monospace">منصة موحدة</text>

              {/* Node labels */}
              {/* Top: بناء الأهداف */}
              <circle cx="220" cy="46" r="28" fill="rgba(7,9,13,0.95)" stroke="rgba(0,207,138,0.2)" strokeWidth="1" />
              <text x="220" y="44" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5" fontFamily="'Rubik', sans-serif" fontWeight="600">بناء</text>
              <text x="220" y="56" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5" fontFamily="'Rubik', sans-serif" fontWeight="600">الأهداف</text>

              {/* Right: تحليل ذكي */}
              <circle cx="394" cy="220" r="28" fill="rgba(7,9,13,0.95)" stroke="rgba(0,207,138,0.2)" strokeWidth="1" />
              <text x="394" y="218" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5" fontFamily="'Rubik', sans-serif" fontWeight="600">تحليل</text>
              <text x="394" y="230" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5" fontFamily="'Rubik', sans-serif" fontWeight="600">ذكي</text>

              {/* Bottom: متابعة الأداء */}
              <circle cx="220" cy="394" r="28" fill="rgba(7,9,13,0.95)" stroke="rgba(0,207,138,0.2)" strokeWidth="1" />
              <text x="220" y="392" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5" fontFamily="'Rubik', sans-serif" fontWeight="600">متابعة</text>
              <text x="220" y="404" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5" fontFamily="'Rubik', sans-serif" fontWeight="600">الأداء</text>

              {/* Left: ربط المشاريع */}
              <circle cx="46" cy="220" r="28" fill="rgba(7,9,13,0.95)" stroke="rgba(0,207,138,0.2)" strokeWidth="1" />
              <text x="46" y="218" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5" fontFamily="'Rubik', sans-serif" fontWeight="600">ربط</text>
              <text x="46" y="230" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5" fontFamily="'Rubik', sans-serif" fontWeight="600">المشاريع</text>

              {/* Diagonal small nodes */}
              {[
                { cx: 348, cy: 92 },
                { cx: 92, cy: 92 },
                { cx: 348, cy: 348 },
                { cx: 92, cy: 348 },
              ].map((n, i) => (
                <circle key={i} cx={n.cx} cy={n.cy} r="7" fill="rgba(7,9,13,0.95)" stroke="rgba(0,207,138,0.15)" strokeWidth="0.8" />
              ))}
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works: Pipeline ─── */
function HowItWorksSection() {
  const { ref, inView } = useInView(0.1);

  const steps = [
    { num: "01", en: "Build", ar: "بناء الاستراتيجية", desc: "حدِّد الأهداف والمؤشرات بدقة، واستخدم AI لصياغتها في هيكل استراتيجي واضح." },
    { num: "02", en: "Connect", ar: "ربط التنفيذ", desc: "اربط كل مشروع ومبادرة بهدفه الاستراتيجي ومؤشره القياسي مباشرةً." },
    { num: "03", en: "Track", ar: "متابعة لحظية", desc: "لوحة تحكم موحدة تعرض حال جميع الأهداف والمشاريع في الوقت الفعلي." },
    { num: "04", en: "Analyze", ar: "تحليل الأنماط", desc: "يكتشف TX360 الانحرافات والفرص ويستبق المشاكل قبل وقوعها." },
    { num: "05", en: "Improve", ar: "تحسين النتائج", desc: "طبِّق التوصيات المدعومة بالبيانات وارفع مستوى الإنجاز الاستراتيجي." },
  ];

  return (
    <section id="how-it-works" ref={ref} style={{ backgroundColor: "#07090D", padding: "160px 0", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,207,138,0.12), transparent)" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "96px", direction: "rtl" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#00CF8A", opacity: 0.4 }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(0,207,138,0.7)", letterSpacing: "0.12em", fontFamily: "monospace" }}>كيف يعمل</span>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#00CF8A", opacity: 0.4 }} />
          </div>
          <h2 style={{
            fontSize: "clamp(30px, 3.8vw, 58px)", fontWeight: 700,
            color: "rgba(255,255,255,0.92)", letterSpacing: "-0.03em",
          }}>
            دورة استراتيجية{" "}<span style={{ color: "#00CF8A" }}>متكاملة</span>
          </h2>
        </motion.div>

        {/* Pipeline */}
        <div style={{ position: "relative", direction: "rtl" }}>
          {/* Horizontal connector line */}
          <div style={{
            position: "absolute", top: "31px",
            right: "calc(100% / 10)",
            left: "calc(100% / 10)",
            height: "1px",
            background: "linear-gradient(to left, transparent 0%, rgba(0,207,138,0.15) 10%, rgba(0,207,138,0.4) 30%, rgba(0,207,138,0.55) 50%, rgba(0,207,138,0.4) 70%, rgba(0,207,138,0.15) 90%, transparent 100%)",
          }} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 8px", position: "relative", zIndex: 1 }}
              >
                {/* Node circle */}
                <div style={{
                  width: "62px", height: "62px", borderRadius: "50%",
                  backgroundColor: "#07090D",
                  border: "1.5px solid rgba(0,207,138,0.35)",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  marginBottom: "32px",
                  boxShadow: "0 0 0 6px rgba(7,9,13,1), 0 0 24px rgba(0,207,138,0.1)",
                  position: "relative",
                }}>
                  <span style={{ fontSize: "9px", color: "rgba(0,207,138,0.45)", fontFamily: "monospace", marginBottom: "1px" }}>{step.num}</span>
                  <span style={{ fontSize: "9.5px", fontWeight: 700, color: "#00CF8A", fontFamily: "monospace", letterSpacing: "0.04em" }}>{step.en}</span>
                </div>

                {/* Vertical connector */}
                <div style={{ width: "1px", height: "24px", backgroundColor: "rgba(0,207,138,0.18)", marginBottom: "16px" }} />

                <h4 style={{ fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: "10px", lineHeight: 1.3 }}>{step.ar}</h4>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.32)", lineHeight: 1.7 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Product Preview: Full-Width Dashboard ─── */
function ProductPreviewSection() {
  const { ref, inView } = useInView(0.08);

  const goals = [
    { title: "تحسين تجربة المستفيد", owner: "وحدة الخدمات", progress: 87, status: "في المسار", projects: 4, color: "#60a5fa" },
    { title: "رفع كفاءة العمليات", owner: "التحول الرقمي", progress: 62, status: "يحتاج مراجعة", projects: 7, color: "#fbbf24" },
    { title: "التحول الرقمي الشامل", owner: "الاستراتيجية", progress: 94, status: "متفوق", projects: 12, color: "#00CF8A" },
    { title: "تطوير الكوادر البشرية", owner: "الموارد البشرية", progress: 73, status: "في المسار", projects: 3, color: "#60a5fa" },
    { title: "الاستدامة المؤسسية", owner: "شؤون الجودة", progress: 55, status: "متأخر", projects: 5, color: "rgba(255,90,90,0.8)" },
    { title: "الشراكات الاستراتيجية", owner: "العلاقات الخارجية", progress: 81, status: "في المسار", projects: 6, color: "#60a5fa" },
  ];

  const barW = 560, barH = 110;
  const barData = [38, 52, 65, 59, 74, 68, 82, 77, 88, 84, 92, 90];

  return (
    <section ref={ref} style={{ backgroundColor: "#0A0F14", padding: "40px 0 160px", position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,207,138,0.03) 0%, transparent 65%)",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "56px", direction: "rtl" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#00CF8A", opacity: 0.4 }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(0,207,138,0.7)", letterSpacing: "0.12em", fontFamily: "monospace" }}>معاينة المنصة</span>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#00CF8A", opacity: 0.4 }} />
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 3.5vw, 54px)", fontWeight: 700,
            color: "rgba(255,255,255,0.92)", letterSpacing: "-0.03em",
          }}>
            لوحة تحكم <span style={{ color: "#00CF8A" }}>استراتيجية</span> حية
          </h2>
        </motion.div>

        {/* Full-width dashboard frame */}
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{
            backgroundColor: "#050A10",
            border: "1px solid rgba(0,207,138,0.12)",
            borderRadius: "18px", overflow: "hidden",
            boxShadow: "0 48px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.025), 0 0 80px rgba(0,207,138,0.04)",
          }}
        >
          {/* Top bar */}
          <div style={{
            height: 44, backgroundColor: "#030710",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            display: "flex", alignItems: "center", padding: "0 18px", gap: 10,
          }}>
            <div style={{ display: "flex", gap: 5 }}>
              {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c, opacity: 0.65 }} />
              ))}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <div style={{
                fontSize: 10.5, color: "rgba(255,255,255,0.2)", fontFamily: "monospace",
                backgroundColor: "rgba(255,255,255,0.03)", padding: "3px 20px", borderRadius: 6,
              }}>app.tx360.ai / strategic-dashboard</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#00CF8A", boxShadow: "0 0 6px rgba(0,207,138,0.9)", animation: "txPulse 2s infinite" }} />
              <span style={{ fontSize: 9, color: "rgba(0,207,138,0.55)", fontFamily: "monospace" }}>LIVE</span>
            </div>
          </div>

          {/* Dashboard body */}
          <div style={{ display: "flex", direction: "rtl" }}>
            {/* Sidebar */}
            <div style={{
              width: 180, flexShrink: 0, backgroundColor: "#030810",
              borderLeft: "1px solid rgba(255,255,255,0.04)",
              padding: "20px 0",
            }}>
              <div style={{ padding: "0 16px", marginBottom: 24 }}>
                <TX360Logo height={16} />
              </div>
              {[
                { label: "لوحة التحكم", active: true, badge: null },
                { label: "الأهداف الاستراتيجية", active: false, badge: "24" },
                { label: "المشاريع", active: false, badge: "67" },
                { label: "المؤشرات KPIs", active: false, badge: null },
                { label: "التقارير", active: false, badge: null },
                { label: "توصيات AI", active: false, badge: "9" },
                { label: "الإعدادات", active: false, badge: null },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "9px 16px", fontSize: 11, direction: "rtl",
                  color: item.active ? "#00CF8A" : "rgba(255,255,255,0.28)",
                  backgroundColor: item.active ? "rgba(0,207,138,0.07)" : "transparent",
                  borderRight: item.active ? "2px solid #00CF8A" : "2px solid transparent",
                  cursor: "default",
                }}>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      fontSize: 9, padding: "1px 6px", borderRadius: 4, fontFamily: "monospace",
                      backgroundColor: item.active ? "rgba(0,207,138,0.15)" : "rgba(255,255,255,0.07)",
                      color: item.active ? "#00CF8A" : "rgba(255,255,255,0.3)",
                    }}>{item.badge}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div style={{ flex: 1, padding: "24px", overflow: "hidden" }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", direction: "rtl" }}>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "rgba(255,255,255,0.82)", marginBottom: "3px" }}>لوحة التحكم الاستراتيجية</h2>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>آخر تحديث: منذ دقيقتين · الربع الثاني 2025</div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {["الربع الثاني", "تصدير PDF", "مشاركة"].map((btn, i) => (
                    <div key={i} style={{
                      fontSize: "10px", padding: "5px 12px", borderRadius: "6px", cursor: "default",
                      backgroundColor: i === 0 ? "rgba(0,207,138,0.09)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${i === 0 ? "rgba(0,207,138,0.2)" : "rgba(255,255,255,0.06)"}`,
                      color: i === 0 ? "#00CF8A" : "rgba(255,255,255,0.38)",
                    }}>{btn}</div>
                  ))}
                </div>
              </div>

              {/* KPI row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", marginBottom: "18px", direction: "rtl" }}>
                {[
                  { label: "الأهداف الكلية", val: "24", delta: "+3", pos: true, sub: "هذا الربع" },
                  { label: "المشاريع النشطة", val: "67", delta: "12", pos: false, sub: "تحتاج مراجعة" },
                  { label: "متوسط الإنجاز", val: "82%", delta: "+8%", pos: true, sub: "عن الهدف" },
                  { label: "توصيات معلقة", val: "9", delta: "3", pos: false, sub: "عالية الأولوية" },
                  { label: "الأداء الكلي", val: "↑ممتاز", delta: "", pos: true, sub: "هذا الشهر" },
                ].map((kpi, i) => (
                  <div key={i} style={{
                    backgroundColor: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "9px", padding: "12px 12px 10px", textAlign: "right",
                  }}>
                    <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", marginBottom: "5px" }}>{kpi.label}</div>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.88)", lineHeight: 1.1, marginBottom: "4px" }}>{kpi.val}</div>
                    <div style={{ fontSize: "9px" }}>
                      {kpi.delta && <span style={{ color: kpi.pos ? "#00CF8A" : "rgba(255,170,50,0.8)", marginLeft: "3px" }}>{kpi.delta}</span>}
                      <span style={{ color: "rgba(255,255,255,0.22)" }}>{kpi.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Content grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "14px", direction: "rtl" }}>
                {/* Goals table */}
                <div style={{
                  backgroundColor: "rgba(255,255,255,0.018)",
                  border: "1px solid rgba(255,255,255,0.045)",
                  borderRadius: "10px", overflow: "hidden",
                }}>
                  {/* Table header */}
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 120px 80px 80px 100px",
                    padding: "10px 14px", direction: "rtl",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}>
                    {["الهدف الاستراتيجي", "المسؤول", "المشاريع", "الإنجاز", "الحالة"].map((h, i) => (
                      <div key={i} style={{ fontSize: "9px", color: "rgba(255,255,255,0.22)", fontWeight: 600, letterSpacing: "0.04em" }}>{h}</div>
                    ))}
                  </div>
                  {/* Table rows */}
                  {goals.map((g, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
                      style={{
                        display: "grid", gridTemplateColumns: "1fr 120px 80px 80px 100px",
                        padding: "10px 14px", direction: "rtl",
                        borderBottom: "1px solid rgba(255,255,255,0.03)",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{g.title}</div>
                      <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)" }}>{g.owner}</div>
                      <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.38)", fontFamily: "monospace" }}>{g.projects} مشروع</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <div style={{ flex: 1, height: "3px", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "2px" }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${g.progress}%` } : {}}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 + i * 0.07 }}
                            style={{ height: "100%", borderRadius: "2px", backgroundColor: g.color, boxShadow: `0 0 4px ${g.color}60` }}
                          />
                        </div>
                        <span style={{ fontSize: "9px", color: g.color, fontFamily: "monospace", flexShrink: 0 }}>{g.progress}%</span>
                      </div>
                      <div>
                        <span style={{
                          fontSize: "9px", padding: "2px 8px", borderRadius: "4px",
                          color: g.color, backgroundColor: `${g.color}14`,
                          border: `1px solid ${g.color}25`,
                        }}>{g.status}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Right panel: chart + AI */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {/* Mini bar chart */}
                  <div style={{
                    backgroundColor: "rgba(255,255,255,0.018)",
                    border: "1px solid rgba(255,255,255,0.045)",
                    borderRadius: "10px", padding: "14px",
                  }}>
                    <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", marginBottom: "10px", letterSpacing: "0.03em" }}>الأداء الشهري</div>
                    <svg width="100%" height={barH} viewBox={`0 0 ${barW} ${barH}`} preserveAspectRatio="none">
                      {barData.map((v, i) => {
                        const bw = (barW / barData.length) * 0.6;
                        const x = (i / barData.length) * barW + (barW / barData.length) * 0.2;
                        const h = (v / 100) * barH;
                        const isLast = i === barData.length - 1;
                        return (
                          <g key={i}>
                            <rect x={x} y={barH - h} width={bw} height={h} rx="3"
                              fill={isLast ? "#00CF8A" : "rgba(0,207,138,0.22)"}
                              opacity={isLast ? 1 : 0.8 - (barData.length - i) * 0.04}
                            />
                          </g>
                        );
                      })}
                    </svg>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                      {["يناير", "مارس", "مايو", "يوليو", "سبتمبر", "نوفمبر"].map((m, i) => (
                        <span key={i} style={{ fontSize: "7.5px", color: "rgba(255,255,255,0.18)", fontFamily: "monospace" }}>{m}</span>
                      ))}
                    </div>
                  </div>

                  {/* AI recommendations */}
                  <div style={{
                    flex: 1,
                    backgroundColor: "rgba(0,207,138,0.03)",
                    border: "1px solid rgba(0,207,138,0.1)",
                    borderRadius: "10px", padding: "14px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                      <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#00CF8A", boxShadow: "0 0 5px rgba(0,207,138,0.9)", animation: "txPulse 2s infinite" }} />
                      <span style={{ fontSize: "9px", color: "#00CF8A", fontFamily: "monospace", letterSpacing: "0.06em" }}>توصيات ذكية — AI</span>
                    </div>
                    {[
                      { priority: "عاجل", text: "هدف كفاءة العمليات انحرف 18% عن المسار", color: "rgba(255,90,90,0.8)" },
                      { priority: "تنبيه", text: "تعارض موارد بشرية في 3 مشاريع متوازية", color: "#fbbf24" },
                      { priority: "فرصة", text: "يمكن تسريع التحول الرقمي بإعادة توزيع الموارد", color: "#00CF8A" },
                    ].map((r, i) => (
                      <div key={i} style={{
                        backgroundColor: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.04)",
                        borderRadius: "7px", padding: "8px 9px", marginBottom: "6px",
                      }}>
                        <div style={{ fontSize: "7.5px", color: r.color, fontFamily: "monospace", marginBottom: "3px", letterSpacing: "0.04em" }}>◈ {r.priority}</div>
                        <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.42)", lineHeight: 1.5 }}>{r.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Use Cases: Editorial Rows ─── */
function UseCasesSection() {
  const { ref, inView } = useInView(0.1);

  const cases = [
    {
      num: "01",
      sector: "الجهات الحكومية",
      sub: "Government & Public Sector",
      color: "#00CF8A",
      desc: "ربط الأهداف الوطنية بالمبادرات الحكومية ومتابعة مؤشرات رؤية 2030 بدقة وشفافية كاملة أمام القيادة التنفيذية.",
      tags: ["رؤية 2030", "الأداء الوطني", "التقارير التنفيذية", "الشفافية المؤسسية"],
    },
    {
      num: "02",
      sector: "القطاع الصحي",
      sub: "Healthcare & Medical",
      color: "#60a5fa",
      desc: "تتبع مؤشرات الجودة الصحية عبر المنشآت، وربط مشاريع التطوير بالأهداف الاستراتيجية للقطاع الصحي بالكامل.",
      tags: ["جودة الخدمة الصحية", "المؤشرات السريرية", "التطوير المستمر", "الاعتماد الدولي"],
    },
    {
      num: "03",
      sector: "القطاع التعليمي",
      sub: "Education & Research",
      color: "#a78bfa",
      desc: "قياس مخرجات التعليم وربط المشاريع التعليمية بأهداف الوزارة الاستراتيجية، مع متابعة شاملة للأداء المؤسسي.",
      tags: ["المخرجات التعليمية", "جودة البرامج", "التطوير المهني", "الجودة الأكاديمية"],
    },
  ];

  return (
    <section ref={ref} style={{ backgroundColor: "#07090D", padding: "160px 0", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,207,138,0.12), transparent)" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "80px", direction: "rtl" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#00CF8A", opacity: 0.4 }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(0,207,138,0.7)", letterSpacing: "0.12em", fontFamily: "monospace" }}>حالات الاستخدام</span>
          </div>
          <h2 style={{
            fontSize: "clamp(30px, 3.8vw, 58px)", fontWeight: 700,
            color: "rgba(255,255,255,0.92)", letterSpacing: "-0.03em",
          }}>
            لكل قطاع <span style={{ color: "#00CF8A" }}>سياقه الخاص</span>
          </h2>
        </motion.div>

        {/* Editorial rows */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", direction: "rtl" }}>
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.15 }}
              style={{
                display: "grid", gridTemplateColumns: "200px 1fr 240px",
                gap: "48px", padding: "52px 0",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                alignItems: "start",
              }}
            >
              {/* Number + Sector */}
              <div>
                <div style={{ fontSize: "11px", color: `${c.color}60`, fontFamily: "monospace", marginBottom: "10px" }}>{c.num}</div>
                <div style={{ fontSize: "22px", fontWeight: 700, color: "rgba(255,255,255,0.82)", lineHeight: 1.2, marginBottom: "4px" }}>{c.sector}</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.04em" }}>{c.sub}</div>
                {/* Color accent bar */}
                <div style={{ width: "28px", height: "2px", backgroundColor: c.color, marginTop: "20px", opacity: 0.6 }} />
              </div>

              {/* Description */}
              <div>
                <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.48)", lineHeight: 1.85, maxWidth: "520px" }}>{c.desc}</p>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "4px" }}>
                {c.tags.map((tag, j) => (
                  <span key={j} style={{
                    fontSize: "10px", padding: "5px 11px", borderRadius: "6px",
                    color: `${c.color}99`, backgroundColor: `${c.color}0d`,
                    border: `1px solid ${c.color}20`,
                  }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Impact: Typographic Numbers ─── */
function ImpactSection() {
  const { ref, inView } = useInView(0.1);

  const metrics = [
    { val: "٣×", label: "تسريع اتخاذ القرار", sub: "مقارنة بالطرق التقليدية" },
    { val: "٨٠٪", label: "تحسين الأداء المؤسسي", sub: "خلال أول 6 أشهر من التطبيق" },
    { val: "١٠٠٪", label: "وضوح استراتيجي كامل", sub: "صورة شاملة لحظية وموثوقة" },
    { val: "٩٧٪", label: "دقة توصيات الذكاء الاصطناعي", sub: "مدعومة بالبيانات الحقيقية" },
  ];

  return (
    <section ref={ref} style={{ backgroundColor: "#0A0F14", padding: "160px 0", position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,207,138,0.03) 0%, transparent 65%)",
      }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "100px", direction: "rtl" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#00CF8A", opacity: 0.4 }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(0,207,138,0.7)", letterSpacing: "0.12em", fontFamily: "monospace" }}>الأثر والنتائج</span>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#00CF8A", opacity: 0.4 }} />
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 3.5vw, 52px)", fontWeight: 700,
            color: "rgba(255,255,255,0.92)", letterSpacing: "-0.03em",
          }}>
            نتائج <span style={{ color: "#00CF8A" }}>قابلة للقياس</span>
          </h2>
        </motion.div>

        {/* Typographic 2×2 grid — NO boxes, pure typography */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", direction: "rtl" }}>
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.12 }}
              style={{
                padding: "60px 48px",
                borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                borderLeft: i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div style={{
                fontSize: "clamp(60px, 7vw, 96px)",
                fontWeight: 700, color: "#00CF8A",
                lineHeight: 1, marginBottom: "20px",
                textShadow: "0 0 80px rgba(0,207,138,0.25)",
                fontFamily: "'Rubik', sans-serif",
              }}>{m.val}</div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "rgba(255,255,255,0.75)", marginBottom: "8px" }}>{m.label}</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>{m.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Trust: Horizontal Band ─── */
function TrustSection() {
  const { ref, inView } = useInView(0.1);

  const badges = [
    { title: "متوافق مع NDMO", desc: "معايير هيئة البيانات والذكاء الاصطناعي" },
    { title: "أمان مؤسسي", desc: "تشفير متعدد الطبقات وصلاحيات دقيقة" },
    { title: "جاهز للتكامل", desc: "API مفتوح مع الأنظمة الحكومية القائمة" },
    { title: "رؤية 2030 متوافق", desc: "رافد حقيقي للتحول الرقمي الوطني" },
  ];

  return (
    <section ref={ref} style={{ backgroundColor: "#07090D", padding: "100px 0", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,207,138,0.12), transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,207,138,0.08), transparent)" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ direction: "rtl" }}
        >
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", fontFamily: "monospace", marginBottom: "48px", textAlign: "center" }}>
            مبني على أسس الثقة والامتثال
          </div>

          {/* Horizontal strip — no boxes */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", direction: "rtl" }}>
            {badges.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08 + i * 0.1 }}
                style={{
                  padding: "0 36px",
                  borderLeft: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  textAlign: "center",
                }}
              >
                {/* Check mark */}
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  border: "1.5px solid rgba(0,207,138,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7.5l3 3 6-6" stroke="#00CF8A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.72)", marginBottom: "6px" }}>{b.title}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", lineHeight: 1.6 }}>{b.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCTASection() {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="demo-cta" ref={ref} style={{ backgroundColor: "#0A0F14", padding: "180px 0", position: "relative", overflow: "hidden" }}>
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(0,207,138,0.06) 0%, transparent 65%)",
      }} />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.02, pointerEvents: "none" }}>
        <defs>
          <pattern id="cta-grid" x="0" y="0" width="52" height="52" patternUnits="userSpaceOnUse">
            <path d="M 52 0 L 0 0 0 52" fill="none" stroke="#00CF8A" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-grid)" />
      </svg>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 48px", textAlign: "center", position: "relative", zIndex: 1, direction: "rtl" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            border: "1px solid rgba(0,207,138,0.22)", backgroundColor: "rgba(0,207,138,0.06)",
            borderRadius: "100px", padding: "7px 22px", marginBottom: "44px",
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#00CF8A", display: "block", boxShadow: "0 0 8px rgba(0,207,138,0.9)", animation: "txPulse 2s infinite" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#00CF8A", letterSpacing: "0.1em", fontFamily: "monospace" }}>جاهز للانطلاق</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            fontSize: "clamp(36px, 5.5vw, 76px)", fontWeight: 700,
            color: "rgba(255,255,255,0.94)", lineHeight: 1.15,
            letterSpacing: "-0.035em", marginBottom: "24px",
          }}
        >
          ابدأ في رؤية استراتيجيتك{" "}
          <span style={{ color: "#00CF8A", textShadow: "0 0 80px rgba(0,207,138,0.35)" }}>
            بشكل مختلف
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.22 }}
          style={{
            fontSize: "18px", color: "rgba(255,255,255,0.38)", lineHeight: 1.8,
            maxWidth: "560px", margin: "0 auto 56px",
          }}
        >
          احجز Demo مخصصاً لجهتك وشاهد كيف يحوّل TX360 استراتيجيتك إلى منظومة حية تُحقق أثراً حقيقياً قابلاً للقياس.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.38 }}
          style={{ display: "flex", justifyContent: "center", gap: "14px", direction: "rtl" }}
        >
          <button style={{
            fontSize: "15px", fontWeight: 700, color: "#07090D",
            backgroundColor: "#00CF8A", border: "none", cursor: "pointer",
            padding: "18px 44px", borderRadius: "12px",
            display: "inline-flex", alignItems: "center", gap: "10px",
            transition: "all 0.25s ease",
            boxShadow: "0 4px 40px rgba(0,207,138,0.4)",
            fontFamily: "'Rubik', 'IBM Plex Sans Arabic', sans-serif",
          }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#0ae09b"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 56px rgba(0,207,138,0.55)"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#00CF8A"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 40px rgba(0,207,138,0.4)"; }}
          >
            احجز Demo الآن
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 8H3M7 5l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <Link to="/" style={{
            fontSize: "14px", fontWeight: 500, color: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "18px 32px", borderRadius: "12px",
            display: "inline-flex", alignItems: "center", gap: "8px",
            transition: "all 0.25s ease", textDecoration: "none",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,207,138,0.3)"; e.currentTarget.style.color = "#00CF8A"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
          >
            اعرف المزيد عن Al Agents
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function TX360Footer() {
  return (
    <footer style={{
      backgroundColor: "#07090D",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "36px 0",
    }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto", padding: "0 48px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        direction: "rtl",
      }}>
        <TX360Logo height={20} style={{ opacity: 0.45 }} />
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#00CF8A", display: "block", opacity: 0.6 }} />
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.22)" }}>
            منتج Al Agents — جميع الحقوق محفوظة © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Export ─── */
export default function TX360Page() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div dir="rtl" style={{
      fontFamily: "'Rubik', 'IBM Plex Sans Arabic', sans-serif",
      backgroundColor: "#07090D",
      overflowX: "hidden",
      minHeight: "100vh",
    }}>
      <TX360Nav />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <ProductPreviewSection />
      <UseCasesSection />
      <ImpactSection />
      <TrustSection />
      <FinalCTASection />
      <TX360Footer />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes txPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(0,207,138,0.9); }
          50% { opacity: 0.4; box-shadow: 0 0 3px rgba(0,207,138,0.3); }
        }
      `}</style>
    </div>
  );
}
