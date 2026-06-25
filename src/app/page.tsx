import { Metadata } from "next";
import {
  Phone, MessageCircle, Star, ArrowUpRight, ArrowRight,
  Sparkles, Flame, Crown, Music, Zap, UtensilsCrossed, Bus, Car,
  Anchor, Ship, Bike, CircleDot, Target, Lock, Navigation, Trophy, Waves,
  type LucideIcon,
} from "lucide-react";
import { getContent } from "@/lib/content";
import type { Activity, PercheItem, Testimonial } from "@/lib/content";

import LEDGrid from "@/components/LEDGrid";
import MagneticButton from "@/components/MagneticButton";
import DragCarousel from "@/components/DragCarousel";
import ChapterReveal from "@/components/ChapterReveal";
import StaggerReveal from "@/components/StaggerReveal";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Addio al Celibato Barcellona | Dal 2017 – Miglior Prezzo Garantito",
  description:
    "Organizziamo addii al celibato e al nubilato a Barcellona dal 2017. Strip show, discoteche, limousine, paddle surf e molto altro. Preventivo gratuito!",
  alternates: { canonical: "https://www.addioalcelibato-barcellona.it" },
};

const ICONS: Record<string, LucideIcon> = {
  Sparkles, Flame, Crown, Music, Zap, UtensilsCrossed, Bus, Car,
  Anchor, Ship, Bike, CircleDot, Target, Lock, Navigation, Trophy, Waves,
};

// ── Wave divider between sections ────────────────────────────────────────────

