"use client";

import { useState, useEffect } from "react";
import { X, Menu, MessageCircle, ChevronDown } from "lucide-react";
import type { NavLink } from "@/lib/content";

// Scalloped bottle-cap path for 120×120 viewBox
function makeScallop(cx: number, cy: number, rAvg: number, amp: number, n: number) {
  const steps = n * 16;
  const f = (v: number) => v.toFixed(2);
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const theta = (2 * Math.PI * i) / steps - Math.PI / 2;
    const r = rAvg + amp * Math.cos(n * (theta + Math.PI / 2));
    d += (i === 0 ? "M" : " L") + f(cx + r * Math.cos(theta)) + "," + f(cy + r * Math.sin(theta));
  }
  return d + "Z";
}
const CAP_PATH = makeScallop(60, 60, 50, 4, 14);

interface Props {
  links: NavLink[];
  logoLine1: string;
  logoLine2: string;
  ctaLabel: string;
  whatsapp: string;
}

export default function BottomNav({ links, logoLine1, logoLine2, ctaLabel, whatsapp }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 60);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const toggleExpand = (label: string) => {
    setExpanded(prev => prev === label ? null : label);
  };

  return (
    <>
      {/* ── Top header ── */}
      <header
        aria-label="Navigazione principale"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: scrolled ? "64px" : "80px",
          background: scrolled ? "var(--blue)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: "none",
          transition: "height 0.3s ease, background 0.3s ease",
          display: "flex",
          alignItems: "center",
          padding: "0 6vw",
          gap: "1rem",
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
          <div
            className={`nav-logo-wrapper${scrolled ? " nav-logo-scrolled" : ""}`}
            style={{
              position: "relative",
              width: scrolled ? 52 : 68,
              height: scrolled ? 52 : 68,
              transition: "width 0.35s ease, height 0.35s ease",
            }}
          >
            <svg
              viewBox="0 0 120 120"
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                animation: "spin 16s linear infinite",
                opacity: scrolled ? 0 : 1,
                transition: "opacity 0.3s ease",
                pointerEvents: "none",
              }}
            >
              <path d={CAP_PATH} fill="#fff" />
            </svg>
            <img
              src="https://addioalcelibato-barcellona.it/wp-content/uploads/2017/02/logoaddioalcelibatoblancohori2-1.png"
              alt="Addio al Celibato Barcellona"
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: scrolled ? "90%" : "60%",
                height: "auto",
                transition: "width 0.35s ease",
                filter: scrolled ? "brightness(0) invert(1)" : "brightness(0)",
              }}
            />
          </div>
        </a>

        {/* Center links */}
        <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: "0.25rem", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {links.slice(0, 5).map((l) => (
            <a key={l.href} href={l.href} className="nav-link-item">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* CTA */}
        <a href="/addio-al-celibato-barcellona-contatti" className="nav-cta">
          <span className="nav-cta-label">PREVENTIVO GRATIS</span>
        </a>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(true)}
          className="nav-burger"
          aria-label="Apri menu"
          style={{
            width: 40, height: 40, borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "transparent", color: "#fff",
            cursor: "pointer", flexShrink: 0,
            display: "none", alignItems: "center", justifyContent: "center",
          }}
        >
          <Menu size={18} />
        </button>
      </header>

      {/* ── Mobile fullscreen overlay ── */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "#070707", display: "flex", flexDirection: "column",
          overflowY: "auto",
        }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "1.25rem 1.5rem", borderBottom: "1px solid #1a1a1a",
            position: "sticky", top: 0, background: "#070707", zIndex: 1,
          }}>
            <span style={{ fontFamily: "var(--font-bebas)", fontSize: "1rem", letterSpacing: "0.14em", color: "#fff" }}>
              {logoLine1}
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Chiudi menu"
              style={{
                width: 40, height: 40, borderRadius: "8px",
                border: "1px solid #2a2a2a", background: "transparent",
                color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <X size={16} />
            </button>
          </div>

          <nav style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 2rem" }}>
            {links.map((link) => {
              const hasChildren = link.children && link.children.length > 0;
              const isExpanded = expanded === link.label;

              return (
                <div key={link.href}>
                  {/* Main link row */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: isExpanded ? "none" : "1px solid #1a1a1a",
                  }}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      style={{
                        flex: 1,
                        fontFamily: "var(--font-bebas)",
                        fontSize: "clamp(2.2rem, 9vw, 3.5rem)",
                        lineHeight: 1.1, letterSpacing: "0.05em",
                        color: "#fff", padding: "0.55rem 0",
                        textDecoration: "none", display: "block",
                        transition: "color 0.15s",
                      }}
                    >
                      {link.label}
                    </a>
                    {hasChildren && (
                      <button
                        onClick={() => toggleExpand(link.label)}
                        aria-label={isExpanded ? "Chiudi" : "Espandi"}
                        style={{
                          background: "transparent", border: "none",
                          color: isExpanded ? "var(--blue)" : "rgba(255,255,255,0.4)",
                          cursor: "pointer", padding: "0.5rem",
                          display: "flex", alignItems: "center",
                          transition: "color 0.2s, transform 0.25s",
                          transform: isExpanded ? "rotate(180deg)" : "none",
                        }}
                      >
                        <ChevronDown size={22} />
                      </button>
                    )}
                  </div>

                  {/* Sub-links accordion */}
                  {hasChildren && isExpanded && (
                    <div style={{
                      borderBottom: "1px solid #1a1a1a",
                      paddingBottom: "0.5rem",
                      marginBottom: "0",
                    }}>
                      {link.children!.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          style={{
                            display: "block",
                            padding: "0.5rem 0 0.5rem 1.25rem",
                            fontFamily: "var(--font-bebas)",
                            fontSize: "1.1rem",
                            letterSpacing: "0.08em",
                            color: "rgba(255,255,255,0.65)",
                            textDecoration: "none",
                            borderLeft: "2px solid var(--blue)",
                            marginLeft: "0.25rem",
                            marginBottom: "0.15rem",
                            transition: "color 0.15s",
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div style={{ padding: "2rem" }}>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mobile-menu-cta"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "0.5rem", width: "100%", padding: "1.1rem",
                background: "#fff", color: "var(--blue)",
                fontFamily: "var(--font-bebas)", fontSize: "1.1rem",
                letterSpacing: "0.1em", borderRadius: 0,
                textDecoration: "none", border: "2px solid #fff",
              }}
            >
              <MessageCircle size={18} />
              {ctaLabel}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
