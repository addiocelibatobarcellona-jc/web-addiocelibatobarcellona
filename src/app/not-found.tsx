import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pagina non trovata | Addio al Celibato Barcellona",
};

export default function NotFound() {
  return (
    <div style={{
      background: "#000",
      color: "#fff",
      minHeight: "100svh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "6rem 6vw",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Noise texture overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        backgroundSize: "200px",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Blue glow */}
      <div style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
        background: "radial-gradient(ellipse, rgba(21,84,255,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "680px" }}>

        {/* 404 big number */}
        <p style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(7rem, 20vw, 16rem)",
          letterSpacing: "-0.04em",
          lineHeight: 0.85,
          color: "var(--blue)",
          margin: "0 0 1.5rem",
          opacity: 0.9,
        }}>
          404
        </p>

        {/* Eyebrow */}
        <p style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
          letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.35)",
          marginBottom: "1rem",
          textTransform: "uppercase",
        }}>
          — BARCELLONA · DAL 2017
        </p>

        {/* Headline */}
        <h1 style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(2rem, 5vw, 4rem)",
          letterSpacing: "-0.01em",
          lineHeight: 1,
          color: "#fff",
          margin: "0 0 1.5rem",
        }}>
          LO SPOSO HA GIÀ<br />
          <span style={{ color: "var(--blue)" }}>TROVATO LA PAGINA.</span><br />
          TU NO.
        </h1>

        {/* Comic text */}
        <p style={{
          fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
          lineHeight: 1.75,
          color: "rgba(255,255,255,0.55)",
          maxWidth: "52ch",
          margin: "0 auto 2.5rem",
        }}>
          Probabilmente stavi cercando qualcosa di epico per l'addio al celibato
          e il browser ti ha abbandonato — proprio come il futuro sposo sta abbandonando
          la libertà. Tranquillo, noi non ti lasciamo a piedi.
        </p>

        {/* CTA */}
        <Link href="/" className="neon-cta">
          TORNA ALLA HOME
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </Link>

        {/* Bottom hint */}
        <p style={{
          marginTop: "3rem",
          fontSize: "0.72rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.2)",
        }}>
          Oppure scrivi una lettera al browser. Non risponderà.
        </p>

      </div>
    </div>
  );
}
