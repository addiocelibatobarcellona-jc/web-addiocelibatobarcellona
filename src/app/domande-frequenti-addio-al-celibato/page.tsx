import type { Metadata } from "next";
import { getContent } from "@/lib/content";
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
    a: "Sì, siamo un'agenzia di italiani che vivono a Barcellona da oltre 10 anni. Comunichiamo sempre in italiano e conoscono la città alla perfezione. Non dovrete preoccuparvi di barriere linguistiche.",
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
    a: "Una volta confermato il preventivo, vi chiederemo un acconto per bloccare la data e le attività. Il saldo può essere pagato alla vostra cheggio a Barcellona. Accettiamo pagamenti tramite bonifico bancario e altri metodi concordati.",
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
  const c = getContent();

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
                  fontWeight: 300,
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
        background: "#0a0a0a",
        padding: "clamp(3rem, 8vw, 6rem) 6vw",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <p style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
          letterSpacing: "0.06em",
          color: "rgba(255,255,255,0.5)",
          marginBottom: "0.5rem",
        }}>
          HAI ALTRE DOMANDE?
        </p>
        <h2 style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(2rem, 5vw, 4rem)",
          letterSpacing: "0.06em",
          marginBottom: "2rem",
          textWrap: "balance",
        }}>
          CONTATTACI GRATIS
        </h2>
        <MagneticButton
          href="/addio-al-celibato-barcellona-contatti"
          className="neon-cta"
          style={{ display: "inline-flex" }}
        >
          RICHIEDI PREVENTIVO
        </MagneticButton>
      </section>

      <SiteFooter content={c} />
    </div>
  );
}
