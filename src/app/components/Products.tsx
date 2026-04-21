import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";

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

// TX360 dashboard overlay
function TX360Overlay({ inView }: { inView: boolean }) {
  const bars = [
    { label: "رضا المستفيد", val: 94 },
    { label: "كفاءة الخدمة", val: 88 },
    { label: "سرعة الاستجابة", val: 81 },
    { label: "جودة البيانات", val: 97 },
  ];
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Top row: radar + legend */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center", marginBottom: "4px" }}>
        <svg viewBox="0 0 200 200" width="140" height="140" fill="none">
          <defs>
            <radialGradient id="radar-grd" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#009245" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#009245" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[80, 60, 40, 20].map((r, i) => (
            <circle key={i} cx="100" cy="100" r={r} stroke="rgba(0,146,69,0.12)" strokeWidth="0.8" />
          ))}
          {[0, 72, 144, 216, 288].map((deg, i) => {
            const rad = (deg - 90) * Math.PI / 180;
            return (
              <line key={i} x1="100" y1="100"
                x2={100 + Math.cos(rad) * 80} y2={100 + Math.sin(rad) * 80}
                stroke="rgba(0,146,69,0.12)" strokeWidth="0.8" />
            );
          })}
          <polygon
            points={[94, 88, 81, 97, 90].map((v, i) => {
              const deg = (i * 72 - 90) * Math.PI / 180;
              const r = (v / 100) * 75;
              return `${100 + Math.cos(deg) * r},${100 + Math.sin(deg) * r}`;
            }).join(" ")}
            fill="url(#radar-grd)" stroke="#009245" strokeWidth="1.5"
          />
          {[94, 88, 81, 97, 90].map((v, i) => {
            const deg = (i * 72 - 90) * Math.PI / 180;
            const r = (v / 100) * 75;
            return <circle key={i} cx={100 + Math.cos(deg) * r} cy={100 + Math.sin(deg) * r} r="3.5" fill="#009245" />;
          })}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {["تجربة", "كفاءة", "سرعة", "جودة", "ثقة"].map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px", direction: "rtl" }}>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>{l}</span>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#009245", flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
      {bars.map((bar, i) => (
        <div key={i} style={{ direction: "rtl" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>{bar.label}</span>
            <span style={{ fontSize: "11px", color: "#009245", fontFamily: "monospace" }}>{bar.val}%</span>
          </div>
          <div style={{ height: "2px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "2px" }}>
            <motion.div
              initial={{ width: "0%" }}
              animate={inView ? { width: `${bar.val}%` } : {}}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 + i * 0.1 }}
              style={{ height: "100%", backgroundColor: "#009245", borderRadius: "2px", boxShadow: "0 0 6px rgba(0,146,69,0.5)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Fintech chart overlay
function FintechOverlay({ inView }: { inView: boolean }) {
  const points = [30, 55, 42, 68, 52, 78, 63, 85, 72, 90, 80, 95];
  const w = 240, h = 100;
  const minV = Math.min(...points);
  const maxV = Math.max(...points);
  const pathPoints = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((v - minV) / (maxV - minV)) * h;
    return `${x},${y}`;
  });
  return (
    <div style={{ padding: "4px 0", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", direction: "rtl" }}>
        <div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", marginBottom: "4px" }}>محفظة ذكية</div>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.02em", lineHeight: 1 }}>＋٢٤.٥٪</div>
          <div style={{ fontSize: "11px", color: "#1A73E8", marginTop: "4px" }}>↑ هذا الشهر</div>
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", marginBottom: "2px", fontFamily: "monospace" }}>AI Score</div>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#1A73E8", lineHeight: 1 }}>9.2</div>
          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>/10</div>
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="70" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="ft-grd2" x1="0" y1="0" x2="0" y2={h} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1A73E8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1A73E8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`M ${pathPoints.join(" L ")} L ${w},${h} L 0,${h} Z`} fill="url(#ft-grd2)" />
        <path d={`M ${pathPoints.join(" L ")}`} fill="none" stroke="#1A73E8" strokeWidth="2" />
        <circle cx={w} cy={h - ((points[points.length - 1] - minV) / (maxV - minV)) * h} r="4" fill="#1A73E8" />
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", direction: "rtl" }}>
        {[
          { label: "دقة التحليل", val: "97.3%" },
          { label: "وقت التقييم", val: "0.8s" },
          { label: "رضا المستخدم", val: "4.9★" },
        ].map((m, i) => (
          <div key={i} style={{
            padding: "10px 8px",
            backgroundColor: "rgba(255,255,255,0.06)",
            borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: "3px" }}>{m.val}</div>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)" }}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Kyan digital human overlay
function KyanOverlay() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", direction: "rtl" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
        <div style={{ position: "relative" }}>
          {[1, 2, 3].map((r) => (
            <div key={r} style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: `${80 + r * 28}px`, height: `${80 + r * 28}px`,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: `1px solid rgba(124,58,237,${0.22 - r * 0.05})`,
              animation: `kyanSpin${r} ${8 + r * 4}s linear infinite`,
            }} />
          ))}
          <div style={{
            width: "80px", height: "80px", borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(124,58,237,0.35) 0%, rgba(0,146,69,0.2) 100%)",
            border: "2px solid rgba(124,58,237,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 50px rgba(124,58,237,0.25)",
            position: "relative", zIndex: 1,
          }}>
            <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="14" r="8" fill="rgba(124,58,237,0.5)" stroke="rgba(124,58,237,0.9)" strokeWidth="1.5" />
              <path d="M6 38c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="rgba(124,58,237,0.9)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="20" cy="14" r="4" fill="rgba(124,58,237,0.9)" />
              <circle cx="17" cy="12" r="1.2" fill="white" opacity="0.7" />
            </svg>
          </div>
        </div>
      </div>
      {[
        { label: "لغة الحوار", val: "العربية الفصحى", active: true },
        { label: "مستوى الثقة", val: "موثّق ومعتمد", active: true },
        { label: "حالة الاتصال", val: "متاح الآن", active: true },
        { label: "التخصص", val: "خدمات حكومية", active: false },
      ].map((s, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "8px 12px",
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "8px", border: "1px solid rgba(255,255,255,0.07)",
        }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: s.active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)" }}>{s.val}</span>
          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{s.label}</span>
        </div>
      ))}
      <style>{`
        @keyframes kyanSpin1 { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes kyanSpin2 { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
        @keyframes kyanSpin3 { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
      `}</style>
    </div>
  );
}

