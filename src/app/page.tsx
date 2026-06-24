import { Metadata } from "next";
import {
  Phone, MessageCircle, Star, ArrowRight,
  Sparkles, Flame, Crown, Music, Zap, UtensilsCrossed, Bus, Car,
  Anchor, Ship, Bike, CircleDot, Target, Lock, Navigation, Trophy, Waves,
  type LucideIcon,
} from "lucide-react";
import { getContent } from "@/lib/content";
import type { Activity, PercheItem, Testimonial } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  Sparkles, Flame, Crown, Music, Zap, UtensilsCrossed, Bus, Car,
  Anchor, Ship, Bike, CircleDot, Target, Lock, Navigation, Trophy, Waves,
};

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

// ── Notturne card (portrait, for drag carousel) ──────────────────────────────

function NottCard({ icon, name, desc, price, href, tag }: Activity) {
  const Icon = ICONS[icon] ?? Sparkles;
  return (
    <a href={href} className="nott-card">
      {tag && (
        <span style={{
          position: "absolute", top: "1rem", right: "1rem",
          fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em",
          textTransform: "uppercase", padding: "0.25rem 0.6rem",
          borderRadius: "100px",
          background: "rgba(232,160,32,0.12)", color: "var(--gold)",
        }}>
          {tag}
        </span>
      )}

      <div style={{ marginBottom: "auto", color: "rgba(232,160,32,0.5)" }}>
        <Icon size={28} strokeWidth={1.25} />
      </div>

      <div style={{ marginTop: "auto" }}>
        <h3 style={{
          fontFamily: "var(--font-bebas)", fontSize: "1.6rem",
          letterSpacing: "0.04em", color: "#fff", lineHeight: 1.05,
          marginBottom: "0.5rem",
        }}>
          {name}
        </h3>
        <p style={{ fontSize: "0.78rem", lineHeight: 1.6, color: "#888", marginBottom: "1.25rem" }}>
          {desc}
        </p>
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "1rem",
          display: "flex", alignItems: "baseline", justifyContent: "space-between",
        }}>
          <span style={{
            fontFamily: "var(--font-bebas)", fontSize: "2rem",
            letterSpacing: "0.02em", color: "var(--gold)",
          }}>
            {price}
          </span>
          <span style={{
            fontSize: "0.65rem", letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#555",
            display: "flex", alignItems: "center", gap: "0.25rem",
          }}>
            Scopri <ArrowRight size={10} />
          </span>
        </div>
      </div>
    </a>
  );
}

// ── Pomeridiane card (variable height, for masonry) ───────────────────────────

