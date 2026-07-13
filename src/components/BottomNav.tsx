"use client";

import { useState, useEffect } from "react";
import { X, Menu, MessageCircle } from "lucide-react";
import type { NavLink } from "@/lib/content";

interface Props {
  links: NavLink[];
  logoLine1: string;
  logoLine2: string;
  ctaLabel: string;
  whatsapp: string;
}

export default function BottomNav({ links, logoLine1, logoLine2, ctaLabel, whatsapp }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const linkHover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    const el = e.currentTarget;
    el.style.color = enter ? "#fff" : "#888";
    el.style.background = enter ? "rgba(255,255,255,0.06)" : "transparent";
  };

  return (
    <>
      {/* ── floating pill nav ── */}
      <nav
        aria-label="Navigazione principale"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          width: "calc(100% - 2rem)",
          maxWidth: "880px",
          background: "rgba(7,7,7,0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(232,160,32,0.18)",
          borderRadius: "100px",
          padding: "0.5rem 0.5rem 0.5rem 1.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: "flex", flexDirection: "column", lineHeight: 1, textDecoration: "none", flexShrink: 0 }}>
          <span className="nav-logo-line1" style={{ fontFamily: "var(--font-bebas)", fontSize: "0.95rem", letterSpacing: "0.14em", color: "var(--blue)" }}>
            {logoLine1}
          </span>
          <span className="nav-logo-line2" style={{ fontFamily: "var(--font-bebas)", fontSize: "0.58rem", letterSpacing: "0.28em", color: "#555", marginTop: "-1px" }}>
            {logoLine2}
          </span>
        </a>

        {/* Flex spacer — always pushes links+CTA+burger to the right */}
        <div style={{ flex: 1, minWidth: "0.5rem" }} />

        {/* Desktop links — hidden on mobile via CSS class */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "0.125rem", marginRight: "0.75rem" }}>
          {links.slice(0, 5).map((l) => (
            <a
              key={l.href}
              href={l.href}
              onMouseEnter={e => linkHover(e, true)}
              onMouseLeave={e => linkHover(e, false)}
              style={{
                fontSize: "0.72rem", fontWeight: 500, color: "#888",
                padding: "0.5rem 0.7rem", borderRadius: "100px",
                transition: "color 0.15s, background 0.15s",
                whiteSpace: "nowrap", fontFamily: "var(--font-jakarta)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
          style={{
            background: "var(--blue)", color: "#fff", borderRadius: "100px",
            padding: "0.65rem 1.2rem",
            fontFamily: "var(--font-bebas)", fontSize: "0.72rem", letterSpacing: "0.12em",
            display: "flex", alignItems: "center", gap: "0.35rem",
            flexShrink: 0, textDecoration: "none",
            transition: "background 0.2s, transform 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#6b96ff"; (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--blue)"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
        >
          <MessageCircle size={12} />
          <span className="nav-cta-label">{ctaLabel}</span>
        </a>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(true)}
          className="nav-burger"
          aria-label="Apri menu"
          style={{
            width: 40, height: 40, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "transparent", color: "#fff",
            cursor: "pointer", marginLeft: "0.625rem", flexShrink: 0,
            display: "none", alignItems: "center", justifyContent: "center",
          }}
        >
          <Menu size={16} />
        </button>
      </nav>

      {/* ── Mobile fullscreen overlay ── */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "#070707", display: "flex", flexDirection: "column",
        }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "1.5rem", borderBottom: "1px solid #1a1a1a",
          }}>
            <span style={{ fontFamily: "var(--font-bebas)", fontSize: "1rem", letterSpacing: "0.14em", color: "var(--blue)" }}>
              {logoLine1}
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Chiudi menu"
              style={{
                width: 40, height: 40, borderRadius: "50%",
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
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--blue)"; (e.currentTarget as HTMLElement).style.paddingLeft = "0.5rem"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.paddingLeft = "0"; }}
              >
                <span style={{ color: "var(--blue)", fontSize: "0.6em", marginRight: "0.5rem", opacity: 0.6 }}>
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
                letterSpacing: "0.1em", borderRadius: "100px",
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
