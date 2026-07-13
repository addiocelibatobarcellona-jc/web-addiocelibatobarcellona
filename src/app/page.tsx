import { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight, ArrowRight,
  Target, MapPin, Headphones,
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

      {/* ════════════════════════════════════════════════════════════════
          HERO — image background, tagline prominent
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="hero-section-pad"
        style={{
          minHeight: "60svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "8rem 6vw 5rem",
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
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,1) 100%)",
        }} />

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 2 }}>

          <p style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(0.75rem, 1.4vw, 0.95rem)",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "0.5rem",
          }}>
            — BARCELLONA · DAL 2017
          </p>

          {/* H1 — SEO title */}
          <h1 style={{ margin: "0 0 1.25rem", animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}>
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

          {/* Tagline */}
          <p style={{
            fontSize: "clamp(0.82rem, 1.3vw, 1rem)",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.75)",
            maxWidth: "52ch",
            fontWeight: 400,
            marginBottom: "2rem",
            animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both",
          }}>
            Alla ricerca di idee per un Addio al Celibato a Barcellona unico? Sei nel posto giusto. Siamo italiani, viviamo a Barcellona e conosciamo la città meglio di qualsiasi altra agenzia.
          </p>

          {/* CTA */}
          <div style={{ animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both" }}>
            <MagneticButton
              href="/addio-al-celibato-barcellona-contatti"
              className="neon-cta"
              style={{ flexShrink: 0 }}
            >
              PREVENTIVO GRATIS
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
            {[...c.notturne.activities, ...c.pomeridiane.activities].map((act) => (
              <GridCard key={act.name} name={act.name} desc={act.desc} price={act.price} href={act.href} tag={act.tag} image={act.image} />
            ))}
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
          background: `linear-gradient(to right, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.1) 100%), url(https://addioalcelibato-barcellona.it/wp-content/uploads/2026/02/addio-nubilato-home-page-scaled.jpg) center/cover no-repeat`,
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
