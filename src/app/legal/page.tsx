import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import BottomNav from "@/components/BottomNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Cookie Policy | Addio al Celibato Barcellona",
  description: "Informativa sui cookie del sito addioalcelibato-barcellona.it — Provvedimento Garante Privacy n. 229 dell'8/5/2014.",
  alternates: { canonical: "https://www.addioalcelibato-barcellona.it/addio-celibato-barcellona-cookie-policy/" },
  robots: { index: false, follow: false },
};

const SECTIONS = [
  {
    title: "1. Cosa sono i cookie",
    body: `Quando si accede a un sito web da qualsiasi dispositivo, sono generalmente inviati e memorizzati sul dispositivo stesso dei piccoli file di testo denominati "cookie". I cookie vengono inviati da un server web (che è il computer su cui è in esecuzione il sito web visitato) al browser dell'utente (Internet Explorer, Firefox, Safari, Chrome, ecc.) e memorizzati sul computer dell'utente; vengono poi rimandati al sito web ad ogni visita successiva.`,
  },
  {
    title: "2. Tipologie di cookie utilizzati",
    body: null,
    subsections: [
      {
        title: "2.1 Cookie tecnici di navigazione",
        body: "Sono utilizzati al fine di effettuare la trasmissione di una comunicazione per consentire la corretta fruizione del sito web. Senza l'utilizzo di tali cookie, alcune operazioni non potrebbero essere compiute o sarebbero più complesse e/o meno sicure.",
      },
      {
        title: "2.2 Cookie di funzionalità",
        body: "Sono utilizzati per fornire alcuni servizi o per ricordare alcune impostazioni al fine di migliorare l'esperienza di navigazione (ad esempio la lingua). Le informazioni raccolte da questo tipo di cookie possono includere informazioni personalmente identificabili che l'utente ha divulgato.",
      },
      {
        title: "2.3 Cookie analitici",
        body: "Sono assimilati ai cookie tecnici laddove utilizzati direttamente dal gestore del sito per raccogliere informazioni, in forma aggregata e anonima, sul numero degli utenti e su come questi visitano il sito stesso.",
      },
      {
        title: "2.4 Cookie di profilazione",
        body: "Questo sito non utilizza cookie di questa tipologia.",
      },
      {
        title: "2.5 Cookie di terze parti",
        body: "Questo sito utilizza Google Analytics, un servizio di analisi web fornito da Google, Inc. Google Analytics utilizza i cookie per aiutare il sito ad analizzare come gli utenti utilizzano il sito stesso. Le informazioni generate dal cookie sull'utilizzo del sito da parte dell'utente (compreso l'indirizzo IP) vengono trasmesse e depositate presso i server di Google.",
      },
      {
        title: "2.6 Cookie di social sharing",
        body: "Questo sito non utilizza cookie di questa tipologia.",
      },
    ],
  },
  {
    title: "3. Come disabilitare i cookie",
    body: `L'utente può decidere se accettare o meno i cookie utilizzando le impostazioni del proprio browser. Attenzione: la disabilitazione totale o parziale dei cookie tecnici può compromettere l'utilizzo delle funzionalità del sito riservate agli utenti registrati. Al contrario, la fruibilità dei contenuti pubblici è possibile anche disabilitando completamente i cookie.

La disabilitazione dei cookie di terze parti non pregiudica in alcun modo la navigabilità. La configurazione può essere eseguita separatamente per i diversi siti e applicazioni web, tramite le impostazioni del browser in uso (di solito disponibili in "Opzioni" o "Preferenze").`,
  },
  {
    title: "4. Riferimenti normativi",
    body: "La presente informativa è redatta in conformità al Provvedimento Garante Privacy n. 229 dell'8 maggio 2014 e al Regolamento UE 2016/679 (GDPR).",
  },
];

export default function CookiePolicy() {
  const c = getContent();

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100svh" }}>
      <BottomNav
        links={c.navbar.links}
        logoLine1={c.navbar.logo_line1}
        logoLine2={c.navbar.logo_line2}
        ctaLabel={c.navbar.cta_label}
        whatsapp={c.site.whatsapp}
      />

      {/* Header */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "8rem 6vw 4rem",
      }}>
        <p style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "0.85rem",
          letterSpacing: "0.25em",
          color: "rgba(255,255,255,0.3)",
          marginBottom: "1rem",
        }}>
          — LEGALE
        </p>
        <h1 style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          letterSpacing: "-0.01em",
          lineHeight: 0.9,
          color: "#fff",
          margin: "0 0 1.5rem",
        }}>
          COOKIE<br />
          <span style={{ color: "var(--blue)" }}>POLICY</span>
        </h1>
        <p style={{
          fontSize: "0.82rem",
          color: "rgba(255,255,255,0.35)",
          fontFamily: "var(--font-jakarta)",
        }}>
          Addioalcelibato-barcellona.it — Provvedimento Garante Privacy n. 229 dell&apos;8/5/2014
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "4rem 6vw 8rem" }}>
        <p style={{
          fontSize: "0.95rem",
          lineHeight: 1.8,
          color: "rgba(255,255,255,0.65)",
          marginBottom: "3rem",
          paddingBottom: "3rem",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          La presente informativa descrive le modalità di utilizzo dei cookie sul sito{" "}
          <strong style={{ color: "#fff" }}>addioalcelibato-barcellona.it</strong>,
          prodotto di ORGANIZACION Y DIRECCION DE EVENTOS S.L., con sede in
          Avenida Paralelo Nº91 Bis Entresuelo 1ª, Barcelona 08004 (CIF: B65268237).
        </p>

        {SECTIONS.map((s) => (
          <section key={s.title} style={{ marginBottom: "3rem" }}>
            <h2 style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)",
              letterSpacing: "0.04em",
              color: "#fff",
              marginBottom: "1rem",
            }}>
              {s.title}
            </h2>

            {s.body && (
              <p style={{
                fontSize: "0.9rem",
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.6)",
                whiteSpace: "pre-line",
              }}>
                {s.body}
              </p>
            )}

            {s.subsections?.map((sub) => (
              <div key={sub.title} style={{
                marginTop: "1.5rem",
                paddingLeft: "1.25rem",
                borderLeft: "2px solid rgba(58,117,255,0.25)",
              }}>
                <h3 style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "1rem",
                  letterSpacing: "0.08em",
                  color: "var(--blue)",
                  marginBottom: "0.5rem",
                }}>
                  {sub.title}
                </h3>
                <p style={{
                  fontSize: "0.88rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.55)",
                }}>
                  {sub.body}
                </p>
              </div>
            ))}
          </section>
        ))}

        <div style={{
          marginTop: "4rem",
          padding: "1.5rem",
          border: "1px solid rgba(255,255,255,0.07)",
          background: "#0a0a0a",
        }}>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, margin: 0 }}>
            Per informazioni o richieste relative alla privacy e al trattamento dei dati personali,
            contattaci a{" "}
            <a
              href={`mailto:${c.site.email}`}
              style={{ color: "var(--blue)", textDecoration: "none" }}
            >
              {c.site.email}
            </a>
          </p>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
