import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import MagneticButton from "@/components/MagneticButton";

const BASE = "https://www.addioalcelibato-barcellona.it";
const CANONICAL = `${BASE}/domande-frequenti-addio-al-celibato/`;

export const metadata: Metadata = {
  title: "FAQ – Domande Frequenti | Addio al Celibato Barcellona",
  description:
    "Tutte le risposte alle domande più comuni sull'organizzazione di un addio al celibato o al nubilato a Barcellona: prezzi, prenotazione, pagamento, attività e altro.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "FAQ – Domande Frequenti | Addio al Celibato Barcellona",
    description: "Risposte alle domande più comuni su addio al celibato e nubilato a Barcellona.",
    locale: "it_IT",
    type: "website",
    url: CANONICAL,
    siteName: "Addio al Celibato Barcellona",
    images: [{ url: "/images/2017-ADDIO-SPICY-MIX-S.jpg", width: 1200, height: 630, alt: "FAQ – Addio al Celibato Barcellona" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Addio al Celibato Barcellona",
    description: "Tutto quello che devi sapere sull'organizzazione del tuo addio al celibato a Barcellona.",
    images: ["/images/2017-ADDIO-SPICY-MIX-S.jpg"],
  },
};

const FAQS = [
  {
    q: "Come posso richiedere un preventivo?",
    a: "Puoi richiedere un preventivo gratuito compilando il modulo di contatto sul nostro sito, scrivendo a addiocelibatobarcellona@gmail.com oppure contattandoci direttamente su WhatsApp al +34673180796. Rispondiamo entro poche ore, senza alcun impegno da parte tua.",
  },
  {
    q: "Quante persone sono necessarie per organizzare un addio al celibato?",
    a: "Organizziamo feste di addio al celibato per gruppi di tutte le dimensioni. Che siate in 5 o in 30, abbiamo la soluzione adatta. Contattaci e troveremo insieme il pacchetto più adatto al vostro gruppo.",
  },
  {
    q: "Quanto costa un addio al celibato a Barcellona?",
    a: "I prezzi variano in base alle attività scelte e al numero di partecipanti. Le attività diurne partono da €20 a persona, quelle notturne come il Cocktail Lab o l'Addio Classico (cena + spettacolo + discoteca) hanno prezzi variabili in base al gruppo. Richiedete un preventivo gratuito e senza impegno per un prezzo personalizzato.",
  },
  {
    q: "Siete italiani? In che lingua parlate?",
    a: "Sì, siamo un'agenzia di italiani che vivono a Barcellona da oltre 20 anni. Comunichiamo sempre in italiano e conoscono la città alla perfezione. Non dovrete preoccuparvi di barriere linguistiche.",
  },
  {
    q: "Organizzate anche addii al nubilato?",
    a: "Sì! Oltre all'addio al celibato, organizziamo anche addii al nubilato a Barcellona con attività pensate appositamente: catamarano, cocktail lab, spa, discoteca VIP e molto altro. Trovate tutte le opzioni nella sezione Addio al Nubilato.",
  },
  {
    q: "Con quanto anticipo devo prenotare?",
    a: "Consigliamo di prenotare con almeno 2-3 settimane di anticipo per garantirsi la disponibilità delle attività preferite, specialmente nei periodi di alta stagione (primavera ed estate). In alcuni casi riusciamo a organizzare eventi anche con meno preavviso — contattateci e vedremo cosa è possibile fare.",
  },
  {
    q: "Come funziona il pagamento?",
    a: "Una volta confermato il preventivo, vi chiederemo un acconto per bloccare la data e le attività. Il saldo può essere pagato al vostro arrivo a Barcellona. Accettiamo pagamenti tramite bonifico bancario e altri metodi concordati.",
  },
  {
    q: "Possiamo scegliere attività singole o solo pacchetti?",
    a: "Potete scegliere sia attività singole che pacchetti combinati. Molti gruppi scelgono di abbinare un'attività diurna (come il catamarano o il paddle surf) a una serata notturna (cena con spogliarellista + discoteca). Costruiamo il programma su misura per il vostro gruppo.",
  },
  {
    q: "Siete presenti a Barcellona durante l'evento?",
    a: "Sì. Oltre all'organizzazione, offriamo assistenza prima e durante il soggiorno. Una volta atterrati, siamo a disposizione per qualsiasi dubbio, consiglio o imprevisto. Vogliamo che il vostro addio al celibato a Barcellona sia davvero indimenticabile.",
  },
  {
    q: "Cosa succede in caso di maltempo per le attività all'aperto?",
    a: "Barcellona gode di un clima mediterraneo con oltre 300 giorni di sole l'anno. In caso di condizioni meteorologiche avverse che impediscano lo svolgimento di un'attività all'aperto, vi proporremo alternative equivalenti o riprogrammeremo l'attività. La vostra soddisfazione è la nostra priorità.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": { "@type": "Answer", "text": a },
  })),
};

