import { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Phone, ArrowUpRight, ArrowRight,
  Sparkles, Flame, Crown, Music, Zap, UtensilsCrossed, Bus, Car,
  Anchor, Ship, Bike, CircleDot, Target, Lock, Navigation, Trophy, Waves,
  MapPin, Headphones,
  type LucideIcon,
} from "lucide-react";
import { getContent } from "@/lib/content";
import type { Activity, PercheItem } from "@/lib/content";

import LEDGrid from "@/components/LEDGrid";
import MagneticButton from "@/components/MagneticButton";
const DragCarousel = dynamic(() => import("@/components/DragCarousel"));
const StaggerReveal = dynamic(() => import("@/components/StaggerReveal"));
import BottomNav from "@/components/BottomNav";
import SiteFooter from "@/components/SiteFooter";

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

// ── Scalloped badge path ──────────────────────────────────────────────────────
// Sinusoidal polar curve: R(θ) = rAvg + amplitude·cos(n·θ)
// Dense polyline → perfectly smooth, no kinks anywhere.

function makeScallop(cx: number, cy: number, rAvg: number, amplitude: number, n: number): string {
  const steps = n * 16; // 16 segments per bump = visually smooth
  const f = (v: number) => v.toFixed(2);
  let d = "";
  for (let i = 0; i <= steps; i++) {
    // θ starts at -π/2 (top). cos(n·(θ+π/2)) = 1 at top → peak at top.
    const theta = (2 * Math.PI * i) / steps - Math.PI / 2;
    const r = rAvg + amplitude * Math.cos(n * (theta + Math.PI / 2));
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    d += i === 0 ? `M${f(x)},${f(y)}` : ` L${f(x)},${f(y)}`;
  }
  return d + "Z";
}

const SCALLOP_PATH = makeScallop(130, 130, 107, 9, 14);

// ── Wave divider between sections ────────────────────────────────────────────

function Wave({ from, to, flip }: { from: string; to: string; flip?: boolean }) {
  return (
    <div style={{ background: from, lineHeight: 0, fontSize: 0, display: "block" }}>
      <svg
        viewBox="0 0 1440 70"
        height="60"
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

function PortraitCard({ icon, name, desc, price, href, tag, onBlue, image }: Activity & { onBlue?: boolean }) {
  const Icon = ICONS[icon] ?? Sparkles;
  const hasImage = !!image;

  return (
    <a
      href={href}
      className={`portrait-card ${onBlue ? "portrait-card-blue" : "portrait-card-dark"}`}
    >
      {/* Background image via next/image — automatic WebP + lazy load */}
      {hasImage && (
        <Image
          src={image!}
          alt={name}
          fill
          sizes="(max-width: 640px) calc(100vw - 3rem), 280px"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      )}
      {/* Dark gradient overlay when image is present */}
      {hasImage && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.88) 100%)",
        }} />
      )}

      {/* All content above the overlay */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>

        {/* Top row — arrow only */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "auto" }}>
          <ArrowUpRight size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
        </div>

        {/* Center icon — hidden when image */}
        {!hasImage && (
          <div style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            color: onBlue ? "rgba(0,0,0,0.2)" : "rgba(58,117,255,0.25)",
          }}>
            <Icon size={80} strokeWidth={0.6} />
          </div>
        )}

        {/* Spacer when image is present */}
        {hasImage && <div style={{ flex: 1 }} />}

        {/* Bottom */}
        <div>
          <h3 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(1.6rem, 3vw, 2rem)",
            letterSpacing: "0.03em",
            color: "#fff",
            lineHeight: 1.0,
            marginBottom: tag ? "0.5rem" : "0.75rem",
          }}>
            {name}
          </h3>
          {tag && (
            <span style={{
              display: "inline-block",
              fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", padding: "0.2rem 0.55rem",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "100px",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "0.75rem",
              backdropFilter: hasImage ? "blur(6px)" : undefined,
              background: hasImage ? "rgba(0,0,0,0.2)" : undefined,
            }}>
              {tag}
            </span>
          )}
          <p style={{
            fontSize: "0.8rem", lineHeight: 1.65,
            color: hasImage ? "rgba(255,255,255,0.88)" : (onBlue ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.55)"),
            marginBottom: "1rem",
            textShadow: hasImage ? "0 1px 4px rgba(0,0,0,0.6)" : undefined,
          }}>
            {desc}
          </p>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: "0.75rem",
          }}>
            <span style={{
              fontFamily: "var(--font-bebas)", fontSize: "2rem",
              letterSpacing: "0.02em",
              color: hasImage ? "#fff" : (onBlue ? "#000" : "var(--blue)"),
            }}>
              {price}
            </span>
            <ArrowUpRight size={14} style={{ color: "rgba(255,255,255,0.5)" }} />
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Addio al Celibato Barcellona",
  "url": "https://www.addioalcelibato-barcellona.it",
  "telephone": "+34673180796",
  "email": "addiocelibatobarcellona@gmail.com",
  "image": "https://addioalcelibato-barcellona.it/wp-content/uploads/2017/01/ADDIO-SPICY-MIX-S.jpg",
  "description": "Organizziamo addii al celibato e al nubilato a Barcellona dal 2017. Strip show, discoteche, limousine, paddle surf e molto altro. Preventivo gratuito!",
  "foundingDate": "2017",
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Avenida del Paral·lel 91 Bis",
    "addressLocality": "Barcelona",
    "postalCode": "08004",
    "addressCountry": "ES",
  },
  "areaServed": {
    "@type": "City",
    "name": "Barcelona",
  },
  "sameAs": [
    "https://www.facebook.com/festaaddiocelibatobarcellona/",
  ],
};

