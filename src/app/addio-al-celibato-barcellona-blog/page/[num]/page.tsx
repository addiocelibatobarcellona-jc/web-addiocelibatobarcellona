import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import { getPaginatedPosts, getAllPosts, POSTS_PER_PAGE, formatDate } from "@/lib/blog";

type Params = { num: string };

export function generateStaticParams(): Params[] {
  const total = getAllPosts().length;
  const totalPages = Math.ceil(total / POSTS_PER_PAGE);
  return Array.from({ length: totalPages - 1 }, (_, i) => ({ num: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { num } = await params;
  const page = parseInt(num, 10);
  return {
    title: `Blog — Pagina ${page} | Addio al Celibato Barcellona`,
    alternates: {
      canonical: `https://www.addioalcelibato-barcellona.it/addio-al-celibato-barcellona-blog/page/${page}/`,
    },
  };
}

export default async function BlogPageNum({ params }: { params: Promise<Params> }) {
  const { num } = await params;
  const page = parseInt(num, 10);

  const { posts, totalPages, total } = getPaginatedPosts(page);

  if (!posts.length || page < 2) notFound();

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100svh" }}>

      {/* Hero */}
      <section style={{
        background: "var(--blue)",
        padding: "8rem 6vw 5rem",
        minHeight: "35svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}>
        <p style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(0.75rem, 1.4vw, 0.95rem)",
          letterSpacing: "0.3em",
          color: "rgba(0,0,0,0.45)",
          marginBottom: "0.5rem",
        }}>
          — PAGINA {page} DI {totalPages}
        </p>
        <h1 style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(3rem, 7vw, 6rem)",
          letterSpacing: "-0.02em",
          lineHeight: 0.9,
          color: "#fff",
          margin: "0 0 1rem",
        }}>
          BLOG &<br />
          <span style={{ color: "#000" }}>CONSIGLI</span>
        </h1>
        <p style={{ fontSize: "0.9rem", color: "rgba(0,0,0,0.6)", fontWeight: 400 }}>
          {total} articoli su addio al celibato e nubilato a Barcellona
        </p>
      </section>

      {/* Posts grid */}
      <section style={{ padding: "5rem 6vw 6rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1px",
        }}>
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/${post.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#0c0c0c",
                border: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
                color: "inherit",
                position: "relative",
                overflow: "hidden",
                minHeight: "320px",
                transition: "transform 0.3s cubic-bezier(0.33,1,0.68,1)",
              }}
              className="activity-grid-card"
            >
              {post.featuredImage ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    style={{
                      position: "absolute", inset: 0,
                      width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "center",
                    }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.92) 100%)",
                  }} />
                </>
              ) : (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, var(--blue) 0%, #1240cc 55%, #000c2e 100%)",
                }} />
              )}
              <div style={{
                position: "relative", zIndex: 1,
                display: "flex", flexDirection: "column",
                height: "100%", padding: "1.25rem",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{
                    fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
                  }}>
                    {formatDate(post.date)}
                  </span>
                  <ArrowUpRight size={15} style={{ color: "rgba(255,255,255,0.35)" }} />
                </div>
                <div style={{ flex: 1 }} />
                <div>
                  <h2 style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                    letterSpacing: "0.03em",
                    lineHeight: 1.05,
                    color: "#fff",
                    margin: "0 0 0.6rem",
                  }}>
                    {post.title}
                  </h2>
                  {post.metaDescription && (
                    <p style={{
                      fontSize: "0.78rem", lineHeight: 1.55,
                      color: "rgba(255,255,255,0.6)", margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {post.metaDescription}
                    </p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Pagination */}
        <div style={{
          display: "flex", gap: "0.5rem", marginTop: "4rem",
          alignItems: "center",
        }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={p === 1 ? "/addio-al-celibato-barcellona-blog" : `/addio-al-celibato-barcellona-blog/page/${p}`}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "40px", height: "40px",
                background: p === page ? "#fff" : "transparent",
                color: p === page ? "var(--blue)" : "rgba(255,255,255,0.5)",
                border: p === page ? "2px solid #fff" : "1px solid rgba(255,255,255,0.15)",
                fontFamily: "var(--font-bebas)",
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {p}
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
