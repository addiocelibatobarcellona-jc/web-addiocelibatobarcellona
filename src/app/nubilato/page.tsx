import type { Metadata } from "next";
import { ArrowUpRight, ArrowRight, MessageCircle, MapPin, Target, Headphones } from "lucide-react";
import { getContent } from "@/lib/content";
import BottomNav from "@/components/BottomNav";
import SiteFooter from "@/components/SiteFooter";
import BackHome from "@/components/BackHome";

export const metadata: Metadata = {
  title: "Addio al Nubilato a Barcellona | Attività ed Idee dal 2017",
  description:
    "Organizziamo addii al nubilato a Barcellona dal 2017. Strip show maschile, catamaran, limousine, cocktail lab e molto altro. Preventivo gratuito senza impegno.",
  alternates: { canonical: "https://www.addioalcelibato-barcellona.it/addio-al-nubilato/" },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const HERO_IMG =
  "https://addioalcelibato-barcellona.it/wp-content/uploads/2026/02/addio-nubilato-home-page-scaled.jpg";

const ACTIVITIES = [
  {
    name: "Cena Strip Disco",
    desc: "Cena con open bar, spettacolo di striptease maschile e ingresso in discoteca. La serata classica per eccellenza.",
    price: "74€ / persona",
    tag: "Best Seller",
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2026/02/cena-strip-disco-nubilato-1.png",
  },
  {
    name: "All Inclusive Gold",
    desc: "La formula completa: cena, limousine, striptease e discoteca. Nessun pensiero, solo divertimento.",
    price: "115€ / persona",
    tag: "Premium",
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2017/04/All-Inclusive-Gold-Nubilato.jpg",
  },
  {
    name: "Spicy Mix – Collettivo",
    desc: "Serata collettiva con cena, open bar di sangria, spettacoli internazionali, animazioni e striptease.",
    price: "79€ / persona",
    tag: "Più venduto",
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2017/01/CRAZYMIX.jpg",
  },
  {
    name: "Cena Limo Disco",
    desc: "Cena con open bar, giro in lussuosa limousine e ingresso in discoteca per una serata da star.",
    price: "89€ / persona",
    tag: null,
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2017/01/CENALIMODISCO-S.jpg",
  },
  {
    name: "Strip Show",
    desc: "Show di striptease maschile professionale in sala privata. Semplice, diretto e sempre efficace.",
    price: "27€ / persona",
    tag: null,
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2017/04/Stri-show-nubilato-S.jpg",
  },
  {
    name: "Cheeky Butler",
    desc: "Un maggiordomo con pochissimi vestiti al vostro servizio per tutta la serata. Sorprese garantite.",
    price: "32€ / persona",
    tag: null,
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2026/02/addio-nubilato-home-size-ok.jpg",
  },
  {
    name: "Caccia al Tesoro",
    desc: "Tour di Barcellona in stile caccia al tesoro: prove, missioni segrete e tanto divertimento per il gruppo.",
    price: "45€ / persona",
    tag: null,
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2024/03/journey-1130732_1280.jpg",
  },
  {
    name: "Cocktail Lab",
    desc: "Imparate a preparare i migliori cocktail con un bartender professionista. Brindisi finale con le vostre creazioni.",
    price: "50€ / persona",
    tag: null,
    image: null,
  },
  {
    name: "Crazy Catamaran Party",
    desc: "Festa in catamarano sul Mediterraneo con open bar a bordo. Sole, musica e mare cristallino.",
    price: "69€ / persona",
    tag: "Mare",
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2017/01/CRAZY-CATAMARAN-PARTY-S.jpg",
  },
  {
    name: "LimoBus",
    desc: "Open bar in movimento sul lussuoso limo-bus. Un dance floor su ruote per le strade di Barcellona.",
    price: "42€ / persona",
    tag: null,
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2017/01/Limobus-S.jpg",
  },
  {
    name: "Giretto in Limousine",
    desc: "Tour panoramico di Barcellona a bordo di una limousine di lusso con spumante incluso.",
    price: "39€ / persona",
    tag: null,
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2017/01/GIRETTO-IN-LIMO.jpg",
  },
  {
    name: "Escape Room",
    desc: "60 minuti per risolvere enigmi e scappare. Perfetta per rompere il ghiaccio tra il gruppo.",
    price: "35€ / persona",
    tag: null,
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2022/02/Escape-Room-addio-al-celibato-Barcellona.jpg",
  },
  {
    name: "La Beerbike",
    desc: "Pedalate, cantate e bevete birra per le strade di Barcellona su questo mezzo assolutamente unico.",
    price: "50€ / persona",
    tag: "Classico",
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2017/01/Bici-birra-1.jpg",
  },
  {
    name: "Disco VIP",
    desc: "Ingresso in lista VIP nelle migliori discoteche di Barcellona. La notte vera inizia dopo la mezzanotte.",
    price: "GRATIS",
    tag: null,
    image: null,
  },
  {
    name: "Tutti al Mare",
    desc: "Mix di attività acquatiche sulla costa di Barcellona: paddle surf, kayak, snorkeling e relax al sole.",
    price: "Da 20€ / pers.",
    tag: "Mare",
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2017/01/TUTTI-AL-MARE.jpg",
  },
  {
    name: "Archery Tag",
    desc: "Combattimento a squadre con arco e frecce imbottite. Adrenalina, risate e spirito di squadra.",
    price: "25€ / persona",
    tag: "Adrenalina",
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2017/02/archerytag.jpg",
  },
  {
    name: "Segway Barcellona",
    desc: "Tour di Barcellona in Segway. Facile, divertente e assolutamente memorabile per tutto il gruppo.",
    price: "45€ / persona",
    tag: null,
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2017/03/BarcelonaSegway-T24-d_O.jpg",
  },
  {
    name: "Altre Attività",
    desc: "Quad, laser combat, paintball e molto altro. Contattateci per creare il programma perfetto per voi.",
    price: "Da 25€ / pers.",
    tag: null,
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2017/01/ALTRE-ATTIVITA.jpg",
  },
  {
    name: "Barca a Vela Privata",
    desc: "Giro in barca a vela privato, solo per il vostro gruppo. Sole, mare e Barcellona vista dall'acqua.",
    price: "60€ / persona",
    tag: null,
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2017/01/BARCA-A-VELA-PRIVATA-S.jpg",
  },
  {
    name: "Vespa GPS",
    desc: "Scoprite Barcellona in Vespa con navigatore GPS integrato. Libertà totale per il vostro gruppo.",
    price: "45€ / persona",
    tag: null,
    image: "https://addioalcelibato-barcellona.it/wp-content/uploads/2017/01/VESPA-GPS-small.jpg",
  },
];

const WHY_US = [
  {
    Icon: MapPin,
    title: "Viviamo a Barcellona",
    desc: "Noi VIVIAMO qui e conosciamo la città meglio di qualsiasi altra agenzia. Zero intermediari, massima qualità.",
  },
  {
    Icon: Target,
    title: "Solo Barcellona",
    desc: "Organizziamo feste di addio al nubilato SOLO a Barcellona. La specializzazione garantisce il miglior servizio.",
  },
  {
    Icon: Headphones,
    title: "Sempre Disponibili",
    desc: "Una volta atterrate saremo disponibili per qualsiasi dubbio o consiglio durante tutto il vostro soggiorno.",
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function Wave({ from, to }: { from: string; to: string }) {
  return (
    <div style={{ background: from, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 70" style={{ display: "block", width: "100%" }} preserveAspectRatio="none">
        <path d="M0,10 C200,70 400,0 600,40 C800,70 1000,10 1200,50 C1320,70 1380,30 1440,20 L1440,70 L0,70 Z" fill={to} />
      </svg>
    </div>
  );
}

function ActivityCard({
  name, desc, price, tag, image,
}: { name: string; desc: string; price: string; tag: string | null; image: string | null }) {
  return (
    <a
      href="/addio-al-celibato-barcellona-contatti"
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
        minHeight: "320px",
        transition: "transform 0.3s cubic-bezier(0.33,1,0.68,1)",
      }}
      className="activity-grid-card"
    >
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
          <h3 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
            letterSpacing: "0.03em",
            lineHeight: 1,
            color: "#fff",
            marginBottom: tag ? "0.4rem" : "0.6rem",
          }}>
            {name}
          </h3>
          {tag && (
            <span style={{
              display: "inline-block",
              fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", padding: "0.2rem 0.5rem",
              border: "1px solid rgba(255,255,255,0.25)", borderRadius: "100px",
              color: "rgba(255,255,255,0.65)", marginBottom: "0.6rem",
              background: image ? "rgba(0,0,0,0.25)" : undefined,
              backdropFilter: image ? "blur(6px)" : undefined,
            }}>
              {tag}
            </span>
          )}
          <p style={{
            fontSize: "0.8rem", lineHeight: 1.6,
            color: image ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)",
            marginBottom: "0.85rem",
            fontWeight: 400,
          }}>
            {desc}
          </p>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "0.6rem",
          }}>
            <span style={{ fontFamily: "var(--font-bebas)", fontSize: "1.5rem", letterSpacing: "0.02em", color: "var(--blue)" }}>
              {price}
            </span>
            <ArrowUpRight size={12} style={{ color: "rgba(255,255,255,0.35)" }} />
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NubilatoPage() {
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

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.95) 100%), url(${HERO_IMG}) center/cover no-repeat`,
        minHeight: "80svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "8rem 6vw 5rem",
        position: "relative",
      }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <BackHome light />
          <p style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(0.75rem, 1.4vw, 0.95rem)",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "0.5rem",
          }}>
            — BARCELLONA · DAL 2017
          </p>
          <h1 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            letterSpacing: "-0.03em",
            lineHeight: 0.85,
            color: "#fff",
            margin: 0,
            maxWidth: "16ch",
          }}>
            ADDIO AL<br />
            <span style={{ color: "var(--blue)" }}>NUBILATO</span><br />
            <span style={{ fontSize: "0.55em", color: "rgba(255,255,255,0.55)", letterSpacing: "0.01em" }}>
              NELLA CITTÀ PIÙ DIVERTENTE D&apos;EUROPA
            </span>
          </h1>
        </div>
      </section>

      {/* ── INTRO + WHY US ────────────────────────────────────────────────── */}
      <section style={{ padding: "5rem 6vw 5rem", background: "#000" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
            marginBottom: "4rem",
          }}
            className="nubilato-intro-grid"
          >
            <div>
              <p style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "0.75rem",
              }}>
                — ADDIO AL NUBILATO BARCELLONA
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
                <span style={{ color: "var(--blue)" }}>NUBILATO UNICO</span>
              </h2>
              <p style={{
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.82)",
                fontWeight: 400,
                maxWidth: "52ch",
                marginBottom: "1.25rem",
              }}>
                Sei alla ricerca di idee per un addio al nubilato a Barcellona davvero unico? Sei nel posto giusto! Proponiamo attività pomeridiane e notturne per tutti i gusti, e saremo disponibili per consigli durante tutto il soggiorno.
              </p>
              <p style={{
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.75)",
                fontWeight: 400,
                maxWidth: "52ch",
              }}>
                Organizzare una festa di addio al nubilato come si deve è il dovere di ogni buona amica. Non esitare e contattaci — il <strong style={{ color: "#fff" }}>PREVENTIVO È GRATIS!</strong>
              </p>
            </div>

            {/* Why us */}
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
              {WHY_US.map(({ Icon, title, desc }) => (
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
              ))}
            </div>
          </div>
        </div>
      </section>

      <Wave from="#000" to="#000" />

      {/* ── ACTIVITIES GRID ───────────────────────────────────────────────── */}
      <section style={{ padding: "0 6vw 6rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              letterSpacing: "-0.01em",
              lineHeight: 1,
              color: "#fff",
              margin: 0,
            }}>
              TUTTE LE ATTIVITÀ
            </h2>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>
              {ACTIVITIES.length} attività disponibili
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
          }}
            className="nubilato-grid"
          >
            {ACTIVITIES.map((act) => (
              <ActivityCard key={act.name} {...act} />
            ))}
          </div>

        </div>
      </section>

      {/* ── CONTACT STRIP ─────────────────────────────────────────────────── */}
      <section style={{
        background: "var(--blue)",
        padding: "3rem 4vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "2rem",
      }}>
        <div>
          <h3 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            letterSpacing: "-0.01em",
            color: "#fff",
            margin: "0 0 0.3rem",
          }}>
            PRONTA A ORGANIZZARE?
          </h3>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", margin: 0, fontWeight: 400 }}>
            Contattaci subito — risposta entro poche ore, preventivo 100% gratuito.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a
            href="/addio-al-celibato-barcellona-contatti"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "var(--font-bebas)", fontSize: "0.85rem", letterSpacing: "0.12em",
              padding: "0.85rem 1.75rem",
              background: "#fff", color: "#000", textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            SCRIVI ORA <ArrowRight size={14} />
          </a>
          <a
            href={`https://wa.me/34673180796`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "var(--font-bebas)", fontSize: "0.85rem", letterSpacing: "0.12em",
              padding: "0.85rem 1.75rem",
              border: "2px solid rgba(255,255,255,0.5)", color: "#fff", textDecoration: "none",
            }}
          >
            <MessageCircle size={14} /> WHATSAPP
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