export default function FAQPage() {
  return (
    <div style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO */}
      <section style={{
        background: "var(--blue)",
        padding: "clamp(5rem, 12vw, 9rem) 6vw clamp(3rem, 8vw, 6rem)",
      }}>
        <p style={{
          fontFamily: "var(--font-jakarta)",
          fontSize: "0.7rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.6)",
          marginBottom: "1rem",
        }}>
          Addio al Celibato Barcellona
        </p>
        <h1 style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(3rem, 8vw, 6rem)",
          letterSpacing: "0.04em",
          lineHeight: 0.95,
          marginBottom: "1.5rem",
          textWrap: "balance",
        }}>
          DOMANDE<br />FREQUENTI
        </h1>
        <p style={{
          fontFamily: "var(--font-jakarta)",
          fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
          color: "rgba(255,255,255,0.85)",
          maxWidth: "55ch",
          lineHeight: 1.6,
        }}>
          Tutto quello che devi sapere prima di organizzare il tuo addio al celibato o al nubilato a Barcellona.
        </p>
      </section>

      {/* FAQ LIST */}
      <section style={{
        maxWidth: "780px",
        margin: "0 auto",
        padding: "clamp(3rem, 8vw, 6rem) 6vw",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {FAQS.map(({ q, a }, i) => (
            <details
              key={i}
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                padding: "1.5rem 0",
              }}
            >
              <summary style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                letterSpacing: "0.05em",
                cursor: "pointer",
                listStyle: "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                userSelect: "none",
              }}>
                <span>{q}</span>
                <span style={{
                  fontSize: "1.4rem",
                  color: "var(--blue)",
                  flexShrink: 0,
                  fontFamily: "var(--font-jakarta)",
                  fontWeight: 400,
                  lineHeight: 1,
                }}>+</span>
              </summary>
              <p style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "0.92rem",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.7,
                marginTop: "1rem",
                maxWidth: "65ch",
              }}>
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: "#000",
        padding: "clamp(4rem, 10vw, 8rem) 6vw",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: "560px" }}>
          <span style={{
            display: "block",
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            letterSpacing: "0.15em",
            color: "var(--blue)",
            lineHeight: 1,
            marginBottom: "0.25rem",
          }}>
            ADDIO AL CELIBATO BCN
          </span>
          <span style={{
            display: "block",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            fontWeight: 600,
            marginBottom: "1.5rem",
          }}>
            Barcellona · Dal 2017
          </span>
          <p style={{
            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            lineHeight: 1.75,
            color: "#fff",
            fontWeight: 500,
            marginBottom: "2.5rem",
          }}>
            Un&apos;agenzia di Italiani che vivono a Barcellona da più di 20 anni e conoscono la città alla perfezione. Organizziamo feste SOLO a Barcellona, dal 2017. Miglior prezzo garantito.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <MagneticButton
              href="/addio-al-celibato-barcellona-contatti"
              className="neon-cta"
              style={{ display: "inline-flex" }}
            >
              CONTATTACI GRATIS
            </MagneticButton>
            <a
              href="https://wa.me/34673180796"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "transparent",
                color: "#fff",
                borderColor: "rgba(255,255,255,0.25)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WHATSAPP
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