export function Products() {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      id="products"
      ref={ref}
      style={{
        backgroundColor: "#141A22",
        padding: "120px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            marginBottom: "72px", direction: "rtl",
          }}
        >
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ width: "32px", height: "1.5px", backgroundColor: "#009245" }} />
              <span style={{ color: "#009245", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em" }}>منتجاتنا</span>
            </div>
            <h2 style={{
              fontSize: "clamp(30px, 3.8vw, 56px)",
              fontWeight: 700, color: "rgba(255,255,255,0.92)",
              lineHeight: 1.2, letterSpacing: "-0.025em",
            }}>
              حلول مبنية للأثر الحقيقي
            </h2>
          </div>
          <p style={{
            fontSize: "15px", color: "rgba(255,255,255,0.4)",
            lineHeight: 1.75, maxWidth: "320px", textAlign: "right",
          }}>
            ثلاثة منتجات متخصصة تعالج تحديات حقيقية في القطاع الحكومي والمؤسسي.
          </p>
        </motion.div>

        {/* TX360 — featured full-width */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            borderRadius: "24px",
            border: "1px solid rgba(0,146,69,0.18)",
            overflow: "hidden",
            marginBottom: "24px",
            position: "relative",
          }}
        >
          {/* Top accent bar */}
          <div style={{
            height: "3px",
            background: "linear-gradient(90deg, #009245 0%, rgba(0,146,69,0.2) 60%, transparent 100%)",
          }} />

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            direction: "rtl", minHeight: "420px",
          }}>
            {/* Text */}
            <div style={{
              padding: "56px 52px",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              backgroundColor: "#181E26",
              position: "relative", zIndex: 1,
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                  <span style={{
                    fontSize: "10px", fontWeight: 600, color: "#009245",
                    backgroundColor: "rgba(0,146,69,0.1)",
                    border: "1px solid rgba(0,146,69,0.2)",
                    padding: "4px 12px", borderRadius: "5px",
                    fontFamily: "monospace", letterSpacing: "0.06em",
                  }}>Gov-Tech</span>
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>تجربة التحول الشامل</span>
                </div>

                <h3 style={{
                  fontSize: "clamp(32px, 3.5vw, 52px)",
                  fontWeight: 700, color: "rgba(255,255,255,0.95)",
                  letterSpacing: "-0.03em", marginBottom: "10px", lineHeight: 1.1,
                }}>TX360.ai</h3>

                <p style={{
                  fontSize: "15px", fontWeight: 500, color: "#009245",
                  marginBottom: "24px",
                }}>منصة قياس وتحسين التحول الرقمي</p>

                <p style={{
                  fontSize: "16px", color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.8, marginBottom: "32px", maxWidth: "440px",
                }}>
                  منصة ذكاء اصطناعي متكاملة تُمكّن الجهات الحكومية من قياس تجربة المستفيد
                  بشكل شامل وتحسينها بذكاء — من كل نقطة اتصال إلى صورة كاملة.
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["قياس تجربة المستفيد ٣٦٠°", "تحليل ذكي لمسار الخدمة", "لوحات تنفيذية", "توصيات استباقية"].map((f, i) => (
                  <span key={i} style={{
                    fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.55)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "5px 12px", borderRadius: "6px",
                  }}>{f}</span>
                ))}
              </div>

              {/* TX360 CTA */}
              <div style={{ marginTop: "32px" }}>
                <Link
                  to="/tx360"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    fontSize: "14px", fontWeight: 600, color: "#FFFFFF",
                    backgroundColor: "#009245",
                    padding: "12px 24px", borderRadius: "10px",
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(0,146,69,0.3)",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#30B55C"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,146,69,0.45)"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#009245"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,146,69,0.3)"; }}
                >
                  استكشف TX360
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 9.5l-3-3 3-3M2 6.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Visual — clean dark bg + dot grid, NO photo */}
            <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#0F151C" }}>
              {/* Subtle radial glow */}
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at 50% 40%, rgba(0,146,69,0.1) 0%, transparent 65%)",
                pointerEvents: "none",
              }} />
              {/* Fine dot grid */}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}>
                <defs>
                  <pattern id="tx-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="12" cy="12" r="1" fill="#009245" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#tx-dots)" />
              </svg>
              {/* Dashboard overlay */}
              <div style={{
                position: "relative", zIndex: 1,
                padding: "40px",
                height: "100%", display: "flex", alignItems: "center",
              }}>
                <TX360Overlay inView={inView} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fintech + Kyan — side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", direction: "rtl" }}>
          {/* FINTECH */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.09)",
              overflow: "hidden",
              position: "relative",
              display: "flex", flexDirection: "column",
            }}
          >
            <div style={{ height: "2px", background: "linear-gradient(90deg, #1A73E8 0%, rgba(26,115,232,0.15) 60%, transparent 100%)" }} />
            <div style={{ padding: "36px 32px", backgroundColor: "#181E26", position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <span style={{
                  fontSize: "10px", fontWeight: 600, color: "#1A73E8",
                  backgroundColor: "rgba(26,115,232,0.1)",
                  border: "1px solid rgba(26,115,232,0.2)",
                  padding: "4px 10px", borderRadius: "5px",
                  fontFamily: "monospace", letterSpacing: "0.06em",
                }}>Fin-Tech</span>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>ذكاء مالي</span>
              </div>
              <h3 style={{
                fontSize: "clamp(24px, 2.5vw, 36px)",
                fontWeight: 700, color: "rgba(255,255,255,0.9)",
                letterSpacing: "-0.025em", marginBottom: "8px", lineHeight: 1.2,
              }}>Fintech App</h3>
              <p style={{ fontSize: "13px", fontWeight: 500, color: "#1A73E8", marginBottom: "16px" }}>تطبيق مالي مدعوم بالذكاء الاصطناعي</p>
              <p style={{
                fontSize: "14px", color: "rgba(255,255,255,0.45)",
                lineHeight: 1.75, marginBottom: "0",
              }}>حلول مالية ذكية تُمكّن الشمول المالي وتدعم اتخاذ القرارات الاقتصادية الصائبة — مبني على أسس الأمان والثقة وسهولة الوصول.</p>
            </div>
            {/* Visual — clean dark bg, NO photo */}
            <div style={{ flex: 1, position: "relative", minHeight: "260px", backgroundColor: "#0F151C" }}>
              {/* Subtle blue radial glow */}
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at 50% 50%, rgba(26,115,232,0.08) 0%, transparent 65%)",
                pointerEvents: "none",
              }} />
              {/* Horizontal line grid */}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}>
                <defs>
                  <pattern id="ft-lines" x="0" y="0" width="100%" height="20" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="20" x2="10000" y2="20" stroke="#1A73E8" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#ft-lines)" />
              </svg>
              <div style={{ position: "relative", zIndex: 1, padding: "28px 32px", height: "100%" }}>
                <FintechOverlay inView={inView} />
              </div>
            </div>
          </motion.div>

          {/* KYAN */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
            style={{
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.09)",
              overflow: "hidden",
              position: "relative",
              display: "flex", flexDirection: "column",
            }}
          >
            <div style={{ height: "2px", background: "linear-gradient(90deg, #7C3AED 0%, rgba(124,58,237,0.15) 60%, transparent 100%)" }} />
            <div style={{ padding: "36px 32px", backgroundColor: "#181E26", position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <span style={{
                  fontSize: "10px", fontWeight: 600, color: "#7C3AED",
                  backgroundColor: "rgba(124,58,237,0.1)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  padding: "4px 10px", borderRadius: "5px",
                  fontFamily: "monospace", letterSpacing: "0.06em",
                }}>Digital Humans</span>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>البشر الرقميون</span>
              </div>
              <h3 style={{
                fontSize: "clamp(24px, 2.5vw, 36px)",
                fontWeight: 700, color: "rgba(255,255,255,0.9)",
                letterSpacing: "-0.025em", marginBottom: "8px", lineHeight: 1.2,
              }}>Kyan Alam</h3>
              <p style={{ fontSize: "13px", fontWeight: 500, color: "#7C3AED", marginBottom: "16px" }}>كيان عالم — خبراؤك الرقميون</p>
              <p style={{
                fontSize: "14px", color: "rgba(255,255,255,0.45)",
                lineHeight: 1.75, marginBottom: "0",
              }}>منصة لبناء ونشر خبراء رقميين موثوقين يمثلون جهتك الحكومية أو المؤسسية — يتحدثون بلغة مستفيديك ويقدمون الخدمة بمصداقية.</p>
            </div>
            {/* Visual — clean dark bg, NO photo */}
            <div style={{ flex: 1, position: "relative", minHeight: "260px", backgroundColor: "#0F151C" }}>
              {/* Subtle purple radial glow */}
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at 50% 35%, rgba(124,58,237,0.09) 0%, transparent 65%)",
                pointerEvents: "none",
              }} />
              {/* Hex-like grid — offset dots */}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}>
                <defs>
                  <pattern id="ky-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                    <circle cx="16" cy="16" r="1" fill="#7C3AED" />
                    <circle cx="0" cy="0" r="1" fill="#7C3AED" />
                    <circle cx="32" cy="0" r="1" fill="#7C3AED" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#ky-grid)" />
              </svg>
              <div style={{ position: "relative", zIndex: 1, padding: "28px 32px", height: "100%" }}>
                <KyanOverlay />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}