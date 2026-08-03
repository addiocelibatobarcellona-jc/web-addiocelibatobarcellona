import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import nubilatoActivities from "../../../../public/nubilato-activities.json";

interface NubilatoActivity {
  slug: string;
  name: string;
  tag: string | null;
  price: string;
  intro: string;
  description: string;
  includes: string[];
  notes: string | null;
  image: string | null;
  body_html?: string;
}

type Params = { slug: string };

function find(slug: string): NubilatoActivity | undefined {
  return (nubilatoActivities as NubilatoActivity[]).find((a) => a.slug === slug);
}

export function generateStaticParams(): Params[] {
  return (nubilatoActivities as NubilatoActivity[]).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const activity = find(slug);
  if (!activity) return {};

  const canonical = `https://www.addioalcelibato-barcellona.it/addio-al-nubilato/${slug}/`;
  const ogImage = activity.image ?? "/images/2026-addio-nubilato-home-page-scaled.jpg";

  return {
    title: `${activity.name} | Addio al Nubilato Barcellona`,
    description: activity.intro,
    alternates: { canonical },
    openGraph: {
      title: `${activity.name} | Addio al Nubilato Barcellona`,
      description: activity.intro,
      url: canonical,
      locale: "it_IT",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: activity.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${activity.name} | Addio al Nubilato Barcellona`,
      description: activity.intro,
      images: [ogImage],
    },
  };
}

function buildJsonLd(activity: NubilatoActivity) {
  const BASE = "https://www.addioalcelibato-barcellona.it";
  const url = `${BASE}/addio-al-nubilato/${activity.slug}/`;
  const image = activity.image ? `${BASE}${activity.image}` : `${BASE}/images/2026-addio-nubilato-home-page-scaled.jpg`;
  const priceMatch = activity.price.match(/(\d+)/);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": activity.name,
    "description": activity.intro,
    "url": url,
    "image": image,
    "touristType": "https://schema.org/Party",
    "provider": {
      "@type": "Organization",
      "name": "Addio al Celibato Barcellona",
      "url": BASE,
      "telephone": "+34673180796",
    },
    "location": { "@type": "City", "name": "Barcelona", "addressCountry": "ES" },
  };
  if (priceMatch) {
    jsonLd["offers"] = {
      "@type": "Offer",
      "price": priceMatch[1],
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": url,
    };
  }
  return jsonLd;
}

export default async function NubilatoActivityPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const activity = find(slug);
  if (!activity) notFound();

  const jsonLd = buildJsonLd(activity);

  return (
    <div style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section style={{
        minHeight: "55svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "8rem 6vw 3rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {activity.image && (
          <Image
            src={activity.image}
            alt={activity.name}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        )}
        <div style={{
          position: "absolute", inset: 0,
          background: activity.image
            ? "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)"
            : "#000",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.45)",
            marginBottom: "0.5rem",
          }}>
            — ADDIO AL NUBILATO · BARCELLONA
          </p>
          <h1 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            letterSpacing: "-0.02em",
            lineHeight: 0.88,
            color: "#fff",
            margin: "0 0 1rem",
          }}>
            {activity.name}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            {activity.tag && (
              <span style={{
                fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", padding: "0.3rem 0.75rem",
                border: "1px solid rgba(255,255,255,0.3)", borderRadius: "100px",
                color: "rgba(255,255,255,0.7)",
              }}>
                {activity.tag}
              </span>
            )}
            <span style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              letterSpacing: "0.02em",
              color: "var(--blue)",
            }}>
              {activity.price}
            </span>
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section style={{ padding: "4rem 6vw 5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "5rem",
          alignItems: "start",
        }} className="nubilato-intro-grid">

          {/* Left — description */}
          <div>
            <h2 style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              letterSpacing: "-0.01em",
              lineHeight: 1,
              color: "#fff",
              margin: "0 0 1.5rem",
            }}>
              {activity.name} a Barcellona
            </h2>
            <p style={{
              fontSize: "1.05rem",
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.82)",
              fontWeight: 400,
              marginBottom: "2rem",
            }}>
              {activity.intro}
            </p>
            {activity.body_html ? (
              <div
                className="nubilato-body"
                dangerouslySetInnerHTML={{ __html: activity.body_html }}
              />
            ) : (
              <p style={{
                fontSize: "0.95rem",
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.65)",
                fontWeight: 400,
              }}>
                {activity.description}
              </p>
            )}

            {activity.notes && (
              <p style={{
                marginTop: "2rem",
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
                borderLeft: "2px solid rgba(58,117,255,0.4)",
                paddingLeft: "1rem",
              }}>
                {activity.notes}
              </p>
            )}
          </div>

          {/* Right — includes + CTA */}
          <div style={{ position: "sticky", top: "6rem" }}>
            {activity.includes.length > 0 && (
              <div style={{
                background: "#0c0c0c",
                border: "1px solid rgba(255,255,255,0.07)",
                padding: "2rem",
                marginBottom: "1.5rem",
              }}>
                <p style={{
                  fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
                  marginBottom: "1.25rem",
                }}>
                  Cosa include
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {activity.includes.map((item) => (
                    <li key={item} style={{
                      display: "flex", alignItems: "flex-start", gap: "0.6rem",
                      fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5,
                    }}>
                      <span style={{ color: "var(--blue)", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div style={{
                  marginTop: "1.5rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.5rem",
                }}>
                  <span style={{ fontFamily: "var(--font-bebas)", fontSize: "2.5rem", color: "#fff" }}>
                    {activity.price}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    a persona
                  </span>
                </div>
              </div>
            )}

            <a
              href="/addio-al-celibato-barcellona-contatti"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                background: "var(--blue)", color: "#fff",
                fontFamily: "var(--font-bebas)", fontSize: "0.9rem", letterSpacing: "0.12em",
                padding: "1rem 2rem", textDecoration: "none", marginBottom: "0.75rem",
              }}
            >
              PREVENTIVO GRATIS <ArrowRight size={15} />
            </a>
            <a
              href="https://wa.me/34673180796"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)",
                fontFamily: "var(--font-bebas)", fontSize: "0.85rem", letterSpacing: "0.12em",
                padding: "0.9rem 2rem", textDecoration: "none",
              }}
            >
              <MessageCircle size={14} /> WHATSAPP
            </a>
          </div>
        </div>
      </section>

      {/* ── BACK LINK ── */}
      <div style={{ padding: "0 6vw 5rem" }}>
        <a
          href="/addio-al-nubilato"
          style={{
            fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)", textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
          }}
        >
          ← Tutte le attività nubilato
        </a>
      </div>

      <SiteFooter />
    </div>
  );
}
