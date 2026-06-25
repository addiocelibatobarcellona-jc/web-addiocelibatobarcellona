import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getContent } from "@/lib/content";
import type { Activity } from "@/lib/content";
import BottomNav from "@/components/BottomNav";
import SiteFooter from "@/components/SiteFooter";

// ── Params ────────────────────────────────────────────────────────────────────

type Params = { category?: string[] };
type Category = "all" | "night" | "daytime";

function getCategory(params: Params): Category {
  const slug = params.category?.[0];
  if (slug === "night") return "night";
  if (slug === "daytime") return "daytime";
  return "all";
}

export function generateStaticParams() {
  return [
    { category: [] },
    { category: ["night"] },
    { category: ["daytime"] },
  ];
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const c = getContent();
  const cat = getCategory(await params);
  const data = c.activities[cat];
  const canonical =
    cat === "night" ? "/attivita/notturne"
    : cat === "daytime" ? "/attivita/pomeridiane"
    : "/attivita";
  return {
    title: `${data.meta_title} | Dal 2017`,
    description: data.meta_desc,
    alternates: { canonical: `https://www.addioalcelibato-barcellona.it${canonical}` },
  };
}

// ── Wave divider ──────────────────────────────────────────────────────────────

function Wave({ from, to, flip }: { from: string; to: string; flip?: boolean }) {
  return (
    <div style={{ background: from, lineHeight: 0, fontSize: 0 }}>
      <svg viewBox="0 0 1440 70" style={{ display: "block", width: "100%", transform: flip ? "scaleX(-1)" : undefined }} preserveAspectRatio="none">
        <path d="M0,10 C200,70 400,0 600,40 C800,70 1000,10 1200,50 C1320,70 1380,30 1440,20 L1440,70 L0,70 Z" fill={to} />
      </svg>
    </div>
  );
}

// ── Activity card ─────────────────────────────────────────────────────────────

function ActivityCard({ name, desc, price, href, tag, image }: Activity) {
  return (
    <a
      href={href}
      style={{
        display: "flex",
        flexDirection: "column",
        background: image ? undefined : "#0c0c0c",
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "1px solid rgba(255,255,255,0.06)",
        textDecoration: "none",
        color: "inherit",
        position: "relative",
        overflow: "hidden",
        minHeight: "360px",
        transition: "transform 0.3s cubic-bezier(0.33,1,0.68,1)",
      }}
      className="activity-grid-card"
    >
      {image && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.88) 100%)",
        }} />
      )}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ArrowUpRight size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
        </div>
        <div style={{ flex: 1 }} />
        <div>
          <h3 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            letterSpacing: "0.03em",
            lineHeight: 1,
            color: "#fff",
            marginBottom: tag ? "0.5rem" : "0.75rem",
          }}>
            {name}
          </h3>
          {tag && (
            <span style={{
              display: "inline-block",
              fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", padding: "0.2rem 0.55rem",
              border: "1px solid rgba(255,255,255,0.25)", borderRadius: "100px",
              color: "rgba(255,255,255,0.6)", marginBottom: "0.75rem",
              background: image ? "rgba(0,0,0,0.2)" : undefined,
              backdropFilter: image ? "blur(6px)" : undefined,
            }}>
              {tag}
            </span>
          )}
          <p style={{
            fontSize: "0.82rem", lineHeight: 1.65,
            color: image ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
            marginBottom: "1rem",
            textShadow: image ? "0 1px 4px rgba(0,0,0,0.5)" : undefined,
          }}>
            {desc}
          </p>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "0.75rem",
          }}>
            <span style={{ fontFamily: "var(--font-bebas)", fontSize: "1.8rem", letterSpacing: "0.02em", color: "var(--blue)" }}>
              {price}
            </span>
            <ArrowUpRight size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Filter pill ───────────────────────────────────────────────────────────────

function FilterPill({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: "var(--font-bebas)",
        fontSize: "0.9rem",
        letterSpacing: "0.14em",
        padding: "0.5rem 1.4rem",
        border: `2px solid ${active ? "#fff" : "rgba(255,255,255,0.2)"}`,
        background: active ? "#fff" : "transparent",
        color: active ? "#000" : "rgba(255,255,255,0.6)",
        textDecoration: "none",
        whiteSpace: "nowrap" as const,
        transition: "border-color 0.2s, background 0.2s, color 0.2s",
      }}
    >
      {label}
    </a>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ActivitiesPage({ params }: { params: Promise<Params> }) {
  const c = getContent();
  const cat = getCategory(await params);
  const catData = c.activities[cat];

  const allActivities = [
    ...c.notturne.activities,
    ...c.pomeridiane.activities,
  ];
  const activities =
    cat === "night" ? c.notturne.activities
    : cat === "daytime" ? c.pomeridiane.activities
    : allActivities;

  return (
    <div style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>
      <BottomNav
        links={c.navbar.links}
        logoLine1={c.navbar.logo_line1}
        logoLine2={c.navbar.logo_line2}
        ctaLabel={c.navbar.cta_label}
        whatsapp={c.site.whatsapp}
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        background: "var(--blue)",
        minHeight: "55svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 6vw 5rem",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
            letterSpacing: "0.28em",
            color: "rgba(0,0,0,0.5)",
            marginBottom: "0.5rem",
          }}>
            — BARCELLONA · DAL 2017
          </p>
          <h1 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(4rem, 13vw, 12rem)",
            letterSpacing: "-0.02em",
            lineHeight: 0.88,
            color: "#fff",
            margin: "0 0 2.5rem",
          }}>
            {catData.headline}<br />
            <span style={{ color: "rgba(0,0,0,0.7)" }}>{catData.headline_accent}</span>
          </h1>

          {/* Filter pills */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <FilterPill href="/attivita" label="Tutte" active={cat === "all"} />
            <FilterPill href="/attivita/notturne" label="Notturne" active={cat === "night"} />
            <FilterPill href="/attivita/pomeridiane" label="Pomeridiane" active={cat === "daytime"} />
          </div>
        </div>
      </section>

      <Wave from="var(--blue)" to="#000" />

      {/* ── GRID ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "4rem 6vw 6rem" }}>
        <p style={{
          fontSize: "0.72rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
          marginBottom: "2.5rem",
          fontWeight: 600,
        }}>
          {activities.length} attività disponibili
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
        }}
          className="activities-grid"
        >
          {activities.map((act) => (
            <ActivityCard key={act.href} {...act} />
          ))}
        </div>
      </section>

      {/* ── SEO TEXT ──────────────────────────────────────────────────── */}
      <section style={{
        padding: "4rem 6vw 6rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        maxWidth: "900px",
      }}>
        <h2 style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
          letterSpacing: "0.04em",
          color: "rgba(255,255,255,0.3)",
          marginBottom: "2rem",
        }}>
          {catData.headline} {catData.headline_accent}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {catData.seo_text.split("\n\n").map((para, i) => (
            <p key={i} style={{
              fontSize: "0.88rem",
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.45)",
            }}>
              {para}
            </p>
          ))}
        </div>
        <a
          href="/addio-al-celibato-barcellona-contatti"
          className="neon-cta"
          style={{ marginTop: "2.5rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        >
          PREVENTIVO GRATIS <ArrowUpRight size={16} />
        </a>
      </section>

      <SiteFooter />
    </div>
  );
}
