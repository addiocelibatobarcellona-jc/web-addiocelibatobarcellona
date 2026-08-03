import type { Metadata } from "next";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { getContent } from "@/lib/content";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contatti | Preventivo Gratis per il tuo Addio al Celibato a Barcellona",
  description:
    "Contattaci per un preventivo gratuito e senza impegno. Email, WhatsApp o telefono — ti rispondiamo in poche ore. Addio al celibato a Barcellona dal 2017.",
  alternates: { canonical: "https://www.addioalcelibato-barcellona.it/addio-al-celibato-barcellona-contatti/" },
  openGraph: {
    title: "Contatti | Preventivo Gratis – Addio al Celibato Barcellona",
    description: "Contattaci per un preventivo gratuito e senza impegno. Ti rispondiamo in poche ore.",
    locale: "it_IT",
    type: "website",
    url: "https://www.addioalcelibato-barcellona.it/addio-al-celibato-barcellona-contatti/",
    siteName: "Addio al Celibato Barcellona",
    images: [{ url: "/images/2017-ADDIO-SPICY-MIX-S.jpg", width: 1200, height: 630, alt: "Addio al Celibato Barcellona – Contatti" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preventivo Gratis – Addio al Celibato Barcellona",
    description: "Contattaci per un preventivo gratuito. Ti rispondiamo in poche ore.",
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

const CONTACT_ITEMS = [
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: "+34 673 180 796",
    href: "https://wa.me/34673180796",
    note: "Risposta rapida",
  },
  {
    Icon: Phone,
    label: "Telefono",
    value: "+34 673 180 796",
    href: "tel:+34673180796",
    note: "Lun–Ven 10:00–18:00",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "addiocelibatobarcellona@gmail.com",
    href: "mailto:addiocelibatobarcellona@gmail.com",
    note: "Risposta entro 24h",
  },
  {
    Icon: MapPin,
    label: "Sede",
    value: "Avenida Paralelo Nº91, Barcelona",
    href: "https://maps.google.com/?q=Avenida+Paralelo+91,+Barcelona",
    note: "08004 Barcelona",
  },
];

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contatti – Addio al Celibato Barcellona",
  "url": "https://www.addioalcelibato-barcellona.it/addio-al-celibato-barcellona-contatti/",
  "description": "Contattaci per un preventivo gratuito. Risposta in poche ore. Addio al celibato e al nubilato a Barcellona dal 2017.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Addio al Celibato Barcellona",
    "telephone": "+34673180796",
    "email": "addiocelibatobarcellona@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Barcelona",
      "addressCountry": "ES",
    },
  },
};

export default function Contatti() {
  const c = getContent();

  return (
    <div style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      {/* ── FORM + CONTACT INFO (first) ── */}
      <section style={{ padding: "8rem 6vw 6rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: "6rem",
          alignItems: "start",
        }} className="contact-grid">
          {/* Form */}
          <div>
            <h1 style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.01em",
              lineHeight: 0.9,
              color: "#fff",
              margin: "0 0 0.75rem",
            }}>
              RICHIEDI UN<br />
              <span style={{ color: "var(--blue)" }}>PREVENTIVO!</span>
            </h1>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "2.5rem", maxWidth: "46ch" }}>
              Compila il form con le informazioni sul tuo gruppo e ti prepariamo
              un preventivo personalizzato. Nessun impegno.
            </p>
            <ContactForm />
          </div>

          {/* Contact info sidebar — hidden on mobile */}
          <div className="contact-sidebar" style={{ display: "flex", flexDirection: "column", gap: "0", position: "sticky", top: "6rem" }}>
            <h3 style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.4)",
              margin: "0 0 1.5rem",
            }}>
              ALTRE VIE DI CONTATTO
            </h3>
            {CONTACT_ITEMS.map(({ Icon, label, value, href, note }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-item-link"
              >
                <div style={{
                  width: "40px", height: "40px", background: "rgba(58,117,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Icon size={18} color="var(--blue)" />
                </div>
                <div>
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 600, margin: "0 0 0.2rem" }}>
                    {label}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "#fff", fontWeight: 500, margin: "0 0 0.15rem", wordBreak: "break-all" }}>
                    {value}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", margin: 0 }}>
                    {note}
                  </p>
                </div>
              </a>
            ))}

            <div style={{
              marginTop: "2rem",
              padding: "1.5rem",
              background: "rgba(58,117,255,0.07)",
              border: "1px solid rgba(58,117,255,0.2)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <Clock size={14} color="var(--blue)" />
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>Orari</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>
                Lunedì – Venerdì: 10:00 – 18:00<br />
                <span style={{ color: "rgba(255,255,255,0.35)" }}>WhatsApp: sempre disponibile</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Wave from="#000" to="var(--blue)" flip />

      {/* ── PREVENTIVO GRATIS (blue, below form) ── */}
      <section style={{
        background: "var(--blue)",
        padding: "5rem 6vw 6rem",
        position: "relative",
        overflow: "hidden",
      }}>
        <p style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          letterSpacing: "0.25em",
          color: "rgba(0,0,0,0.55)",
          marginBottom: "0.5rem",
        }}>
          — CONTATTACI
        </p>
        <h2 style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
          letterSpacing: "-0.02em",
          lineHeight: 0.88,
          color: "#fff",
          margin: "0 0 1.5rem",
        }}>
          PREVENTIVO<br />
          <span style={{ color: "rgba(0,0,0,0.7)" }}>GRATIS</span>
        </h2>
        <p style={{
          fontFamily: "var(--font-jakarta)",
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          lineHeight: 1.7,
          color: "rgba(0,0,0,0.7)",
          maxWidth: "48ch",
          fontWeight: 400,
        }}>
          Contattarci, richiedere un preventivo o suggerire una nuova attività
          è <strong style={{ color: "#000" }}>completamente gratuito</strong> e senza impegno.
          Ti risponderemo entro poche ore.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
