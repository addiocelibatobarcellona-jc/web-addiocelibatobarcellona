"use client";

import { useState, useEffect } from "react";
import { X, Menu, MessageCircle } from "lucide-react";
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

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 60);
    check(); // set immediately on mount (handles page-load already scrolled)
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
          padding: "0 2vw",
          gap: "1rem",
        }}
      >
        {/* Logo — bottle-cap badge (spins when at top, static when scrolled) */}
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
          <div style={{
            position: "relative",
            width: scrolled ? 44 : 68,
            height: scrolled ? 44 : 68,
            transition: "width 0.35s ease, height 0.35s ease",
          }}>
            {/* Spinning scalloped bottle-cap — visible only at top */}
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
            {/* Static logo — always centered */}
            <img
              src="https://addioalcelibato-barcellona.it/wp-content/uploads/2017/02/logoaddioalcelibatoblancohori2-1.png"
              alt="Addio al Celibato Barcellona"
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: scrolled ? "90%" : "48%",
                height: "auto",
                transition: "width 0.35s ease",
                filter: "brightness(0) invert(1)",
              }}
            />
          </div>
        </a>

        {/* Center links */}
        <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: "0.25rem", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {links.slice(0, 5).map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontSize: "0.78rem", fontWeight: 500, color: "rgba(255,255,255,0.85)",
                padding: "0.45rem 0.85rem", borderRadius: "6px",
                border: 0,
                transition: "color 0.15s, background 0.15s",
                whiteSpace: "nowrap", fontFamily: "var(--font-jakarta)",
                textDecoration: "none",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#fff"; el.style.background = "rgba(255,255,255,0.15)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.85)"; el.style.background = "transparent"; }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Spacer — pushes CTA to right */}
        <div style={{ flex: 1 }} />

        {/* CTA — right */}
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
          style={{
            background: "#fff", color: "var(--blue)",
            borderRadius: "6px",
            border: 0,
            padding: "0.55rem 1.2rem",
            fontFamily: "var(--font-bebas)", fontSize: "0.82rem", letterSpacing: "0.1em",
            display: "flex", alignItems: "center", gap: "0.4rem",
            flexShrink: 0, textDecoration: "none",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
        >
          <MessageCircle size={13} />
          <span className="nav-cta-label">{ctaLabel}</span>
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
        }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "1.25rem 1.5rem", borderBottom: "1px solid #1a1a1a",
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

          <nav style={{
            flex: 1, display: "flex", flexDirection: "column",
            justifyContent: "center", padding: "0 2rem", gap: 0,
          }}>
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(2.2rem, 9vw, 3.5rem)",
                  lineHeight: 1.1, letterSpacing: "0.05em",
                  color: "#fff", padding: "0.55rem 0",
                  borderBottom: "1px solid #1a1a1a",
                  textDecoration: "none", display: "block",
                  transition: "color 0.15s, padding-left 0.2s",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--blue)"; el.style.paddingLeft = "0.5rem"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#fff"; el.style.paddingLeft = "0"; }}
              >
                <span style={{ color: "var(--blue)", fontSize: "0.6em", marginRight: "0.5rem", opacity: 0.5 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </a>
            ))}
          </nav>

          <div style={{ padding: "2rem" }}>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "0.5rem", width: "100%", padding: "1.1rem",
                background: "var(--blue)", color: "#fff",
                fontFamily: "var(--font-bebas)", fontSize: "1.1rem",
                letterSpacing: "0.1em", borderRadius: "10px",
                textDecoration: "none",
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
