import { Metadata } from "next";
import {
  Phone, ArrowUpRight, ArrowRight,
  Sparkles, Flame, Crown, Music, Zap, UtensilsCrossed, Bus, Car,
  Anchor, Ship, Bike, CircleDot, Target, Lock, Navigation, Trophy, Waves,
  type LucideIcon,
} from "lucide-react";
import { getContent } from "@/lib/content";
import type { Activity, PercheItem } from "@/lib/content";

import LEDGrid from "@/components/LEDGrid";
import MagneticButton from "@/components/MagneticButton";
import DragCarousel from "@/components/DragCarousel";
import ChapterReveal from "@/components/ChapterReveal";
import StaggerReveal from "@/components/StaggerReveal";
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
// Each bump = circular arc (A command) of radius bumpR → perfectly round domes.
// Valleys = short arc along inner circle (concave from outside).

function makeScallop(cx: number, cy: number, r: number, bumpR: number, n: number): string {
  const step = (2 * Math.PI) / n;
  // half-angle the bump chord subtends at the inner circle
  const alpha = Math.asin(Math.min(bumpR / r, 0.999));

  const f = (v: number) => v.toFixed(2);
  const ptx = (a: number, rad: number) => cx + rad * Math.cos(a);
  const pty = (a: number, rad: number) => cy + rad * Math.sin(a);

  let d = "";
  for (let i = 0; i < n; i++) {
    const peakA = i * step - Math.PI / 2;
    const bL = peakA - alpha;          // bump left on inner circle
    const bR = peakA + alpha;          // bump right on inner circle
    const nBL = peakA + step - alpha;  // next bump left on inner circle

    if (i === 0) d = `M${f(ptx(bL, r))},${f(pty(bL, r))}`;

    // Outward circular arc for the bump dome (sweep=1 = CW = outward)
    d += ` A${f(bumpR)},${f(bumpR)} 0 0,1 ${f(ptx(bR, r))},${f(pty(bR, r))}`;
    // Short CW arc along inner circle to next bump (concave valley)
    d += ` A${f(r)},${f(r)} 0 0,1 ${f(ptx(nBL, r))},${f(pty(nBL, r))}`;
  }
  return d + "Z";
}

const SCALLOP_PATH = makeScallop(130, 130, 102, 14, 16);

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

