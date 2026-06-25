import { Metadata } from "next";
import {
  Phone, MessageCircle, Star, ArrowRight,
  Sparkles, Flame, Crown, Music, Zap, UtensilsCrossed, Bus, Car,
  Anchor, Ship, Bike, CircleDot, Target, Lock, Navigation, Trophy, Waves,
  type LucideIcon,
} from "lucide-react";
import { getContent } from "@/lib/content";
import type { Activity, PercheItem, Testimonial } from "@/lib/content";

import LEDGrid from "@/components/LEDGrid";
import MagneticButton from "@/components/MagneticButton";
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

// ── Service card — used for both notturne and pomeridiane ────────────────────

function ServiceCard({ icon, name, desc, price, href, tag }: Activity) {
  const Icon = ICONS[icon] ?? Sparkles;
  return (
    <a href={href} className="service-card">
      {tag && <span className="card-tag">{tag}</span>}
      <div className="card-icon">
        <Icon size={28} strokeWidth={1.2} />
      </div>
      <div style={{ marginTop: "auto" }}>
        <h3 className="card-name">{name}</h3>
        <p className="card-desc">{desc}</p>
        <div className="card-price">
          <span className="card-price-val">{price}</span>
          <ArrowRight size={14} style={{ color: "currentColor", opacity: 0.6 }} />
        </div>
      </div>
    </a>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const c = getContent();

  return (
    <div style={{ background: "var(--bg)", color: "#f0f0f0", overflowX: "hidden" }}>
      <BottomNav
        links={c.navbar.links}
        logoLine1={c.navbar.logo_line1}
        logoLine2={c.navbar.logo_line2}
        ctaLabel={c.navbar.cta_label}
        whatsapp={c.site.whatsapp}
      />

      {/* ════════════════════════════════════════════════════════════════
          HERO  — pure black, blue LED matrix
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="chapter grain"
        style={{
          background: "#000",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "6rem 6vw 10rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <LEDGrid />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "1100px", width: "100%" }}>

          {/* Badge */}
          <div style={{ animation: "badge-in 0.7s cubic-bezier(0.33,1,0.68,1) 0.1s both" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.25em",
              textTransform: "uppercase", color: "var(--blue)",
              border: "1px solid var(--blue-dim)",
              borderRadius: "100px", padding: "0.35rem 0.875rem",
              background: "var(--blue-dim2)",
              marginBottom: "2.5rem",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blue)", animation: "pulse-border 2s ease infinite" }} />
              {c.hero.badge}
            </span>
          </div>

          {/* Headline */}
          <div style={{ animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>
            <p style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              letterSpacing: "0.1em", color: "#555",
              lineHeight: 1, marginBottom: "-0.1em",
            }}>
              {c.hero.headline_line1}
            </p>
            <h1 style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(5rem, 19vw, 18rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.85,
              color: "#fff",
              margin: 0,
            }}>
              {c.hero.headline_line2.replace("A ", "")}
            </h1>
            <p style={{
              fontFamily: "var(--font-jakarta)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(1.1rem, 3.5vw, 2.5rem)",
              color: "var(--blue)",
              letterSpacing: "0.04em",
              marginTop: "0.5rem",
              paddingLeft: "0.2em",
            }}>
              — {c.hero.headline_accent}
            </p>
          </div>

          {/* Sub copy */}
          <div style={{ animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both" }}>
            <p style={{
              fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
              lineHeight: 1.75, color: "#666",
              maxWidth: "42ch", marginTop: "2rem", marginBottom: "2.5rem",
            }}>
              {c.hero.subheadline}{" "}
              <strong style={{ color: "#aaa", fontWeight: 600 }}>{c.hero.description}</strong>
            </p>
          </div>

          {/* CTAs */}
          <div style={{
            display: "flex", gap: "1rem", flexWrap: "wrap",
            animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s both",
          }}>
            <MagneticButton href="/notturne" style={{
              background: "var(--blue)", color: "#fff",
              fontFamily: "var(--font-bebas)", fontSize: "1rem",
              letterSpacing: "0.1em", padding: "1rem 2rem",
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              textDecoration: "none",
            }}>
              {c.hero.cta_primary} <ArrowRight size={16} />
            </MagneticButton>

            <MagneticButton
              href={`https://wa.me/${c.site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                border: "1px solid rgba(255,255,255,0.15)", color: "#fff",
                fontFamily: "var(--font-bebas)", fontSize: "1rem",
                letterSpacing: "0.1em", padding: "1rem 2rem",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                textDecoration: "none",
              }}
            >
              <MessageCircle size={16} />
              {c.hero.cta_secondary}
            </MagneticButton>
          </div>
        </div>

        {/* Bottom trust ticker */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          borderTop: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
          padding: "0.875rem 0", overflow: "hidden", zIndex: 2,
        }}>
          <div style={{
            display: "flex", gap: "3rem", whiteSpace: "nowrap",
            animation: "ticker 18s linear infinite",
          }}>
            {[...c.hero.trust_badges, ...c.hero.trust_badges, ...c.hero.trust_badges].map((b, i) => (
              <span key={i} style={{
                fontSize: "0.7rem", letterSpacing: "0.15em",
                textTransform: "uppercase", color: "#444",
                display: "flex", alignItems: "center", gap: "2rem",
                fontFamily: "var(--font-jakarta)", fontWeight: 500,
              }}>
                {b}
                <span style={{ color: "var(--blue)", fontSize: "0.5rem", opacity: 0.5 }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          NOTTURNE — 4-col service grid
      ════════════════════════════════════════════════════════════════ */}
      <section className="chapter" style={{ background: "#050505", padding: "7rem 6vw" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            <div>
              <p style={{
                fontSize: "0.62rem", letterSpacing: "0.3em",
                textTransform: "uppercase", color: "rgba(58,117,255,0.6)",
                fontFamily: "var(--font-jakarta)", fontWeight: 600,
                marginBottom: "0.5rem",
              }}>
                {c.notturne.section_label}
              </p>
              <ChapterReveal>
                <h2
                  className="title-outlined"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(4rem, 12vw, 10rem)",
                    letterSpacing: "-0.02em", lineHeight: 0.85, margin: 0,
                  }}
                >
                  {c.notturne.section_title_accent}
                </h2>
              </ChapterReveal>
            </div>

            <MagneticButton
              href={c.notturne.cta_all_href}
              style={{
                border: "1px solid rgba(58,117,255,0.3)", color: "var(--blue)",
                fontFamily: "var(--font-bebas)", fontSize: "0.85rem",
                letterSpacing: "0.1em", padding: "0.875rem 1.5rem",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                textDecoration: "none", marginBottom: "0.5rem",
              }}
            >
              {c.notturne.cta_all} <ArrowRight size={14} />
            </MagneticButton>
          </div>

          <div className="services-grid">
            {c.notturne.activities.map((act) => (
              <ServiceCard key={act.name} {...act} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          POMERIDIANE — 4-col service grid, slightly different bg
      ════════════════════════════════════════════════════════════════ */}
      <section className="chapter" style={{ background: "#020510", padding: "7rem 6vw" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            <div>
              <p style={{
                fontSize: "0.62rem", letterSpacing: "0.3em",
                textTransform: "uppercase", color: "rgba(58,117,255,0.6)",
                fontFamily: "var(--font-jakarta)", fontWeight: 600,
                marginBottom: "0.5rem",
              }}>
                {c.pomeridiane.section_label}
              </p>
              <ChapterReveal>
                <h2
                  className="title-outlined"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(4rem, 12vw, 10rem)",
                    letterSpacing: "-0.02em", lineHeight: 0.85, margin: 0,
                  }}
                >
                  {c.pomeridiane.section_title_accent}
                </h2>
              </ChapterReveal>
            </div>

            <MagneticButton
              href={c.pomeridiane.cta_all_href}
              style={{
                border: "1px solid rgba(58,117,255,0.3)", color: "var(--blue)",
                fontFamily: "var(--font-bebas)", fontSize: "0.85rem",
                letterSpacing: "0.1em", padding: "0.875rem 1.5rem",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                textDecoration: "none", marginBottom: "0.5rem",
              }}
            >
              {c.pomeridiane.cta_all} <ArrowRight size={14} />
            </MagneticButton>
          </div>

          <div className="services-grid">
            {c.pomeridiane.activities.map((act) => (
              <ServiceCard key={act.name} {...act} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          PERCHÉ NOI — editorial numbered list
      ════════════════════════════════════════════════════════════════ */}
      <section className="chapter" style={{ background: "#000", padding: "8rem 6vw" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>

          <ChapterReveal>
            <h2 style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(4rem, 12vw, 10rem)",
              letterSpacing: "-0.02em", lineHeight: 0.85,
              color: "var(--blue)", marginBottom: "4rem",
            }}>
              {c.perche.section_title_line1}
              <br />
              <span style={{ color: "#fff" }}>{c.perche.section_title_accent}?</span>
            </h2>
          </ChapterReveal>

          <div>
            {c.perche.items.map((item: PercheItem, i: number) => (
              <StaggerReveal key={item.title} index={i}>
                <div className="perche-row">
                  <span className="perche-num">{String(i + 1).padStart(2, "0")}</span>
                  <div style={{ flex: 1, paddingTop: "0.5rem" }}>
                    <h3 style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                      letterSpacing: "0.04em", color: "#fff",
                      marginBottom: "0.5rem", lineHeight: 1,
                    }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "#555", maxWidth: "55ch" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </StaggerReveal>
            ))}
          </div>

          {/* Highlight callout */}
          <ChapterReveal delay={400}>
            <div style={{
              marginTop: "3rem", padding: "2rem",
              border: "1px solid rgba(58,117,255,0.18)",
              background: "rgba(58,117,255,0.04)",
              display: "flex", alignItems: "center",
              gap: "1.5rem", flexWrap: "wrap",
            }}>
              <p style={{ flex: 1, fontSize: "0.875rem", lineHeight: 1.75, color: "#777", minWidth: "260px" }}>
                {c.perche.highlight_text}
              </p>
              <MagneticButton
                href={`https://wa.me/${c.site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "var(--blue)", color: "#fff",
                  fontFamily: "var(--font-bebas)", fontSize: "0.9rem",
                  letterSpacing: "0.1em", padding: "0.875rem 1.5rem",
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  textDecoration: "none", flexShrink: 0,
                }}
              >
                <MessageCircle size={14} />
                {c.perche.highlight_cta}
              </MagneticButton>
            </div>
          </ChapterReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          TESTIMONIALS — 4-col card grid
      ════════════════════════════════════════════════════════════════ */}
      <section className="chapter grain" style={{ background: "#050505", padding: "8rem 6vw", position: "relative" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Giant quote mark */}
          <div style={{
            fontFamily: "Georgia, serif", fontSize: "clamp(8rem, 20vw, 18rem)",
            color: "var(--blue)", opacity: 0.08, lineHeight: 0.7,
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

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}
            className="testimonials-grid"
          >
            {c.testimonials.items.map((t: Testimonial, i: number) => {
              const rotations = [-1.2, 0.6, -0.4, 1, -0.8, 0.5, -1, 0.7];
              return (
                <StaggerReveal key={t.name} index={i}>
                  <div className="quote-card" style={{ transform: `rotate(${rotations[i] ?? 0}deg)` }}>
                    <div style={{ display: "flex", gap: "2px", marginBottom: "1rem" }}>
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <Star key={s} size={10} fill="var(--blue)" color="var(--blue)" />
                      ))}
                    </div>
                    <p style={{ fontSize: "0.82rem", lineHeight: 1.75, color: "#bbb", marginBottom: "1.25rem", fontStyle: "italic" }}>
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "0.875rem" }}>
                      <p style={{ fontWeight: 600, fontSize: "0.82rem", color: "#fff" }}>{t.name}</p>
                      <p style={{ fontSize: "0.7rem", color: "#555", marginTop: "0.1rem" }}>{t.city}</p>
                    </div>
                  </div>
                </StaggerReveal>
              );
            })}
          </div>

          {/* Ratings */}
          <ChapterReveal delay={300}>
            <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: "3.5rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.75rem", color: "#444", letterSpacing: "0.1em" }}>
                <span style={{ color: "var(--blue)", fontWeight: 600 }}>{c.testimonials.rating_google}</span>
                {" "}su Google
              </span>
              <span style={{ width: 1, height: 16, background: "#1a1a1a" }} />
              <a
                href={c.testimonials.trustpilot_url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-link"
                style={{ fontSize: "0.75rem", letterSpacing: "0.1em", gap: "0.4rem" }}
              >
                <span style={{ color: "var(--blue)", fontWeight: 600 }}>{c.testimonials.rating_trustpilot}</span>
                {" "}su TrustPilot ↗
              </a>
            </div>
          </ChapterReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FOOTER  #050505
      ════════════════════════════════════════════════════════════════ */}
      <footer style={{
        background: "#030303",
        borderTop: "1px solid #0e0e0e",
        padding: "5rem 6vw 9rem",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            gap: "4rem",
          }}>

            {/* Brand block */}
            <div>
              <div style={{ marginBottom: "1.25rem" }}>
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "1.5rem", letterSpacing: "0.15em",
                  color: "var(--blue)",
                }}>
                  {c.footer.logo_line1}
                </span>
                <span style={{
                  fontSize: "0.65rem", letterSpacing: "0.25em",
                  textTransform: "uppercase", color: "#333",
                }}>
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
                <a href={`mailto:${c.site.email}`} className="footer-contact-link">
                  {c.site.email}
                </a>
                <span style={{ fontSize: "0.78rem", color: "#777" }}>{c.site.address}</span>
              </div>
            </div>

            {/* Activity links */}
            <div>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "1.25rem", fontWeight: 600 }}>
                Attività
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {c.footer.activity_links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="footer-link">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "1.25rem", fontWeight: 600 }}>
                Contatti
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[
                  { href: "/contattaci", label: "Contattaci", external: false },
                  { href: `https://wa.me/${c.site.whatsapp}`, label: "WhatsApp", external: true },
                  { href: `tel:${c.site.phone}`, label: c.site.phone, external: false },
                ].map((l) => (
                  <li key={l.href}>
                    <a href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                      className="footer-link"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: "1px solid #0e0e0e", marginTop: "4rem", paddingTop: "1.5rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "1rem",
          }}>
            <p style={{ fontSize: "0.72rem", color: "#333" }}>
              © {new Date().getFullYear()} {c.footer.copyright}
            </p>
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
