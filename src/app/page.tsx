import { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight, ArrowRight,
  Target, MapPin, Clock,
} from "lucide-react";
import { getContent } from "@/lib/content";

import MagneticButton from "@/components/MagneticButton";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Addio al Celibato Barcellona | Dal 2017 – Miglior Prezzo Garantito",
  description:
    "Organizziamo addii al celibato e al nubilato a Barcellona dal 2017. Strip show, discoteche, limousine, paddle surf e molto altro. Preventivo gratuito!",
  alternates: { canonical: "https://www.addioalcelibato-barcellona.it" },
};


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

// ── Grid activity card ────────────────────────────────────────────────────────

function GridCard({ name, desc, price, href, tag, image }: {
  name: string; desc: string; price: string; href: string; tag?: string | null; image?: string | null;
}) {
  return (
    <a href={href} style={{
      display: "flex", flexDirection: "column",
      background: "#0c0c0c",
      border: "1px solid rgba(255,255,255,0.06)",
      textDecoration: "none", color: "inherit",
      position: "relative", overflow: "hidden",
      minHeight: "480px",
      transition: "transform 0.3s cubic-bezier(0.33,1,0.68,1)",
    }} className="activity-grid-card">
      {image && (
        <Image src={image} alt={name} fill
          sizes="(max-width: 480px) 88vw, (max-width: 720px) 44vw, (max-width: 1100px) 29vw, 22vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      )}
      {image && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.88) 100%)",
        }} />
      )}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ArrowUpRight size={15} style={{ color: "rgba(255,255,255,0.35)" }} />
        </div>
        <div style={{ flex: 1 }} />
        <div>
          <h3 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "0.03em", lineHeight: 1, color: "#fff", marginBottom: tag ? "0.4rem" : "0.6rem" }}>
            {name}
          </h3>
          {tag && (
            <span style={{ display: "inline-block", fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", padding: "0.2rem 0.5rem", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "100px", color: "rgba(255,255,255,0.65)", marginBottom: "0.6rem", background: image ? "rgba(0,0,0,0.25)" : undefined, backdropFilter: image ? "blur(6px)" : undefined }}>
              {tag}
            </span>
          )}
          <p style={{ fontSize: "0.8rem", lineHeight: 1.6, color: image ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)", marginBottom: "0.85rem", fontWeight: 400 }}>
            {desc}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "0.6rem" }}>
            <span style={{ fontFamily: "var(--font-bebas)", fontSize: "2rem", letterSpacing: "0.02em", color: "#fff" }}>{price}</span>
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
  "image": "/images/2017-ADDIO-SPICY-MIX-S.jpg",
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

      {/* ════════════════════════════════════════════════════════════════
          HERO — image background, tagline prominent
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="hero-section-pad"
        style={{
          minHeight: "70svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "8rem 6vw 5rem",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Background image */}
        <Image
          src="/images/2017-ADDIO-SPICY-MIX-S.jpg"
          alt="Addio al Celibato Barcellona"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />

        {/* Dark gradient overlay — stronger center fade for legibility */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.95) 100%)",
        }} />

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "700px", width: "100%" }}>

          <p style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "0.5rem",
          }}>
            — BARCELLONA · DAL 2017
          </p>

          {/* H1 — SEO title */}
          <h1 style={{ margin: "0 0 1rem", animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}>
            <span style={{
              display: "block",
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(2.2rem, 6vw, 5.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              color: "#fff",
            }}>
              {c.hero.headline_line1}
            </span>
            <span style={{
              display: "block",
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(2.2rem, 6vw, 5.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              color: "var(--blue)",
            }}>
              A BARCELLONA
            </span>
          </h1>

          {/* Tagline */}
          <p style={{
            fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.75)",
            fontWeight: 400,
            marginBottom: "1.5rem",
            animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both",
          }}>
            Siamo italiani, viviamo a Barcellona e conosciamo la città meglio di qualsiasi altra agenzia.
          </p>

          {/* Bullet points — competitor style */}
          <ul style={{
            listStyle: "none", padding: 0, margin: "0 0 1.75rem",
            display: "flex", flexDirection: "column", gap: "0.4rem",
            animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.32s both",
          }}>
            {[
              "Italiani che vivono a Barcellona: zero intermediari",
              "Solo addii al celibato dal 2017: massima specializzazione",
              "Preventivo gratuito in 24h — nessun impegno",
            ].map((item) => (
              <li key={item} style={{
                display: "flex", alignItems: "flex-start", justifyContent: "center",
                gap: "0.5rem", fontSize: "clamp(0.75rem, 1.1vw, 0.88rem)",
                color: "rgba(255,255,255,0.82)", fontWeight: 400,
              }}>
                <span style={{ color: "var(--blue)", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>✓</span>
                {item}
              </li>
            ))}
          </ul>

          {/* CTA + review badges */}
          <div style={{ animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MagneticButton
              href="/addio-al-celibato-barcellona-contatti"
              className="neon-cta"
              style={{ flexShrink: 0 }}
            >
              PREVENTIVO GRATIS
            </MagneticButton>

            {/* Review badges */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              {/* Google Maps */}
              <a
                href="https://maps.app.goo.gl/oaPeRnXLkWpVScSv8"
                target="_blank"
                rel="noopener noreferrer"
                className="review-badge"
              >
                {/* Google G */}
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <div>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", lineHeight: 1.2 }}>Google Reviews</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <span style={{ color: "#FBBC05", fontSize: "0.7rem", letterSpacing: "-0.02em" }}>★★★★★</span>
                    <span style={{ fontFamily: "var(--font-bebas)", fontSize: "0.85rem", letterSpacing: "0.04em", color: "#fff" }}>5.0</span>
                  </div>
                </div>
              </a>

              {/* Trustpilot */}
              <a
                href="https://it.trustpilot.com/review/addioalcelibato-barcellona.it"
                target="_blank"
                rel="noopener noreferrer"
                className="review-badge"
              >
                {/* Trustpilot star */}
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="none">
                  <rect width="24" height="24" rx="2" fill="#00B67A"/>
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z" fill="#fff"/>
                </svg>
                <div>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", lineHeight: 1.2 }}>Trustpilot</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <span style={{ color: "#00B67A", fontSize: "0.7rem", letterSpacing: "-0.02em" }}>★★★★★</span>
                    <span style={{ fontFamily: "var(--font-bebas)", fontSize: "0.85rem", letterSpacing: "0.04em", color: "#fff" }}>Excellent</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* thin separator — both sections are dark */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.04)" }} />

      {/* ════════════════════════════════════════════════════════════════
          PERCHÉ SCEGLIERE NOI — 3 col horizontal
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "5rem 6vw 5rem", background: "#000" }}>
        <p style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
          letterSpacing: "0.28em",
          color: "rgba(255,255,255,0.4)",
          marginBottom: "2.5rem",
        }}>
          — PERCHÉ SCEGLIERE NOI
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "rgba(255,255,255,0.07)",
        }} className="perche-grid">
          {([
            { icon: "MapPin", title: "Viviamo a Barcellona", desc: "Noi VIVIAMO qui e conosciamo la città meglio di qualsiasi altra agenzia. Zero intermediari, massima qualità." },
            { icon: "Target", title: "Solo Barcellona", desc: "Organizziamo feste di addio al celibato SOLO a Barcellona. La specializzazione garantisce il miglior servizio." },
            { icon: "Clock", title: "Sempre Disponibili", desc: "Una volta atterrati saremo disponibili per qualsiasi dubbio o consiglio durante tutto il vostro soggiorno." },
          ] as const).map(({ icon, title, desc }) => {
            const Icon = icon === "MapPin" ? MapPin : icon === "Target" ? Target : Clock;
            return (
              <div key={title} style={{
                background: "#000",
                padding: "2.5rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}>
                <div style={{
                  width: "44px", height: "44px", background: "rgba(58,117,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon size={19} color="var(--blue)" />
                </div>
                <p style={{ fontFamily: "var(--font-bebas)", fontSize: "1.2rem", letterSpacing: "0.06em", color: "#fff", margin: 0 }}>
                  {title}
                </p>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", fontWeight: 400, margin: 0 }}>
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          TUTTE LE ATTIVITÀ — unified 4-col grid
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#000", padding: "5rem 6vw 6rem" }}>
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "0.04em", lineHeight: 1, color: "#fff", margin: 0 }}>
              TUTTE LE ATTIVITÀ
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px" }} className="nubilato-grid">
            {[...c.notturne.activities, ...c.pomeridiane.activities].flatMap((act, i) => {
              const card = <GridCard key={act.name} name={act.name} desc={act.desc} price={act.price} href={act.href} tag={act.tag} image={act.image} />;
              // Insert mobile CTA after every 3rd card
              if ((i + 1) % 3 === 0) {
                return [
                  card,
                  <a
                    key={`cta-${i}`}
                    href="/addio-al-celibato-barcellona-contatti"
                    className="grid-intercalated-cta"
                    style={{
                      display: "none", // shown only on mobile via CSS
                      alignItems: "center", justifyContent: "center",
                      background: "var(--blue)",
                      color: "#fff",
                      fontFamily: "var(--font-bebas)",
                      fontSize: "1.1rem",
                      letterSpacing: "0.1em",
                      padding: "1.25rem",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                  >
                    PREVENTIVO GRATIS →
                  </a>,
                ];
              }
              return [card];
            })}
          </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          NUBILATO PROMO BANNER — full-width clickable, right after grid
      ════════════════════════════════════════════════════════════════ */}
      <a
        href="/addio-al-nubilato"
        className="nubilato-promo-link"
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          minHeight: "560px",
          marginBottom: "5rem",
          textDecoration: "none",
          background: `linear-gradient(to right, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.1) 100%), url(/images/2026-addio-nubilato-home-page-scaled.jpg) center/cover no-repeat`,
        }}
      >
        <div style={{
          padding: "4rem 6vw",
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
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            fontFamily: "var(--font-bebas)",
            fontSize: "0.9rem",
            letterSpacing: "0.14em",
            padding: "1.1rem 2.25rem",
            background: "#fff",
            color: "#000",
            flexShrink: 0,
          }}>
            SCOPRI IL NUBILATO <ArrowUpRight size={16} />
          </span>
        </div>
      </a>

      {/* ════════════════════════════════════════════════════════════════
          INTRO — IDEE PER UN CELIBATO UNICO (moved to bottom)
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "5rem 6vw 6rem", background: "#000" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "center",
        }} className="nubilato-intro-grid">
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
          </div>
          <div>
            <p style={{
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.82)",
              fontWeight: 400,
              marginBottom: "1.25rem",
            }}>
              Sei alla ricerca di idee per un addio al celibato a Barcellona davvero unico? Sei nel posto giusto! Proponiamo attività pomeridiane e notturne per tutti i gusti, e saremo disponibili per consigli durante tutto il soggiorno.
            </p>
            <p style={{
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.75)",
              fontWeight: 400,
            }}>
              Organizzare una festa di addio al celibato come si deve è il dovere di ogni buon amico. Non esitare e contattaci — il <strong style={{ color: "#fff" }}>PREVENTIVO È GRATIS!</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Wave: black → blue */}
      <Wave from="#000" to="var(--blue)" flip />

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