function PomCard({ icon, name, desc, price, href, tag }: Activity) {
  const Icon = ICONS[icon] ?? Waves;
  return (
    <a href={href} className="pom-card masonry-item">
      {tag && (
        <span style={{
          fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em",
          textTransform: "uppercase", padding: "0.2rem 0.5rem",
          borderRadius: "100px",
          background: "rgba(0,196,179,0.1)", color: "#00C4B3",
          alignSelf: "flex-start",
        }}>
          {tag}
        </span>
      )}
      <div style={{ color: "rgba(0,196,179,0.5)" }}>
        <Icon size={24} strokeWidth={1.25} />
      </div>
      <h3 style={{
        fontFamily: "var(--font-bebas)", fontSize: "1.4rem",
        letterSpacing: "0.04em", color: "#fff", lineHeight: 1.1,
      }}>
        {name}
      </h3>
      <p style={{ fontSize: "0.78rem", lineHeight: 1.65, color: "#777" }}>{desc}</p>
      <span style={{
        fontFamily: "var(--font-bebas)", fontSize: "1.5rem",
        color: "#00C4B3", marginTop: "0.25rem",
      }}>
        {price}
      </span>
    </a>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

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
          CHAPTER 1 — HERO  #070707  electric gold LED matrix
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="chapter grain"
        style={{
          background: "#070707",
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

        {/* content above canvas */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1100px", width: "100%" }}>

          {/* Badge */}
          <div style={{ animation: "badge-in 0.7s cubic-bezier(0.33,1,0.68,1) 0.1s both" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.25em",
              textTransform: "uppercase", color: "var(--gold)",
              border: "1px solid rgba(232,160,32,0.25)",
              borderRadius: "100px", padding: "0.35rem 0.875rem",
              background: "rgba(232,160,32,0.05)",
              marginBottom: "2.5rem",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", animation: "pulse-border 2s ease infinite" }} />
              {c.hero.badge}
            </span>
          </div>

          {/* Massive headline */}
          <div style={{ animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>
            {/* Top line — small label */}
            <p style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              letterSpacing: "0.1em", color: "#aaa",
              lineHeight: 1, marginBottom: "-0.1em",
            }}>
              {c.hero.headline_line1}
            </p>

            {/* BARCELLONA — wall-to-wall */}
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

            {/* Accent line — italic counterpoint */}
            <p style={{
              fontFamily: "var(--font-jakarta)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(1.1rem, 3.5vw, 2.5rem)",
              color: "var(--gold)",
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
              lineHeight: 1.75, color: "#777",
              maxWidth: "42ch", marginTop: "2rem", marginBottom: "2.5rem",
            }}>
              {c.hero.subheadline}{" "}
              {c.hero.description}{" "}
              <strong style={{ color: "#ccc", fontWeight: 600 }}>{c.hero.description_strong}</strong>
            </p>
          </div>

          {/* CTAs */}
          <div style={{
            display: "flex", gap: "1rem", flexWrap: "wrap",
            animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s both",
          }}>
            <MagneticButton href="/notturne" style={{
              background: "var(--gold)", color: "#000",
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
                border: "1px solid rgba(255,255,255,0.18)", color: "#fff",
                fontFamily: "var(--font-bebas)", fontSize: "1rem",
                letterSpacing: "0.1em", padding: "1rem 2rem",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                textDecoration: "none",
                transition: "border-color 0.2s, background 0.2s",
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
          background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
          padding: "0.875rem 0", overflow: "hidden", zIndex: 2,
        }}>
          <div style={{
            display: "flex", gap: "3rem", whiteSpace: "nowrap",
            animation: "ticker 18s linear infinite",
          }}>
            {[...c.hero.trust_badges, ...c.hero.trust_badges, ...c.hero.trust_badges].map((b, i) => (
              <span key={i} style={{
                fontSize: "0.7rem", letterSpacing: "0.15em",
                textTransform: "uppercase", color: "#666",
                display: "flex", alignItems: "center", gap: "2rem",
                fontFamily: "var(--font-jakarta)", fontWeight: 500,
              }}>
                {b}
                <span style={{ color: "rgba(232,160,32,0.4)", fontSize: "0.5rem" }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CHAPTER 2 — NOTTURNE  blood red #0D0000  horizontal carousel
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="chapter chapter-notturne grain"
        style={{
          background: "linear-gradient(160deg, #120000 0%, #0A0000 60%, #0D0000 100%)",
          padding: "8rem 6vw",
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "20%", left: "10%",
          width: "40vw", height: "40vw",
          background: "radial-gradient(circle, rgba(180,0,0,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Section header */}
          <div style={{ marginBottom: "4rem" }}>
            <p style={{
              fontSize: "0.62rem", letterSpacing: "0.3em",
              textTransform: "uppercase", color: "rgba(255,80,80,0.6)",
              fontFamily: "var(--font-jakarta)", fontWeight: 600,
              marginBottom: "0.75rem",
            }}>
              {c.notturne.section_label}
            </p>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              <ChapterReveal>
                <h2
                  className="title-outlined"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(5rem, 15vw, 13rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 0.85,
                    margin: 0,
                  }}
                >
                  {c.notturne.section_title_accent}
                </h2>
              </ChapterReveal>

              <MagneticButton
                href={c.notturne.cta_all_href}
                style={{
                  border: "1px solid rgba(255,255,255,0.15)", color: "#fff",
                  fontFamily: "var(--font-bebas)", fontSize: "0.85rem",
                  letterSpacing: "0.1em", padding: "0.875rem 1.5rem",
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  textDecoration: "none", whiteSpace: "nowrap",
                  transition: "border-color 0.2s",
                  marginBottom: "1rem",
                }}
              >
                {c.notturne.cta_all} <ArrowRight size={14} />
              </MagneticButton>
            </div>
          </div>

          {/* Horizontal drag carousel */}
          <DragCarousel>
            {c.notturne.activities.map((act) => (
              <NottCard key={act.name} {...act} />
            ))}
          </DragCarousel>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CHAPTER 3 — POMERIDIANE  deep ocean #001520  masonry
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="chapter chapter-pomeridiane grain"
        style={{
          background: "linear-gradient(160deg, #001520 0%, #000D14 60%, #001018 100%)",
          padding: "8rem 6vw",
          position: "relative",
        }}
      >
        <div style={{
          position: "absolute", top: "30%", right: "5%",
          width: "35vw", height: "35vw",
          background: "radial-gradient(circle, rgba(0,196,179,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "4rem" }}>
            <p style={{
              fontSize: "0.62rem", letterSpacing: "0.3em",
              textTransform: "uppercase", color: "rgba(0,196,179,0.6)",
              fontFamily: "var(--font-jakarta)", fontWeight: 600,
              marginBottom: "0.75rem",
            }}>
              {c.pomeridiane.section_label}
            </p>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              <ChapterReveal>
                <h2
                  className="title-outlined"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(5rem, 15vw, 13rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 0.85,
                    margin: 0,
                    color: "transparent",
                  }}
                >
                  {c.pomeridiane.section_title_accent}
                </h2>
              </ChapterReveal>

              <MagneticButton
                href={c.pomeridiane.cta_all_href}
                style={{
                  border: "1px solid rgba(255,255,255,0.15)", color: "#fff",
                  fontFamily: "var(--font-bebas)", fontSize: "0.85rem",
                  letterSpacing: "0.1em", padding: "0.875rem 1.5rem",
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  textDecoration: "none", whiteSpace: "nowrap",
                  marginBottom: "1rem",
                }}
              >
                {c.pomeridiane.cta_all} <ArrowRight size={14} />
              </MagneticButton>
            </div>
          </div>

          <div className="masonry">
            {c.pomeridiane.activities.map((act) => (
              <PomCard key={act.name} {...act} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CHAPTER 4 — PERCHÉ NOI  pure black #000  editorial numbers
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="chapter"
        style={{ background: "#000", padding: "8rem 6vw" }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <ChapterReveal>
            <h2 style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(4rem, 12vw, 10rem)",
              letterSpacing: "-0.02em", lineHeight: 0.85,
              color: "var(--gold)", marginBottom: "4rem",
            }}>
              {c.perche.section_title_line1}
              <br />
              {c.perche.section_title_accent}?
            </h2>
          </ChapterReveal>

          <div>
            {c.perche.items.map((item: PercheItem, i: number) => (
              <StaggerReveal key={item.title} index={i}>
                <div className="perche-row">
                  <span className="perche-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ flex: 1, paddingTop: "0.5rem" }}>
                    <h3 style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                      letterSpacing: "0.04em", color: "#fff",
                      marginBottom: "0.625rem", lineHeight: 1,
                    }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "#666", maxWidth: "55ch" }}>
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
              border: "1px solid rgba(232,160,32,0.2)",
              background: "rgba(232,160,32,0.03)",
              display: "flex", alignItems: "center",
              gap: "1.5rem", flexWrap: "wrap",
            }}>
              <p style={{ flex: 1, fontSize: "0.875rem", lineHeight: 1.75, color: "#888", minWidth: "260px" }}>
                {c.perche.highlight_text}
              </p>
              <MagneticButton
                href={`https://wa.me/${c.site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "var(--gold)", color: "#000",
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
          CHAPTER 5 — TESTIMONIALS  #0F0F0F  quote fan
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="chapter grain"
        style={{ background: "#0F0F0F", padding: "8rem 6vw", position: "relative" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Giant quote mark */}
          <div style={{
            fontFamily: "Georgia, serif", fontSize: "clamp(8rem, 20vw, 18rem)",
            color: "var(--gold)", opacity: 0.12, lineHeight: 0.7,
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
              <span style={{ color: "var(--gold)" }}>{c.testimonials.section_title_accent}</span>
            </h2>
          </ChapterReveal>

          {/* Cards with rotation offsets — fan effect */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}>
            {c.testimonials.items.map((t: Testimonial, i: number) => (
              <StaggerReveal key={t.name} index={i}>
                <div
                  className="quote-card"
                  style={{
                    transform: `rotate(${[-1.5, 0.8, -0.5][i] ?? 0}deg)`,
                  }}
                >
                  <div style={{ display: "flex", gap: "2px", marginBottom: "1.25rem" }}>
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star key={s} size={12} fill="#E8A020" color="#E8A020" />
                    ))}
                  </div>
                  <p style={{
                    fontSize: "0.875rem", lineHeight: 1.8, color: "#bbb",
                    marginBottom: "1.5rem", fontStyle: "italic",
                  }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: "1rem" }}>
                    <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "#fff" }}>{t.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "#555", marginTop: "0.125rem" }}>{t.city}</p>
                  </div>
                </div>
              </StaggerReveal>
            ))}
          </div>

          {/* Ratings */}
          <ChapterReveal delay={300}>
            <div style={{
              display: "flex", alignItems: "center",
              gap: "2rem", marginTop: "3.5rem",
              flexWrap: "wrap",
            }}>
              <span style={{ fontSize: "0.75rem", color: "#444", letterSpacing: "0.1em" }}>
                <span style={{ color: "var(--gold)", fontWeight: 600 }}>{c.testimonials.rating_google}</span>
                {" "}su Google
              </span>
              <span style={{ width: 1, height: 16, background: "#2a2a2a" }} />
              <span style={{ fontSize: "0.75rem", color: "#444", letterSpacing: "0.1em" }}>
                <span style={{ color: "var(--gold)", fontWeight: 600 }}>{c.testimonials.rating_trustpilot}</span>
                {" "}su TrustPilot
              </span>
            </div>
          </ChapterReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CHAPTER 6 — CTA BANNER  full gold inversion  #E8A020
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="chapter"
        style={{
          background: "#E8A020",
          padding: "8rem 6vw 9rem",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Subtle texture lines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 40px)",
        }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={{
            fontSize: "0.65rem", letterSpacing: "0.35em",
            textTransform: "uppercase", color: "rgba(0,0,0,0.4)",
            fontFamily: "var(--font-jakarta)", fontWeight: 700,
            marginBottom: "1.5rem",
          }}>
            {c.cta_banner.label}
          </p>

          <ChapterReveal>
            <h2 style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(4.5rem, 16vw, 15rem)",
              letterSpacing: "-0.02em", lineHeight: 0.85,
              color: "#000", margin: 0,
            }}>
              {c.cta_banner.headline_line1}
              <br />
              {c.cta_banner.headline_accent}
            </h2>
          </ChapterReveal>

          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(0,0,0,0.55)", lineHeight: 1.75,
            maxWidth: "48ch", margin: "2rem 0 2.5rem",
          }}>
            Non esitare e contattaci:{" "}
            <strong style={{ color: "#000" }}>{c.cta_banner.description_strong}</strong>{" "}
            Siamo disponibili su WhatsApp e risponderemo in pochi minuti.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <MagneticButton
              href={`https://wa.me/${c.site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#000", color: "#E8A020",
                fontFamily: "var(--font-bebas)", fontSize: "1rem",
                letterSpacing: "0.1em", padding: "1.1rem 2rem",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                textDecoration: "none",
              }}
            >
              <MessageCircle size={16} />
              {c.cta_banner.cta_primary}
            </MagneticButton>

            <MagneticButton
              href={`tel:${c.site.phone}`}
              style={{
                border: "2px solid rgba(0,0,0,0.25)", color: "#000",
                fontFamily: "var(--font-bebas)", fontSize: "1rem",
                letterSpacing: "0.1em", padding: "1.1rem 2rem",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                textDecoration: "none",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              <Phone size={16} />
              {c.cta_banner.cta_secondary}
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FOOTER  #050505
      ════════════════════════════════════════════════════════════════ */}
      <footer style={{
        background: "#050505",
        borderTop: "1px solid #111",
        padding: "5rem 6vw 9rem",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            gap: "4rem",
            flexWrap: "wrap",
          }}>

            {/* Brand block */}
            <div>
              <div style={{ marginBottom: "1.25rem" }}>
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "1.5rem", letterSpacing: "0.15em",
                  color: "var(--gold)",
                }}>
                  {c.footer.logo_line1}
                </span>
                <span style={{
                  fontSize: "0.65rem", letterSpacing: "0.25em",
                  textTransform: "uppercase", color: "#444",
                }}>
                  {c.footer.logo_line2}
                </span>
              </div>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.75, color: "#555", maxWidth: "36ch" }}>
                {c.footer.description}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "1.25rem" }}>
                <a href={`https://wa.me/${c.site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="footer-contact-link">
                  <MessageCircle size={12} />{c.site.phone}
                </a>
                <a href={`mailto:${c.site.email}`} className="footer-contact-link">
                  {c.site.email}
                </a>
                <span style={{ fontSize: "0.78rem", color: "#333" }}>{c.site.address}</span>
              </div>
            </div>

            {/* Activity links */}
            <div>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.25rem", fontWeight: 600 }}>
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
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.25rem", fontWeight: 600 }}>
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
                <a key={l.href} href={l.href} className="footer-legal-link">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
