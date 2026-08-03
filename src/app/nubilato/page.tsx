import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, MessageCircle, MapPin, Target, User } from "lucide-react";
import { getContent } from "@/lib/content";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Addio al Nubilato a Barcellona | Attività ed Idee dal 2017",
  description:
    "Organizziamo addii al nubilato a Barcellona dal 2017. Strip show maschile, catamaran, limousine, cocktail lab e molto altro. Preventivo gratuito senza impegno.",
  alternates: { canonical: "https://www.addioalcelibato-barcellona.it/addio-al-nubilato/" },
  openGraph: {
    title: "Addio al Nubilato a Barcellona | Dal 2017",
    description: "20+ attività per il tuo addio al nubilato a Barcellona. Strip show maschile, catamaran, limousine e molto altro. Preventivo gratuito!",
    locale: "it_IT",
    type: "website",
    url: "https://www.addioalcelibato-barcellona.it/addio-al-nubilato/",
    siteName: "Addio al Celibato Barcellona",
    images: [{ url: "/images/2026-addio-nubilato-home-page-scaled.jpg", width: 1200, height: 630, alt: "Addio al Nubilato Barcellona" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Addio al Nubilato a Barcellona | Dal 2017",
    description: "20+ attività per il tuo addio al nubilato a Barcellona. Preventivo gratuito!",
    images: ["/images/2026-addio-nubilato-home-page-scaled.jpg"],
  },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const HERO_IMG =
  "/images/2026-addio-nubilato-home-page-scaled.jpg";

const CONTACT = "/addio-al-celibato-barcellona-contatti";
const NUB = (slug: string) => `/addio-al-nubilato/${slug}/`;

const ACTIVITIES = [
  {
    name: "Cena Strip Disco",
    desc: "Cena con open bar, spettacolo di striptease maschile e ingresso in discoteca. La serata classica per eccellenza.",
    price: "74€ / persona",
    tag: "Best Seller",
    image: "/images/2026-cena-strip-disco-nubilato-1.png",
    href: NUB("addio-al-nubilato-con-spogliarellista-a-barcellona"),
  },
  {
    name: "All Inclusive Gold",
    desc: "La formula completa: cena, limousine, striptease e discoteca. Nessun pensiero, solo divertimento.",
    price: "115€ / persona",
    tag: "Premium",
    image: "/images/2017-All-Inclusive-Gold-Nubilato.jpg",
    href: NUB("addio-nubilato-spogliarellista-limousine-barcellona"),
  },
  {
    name: "Spicy Mix – Collettivo",
    desc: "Serata collettiva con cena, open bar di sangria, spettacoli internazionali, animazioni e striptease.",
    price: "79€ / persona",
    tag: "Più venduto",
    image: "/images/2017-CRAZYMIX.jpg",
    href: NUB("addio-al-nubilato-collettivo-barcellona"),
  },
  {
    name: "Cena Limo Disco",
    desc: "Cena con open bar, giro in lussuosa limousine e ingresso in discoteca per una serata da star.",
    price: "89€ / persona",
    tag: null,
    image: "/images/2017-CENALIMODISCO-S.jpg",
    href: "/attivita/notturne/addio-al-celibato-con-limousine/",
  },
  {
    name: "Strip Show",
    desc: "Show di striptease maschile professionale in sala privata. Semplice, diretto e sempre efficace.",
    price: "27€ / persona",
    tag: null,
    image: "/images/2017-Stri-show-nubilato-S.jpg",
    href: NUB("addio-nubilato-spogliarellista-show-barcellona"),
  },
  {
    name: "Cheeky Butler",
    desc: "Un maggiordomo con pochissimi vestiti al vostro servizio per tutta la serata. Sorprese garantite.",
    price: "32€ / persona",
    tag: null,
    image: "/images/2018-Cheeky-Butler-3.jpg",
    href: NUB("cheeky-butler-barcellona"),
  },
  {
    name: "Caccia al Tesoro",
    desc: "Tour di Barcellona in stile caccia al tesoro: prove, missioni segrete e tanto divertimento per il gruppo.",
    price: "45€ / persona",
    tag: null,
    image: "/images/2024-journey-1130732_1280.jpg",
    href: NUB("caccia-al-tesoro-addio-nubilato-barcellona"),
  },
  {
    name: "Cocktail Lab",
    desc: "Imparate a preparare i migliori cocktail con un bartender professionista. Brindisi finale con le vostre creazioni.",
    price: "50€ / persona",
    tag: null,
    image: "/images/2017-cocktail-lab.jpg",
    href: CONTACT,
  },
  {
    name: "Crazy Catamaran Party",
    desc: "Festa in catamarano sul Mediterraneo con open bar a bordo. Sole, musica e mare cristallino.",
    price: "69€ / persona",
    tag: "Mare",
    image: "/images/2017-catamaran-nubilato.jpg",
    href: "/attivita/pomeridiane/addio-al-nubilato-in-catamarano-a-barcellona/",
  },
  {
    name: "LimoBus",
    desc: "Open bar in movimento sul lussuoso limo-bus. Un dance floor su ruote per le strade di Barcellona.",
    price: "42€ / persona",
    tag: null,
    image: "/images/2017-Limobus-S.jpg",
    href: NUB("addio-al-nubilato-barcellona-limobus"),
  },
  {
    name: "Giretto in Limousine",
    desc: "Tour panoramico di Barcellona a bordo di una limousine di lusso con spumante incluso.",
    price: "39€ / persona",
    tag: null,
    image: "/images/2017-GIRETTO-IN-LIMO.jpg",
    href: NUB("addio-nubilato-giretto-limo"),
  },
  {
    name: "Escape Room",
    desc: "60 minuti per risolvere enigmi e scappare. Perfetta per rompere il ghiaccio tra il gruppo.",
    price: "35€ / persona",
    tag: null,
    image: "/images/2018-Escape-Room-Barcellona-Celibato.jpg",
    href: NUB("escape-room-game-nubilato-barcellona"),
  },
  {
    name: "La Beerbike",
    desc: "Pedalate, cantate e bevete birra per le strade di Barcellona su questo mezzo assolutamente unico.",
    price: "50€ / persona",
    tag: "Classico",
    image: "/images/2017-Bici-birra-1.jpg",
    href: "/attivita/pomeridiane/addio-nubilato-beerbike-barcellona/",
  },
  {
    name: "Disco VIP",
    desc: "Ingresso in lista VIP nelle migliori discoteche di Barcellona. La notte vera inizia dopo la mezzanotte.",
    price: "GRATIS",
    tag: null,
    image: "/images/2017-migliori-discoteche-di-barcellona-2.jpg",
    href: NUB("migliori-discoteche-barcellona"),
  },
  {
    name: "Tutti al Mare",
    desc: "Mix di attività acquatiche sulla costa di Barcellona: paddle surf, kayak, snorkeling e relax al sole.",
    price: "Da 20€ / pers.",
    tag: "Mare",
    image: "/images/2017-TUTTI-AL-MARE.jpg",
    href: "/attivita/pomeridiane/addio-celibato-paddle-surf-barcellona/",
  },
  {
    name: "Archery Tag",
    desc: "Combattimento a squadre con arco e frecce imbottite. Adrenalina, risate e spirito di squadra.",
    price: "25€ / persona",
    tag: "Adrenalina",
    image: "/images/2017-archerytag.jpg",
    href: CONTACT,
  },
  {
    name: "Segway Barcellona",
    desc: "Tour di Barcellona in Segway. Facile, divertente e assolutamente memorabile per tutto il gruppo.",
    price: "45€ / persona",
    tag: null,
    image: "/images/2017-BarcelonaSegway-T24-d_O.jpg",
    href: CONTACT,
  },
  {
    name: "Altre Attività",
    desc: "Quad, laser combat, paintball e molto altro. Contattateci per creare il programma perfetto per voi.",
    price: "Da 25€ / pers.",
    tag: null,
    image: "/images/2017-ALTRE-ATTIVITA.jpg",
    href: CONTACT,
  },
  {
    name: "Barca a Vela Privata",
    desc: "Giro in barca a vela privato, solo per il vostro gruppo. Sole, mare e Barcellona vista dall'acqua.",
    price: "60€ / persona",
    tag: null,
    image: "/images/2017-BARCA-A-VELA-PRIVATA-S.jpg",
    href: "/attivita/pomeridiane/addio-al-celibato-in-barca-a-vela-privata/",
  },
  {
    name: "Vespa GPS",
    desc: "Scoprite Barcellona in Vespa con navigatore GPS integrato. Libertà totale per il vostro gruppo.",
    price: "45€ / persona",
    tag: null,
    image: "/images/2017-VESPA-GPS-small.jpg",
    href: "/attivita/pomeridiane/vespa-gps/",
  },
];

const WHY_US = [
  {
    Icon: MapPin,
    title: "ACCESSO DIRETTO",
    desc: "Siamo sul posto e conosciamo la città come le nostre tasche. Nessun intermediario: solo esperienze testate e qualità garantita.",
  },
  {
    Icon: Target,
    title: "FOCUS 100% BARCELLONA",
    desc: "Facciamo una cosa sola e la facciamo al top: addii al nubilato esclusivi nella nostra città. Zero imprevisti, massimo risultato.",
  },
  {
    Icon: User,
    title: "SUPPORTO SU MISURA",
    desc: "Un referente dedicato sempre al fianco del tuo gruppo. Consigli reali, dritte locali e organizzazione perfetta dall'inizio alla fine.",
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function ActivityCard({
  name, desc, price, tag, image, href,
}: { name: string; desc: string; price: string; tag: string | null; image: string | null; href: string }) {
  return (
    <a
      href={href}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#0c0c0c",
        border: "1px solid rgba(255,255,255,0.06)",
        textDecoration: "none",
        color: "inherit",
        position: "relative",
        overflow: "hidden",
        minHeight: "480px",
        transition: "transform 0.3s cubic-bezier(0.33,1,0.68,1)",
      }}
      className="activity-grid-card"
    >
      {image && (
        <Image
          src={image}
          alt={name}
          fill
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
            <span style={{ fontFamily: "var(--font-bebas)", fontSize: "2rem", letterSpacing: "0.02em", color: "#fff" }}>
              {price}
            </span>
            <ArrowUpRight size={14} style={{ color: "rgba(255,255,255,0.5)" }} />
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const BASE = "https://www.addioalcelibato-barcellona.it";

const nubilatoJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Addio al Celibato Barcellona – Addio al Nubilato",
  "url": `${BASE}/addio-al-nubilato/`,
  "telephone": "+34673180796",
  "description": "Organizziamo addii al nubilato a Barcellona dal 2017. Strip show maschile, catamaran, limousine, cocktail lab e molto altro. Preventivo gratuito!",
  "image": `${BASE}/images/2026-addio-nubilato-home-page-scaled.jpg`,
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Barcelona",
    "addressCountry": "ES",
  },
  "areaServed": { "@type": "City", "name": "Barcelona" },
};

export default function NubilatoPage() {
  const c = getContent();

  return (
    <div style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(nubilatoJsonLd) }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "70svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "8rem 6vw 5rem",
        position: "relative",
        overflow: "hidden",
      }}>
        <Image
          src={HERO_IMG}
          alt="Addio al nubilato a Barcellona"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.92) 100%)",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "820px" }}>
          <p style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(0.75rem, 1.4vw, 0.95rem)",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "0.75rem",
          }}>
            — BARCELLONA · DAL 2017
          </p>
          <h1 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            letterSpacing: "-0.03em",
            lineHeight: 0.85,
            color: "#fff",
            margin: "0 0 1.5rem",
          }}>
            ADDIO AL<br />
            <span style={{ color: "var(--blue)" }}>NUBILATO</span><br />
            <span style={{ fontSize: "0.55em", color: "rgba(255,255,255,0.55)", letterSpacing: "0.01em" }}>
              NELLA CITTÀ PIÙ DIVERTENTE D&apos;EUROPA
            </span>
          </h1>
          <ul style={{
            listStyle: "none",
            margin: "0 0 2rem",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.45rem",
            alignItems: "center",
          }}>
            {[
              "20+ attività disponibili: strip, catamarano, limousine e altro",
              "Italiane che vivono a Barcellona — zero intermediari",
              "Preventivo gratuito, risposta in poche ore",
            ].map((item) => (
              <li key={item} style={{
                fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
                color: "rgba(255,255,255,0.82)",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}>
                <span style={{ color: "var(--blue)", fontWeight: 700, fontSize: "1.1em" }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <a
              href="/addio-al-celibato-barcellona-contatti"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontFamily: "var(--font-bebas)", fontSize: "0.9rem", letterSpacing: "0.14em",
                padding: "0.9rem 2rem",
                background: "var(--blue)", color: "#fff", textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              PREVENTIVO GRATIS <ArrowRight size={15} />
            </a>

            {/* Review badges */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <a
                href="https://maps.app.goo.gl/oaPeRnXLkWpVScSv8"
                target="_blank"
                rel="noopener noreferrer"
                className="review-badge"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", lineHeight: 1.2 }}>Google Reviews</div>
              </a>
              <a
                href="https://it.trustpilot.com/review/addioalcelibato-barcellona.it"
                target="_blank"
                rel="noopener noreferrer"
                className="review-badge"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="none">
                  <rect width="24" height="24" rx="2" fill="#00B67A"/>
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z" fill="#fff"/>
                </svg>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", lineHeight: 1.2 }}>Trustpilot</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERCHÉ SCEGLIERE NOI — 3 col horizontal ──────────────────────── */}
      <section style={{ padding: "0 6vw 3rem", background: "#000" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "rgba(255,255,255,0.07)",
        }} className="perche-grid">
          {WHY_US.map(({ Icon, title, desc }) => (
            <div key={title} style={{
              background: "#000",
              padding: "2rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
            }}>
              <div style={{
                width: "44px", height: "44px", background: "rgba(58,117,255,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Icon size={19} color="var(--blue)" />
              </div>
              <p style={{ fontFamily: "var(--font-bebas)", fontSize: "1.2rem", letterSpacing: "0.06em", color: "#fff", margin: 0 }}>
                {title}
              </p>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", fontWeight: 400, margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ACTIVITIES GRID ───────────────────────────────────────────────── */}
      <section style={{ padding: "0 6vw 6rem" }}>
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
      </section>

      {/* ── INTRO ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: "3rem 6vw 5rem", background: "#000" }}>
        <div style={{ maxWidth: "70ch" }}>
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
            margin: "0 0 1.75rem",
          }}>
            IDEE PER UN<br />
            <span style={{ color: "var(--blue)" }}>NUBILATO UNICO</span>
          </h2>
          <p style={{
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.82)",
            fontWeight: 400,
            marginBottom: "1.25rem",
          }}>
            Sei alla ricerca di idee per un addio al nubilato a Barcellona davvero unico? Sei nel posto giusto! Proponiamo attività pomeridiane e notturne per tutti i gusti, e saremo disponibili per consigli durante tutto il soggiorno.
          </p>
          <p style={{
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.75)",
            fontWeight: 400,
          }}>
            Organizzare una festa di addio al nubilato come si deve è il dovere di ogni buona amica. Non esitare e contattaci — il <strong style={{ color: "#fff" }}>PREVENTIVO È GRATIS!</strong>
          </p>
        </div>
      </section>

      {/* ── CONTACT STRIP ─────────────────────────────────────────────────── */}
      <section className="nubilato-contact-strip" style={{
        background: "var(--blue)",
        padding: "3rem 6vw",
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