function Wave({ from, to, flip }: { from: string; to: string; flip?: boolean }) {
  return (
    <div style={{ background: from, lineHeight: 0, fontSize: 0, display: "block" }}>
      <svg
        viewBox="0 0 1440 70"
        style={{ display: "block", width: "100%", transform: flip ? "scaleX(-1)" : undefined }}
        preserveAspectRatio="none"
      >
        <path
          d="M0,10 C200,70 400,0 600,40 C800,70 1000,10 1200,50 C1320,70 1380,30 1440,20 L1440,70 L0,70 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}

// ── Portrait card — drag carousel ────────────────────────────────────────────

function PortraitCard({ icon, name, desc, price, href, tag, onBlue }: Activity & { onBlue?: boolean }) {
  const Icon = ICONS[icon] ?? Sparkles;
  return (
    <a href={href} className={`portrait-card ${onBlue ? "portrait-card-blue" : "portrait-card-dark"}`}>
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "auto" }}>
        {tag ? (
          <span style={{
            fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", padding: "0.25rem 0.65rem",
            border: `1px solid ${onBlue ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.15)"}`,
            borderRadius: "100px",
            color: onBlue ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.6)",
          }}>
            {tag}
          </span>
        ) : <span />}
        <ArrowUpRight size={16} style={{ color: onBlue ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.25)" }} />
      </div>

      {/* Center icon */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        color: onBlue ? "rgba(0,0,0,0.2)" : "rgba(58,117,255,0.25)",
      }}>
        <Icon size={80} strokeWidth={0.6} />
      </div>

      {/* Bottom */}
      <div>
        <h3 style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(1.6rem, 3vw, 2rem)",
          letterSpacing: "0.03em",
          color: onBlue ? "#000" : "#fff",
          lineHeight: 1.0,
          marginBottom: "0.75rem",
        }}>
          {name}
        </h3>
        <p style={{
          fontSize: "0.75rem", lineHeight: 1.6,
          color: onBlue ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.4)",
          marginBottom: "1rem",
        }}>
          {desc}
        </p>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: `1px solid ${onBlue ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.08)"}`,
          paddingTop: "0.75rem",
        }}>
          <span style={{
            fontFamily: "var(--font-bebas)", fontSize: "1.5rem",
            letterSpacing: "0.02em",
            color: onBlue ? "#000" : "var(--blue)",
          }}>
            {price}
          </span>
          <ArrowUpRight size={14} style={{ color: onBlue ? "rgba(0,0,0,0.4)" : "rgba(58,117,255,0.6)" }} />
        </div>
      </div>
    </a>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const c = getContent();

  return (
    <div style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>
      <BottomNav
        links={c.navbar.links}
        logoLine1={c.navbar.logo_line1}
        logoLine2={c.navbar.logo_line2}
        ctaLabel={c.navbar.cta_label}
        whatsapp={c.site.whatsapp}
      />

      {/* ════════════════════════════════════════════════════════════════
          HERO — BRIGHT BLUE background, massive white type
      ════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--blue)",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 6vw 5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* LED grid in blue — subtle on blue bg */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.12 }}>
          <LEDGrid />
        </div>

        {/* Decorative SVG squiggles */}
        <svg
          viewBox="0 0 300 200"
          style={{
            position: "absolute", top: "8%", right: "3%",
            width: "clamp(120px, 18vw, 260px)", opacity: 0.25, pointerEvents: "none",
          }}
          fill="none"
        >
          <path d="M20,100 C60,20 140,20 160,80 C180,140 260,140 280,80"
            stroke="#000" strokeWidth="14" strokeLinecap="round" />
          <path d="M10,140 C50,60 130,60 150,120 C170,180 250,180 270,120"
            stroke="#000" strokeWidth="8" strokeLinecap="round" opacity="0.5" />
        </svg>
        <svg
          viewBox="0 0 200 250"
          style={{
            position: "absolute", bottom: "15%", left: "2%",
            width: "clamp(80px, 12vw, 180px)", opacity: 0.2, pointerEvents: "none",
          }}
          fill="none"
        >
          <path d="M30,20 C20,80 80,120 60,180 C40,240 100,220 120,200"
            stroke="#000" strokeWidth="16" strokeLinecap="round" />
          <path d="M70,30 C60,90 120,130 100,190 C80,250 140,230 160,210"
            stroke="#000" strokeWidth="8" strokeLinecap="round" opacity="0.4" />
        </svg>

        {/* Rotating badge */}
        <div style={{
          position: "absolute", top: "8%", left: "6vw",
          width: 110, height: 110,
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "badge-in 0.7s cubic-bezier(0.33,1,0.68,1) 0.3s both",
        }}>
          <svg
            width="110" height="110" viewBox="0 0 110 110"
            style={{ position: "absolute", animation: "spin 10s linear infinite" }}
          >
            <path id="badge-ring" d="M55,8 a47,47 0 1,1 -0.01,0" fill="none" />
            <text fontSize="9.5" fontFamily="var(--font-jakarta)" fontWeight="700"
              letterSpacing="3.5" fill="rgba(0,0,0,0.55)">
              <textPath href="#badge-ring">BARCELLONA · DAL 2017 · ADDIO · CELIBATO ·</textPath>
            </text>
          </svg>
          <span style={{
            fontFamily: "var(--font-bebas)", fontSize: "1.1rem",
            letterSpacing: "0.08em", color: "rgba(0,0,0,0.7)",
          }}>
            2017
          </span>
        </div>

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 2, paddingTop: "12rem" }}>

          {/* Eyebrow */}
          <p style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(1rem, 3vw, 2rem)",
            letterSpacing: "0.12em",
            color: "rgba(0,0,0,0.45)",
            marginBottom: "-0.2em",
            animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both",
          }}>
            {c.hero.headline_line1}
          </p>

          {/* BARCELLONA — massive */}
          <h1 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(5.5rem, 20vw, 19rem)",
            letterSpacing: "-0.025em",
            lineHeight: 0.85,
            color: "#fff",
            margin: 0,
            animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both",
          }}>
            {c.hero.headline_line2.replace("A ", "")}
          </h1>

          {/* Divider row */}
          <div style={{
            display: "flex", alignItems: "center", gap: "2rem",
            margin: "2rem 0",
            animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both",
          }}>
            <div style={{ height: 1, flex: 1, background: "rgba(0,0,0,0.2)" }} />
            <p style={{
              fontFamily: "var(--font-jakarta)", fontStyle: "italic", fontWeight: 300,
              fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
              color: "rgba(0,0,0,0.6)", whiteSpace: "nowrap",
            }}>
              — {c.hero.headline_accent}
            </p>
            <div style={{ height: 1, flex: 1, background: "rgba(0,0,0,0.2)" }} />
          </div>

          {/* Sub + CTAs */}
          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            gap: "2rem", flexWrap: "wrap",
            animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s both",
          }}>
            <p style={{
              fontSize: "clamp(0.85rem, 1.6vw, 1rem)",
              lineHeight: 1.75, color: "rgba(0,0,0,0.55)",
              maxWidth: "42ch",
            }}>
              {c.hero.subheadline} {c.hero.description}
            </p>

            <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0, flexWrap: "wrap" }}>
              <MagneticButton
                href={`https://wa.me/${c.site.whatsapp}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  background: "#000", color: "#fff",
                  fontFamily: "var(--font-bebas)", fontSize: "0.95rem",
                  letterSpacing: "0.1em", padding: "0.9rem 1.75rem",
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  textDecoration: "none",
                }}
              >
                <MessageCircle size={15} /> {c.hero.cta_secondary}
              </MagneticButton>
              <MagneticButton
                href="/notturne"
                style={{
                  border: "2px solid rgba(0,0,0,0.3)", color: "rgba(0,0,0,0.7)",
                  fontFamily: "var(--font-bebas)", fontSize: "0.95rem",
                  letterSpacing: "0.1em", padding: "0.9rem 1.75rem",
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  textDecoration: "none",
                }}
              >
                {c.hero.cta_primary} <ArrowRight size={15} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Wave: blue → black */}
      <Wave from="var(--blue)" to="#000" />

      {/* ════════════════════════════════════════════════════════════════
          NOTTURNE — black bg, horizontal portrait scroll
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#000", padding: "5rem 0 6rem" }}>
        <div style={{ padding: "0 6vw", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
            <div>
              <p style={{
                fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase",
                color: "var(--blue)", fontFamily: "var(--font-jakarta)", fontWeight: 700,
                marginBottom: "0.5rem",
              }}>
                {c.notturne.section_label}
              </p>
              <ChapterReveal>
                <h2 style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(4rem, 12vw, 10rem)",
                  letterSpacing: "-0.02em", lineHeight: 0.85,
                  color: "#fff", margin: 0,
                }}>
                  {c.notturne.section_title_accent}
                </h2>
              </ChapterReveal>
            </div>
            <a href={c.notturne.cta_all_href} style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "var(--font-bebas)", fontSize: "0.85rem", letterSpacing: "0.1em",
              color: "var(--blue)", textDecoration: "none",
              border: "1px solid rgba(58,117,255,0.3)", padding: "0.75rem 1.25rem",
              marginBottom: "0.5rem", transition: "border-color 0.2s",
            }}>
              {c.notturne.cta_all} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <DragCarousel>
          {c.notturne.activities.map((act, i) => (
            <div key={act.name} style={{ paddingLeft: i === 0 ? "6vw" : 0, paddingRight: i === c.notturne.activities.length - 1 ? "6vw" : 0 }}>
              <PortraitCard {...act} onBlue={false} />
            </div>
          ))}
        </DragCarousel>
      </section>

      {/* Wave: black → blue */}
      <Wave from="#000" to="var(--blue)" flip />

      {/* ════════════════════════════════════════════════════════════════
          POMERIDIANE — BLUE bg, dark portrait cards
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--blue)", padding: "5rem 0 6rem" }}>
        <div style={{ padding: "0 6vw", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
            <div>
              <p style={{
                fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase",
                color: "rgba(0,0,0,0.5)", fontFamily: "var(--font-jakarta)", fontWeight: 700,
                marginBottom: "0.5rem",
              }}>
                {c.pomeridiane.section_label}
              </p>
              <ChapterReveal>
                <h2 style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(4rem, 12vw, 10rem)",
                  letterSpacing: "-0.02em", lineHeight: 0.85,
                  color: "#fff", margin: 0,
                }}>
                  {c.pomeridiane.section_title_accent}
                </h2>
              </ChapterReveal>
            </div>
            <a href={c.pomeridiane.cta_all_href} style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "var(--font-bebas)", fontSize: "0.85rem", letterSpacing: "0.1em",
              color: "#000", textDecoration: "none",
              border: "2px solid rgba(0,0,0,0.25)", padding: "0.75rem 1.25rem",
              marginBottom: "0.5rem",
            }}>
              {c.pomeridiane.cta_all} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <DragCarousel>
          {c.pomeridiane.activities.map((act, i) => (
            <div key={act.name} style={{ paddingLeft: i === 0 ? "6vw" : 0, paddingRight: i === c.pomeridiane.activities.length - 1 ? "6vw" : 0 }}>
              <PortraitCard {...act} onBlue />
            </div>
          ))}
        </DragCarousel>
      </section>

      {/* Wave: blue → black */}
      <Wave from="var(--blue)" to="#000" />

      {/* ════════════════════════════════════════════════════════════════
          PERCHÉ NOI — black, full-width tool rows
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#000", padding: "6rem 6vw 7rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Header row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "3rem", marginBottom: "4rem", flexWrap: "wrap" }}>
            <ChapterReveal>
              <h2 style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(4rem, 12vw, 10rem)",
                letterSpacing: "-0.02em", lineHeight: 0.85,
                color: "#fff", margin: 0,
              }}>
                {c.perche.section_title_line1}
                <br />
                <span style={{ color: "var(--blue)" }}>{c.perche.section_title_accent}?</span>
              </h2>
            </ChapterReveal>

            <p style={{
              fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
              lineHeight: 1.8, color: "rgba(255,255,255,0.4)",
              maxWidth: "36ch", paddingTop: "0.5rem",
            }}>
              {c.perche.highlight_text}
            </p>
          </div>

          {/* Tool rows */}
          {c.perche.items.map((item: PercheItem, i: number) => (
            <StaggerReveal key={item.title} index={i}>
              <div className="tool-row">
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase",
                    color: "var(--blue)", fontWeight: 700, marginBottom: "0.4rem",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(1.6rem, 4vw, 3rem)",
                    letterSpacing: "0.03em", color: "#fff",
                    lineHeight: 1, marginBottom: "0.5rem",
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(255,255,255,0.35)", maxWidth: "60ch" }}>
                    {item.desc}
                  </p>
                </div>
                <ArrowUpRight size={22} className="tool-arrow" />
              </div>
            </StaggerReveal>
          ))}

          {/* CTA row at bottom */}
          <div style={{ marginTop: "3rem", display: "flex", gap: "1rem" }}>
            <MagneticButton
              href={`https://wa.me/${c.site.whatsapp}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                background: "var(--blue)", color: "#fff",
                fontFamily: "var(--font-bebas)", fontSize: "0.95rem",
                letterSpacing: "0.1em", padding: "1rem 2rem",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                textDecoration: "none",
              }}
            >
              <MessageCircle size={15} /> {c.perche.highlight_cta}
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          TESTIMONIALS — slightly blue-tinted dark bg
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#030712", padding: "7rem 6vw" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div style={{
            fontFamily: "Georgia, serif", fontSize: "clamp(8rem, 20vw, 16rem)",
            color: "var(--blue)", opacity: 0.07, lineHeight: 0.7,
            userSelect: "none", marginBottom: "-1rem",
          }}>
            &ldquo;
          </div>

          <ChapterReveal>
            <h2 style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              letterSpacing: "-0.01em", lineHeight: 0.9,
              color: "#fff", marginBottom: "4rem",
            }}>
              {c.testimonials.section_title_line1}
              <br />
              <span style={{ color: "var(--blue)" }}>{c.testimonials.section_title_accent}</span>
            </h2>
          </ChapterReveal>

          <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            {c.testimonials.items.map((t: Testimonial, i: number) => {
              const rots = [-1.2, 0.6, -0.4, 1, -0.8, 0.5, -1, 0.7];
              return (
                <StaggerReveal key={t.name} index={i}>
                  <div className="quote-card" style={{ transform: `rotate(${rots[i] ?? 0}deg)` }}>
                    <div style={{ display: "flex", gap: "2px", marginBottom: "1rem" }}>
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <Star key={s} size={10} fill="var(--blue)" color="var(--blue)" />
                      ))}
                    </div>
                    <p style={{ fontSize: "0.82rem", lineHeight: 1.75, color: "#aaa", marginBottom: "1.25rem", fontStyle: "italic" }}>
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "0.875rem" }}>
                      <p style={{ fontWeight: 600, fontSize: "0.82rem", color: "#fff" }}>{t.name}</p>
                      <p style={{ fontSize: "0.7rem", color: "#444", marginTop: "0.1rem" }}>{t.city}</p>
                    </div>
                  </div>
                </StaggerReveal>
              );
            })}
          </div>

          <ChapterReveal delay={300}>
            <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: "3.5rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.75rem", color: "#444", letterSpacing: "0.1em" }}>
                <span style={{ color: "var(--blue)", fontWeight: 600 }}>{c.testimonials.rating_google}</span>
                {" "}su Google
              </span>
              <span style={{ width: 1, height: 16, background: "#1a1a1a" }} />
              <a href={c.testimonials.trustpilot_url} target="_blank" rel="noopener noreferrer"
                className="footer-contact-link" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>
                <span style={{ color: "var(--blue)", fontWeight: 600 }}>{c.testimonials.rating_trustpilot}</span>
                {" "}su TrustPilot ↗
              </a>
            </div>
          </ChapterReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════════ */}
      <footer style={{ background: "#000", borderTop: "1px solid #0e0e0e", padding: "5rem 6vw 9rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "4rem" }}>

            <div>
              <div style={{ marginBottom: "1.25rem" }}>
                <span style={{ display: "block", fontFamily: "var(--font-bebas)", fontSize: "1.5rem", letterSpacing: "0.15em", color: "var(--blue)" }}>
                  {c.footer.logo_line1}
                </span>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#333" }}>
                  {c.footer.logo_line2}
                </span>
              </div>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.75, color: "#aaa", maxWidth: "36ch" }}>
                {c.footer.description}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "1.25rem" }}>
                <a href={`https://wa.me/${c.site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="footer-contact-link">
                  <MessageCircle size={12} />{c.site.phone}
                </a>
                <a href={`mailto:${c.site.email}`} className="footer-contact-link">{c.site.email}</a>
                <span style={{ fontSize: "0.78rem", color: "#555" }}>{c.site.address}</span>
              </div>
            </div>

            <div>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "1.25rem", fontWeight: 600 }}>Attività</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {c.footer.activity_links.map((l) => (
                  <li key={l.href}><a href={l.href} className="footer-link">{l.label}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "1.25rem", fontWeight: 600 }}>Contatti</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[
                  { href: "/contattaci", label: "Contattaci", external: false },
                  { href: `https://wa.me/${c.site.whatsapp}`, label: "WhatsApp", external: true },
                  { href: `tel:${c.site.phone}`, label: c.site.phone, external: false },
                ].map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined} className="footer-link">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #0e0e0e", marginTop: "4rem", paddingTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontSize: "0.72rem", color: "#333" }}>© {new Date().getFullYear()} {c.footer.copyright}</p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {c.footer.legal_links.map((l) => (
                <a key={l.href} href={l.href} className="footer-legal-link">{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