function PortraitCard({ icon, name, desc, price, href, tag, onBlue, image }: Activity & { onBlue?: boolean }) {
  const Icon = ICONS[icon] ?? Sparkles;
  const hasImage = !!image;

  return (
    <a
      href={href}
      className={`portrait-card ${onBlue ? "portrait-card-blue" : "portrait-card-dark"}`}
      style={hasImage ? {
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } : undefined}
    >
      {/* Dark gradient overlay when image is present */}
      {hasImage && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
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

        {/* Bottle-cap badge — spinning cap, static logo */}
        <div style={{
          position: "absolute", top: "6%", left: "6vw",
          width: "clamp(160px, 18vw, 240px)",
          height: "clamp(160px, 18vw, 240px)",
          animation: "badge-in 0.8s cubic-bezier(0.33,1,0.68,1) 0.4s both",
        }}>
          {/* Spinning scalloped cap + circular text */}
          <svg
            viewBox="0 0 260 260"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              animation: "spin 18s linear infinite",
            }}
          >
            <defs>
              {/* Circle path for text — starts at top (12 o'clock), clockwise */}
              <path id="badge-text-path" d="M130,49 A81,81 0 1,1 130,211 A81,81 0 1,1 130,49" />
            </defs>
            {/* Cap fill */}
            <path d={SCALLOP_PATH} fill="#000" />
            {/* Circular text */}
            <text
              fontFamily="var(--font-bebas)"
              fontSize="9.5"
              fill="#fff"
              letterSpacing="4.8"
            >
              <textPath href="#badge-text-path" startOffset="0%">
                {"PARTY A BARCELLONA · DAL 2017 · PARTY A BARCELLONA · DAL 2017 · "}
              </textPath>
            </text>
          </svg>

          {/* Static logo centered */}
          <img
            src="https://addioalcelibato-barcellona.it/wp-content/uploads/2017/02/logoaddioalcelibatoblancohori2-1.png"
            alt="Addio al Celibato Barcellona"
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "45%",
              height: "auto",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 2, paddingTop: "12rem" }}>

          {/* H1 — full SEO title, two visual sizes inside one element */}
          <h1 style={{ margin: 0, animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}>
            {/* "ADDIO AL CELIBATO A" — smaller line */}
            <span style={{
              display: "block",
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(1.2rem, 3.5vw, 2.8rem)",
              letterSpacing: "0.12em",
              color: "rgba(0,0,0,0.5)",
              lineHeight: 1.1,
              marginBottom: "-0.05em",
            }}>
              {c.hero.headline_line1} A
            </span>
            {/* BARCELLONA — massive */}
            <span style={{
              display: "block",
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(5.5rem, 20vw, 19rem)",
              letterSpacing: "-0.025em",
              lineHeight: 0.85,
              color: "#fff",
            }}>
              BARCELLONA
            </span>
          </h1>

          {/* Divider */}
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

          {/* Subheadline + CTA */}
          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            gap: "3rem", flexWrap: "wrap",
            animation: "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s both",
          }}>
            <p style={{
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              lineHeight: 1.8,
              color: "rgba(0,0,0,0.75)",
              maxWidth: "44ch",
              fontWeight: 400,
            }}>
              {c.hero.subheadline} {c.hero.description}
            </p>

            <MagneticButton
              href="/contact"
              className="neon-cta"
              style={{ flexShrink: 0 }}
            >
              PREVENTIVO GRATIS <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Wave: blue → black */}
      <Wave from="var(--blue)" to="#000" />

      {/* ════════════════════════════════════════════════════════════════
          PERCHÉ NOI — black bg, full-width tool rows  [SECTION 2]
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#000", padding: "0 6vw 9rem" }}>
        <div style={{ maxWidth: "1100px", margin: "5rem auto 0" }}>

          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(4rem, 12vw, 10rem)",
              letterSpacing: "-0.02em", lineHeight: 0.85,
              color: "var(--blue)", margin: 0,
            }}>
              {c.perche.section_title_line1}
              <span style={{ color: "rgba(58,117,255,0.45)" }}>{c.perche.section_title_accent}?</span>
            </h2>
          </div>

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
                  {/* Item 0 — special hover text, desktop only */}
                  {i === 0 && (
                    <div className="tool-row-desc-hover-only">
                      <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: 1.55, color: "rgba(255,255,255,0.82)", maxWidth: "52ch", paddingTop: "0.75rem" }}>
                        Noi <span style={{ fontFamily: "var(--font-bebas)", fontSize: "1.3em", letterSpacing: "0.04em", color: "#fff" }}>VIVIAMO</span> a Barcellona,{" "}
                        e conosciamo la città meglio di qualsiasi altra agenzia.
                      </p>
                    </div>
                  )}

                  <div className="tool-row-desc">
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "60ch", paddingTop: "0.5rem" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={22} className="tool-arrow" />
              </div>
            </StaggerReveal>
          ))}

          {/* Review CTAs — below the tool rows */}
          <div style={{ marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <h3 style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.01em", lineHeight: 0.9,
              color: "#fff", margin: 0, marginBottom: "1.5rem",
            }}>
              Leggi le nostre<br />
              <span style={{ color: "var(--blue)" }}>recensioni su</span>
            </h3>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a
                href="https://maps.app.goo.gl/5svurwM9AqGeFuBJ9"
                target="_blank" rel="noopener noreferrer"
                className="neon-cta"
              >
                Google Maps <ArrowUpRight size={15} />
              </a>
              <a
                href="https://it.trustpilot.com/review/addioalcelibato-barcellona.it?utm_medium=trustbox&utm_source=MicroReviewCount"
                target="_blank" rel="noopener noreferrer"
                className="neon-cta"
              >
                TrustPilot <ArrowUpRight size={15} />
              </a>
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
          POMERIDIANE — BLUE bg, dark portrait cards
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--blue)", padding: "5rem 0 6rem" }}>
        <div style={{ padding: "0", maxWidth: "1580px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              letterSpacing: "0.04em", lineHeight: 1,
              color: "#000", margin: 0,
            }}>
              Altre Attività
            </h2>
            <a href={c.pomeridiane.cta_all_href} className="neon-cta">
              Vedi tutti <ArrowUpRight size={15} />
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
          <a href="/contattaci" className="neon-cta">
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
