import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import SiteFooter from "@/components/SiteFooter";
import ActivityContactForm from "@/components/ActivityContactForm";
import activitiesDetail from "../../../../../public/activities-detail.json";
import { client } from "@/sanity/lib/client";
import { resolveActivityImage } from "@/sanity/lib/image";

// ── Types ──────────────────────────────────────────────────────────────────────

interface ActivityDetail {
  slug: string;
  category: "notturne" | "pomeridiane";
  name: string;
  price: string | null;
  intro: string;
  includes: string[];
  description: string;
  notes: string | null;
  images: string[];
  body_html?: string;
}

type Params = { category: string; slug: string };

// ── Helpers ────────────────────────────────────────────────────────────────────

function toItalianCategory(category: string) {
  return category === "night" ? "notturne" : "pomeridiane";
}

function findActivity(category: string, slug: string): ActivityDetail | undefined {
  const italianCat = toItalianCategory(category);
  return (activitiesDetail as ActivityDetail[]).find(
    (a) => a.category === italianCat && a.slug === slug
  );
}

function getCardImage(category: string, slug: string, c: Awaited<ReturnType<typeof getContent>>): string | undefined {
  const italianCat = toItalianCategory(category);
  const list = italianCat === "notturne" ? c.notturne.activities : c.pomeridiane.activities;
  const card = list.find((a) => a.href.includes(slug));
  return card?.image;
}

type SanityImg = { _type: string; asset?: { _ref: string; _type: string } };
async function getSanityImages(slug: string) {
  return client.fetch<{ coverImage?: SanityImg | null; gridImage?: SanityImg | null } | null>(
    `*[_type == "activity" && slug.current == $slug][0]{ coverImage, gridImage }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

// ── Static params ──────────────────────────────────────────────────────────────

export function generateStaticParams(): Params[] {
  return (activitiesDetail as ActivityDetail[]).map((a) => ({
    category: a.category === "notturne" ? "night" : "daytime",
    slug: a.slug,
  }));
}

// ── Metadata ───────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category, slug } = await params;
  const activity = findActivity(category, slug);
  if (!activity) return {};

  const italianCat = toItalianCategory(category);
  const canonical = `https://www.addioalcelibato-barcellona.it/attivita/${italianCat}/${slug}/`;
  const sanityImgs = await getSanityImages(slug);
  const ogImage = resolveActivityImage(
    sanityImgs?.coverImage ?? sanityImgs?.gridImage,
    activity.images[0] ?? "/images/2017-ADDIO-SPICY-MIX-S.jpg"
  ) ?? "/images/2017-ADDIO-SPICY-MIX-S.jpg";

  const metaTitle = (activity as { meta_title?: string }).meta_title
    ?? `${activity.name} | Addio al Celibato Barcellona`;
  const metaDesc = (activity as { meta_desc?: string }).meta_desc ?? activity.intro;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: { canonical },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: canonical,
      locale: "it_IT",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: activity.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [ogImage],
    },
  };
}

function buildBreadcrumbJsonLd(activity: ActivityDetail, category: string) {
  const BASE = "https://www.addioalcelibato-barcellona.it";
  const italianCat = toItalianCategory(category);
  const catLabel = italianCat === "notturne" ? "Attività Notturne" : "Attività Pomeridiane";
  const catUrl = `${BASE}/attivita/${italianCat}/`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
      { "@type": "ListItem", "position": 2, "name": catLabel, "item": catUrl },
      { "@type": "ListItem", "position": 3, "name": activity.name, "item": `${catUrl}${activity.slug}/` },
    ],
  };
}

function buildActivityJsonLd(activity: ActivityDetail, category: string, cardImage?: string) {
  const italianCat = toItalianCategory(category);
  const BASE = "https://www.addioalcelibato-barcellona.it";
  const url = `${BASE}/attivita/${italianCat}/${activity.slug}/`;
  const imgRaw = cardImage ?? activity.images[0] ?? "/images/2017-ADDIO-SPICY-MIX-S.jpg";
  const image = imgRaw.startsWith("http") ? imgRaw : `${BASE}${imgRaw.startsWith("/") ? imgRaw : "/" + imgRaw}`;
  const serviceType = italianCat === "notturne" ? "Attività Notturna per Addio al Celibato" : "Attività Pomeridiana per Addio al Celibato";

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": activity.name,
    "description": activity.intro,
    "url": url,
    "image": image,
    "serviceType": serviceType,
    "provider": { "@id": `${BASE}/#organization` },
    "areaServed": { "@type": "City", "name": "Barcelona", "addressCountry": "ES" },
  };

  if (activity.price) {
    const priceMatch = activity.price.match(/(\d+)/);
    if (priceMatch) {
      jsonLd["offers"] = {
        "@type": "Offer",
        "price": priceMatch[1],
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": url,
      };
    }
  }

  return jsonLd;
}

// ── Wave ───────────────────────────────────────────────────────────────────────

