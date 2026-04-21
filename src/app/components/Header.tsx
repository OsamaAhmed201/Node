import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { AlAgentsLogo } from "./AlAgentsLogo";

const navItems = [
  { label: "الرئيسية", href: "#hero" },
  { label: "من نحن", href: "#about" },
  { label: "مساراتنا", href: "#tracks" },
  { label: "منتجاتنا", href: "#products" },
  { label: "لماذا نحن", href: "#why" },
];

const fontStack = "'Rubik', 'IBM Plex Sans Arabic', sans-serif";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, right: 0, left: 0, zIndex: 100,
          transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          backgroundColor: scrolled ? "rgba(11,15,20,0.88)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          {/*
            RTL layout using direction: rtl — no flex hacks.
            DOM order:  Logo → Nav → CTA
            Visual order (RTL): Logo (right) → Nav (center) → CTA (left)
          */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "70px",
            direction: "rtl",
          }}>

            {/* ── Logo — rightmost (first in RTL flow) ── */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <AlAgentsLogo height={28} />
            </a>

            {/* ── Desktop Nav — center, flows right→left ── */}
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                direction: "rtl",
              }}
              className="hidden md:flex"
            >
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.5)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    transition: "all 0.2s ease",
                    fontFamily: fontStack,
                    letterSpacing: "0",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.92)";
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* ── CTA + Mobile toggle — leftmost (last in RTL flow) ── */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              direction: "rtl",
            }}>
              {/* CTA Button */}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                className="hidden sm:inline-flex"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  backgroundColor: "#009245",
                  border: "none",
                  cursor: "pointer",
                  padding: "9px 22px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  transition: "all 0.25s ease",
                  boxShadow: "0 2px 12px rgba(0,146,69,0.3)",
                  fontFamily: fontStack,
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#30B55C";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(48,181,92,0.45)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#009245";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,146,69,0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                تواصل معنا
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden"
                style={{
                  background: "none",
                  border: "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer",
                  padding: "8px",
                  color: "rgba(255,255,255,0.7)",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,146,69,0.3)";
                  e.currentTarget.style.color = "#009245";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                }}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: "70px",
              right: 0,
              left: 0,
              zIndex: 99,
              backgroundColor: "rgba(11,15,20,0.97)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "20px 24px 28px",
              direction: "rtl",
            }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.045 }}
                onClick={() => handleNavClick(item.href)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "right",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.75)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "14px 0",
                  fontFamily: fontStack,
                  borderBottom: i < navItems.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#009245";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                }}
              >
                {item.label}
              </motion.button>
            ))}

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              style={{
                display: "block",
                textAlign: "center",
                fontSize: "15px",
                fontWeight: 600,
                color: "#FFFFFF",
                backgroundColor: "#009245",
                padding: "14px 24px",
                borderRadius: "10px",
                textDecoration: "none",
                marginTop: "18px",
                fontFamily: fontStack,
              }}
            >
              تواصل معنا
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}