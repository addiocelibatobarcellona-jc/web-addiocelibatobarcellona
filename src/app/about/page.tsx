import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getContent } from "@/lib/content";
import SiteFooter from "@/components/SiteFooter";
import MagneticButton from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "Chi Siamo | Idee per l'Addio al Celibato a Barcellona dal 2017",
  description:
    "Agenzia di italiani che vivono a Barcellona da più di 20 anni. Le migliori idee per l'addio al celibato e al nubilato a Barcellona. Preventivo gratuito.",
  alternates: { canonical: "https://www.addioalcelibato-barcellona.it/chi-siamo-idee-per-laddio-al-celibato/" },
  openGraph: {
    title: "Chi Siamo | Addio al Celibato Barcellona dal 2017",
    description: "Italiani che vivono a Barcellona da oltre 20 anni. Organizziamo addii al celibato e nubilato esclusivamente a Barcellona.",
    locale: "it_IT",
    type: "website",
    url: "https://www.addioalcelibato-barcellona.it/chi-siamo-idee-per-laddio-al-celibato/",
    siteName: "Addio al Celibato Barcellona",
    images: [{ url: "/images/2017-ADDIO-SPICY-MIX-S.jpg", width: 1200, height: 630, alt: "Chi Siamo – Addio al Celibato Barcellona" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chi Siamo | Addio al Celibato Barcellona dal 2017",
    description: "Italiani a Barcellona da 10+ anni. Solo Barcellona, massima qualità.",
    images: ["/images/2017-ADDIO-SPICY-MIX-S.jpg"],
  },
};

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

const REASONS = [
  {
    num: "01",
    title: "VIVIAMO QUI",
    desc: "Noi VIVIAMO a Barcellona, e conosciamo la città meglio di qualsiasi altra agenzia.",
  },
  {
    num: "02",
    title: "SOLO BARCELLONA",
    desc: "Organizziamo feste di addio al celibato SOLO a Barcellona.",
  },
  {
    num: "03",
    title: "SEMPRE DISPONIBILI",
    desc: "Una volta atterrati, saremo a disposizione per qualsiasi dubbio o consiglio di cui abbiate bisogno. Vogliamo che il vostro addio al celibato a Barcellona sia UNICO!",
  },
];

const STATS = [
  { value: "20+", label: "Anni a Barcellona" },
  { value: "100%", label: "Solo Barcellona" },
  { value: "★ 4.9", label: "Rating medio" },
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Addio al Celibato Barcellona",
  "url": "https://www.addioalcelibato-barcellona.it",
  "telephone": "+34673180796",
  "email": "addiocelibatobarcellona@gmail.com",
  "description": "Agenzia di italiani che vivono a Barcellona da più di 20 anni. Le migliori idee per l'addio al celibato e al nubilato a Barcellona.",
  "foundingDate": "2017",
  "areaServed": { "@type": "City", "name": "Barcelona" },
  "sameAs": [
    "https://www.facebook.com/festaaddiocelibatobarcellona/",
    "https://maps.app.goo.gl/oaPeRnXLkWpVScSv8",
    "https://it.trustpilot.com/review/addioalcelibato-barcellona.it",
  ],
};

export default async function ChiSiamo() {
  const c = await getContent();

  return (
    <div style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* ── HERO ── */}
      <section style={{
        background: "var(--blue)",
        minHeight: "55svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "8rem 6vw 5rem",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
            letterSpacing: "0.25em",
            color: "rgba(0,0,0,0.55)",
            marginBottom: "0.5rem",
          }}>
            — CHI SIAMO
          </p>
          <h1 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            letterSpacing: "-0.02em",
            lineHeight: 0.92,
            color: "#fff",
            margin: "0 0 2rem",
            maxWidth: "18ch",
          }}>
            VI MANCANO IDEE PER L&apos; ADDIO AL CELIBATO?
          </h1>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "60ch" }}>
            <p style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
              lineHeight: 1.75,
              color: "rgba(0,0,0,0.72)",
              fontWeight: 400,
            }}>
              A corto di idee per l&apos;addio al celibato? Vostro fratello, cugino, miglior amico si sposa?
              Eh sì… qualsiasi sia la vostra situazione, sicuramente non può mancare una cosa: la festa
              di addio al celibato! Ci sono molti modi per organizzarlo, più o meno economici, più o meno
              distanti e, soprattutto, più o meno divertenti.
            </p>
            <p style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
              lineHeight: 1.75,
              color: "rgba(0,0,0,0.65)",
              fontWeight: 400,
            }}>
              Tra le città più richieste negli ultimi anni c&apos;è la stupenda Barcellona: mare, sole,
              natura, festa, cibo e quel pizzico di follia che solo qui si può trovare.
            </p>
          </div>
        </div>
      </section>

      <Wave from="var(--blue)" to="#000" />

      {/* ── CHI SIAMO TEXT ── */}
      <section style={{ padding: "6rem 6vw 7rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }} className="about-main-grid">
          <div>
            <h2 style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              letterSpacing: "-0.01em",
              lineHeight: 0.9,
              color: "var(--blue)",
              margin: "0 0 2rem",
            }}>
              CHI<br />SIAMO?
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(255,255,255,0.85)" }}>
                <strong style={{ color: "#fff" }}>Addioalcelibato-barcellona.it</strong> è un agente di viaggio con sede a Barcellona.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(255,255,255,0.75)" }}>
                Noi di addioalcelibato-barcellona siamo un&apos;agenzia di Italiani che vivono qui da più di
                20 anni, che conoscono la città alla perfezione e che sapranno darvi consigli ed idee su
                misura per il vostro addio al celibato o nubilato a Barcellona.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(255,255,255,0.75)" }}>
                Scopri cosa dicono di noi i nostri clienti leggendo le loro{" "}
                <a
                  href="https://maps.app.goo.gl/5svurwM9AqGeFuBJ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--blue)", textDecoration: "underline" }}
                >
                  RECENSIONI
                </a>.
              </p>
            </div>
          </div>

          {/* Stats — 3 in a column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.08)" }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ background: "#000", padding: "2rem 2rem" }}>
                <div style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                  color: "var(--blue)",
                  lineHeight: 1,
                  marginBottom: "0.4rem",
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Wave from="#000" to="var(--blue)" flip />

      {/* ── PERCHÉ NOI ── */}
      <section style={{ background: "var(--blue)", padding: "6rem 6vw 7rem" }}>
          <h2 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            letterSpacing: "-0.01em",
            lineHeight: 0.9,
            color: "#000",
            margin: "0 0 0.75rem",
          }}>
            PERCHÉ METTERE BARCELLONA<br />
            <span style={{ color: "#fff" }}>TRA LE VOSTRE IDEE?</span>
          </h2>
          <p style={{
            fontSize: "1rem", lineHeight: 1.7,
            color: "rgba(0,0,0,0.6)", maxWidth: "50ch",
            marginBottom: "4rem",
          }}>
            Qui alcuni motivi per scegliere noi.
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {REASONS.map((r, i) => (
              <div
                key={r.num}
                style={{
                  display: "flex", alignItems: "flex-start", gap: "2.5rem",
                  padding: "2.5rem 0",
                  borderBottom: i < REASONS.length - 1 ? "1px solid rgba(0,0,0,0.15)" : "none",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(3rem, 5vw, 4.5rem)",
                  color: "rgba(0,0,0,0.18)",
                  lineHeight: 1,
                  flexShrink: 0,
                  minWidth: "3rem",
                }}>
                  {r.num}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    letterSpacing: "0.06em",
                    color: "#000",
                    margin: "0 0 0.6rem",
                  }}>
                    {r.title}
                  </h3>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(0,0,0,0.65)", maxWidth: "55ch" }}>
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
      </section>

      <Wave from="var(--blue)" to="#000" />

      {/* ── E BARCELLONA SIA ── */}
      <section style={{ padding: "6rem 6vw 7rem" }}>
          <h2 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            letterSpacing: "-0.01em",
            lineHeight: 0.9,
            color: "#fff",
            margin: "0 0 4rem",
          }}>
            E BARCELLONA<br />
            <span style={{ color: "var(--blue)" }}>SIA…</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="about-bcn-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(255,255,255,0.8)" }}>
                Se tra le vostre idee per l&apos;addio al celibato avete incluso Barcellona, avete diverse
                opzioni: organizzare la festa per conto proprio, però con il rischio di perdere tempo,
                rischiando che la festa risulti banale. Ne vale veramente la pena?
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(255,255,255,0.75)" }}>
                Tutte le altre agenzie sono concentrate non solo su Barcellona ma su molte altre città.
                Questo fa in modo che l&apos;esperienza e l&apos;attenzione offerta non sia la stessa.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(255,255,255,0.75)" }}>
                Noi siamo qui, viviamo qui e da più di 20 anni conosciamo posti, luoghi, ristoranti,
                bar, feste, discoteche e qualsiasi altra cosa che la città possa offrire. Garantiamo
                un servizio unico e piena disponibilità per ogni richiesta o dubbio una volta sul luogo.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(255,255,255,0.75)" }}>
                Se state cercando idee per l&apos;addio al celibato, allora siete nel posto giusto!
                Organizziamo feste di addio al celibato a Barcellona di qualsiasi tipo e per qualsiasi
                budget, offrendo svariatissime attività tanto notturne quanto diurne.
              </p>
              <a href="/attivita" className="neon-cta" style={{ alignSelf: "flex-start", marginTop: "1rem" }}>
                DAI UN&apos;OCCHIATA ALLE NOSTRE OFFERTE <ArrowUpRight size={15} />
              </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: "🌊", text: "Mare e spiagge a 20 minuti dal centro" },
                { icon: "🌞", text: "300+ giorni di sole all'anno" },
                { icon: "🎉", text: "Vita notturna tra le migliori d'Europa" },
                { icon: "🍽️", text: "Gastronomia catalana e internazionale" },
                { icon: "🏖️", text: "Attività diurne uniche: paddle surf, quad, go-kart" },
                { icon: "🎭", text: "Spettacoli ed esperienze indimenticabili" },
              ].map((item) => (
                <div key={item.text} className="bcn-feature-item" style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  padding: "1rem 1.25rem",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "#0c0c0c",
                }}>
                  <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{item.icon}</span>
                  <span className="bcn-feature-text" style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        background: "var(--blue)",
        padding: "5rem 6vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "2rem",
      }}>
        <h2 style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          letterSpacing: "-0.01em",
          lineHeight: 0.9,
          color: "#000",
          margin: 0,
        }}>
          RICHIEDETE UN PREVENTIVO<br />
          <span style={{ color: "#fff" }}>SENZA IMPEGNO!</span>
        </h2>
        <p style={{ fontSize: "1rem", color: "rgba(0,0,0,0.65)", maxWidth: "44ch", lineHeight: 1.7 }}>
          Contattarci è completamente gratuito. Dicci cosa cerchi e ti prepariamo
          un preventivo su misura in poche ore.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <MagneticButton href="/addio-al-celibato-barcellona-contatti" className="neon-cta">
            PREVENTIVO GRATIS <ArrowRight size={16} />
          </MagneticButton>
          <a href="/attivita" className="neon-cta" style={{ background: "transparent", color: "#000", borderColor: "#000" }}>
            VEDI LE ATTIVITÀ <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      {/* ── LEGAL ── */}
      <section style={{ padding: "2.5rem 6vw", background: "#000", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", lineHeight: 1.9, margin: 0 }}>
          Addioalcelibato-barcellona.it é un prodotto di<br />
          ORGANIZACION Y DIRECCION DE EVENTOS S.L.<br />
          Avenida Paralelo Nº91 Bis Entresuelo 1ª<br />
          BARCELONA 08004 (Barcelona)<br />
          CIF: B65268237
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