function Wave({ from, to }: { from: string; to: string }) {
  return (
    <div style={{ background: from, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 70" height="60" style={{ display: "block", width: "100%" }} preserveAspectRatio="none">
        <path d="M0,10 C200,70 400,0 600,40 C800,70 1000,10 1200,50 C1320,70 1380,30 1440,20 L1440,70 L0,70 Z" fill={to} />
      </svg>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function ActivityDetailPage({ params }: { params: Promise<Params> }) {
  const { category, slug } = await params;
  const activity = findActivity(category, slug);
  if (!activity) notFound();

  const c = await getContent();
  const sanityImgs = await getSanityImages(slug);
  const legacyImage = getCardImage(category, slug, c) ?? activity.images[0];
  const heroImage = resolveActivityImage(
    sanityImgs?.coverImage ?? sanityImgs?.gridImage,
    legacyImage
  ) ?? legacyImage;
  const italianCat = toItalianCategory(category);
  const backHref = `/attivita/${italianCat}`;
  const categoryLabel = italianCat === "notturne" ? "ATTIVITÀ NOTTURNE" : "ATTIVITÀ POMERIDIANE";
  const jsonLd = buildActivityJsonLd(activity, category, heroImage);
  const breadcrumbLd = buildBreadcrumbJsonLd(activity, category);

  return (
    <div style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="activity-hero" style={{
        background: heroImage ? undefined : "var(--blue)",
        minHeight: "65svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "8rem 6vw 5rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {heroImage && (
          <Image
            src={heroImage}
            alt={`${activity.name} – Addio al Celibato Barcellona`}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        )}
        {heroImage && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.92) 100%)",
          }} />
        )}
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(0.75rem, 1.4vw, 0.95rem)",
            letterSpacing: "0.3em",
            color: heroImage ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)",
            marginBottom: "0.5rem",
          }}>
            — {categoryLabel}
          </p>
          <h1 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            letterSpacing: "-0.02em",
            lineHeight: 0.88,
            color: "#fff",
            margin: "0 0 1.5rem",
            maxWidth: "18ch",
          }}>
            {activity.name}
          </h1>
          {activity.price && (
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--blue)",
              padding: "0.5rem 1.25rem",
            }}>
              <span style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(1rem, 2vw, 1.3rem)",
                letterSpacing: "0.06em",
                color: "#fff",
              }}>
                {activity.price}
              </span>
            </div>
          )}
        </div>
      </section>

      {heroImage ? (
        <div style={{ height: "2px", background: "rgba(255,255,255,0.04)" }} />
      ) : (
        <Wave from="var(--blue)" to="#000" />
      )}

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <section style={{ padding: "5rem 6vw 6rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: "5rem",
          alignItems: "start",
        }}
          className="activity-detail-grid"
        >
          {/* Left: description */}
          <div>
            {/* Intro */}
            <p style={{
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.92)",
              fontWeight: 500,
              marginBottom: "3rem",
              maxWidth: "62ch",
            }}>
              {activity.intro}
            </p>

            {/* Included items */}
            {activity.includes.length > 0 && (
              <div style={{ marginBottom: "3rem" }}>
                <h2 style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                  letterSpacing: "0.06em",
                  color: "#fff",
                  marginBottom: "1.25rem",
                }}>
                  COSA È INCLUSO
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {activity.includes.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <span style={{
                        flexShrink: 0,
                        width: "20px",
                        height: "20px",
                        background: "var(--blue)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "2px",
                      }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Full description */}
            {activity.body_html ? (
              <div
                className="nubilato-body"
                style={{ marginBottom: "2rem" }}
                dangerouslySetInnerHTML={{ __html: activity.body_html }}
              />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "2rem" }}>
                {activity.description.split("\n\n").map((para, i) => (
                  <p key={i} style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.85,
                    color: "rgba(255,255,255,0.82)",
                    fontWeight: 400,
                  }}>
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Notes */}
            {activity.notes && (
              <p style={{
                fontSize: "0.78rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.55)",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                paddingTop: "1.25rem",
                whiteSpace: "pre-line",
              }}>
                {activity.notes}
              </p>
            )}
          </div>

          {/* Right: contact form */}
          <div style={{ position: "sticky", top: "6rem" }}>
            <div style={{
              background: "#0a0a0a",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "2rem",
            }}>
              <h3 style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
                letterSpacing: "0.04em",
                color: "#fff",
                marginBottom: "0.4rem",
              }}>
                RICHIEDI PREVENTIVO
              </h3>
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                Per <strong style={{ color: "#fff" }}>{activity.name}</strong>. Risposta entro poche ore, nessun impegno.
              </p>
              <ActivityContactForm activityName={activity.name} />
              <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "0.75rem" }}>
                  O contattaci direttamente
                </p>
                <a
                  href={`https://wa.me/${c.site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.88)",
                    textDecoration: "none",
                    fontWeight: 500,
                    marginBottom: "0.4rem",
                  }}
                >
                  <span style={{ color: "var(--blue)" }}>WhatsApp</span>
                  <span>{c.site.phone}</span>
                </a>
                <a
                  href={`mailto:${c.site.email}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.75)",
                    textDecoration: "none",
                    fontWeight: 400,
                  }}
                >
                  <span style={{ color: "var(--blue)" }}>Email</span>
                  <span>{c.site.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ─────────────────────────────────────────────────── */}
      {activity.images.length > 0 && (
        <section style={{
          padding: "0 6vw 6rem",
        }}>
          <p style={{
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            marginBottom: "1.25rem",
            fontWeight: 600,
          }}>
            — GALLERY
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "2px",
          }}>
            {activity.images.map((src, i) => (
              <div key={i} style={{
                aspectRatio: "4/3",
                overflow: "hidden",
                background: "#0c0c0c",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${activity.name} foto ${i + 1}`}
                  className="gallery-img"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