export default function HomePage() {
  const c = getContent();

  return (
    <div style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <BottomNav
        links={c.navbar.links}
        logoLine1={c.navbar.logo_line1}
        logoLine2={c.navbar.logo_line2}
        ctaLabel={c.navbar.cta_label}
        whatsapp={c.site.whatsapp}
      />

      {/* ════════════════════════════════════════════════════════════════
          HERO — image background, tagline prominent
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="hero-section-pad"
        style={{
          minHeight: "80svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 6vw 5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <Image
          src="https://addioalcelibato-barcellona.it/wp-content/uploads/2017/01/ADDIO-SPICY-MIX-S.jpg"
          alt="Addio al Celibato Barcellona"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />

        {/* Dark gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.82) 100%)",
        }} />

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 2 }}>

          {/* H1 — SEO title */}
          <h1 style={{ margin: "0 0 1.5rem", animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}>
            <span style={{
              display: "block",
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(2.5rem, 7vw, 7rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              color: "#fff",
            }}>
              {c.hero.headline_line1}
            </span>
            <span style={{
              display: "block",
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(2.5rem, 7vw, 7rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              color: "var(--blue)",
            }}>
              A BARCELLONA
            </span>
          </h1>

          {/* Tagline — prominent */}
          <p style={{
            fontSize: "clamp(1.05rem, 2vw, 1.35rem)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.9)",
            maxWidth: "52ch",
            fontWeight: 400,
            marginBottom: "2.5rem",
            animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both",
          }}>
            Alla ricerca di idee per un Addio al Celibato a Barcellona unico? Sei nel posto giusto.{" "}
            <span style={{ color: "rgba(255,255,255,0.6)" }}>
              Siamo italiani, viviamo a Barcellona e conosciamo la città meglio di qualsiasi altra agenzia.
            </span>
          </p>

          {/* CTA */}
          <div style={{ animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both" }}>
            <MagneticButton
              href="/addio-al-celibato-barcellona-contatti"
              className="neon-cta"
              style={{ flexShrink: 0 }}
            >
              PREVENTIVO GRATIS <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* thin separator — both sections are dark */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.04)" }} />

      {/* ════════════════════════════════════════════════════════════════
          INTRO + PERCHÉ NOI — 2 col, same structure as nubilato
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "5rem 6vw 5rem", background: "#000" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }} className="nubilato-intro-grid">

            {/* Left — headline + copy */}
            <div>
              <p style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "0.75rem",
              }}>
                — ADDIO AL CELIBATO BARCELLONA
              </p>
              <h2 style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                letterSpacing: "-0.01em",
                lineHeight: 0.9,
                color: "#fff",
                margin: "0 0 2rem",
              }}>
                IDEE PER UN<br />
                <span style={{ color: "var(--blue)" }}>CELIBATO UNICO</span>
              </h2>
              <p style={{
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.82)",
                fontWeight: 400,
                maxWidth: "52ch",
                marginBottom: "1.25rem",
              }}>
                Sei alla ricerca di idee per un addio al celibato a Barcellona davvero unico? Sei nel posto giusto! Proponiamo attività pomeridiane e notturne per tutti i gusti, e saremo disponibili per consigli durante tutto il soggiorno.
              </p>
              <p style={{
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.75)",
                fontWeight: 400,
                maxWidth: "52ch",
              }}>
                Organizzare una festa di addio al celibato come si deve è il dovere di ogni buon amico. Non esitare e contattaci — il <strong style={{ color: "#fff" }}>PREVENTIVO È GRATIS!</strong>
              </p>
            </div>

            {/* Right — Perché noi */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              <p style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "1.5rem",
              }}>
                — PERCHÉ SCEGLIERE NOI
              </p>
              {([
                { icon: "MapPin", title: "Viviamo a Barcellona", desc: "Noi VIVIAMO qui e conosciamo la città meglio di qualsiasi altra agenzia. Zero intermediari, massima qualità." },
                { icon: "Target", title: "Solo Barcellona", desc: "Organizziamo feste di addio al celibato SOLO a Barcellona. La specializzazione garantisce il miglior servizio." },
                { icon: "Headphones", title: "Sempre Disponibili", desc: "Una volta atterrati saremo disponibili per qualsiasi dubbio o consiglio durante tutto il vostro soggiorno." },
              ] as const).map(({ icon, title, desc }) => {
                const Icon = icon === "MapPin" ? MapPin : icon === "Target" ? Target : Headphones;
                return (
                  <div key={title} style={{
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "flex-start",
                    padding: "1.5rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}>
                    <div style={{
                      width: "38px", height: "38px", background: "rgba(58,117,255,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon size={17} color="var(--blue)" />
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-bebas)", fontSize: "1.05rem", letterSpacing: "0.06em", color: "#fff", marginBottom: "0.3rem" }}>
                        {title}
                      </p>
                      <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "rgba(255,255,255,0.72)", fontWeight: 400 }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          NOTTURNE — header + 4 featured tall cards grid
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#000" }}>

        {/* "Attività Top" header above grid */}
        <div style={{ padding: "5rem 6vw" }}>
          <h2 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            letterSpacing: "0.04em", lineHeight: 1,
            color: "var(--blue)", margin: 0,
          }}>
            Attività Top
          </h2>
        </div>

        {/* 4 featured tall cards — flowparty style */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2px",
          background: "#111",
        }} className="featured-grid">
          {c.notturne.activities.slice(0, 4).map((act, i) => {
            return (
              <a
                href={act.href}
                key={act.name}
                className="featured-card"
                style={{
                  backgroundImage: act.image ? `url(${act.image})` : undefined,
                  backgroundColor: "#080808",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  padding: "2rem",
                  minHeight: "540px",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  color: "inherit",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Dark overlay for readability */}
                <div style={{
                  position: "absolute", inset: 0, zIndex: 0,
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.82) 100%)",
                }} />

                {/* Content */}
                <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                  {/* Top row */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <span style={{
                      fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-jakarta)", fontWeight: 600,
                    }}>
                      Notturna
                    </span>
                    {act.tag && (
                      <span style={{
                        fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.18em",
                        textTransform: "uppercase", padding: "0.22rem 0.65rem",
                        border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: "100px", color: "rgba(255,255,255,0.85)",
                        background: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)",
                      }}>
                        {act.tag}
                      </span>
                    )}
                  </div>

                  {/* Spacer */}
                  <div style={{ flex: 1 }} />

                  {/* Bottom — big title + price + arrow */}
                  <div>
                    <h3 style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "clamp(2rem, 3.2vw, 3.2rem)",
                      letterSpacing: "0.02em",
                      color: "#fff",
                      lineHeight: 0.95,
                      marginBottom: "1.25rem",
                    }}>
                      {act.name}
                    </h3>
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      borderTop: "1px solid rgba(255,255,255,0.2)",
                      paddingTop: "1rem",
                    }}>
                      <span style={{ fontFamily: "var(--font-bebas)", fontSize: "2.2rem", color: "#fff", letterSpacing: "0.02em" }}>
                        {act.price}
                      </span>
                      <ArrowUpRight size={18} style={{ color: "rgba(255,255,255,0.6)" }} />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

      </section>

      {/* Wave: black → blue */}
      <Wave from="#000" to="var(--blue)" flip />

      {/* ════════════════════════════════════════════════════════════════
          NUBILATO PROMO BANNER — on blue bg, just above altre attività
      ════════════════════════════════════════════════════════════════ */}
      <section className="nubilato-promo-section" style={{
        background: "var(--blue)",
        padding: "8rem 6vw 4rem",
      }}>
        <div style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "260px",
          display: "flex",
          alignItems: "center",
          background: `linear-gradient(to right, rgba(0,0,0,0.92) 35%, rgba(0,0,0,0.5) 100%), url(https://addioalcelibato-barcellona.it/wp-content/uploads/2026/02/addio-nubilato-home-page-scaled.jpg) center/cover no-repeat`,
        }}>
          <div style={{
            padding: "3.5rem 4vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "wrap",
            gap: "2rem",
          }}>
            <div>
              <p style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "0.5rem",
              }}>
                — ORGANIZZATE UN ADDIO AL NUBILATO?
              </p>
              <h2 style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                letterSpacing: "-0.02em",
                lineHeight: 0.88,
                color: "#fff",
                margin: "0 0 1rem",
              }}>
                ATTIVITÀ PER<br />
                <span style={{ color: "var(--blue)" }}>ADDIO AL NUBILATO</span>
              </h2>
              <p style={{
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.65,
                maxWidth: "50ch",
                fontWeight: 400,
              }}>
                Abbiamo un&apos;intera sezione dedicata con strip show maschile, cocktail lab, caccia al tesoro e molto altro pensato appositamente per voi.
              </p>
            </div>
            <a
              href="/addio-al-nubilato"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                fontFamily: "var(--font-bebas)",
                fontSize: "0.9rem",
                letterSpacing: "0.14em",
                padding: "1.1rem 2.25rem",
                background: "#fff",
                color: "#000",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              SCOPRI IL NUBILATO <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          POMERIDIANE — BLUE bg, dark portrait cards
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--blue)", padding: "5rem 0 6rem" }}>
        <div style={{ padding: "0 6vw", maxWidth: "1580px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              letterSpacing: "0.04em", lineHeight: 1,
              color: "#000", margin: 0,
            }}>
              Altre Attività
            </h2>
          </div>
        </div>

        <DragCarousel>
          {c.pomeridiane.activities.map((act, i) => (
            <div key={act.name} style={{ paddingLeft: i === 0 ? "6vw" : 0, paddingRight: i === c.pomeridiane.activities.length - 1 ? "6vw" : 0 }}>
              <PortraitCard {...act} onBlue />
            </div>
          ))}
        </DragCarousel>

        <div style={{ padding: "2rem 6vw 0" }}>
          <a href={c.pomeridiane.cta_all_href} className="neon-cta">
            Vedi tutti <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          IL DOVERE — blue, before footer
      ════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: "var(--blue)",
        padding: "8rem 6vw 6rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Squiggle SVG bottom-left */}
        <svg viewBox="0 0 160 90" aria-hidden style={{
          position: "absolute", bottom: "2.5rem", left: "5vw",
          width: "clamp(80px, 10vw, 145px)", fill: "none",
          stroke: "#000", strokeLinecap: "round",
        }}>
          <path d="M8,45 C30,5 55,85 80,45 C105,5 130,85 152,45" strokeWidth="9" />
          <path d="M18,65 C40,25 65,82 90,55 C115,28 138,75 152,58" strokeWidth="5" opacity="0.45" />
        </svg>

        {/* Rotating stamp badge — right side */}
        <div aria-hidden style={{
          position: "absolute", right: "7vw", top: "50%", transform: "translateY(-50%)",
          width: "clamp(180px, 22vw, 280px)", height: "clamp(180px, 22vw, 280px)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg viewBox="0 0 260 260" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", animation: "spin 18s linear infinite" }}>
            <path id="stamp-ring" d="M130,14 a116,116 0 1,1 -0.01,0" fill="none" />
            <text fontSize="17" fontFamily="var(--font-bebas)" fontWeight="700" letterSpacing="7" fill="#000">
              <textPath href="#stamp-ring">ADDIO AL CELIBATO · BARCELLONA · DAL 2017 ·</textPath>
            </text>
          </svg>
          <svg viewBox="0 0 260 260" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <circle cx="130" cy="130" r="90" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="6 5" opacity="0.35" />
          </svg>
          <div style={{ textAlign: "center", lineHeight: 1 }}>
            <span style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2.2rem, 4.5vw, 4rem)", letterSpacing: "0.08em", color: "#000", display: "block" }}>PARTY</span>
            <span style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(0,0,0,0.45)", fontFamily: "var(--font-jakarta)", fontWeight: 700, display: "block", marginTop: "0.2rem" }}>BCN</span>
          </div>
        </div>

        <div style={{margin: "0 auto", position: "relative", zIndex: 2 }}>
          <h2 style={{
            fontFamily: "var(--font-bebas)", fontSize: "clamp(4rem, 12vw, 11rem)",
            letterSpacing: "-0.025em", lineHeight: 0.88, color: "#000",
            marginBottom: "3.5rem", maxWidth: "65%",
          }}>
            IL DOVERE DI<br />OGNI BUON<br />AMICO
          </h2>
          <p style={{
            fontSize: "clamp(0.88rem, 1.5vw, 1.05rem)", lineHeight: 1.85,
            color: "rgba(0,0,0,0.6)", textTransform: "uppercase", letterSpacing: "0.025em",
            maxWidth: "55ch", marginBottom: "2.5rem",
          }}>
            {c.perche.highlight_text}
          </p>
          <a href="/addio-al-celibato-barcellona-contatti" className="neon-cta">
            PREVENTIVO GRATIS <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      {/* Wave: blue → black */}
      <Wave from="var(--blue)" to="#000" />

      <SiteFooter />
    </div>
  );
}
