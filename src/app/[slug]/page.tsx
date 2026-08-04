import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import { getPostBySlug, getAllPostSlugs, formatDate } from "@/lib/blog";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const canonical = `https://www.addioalcelibato-barcellona.it/${slug}/`;
  const ogImage = post.featuredImage ?? "/images/2017-ADDIO-SPICY-MIX-S.jpg";
  return {
    title: `${post.title} | Addio al Celibato Barcellona`,
    description: post.metaDescription ?? undefined,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.metaDescription ?? undefined,
      url: canonical,
      locale: "it_IT",
      type: "article",
      siteName: "Addio al Celibato Barcellona",
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription ?? undefined,
      images: [ogImage],
    },
  };
}

function renderMarkdown(md: string) {
  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    if (!line.trim()) { key++; continue; }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(1.1rem, 2vw, 1.5rem)", letterSpacing: "0.04em", color: "var(--blue)", margin: "2rem 0 0.6rem" }}>
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "0.03em", color: "#fff", margin: "2.5rem 0 0.75rem" }}>
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h2 key={key++} style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(1.6rem, 3vw, 2.5rem)", letterSpacing: "0.03em", color: "#fff", margin: "2.5rem 0 0.75rem" }}>
          {line.slice(2)}
        </h2>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <li key={key++} style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(255,255,255,0.8)", marginBottom: "0.4rem", paddingLeft: "0.5rem" }}>
          {line.slice(2)}
        </li>
      );
    } else {
      const html = line
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>");
      elements.push(
        <p key={key++} style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(255,255,255,0.78)", marginBottom: "1rem" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
  }
  return elements;
}

function buildArticleJsonLd(post: Awaited<ReturnType<typeof getPostBySlug>> & object) {
  const canonical = `https://www.addioalcelibato-barcellona.it/${post.slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription ?? undefined,
    "url": canonical,
    "datePublished": post.date,
    "dateModified": post.date,
    "image": post.featuredImage
      ? `https://www.addioalcelibato-barcellona.it${post.featuredImage.startsWith("/") ? post.featuredImage : "/" + post.featuredImage}`
      : "https://www.addioalcelibato-barcellona.it/images/2017-ADDIO-SPICY-MIX-S.jpg",
    "author": {
      "@type": "Organization",
      "name": "Addio al Celibato Barcellona",
      "url": "https://www.addioalcelibato-barcellona.it/",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Addio al Celibato Barcellona",
      "url": "https://www.addioalcelibato-barcellona.it/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.addioalcelibato-barcellona.it/images/2017-logoaddioalcelibatoblancohori2-1.png",
      },
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
    "inLanguage": "it",
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = buildArticleJsonLd(post);

  return (
    <div style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section style={{
        minHeight: "55svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "8rem 6vw 5rem",
        position: "relative",
        overflow: "hidden",
        background: post.featuredImage ? undefined : "var(--blue)",
      }}>
        {post.featuredImage && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={post.featuredImage}
            alt={post.title}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
            }}
          />
        )}
        {post.featuredImage && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.95) 100%)",
          }} />
        )}
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(0.75rem, 1.4vw, 0.95rem)",
            letterSpacing: "0.3em",
            color: post.featuredImage ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
            marginBottom: "0.5rem",
          }}>
            — BLOG · {formatDate(post.date)}
          </p>
          <h1 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(2.2rem, 5vw, 5rem)",
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
            color: "#fff",
            margin: "0 0 1.5rem",
            maxWidth: "22ch",
          }}>
            {post.title}
          </h1>
          {post.metaDescription && (
            <p style={{
              fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.7)",
              maxWidth: "58ch",
              fontWeight: 400,
            }}>
              {post.metaDescription}
            </p>
          )}
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: "5rem 6vw 7rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "6rem", alignItems: "start" }}
          className="activity-detail-grid">

          {/* Article content */}
          <article>
            {renderMarkdown(post.bodyMarkdown)}
          </article>

          {/* Sidebar CTA */}
          <aside style={{ position: "sticky", top: "6rem" }}>
            <div style={{
              background: "#0a0a0a",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "2rem",
            }}>
              <p style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "0.75rem", letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.35)", marginBottom: "1rem",
              }}>
                — ADDIO AL CELIBATO
              </p>
              <h3 style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
                letterSpacing: "0.04em",
                color: "#fff",
                marginBottom: "0.75rem",
              }}>
                PREVENTIVO GRATIS
              </h3>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.55, marginBottom: "1.5rem" }}>
                Organizziamo addii al celibato a Barcellona dal 2017. Contattaci senza impegno.
              </p>
              <a href="/addio-al-celibato-barcellona-contatti" className="neon-cta" style={{ width: "100%", justifyContent: "center" }}>
                SCRIVICI ORA <ArrowUpRight size={14} />
              </a>
              <a
                href="/addio-al-celibato-barcellona-blog"
                style={{
                  display: "block", marginTop: "1.25rem",
                  fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)", textDecoration: "none", textAlign: "center",
                  transition: "color 0.2s",
                }}
              >
                ← Tutti gli articoli
              </a>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
