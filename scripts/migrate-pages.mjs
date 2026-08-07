/**
 * Migra el contenido de las páginas y ajustes legales a Sanity.
 * Uso: node scripts/migrate-pages.mjs
 */
import { createClient } from "@sanity/client";
import data from "../public/data.json" assert { type: "json" };
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

async function upsert(doc) {
  await client.createOrReplace(doc);
  console.log(`  ✓ ${doc._id}`);
}

// Campos que la migración antigua puso en siteSettings pero ahora pertenecen
// a documentos de página independientes → se eliminan del documento siteSettings
const STALE_SETTINGS_FIELDS = [
  "hero_headline", "hero_headline_accent", "hero_subheadline",
  "hero_cta_primary", "hero_cta_secondary",
  "activities_all_headline", "activities_all_meta_title", "activities_all_meta_desc", "activities_all_seo_text",
  "activities_night_headline", "activities_night_meta_title", "activities_night_meta_desc", "activities_night_seo_text",
  "activities_daytime_headline", "activities_daytime_meta_title", "activities_daytime_meta_desc", "activities_daytime_seo_text",
  "notturne_headline", "notturne_activities",
  "pomeridiane_headline", "pomeridiane_activities",
  "perche_headline", "perche_items",
];

async function run() {
  // ── Limpiar campos obsoletos de siteSettings ──────────────────────────────
  console.log("Limpiando campos obsoletos de siteSettings...");
  try {
    await client.patch("siteSettings").unset(STALE_SETTINGS_FIELDS).commit();
    console.log("  ✓ siteSettings limpiado");
  } catch (e) {
    console.log("  → siteSettings: no existe o ya está limpio");
  }
  console.log();

  // ── homePage ──────────────────────────────────────────────────────────────
  await upsert({
    _id: "homePage",
    _type: "homePage",
    hero_headline:        data.hero.headline_line1,
    hero_headline_accent: data.hero.headline_accent,
    hero_subheadline:     data.hero.subheadline,
    hero_cta_primary:     "PREVENTIVO GRATIS",
    hero_cta_secondary:   "SCOPRI LE ATTIVITÀ",
    notturne_headline:    data.notturne?.headline ?? "ATTIVITÀ NOTTURNE",
    pomeridiane_headline: data.pomeridiane?.headline ?? "ATTIVITÀ POMERIDIANE",
    perche_headline:      data.perche?.section_title_line1 ?? "PERCHÉ SCEGLIERCI",
    perche_items:         (data.perche?.items ?? []).map((item, i) => ({
      _key: `perche_${i}`,
      icon: item.icon,
      title: item.title,
      desc: item.desc,
    })),
  });

  // ── activitiesPage ────────────────────────────────────────────────────────
  const act = data.activities;
  await upsert({
    _id: "activitiesPage",
    _type: "activitiesPage",
    all_headline:        act.all.headline,
    all_meta_title:      act.all.meta_title,
    all_meta_desc:       act.all.meta_desc,
    all_seo_text:        act.all.seo_text,
    night_headline:      act.night.headline,
    night_meta_title:    act.night.meta_title,
    night_meta_desc:     act.night.meta_desc,
    night_seo_text:      act.night.seo_text,
    daytime_headline:    act.daytime.headline,
    daytime_meta_title:  act.daytime.meta_title,
    daytime_meta_desc:   act.daytime.meta_desc,
    daytime_seo_text:    act.daytime.seo_text,
  });

  // ── aboutPage ─────────────────────────────────────────────────────────────
  await upsert({
    _id: "aboutPage",
    _type: "aboutPage",
    hero_headline:        "CHI",
    hero_headline_accent: "SIAMO",
    hero_subheadline:     "Italiani a Barcellona dal 2017. Zero intermediari, massima qualità.",
    stats: [
      { _key: "stat_0", value: "20+", label: "Anni a Barcellona" },
      { _key: "stat_1", value: "1.200+", label: "Feste Organizzate" },
      { _key: "stat_2", value: "98%", label: "Clienti Soddisfatti" },
      { _key: "stat_3", value: "0", label: "Intermediari" },
    ],
    storia_headline: "PERCHÉ METTERE BARCELLONA\nNEL MIRINO?",
    storia_body: "Siamo italiani che vivono a Barcellona. Dal 2017 organizziamo feste di addio al celibato e al nubilato nella città, garantendo la massima qualità senza intermediari. Non siamo un'agenzia multi-destination: conosciamo Barcellona come le nostre tasche e questo fa tutta la differenza.\n\nSolo Barcellona, zero intermediari, preventivo gratuito.",
    bcn_headline: "E BARCELLONA SIA…",
    bcn_body: "Se tra le vostre idee per l'addio al celibato avete incluso Barcellona, avete diverse opzioni: organizzare la festa per conto proprio, però con il rischio di perdere tempo, rischiando che la festa risulti banale. Ne vale veramente la pena?\n\nTutte le altre agenzie sono concentrate non solo su Barcellona ma su molte altre città. Questo fa in modo che l'esperienza e l'attenzione offerta non sia la stessa.\n\nNoi siamo qui, viviamo qui e da più di 20 anni conosciamo posti, luoghi, ristoranti, bar, feste, discoteche e qualsiasi altra cosa che la città possa offrire. Garantiamo un servizio unico e piena disponibilità per ogni richiesta o dubbio una volta sul luogo.",
    metaTitle: "Chi Siamo | Addio al Celibato Barcellona dal 2017",
    metaDesc:  "Italiani a Barcellona dal 2017. Organizziamo esclusivamente feste di addio al celibato e nubilato a Barcellona. Zero intermediari, preventivo gratuito.",
  });

  // ── nubilatoPage ──────────────────────────────────────────────────────────
  await upsert({
    _id: "nubilatoPage",
    _type: "nubilatoPage",
    hero_headline:        "ADDIO AL",
    hero_headline_accent: "NUBILATO",
    hero_subheadline:     "Organizziamo il tuo addio al nubilato a Barcellona: attività su misura, nessun intermediario, preventivo gratuito.",
    hero_cta_primary:     "PREVENTIVO GRATIS",
    why_headline:         "PERCHÉ SCEGLIERE NOI",
    why_items: [
      { _key: "why_0", icon: "🏙️", title: "Viviamo a Barcellona", desc: "Conosciamo la città meglio di qualsiasi altra agenzia." },
      { _key: "why_1", icon: "🎯", title: "Solo Barcellona", desc: "Specializziamo solo su Barcellona per offrirti il massimo." },
      { _key: "why_2", icon: "💬", title: "Sempre Disponibili", desc: "Siamo disponibili 24/7 per qualsiasi dubbio o richiesta." },
      { _key: "why_3", icon: "⭐", title: "Dal 2017", desc: "Più di 1.200 feste organizzate con recensioni eccellenti." },
    ],
    strip_headline: "PRONTA A FESTEGGIARE?",
    strip_cta:      "PREVENTIVO GRATIS",
    metaTitle: "Addio al Nubilato Barcellona | Idee e Attività dal 2017",
    metaDesc:  "Organizziamo addii al nubilato a Barcellona dal 2017. Strip show femminile, catamaran, beerbike e molto altro. Preventivo gratuito!",
  });

  // ── contactPage ───────────────────────────────────────────────────────────
  await upsert({
    _id: "contactPage",
    _type: "contactPage",
    hero_headline:        "CONTATTACI",
    hero_headline_accent: "GRATIS",
    hero_subheadline:     "Rispondiamo entro poche ore. Il preventivo è sempre gratuito e senza impegno.",
    form_intro:           "Compila il modulo e ti risponderemo il prima possibile con un preventivo personalizzato.",
    form_cta_label:       "INVIA RICHIESTA",
    form_success_msg:     "Grazie! Abbiamo ricevuto la tua richiesta. Ti risponderemo presto.",
    metaTitle: "Contatti | Addio al Celibato Barcellona – Preventivo Gratis",
    metaDesc:  "Contattaci per un preventivo gratuito per il tuo addio al celibato o nubilato a Barcellona. Risposta entro poche ore.",
  });

  // ── faqPage ───────────────────────────────────────────────────────────────
  await upsert({
    _id: "faqPage",
    _type: "faqPage",
    headline:        "DOMANDE",
    headline_accent: "FREQUENTI",
    subheadline:     "Tutto quello che devi sapere per organizzare il tuo addio al celibato a Barcellona.",
    faqs: [
      { _key: "faq_0",  question: "Quanto costa un addio al celibato a Barcellona?", answer: "Il costo dipende dal numero di partecipanti e dalle attività scelte. In media si parte da €35 a persona per le attività pomeridiane e da €42 per quelle notturne. Contattaci per un preventivo gratuito su misura." },
      { _key: "faq_1",  question: "Quando devo prenotare?", answer: "Ti consigliamo di prenotare almeno 2–3 settimane prima, specialmente in alta stagione (maggio–settembre). Tuttavia gestiamo anche richieste last-minute: contattaci e vediamo cosa possiamo fare." },
      { _key: "faq_2",  question: "Come funziona il pagamento?", answer: "Richiediamo un acconto del 30% per confermare la prenotazione. Il saldo viene pagato al vostro arrivo a Barcellona, direttamente alla nostra agenzia." },
      { _key: "faq_3",  question: "Posso personalizzare il pacchetto?", answer: "Assolutamente sì! Tutti i nostri pacchetti sono personalizzabili. Possiamo combinare attività notturne e pomeridiane, aggiungere transfer, cene, VIP table e molto altro." },
      { _key: "faq_4",  question: "Siete disponibili il giorno dell'evento?", answer: "Sì, siamo sempre disponibili durante l'evento per qualsiasi necessità. Avrete il numero di telefono del vostro responsabile e potrete contattarci in qualsiasi momento." },
      { _key: "faq_5",  question: "Quante persone minimo per prenotare?", answer: "Non c'è un numero minimo di partecipanti. Organizziamo feste per gruppi di qualsiasi dimensione, da 4 a 60+ persone." },
      { _key: "faq_6",  question: "Cosa succede se piove?", answer: "Barcellona ha più di 300 giorni di sole all'anno, ma in caso di maltempo abbiamo sempre un'alternativa pronta. Le attività al chiuso come escape room, cocktail lab e strip show non dipendono dal meteo." },
      { _key: "faq_7",  question: "Organizzate anche addii al nubilato?", answer: "Sì! Organizziamo sia addii al celibato che al nubilato. Abbiamo attività ed esperienze pensate per entrambi, con pacchetti personalizzabili per ogni gruppo." },
    ],
    metaTitle: "FAQ – Domande Frequenti | Addio al Celibato Barcellona",
    metaDesc:  "Tutte le risposte alle domande più comuni sull'organizzazione di un addio al celibato o al nubilato a Barcellona: prezzi, prenotazione, pagamento e altro.",
  });

  // ── cookieConsent ─────────────────────────────────────────────────────────
  const cb = data.cookie_banner ?? {};
  await upsert({
    _id: "cookieConsent",
    _type: "cookieConsent",
    title:          cb.title ?? "La tua privacy ci interessa",
    description:    cb.description ?? "Utilizziamo cookie per migliorare la tua esperienza. Puoi accettare tutti i cookie o gestire le tue preferenze.",
    policy_label:   cb.policy_label ?? "Cookie Policy",
    policy_href:    cb.policy_href ?? "/addio-celibato-barcellona-cookie-policy",
    btn_configure:  cb.btn_configure ?? "Configura",
    btn_reject:     cb.btn_reject ?? "Rifiuta tutto",
    btn_accept:     cb.btn_accept ?? "Accetta tutto",
  });

  // ── legalPage: Cookie Policy ───────────────────────────────────────────────
  const cookiePolicyExists = await client.fetch(
    `*[_type == "legalPage" && slug.current == "addio-celibato-barcellona-cookie-policy"][0]._id`
  );
  if (!cookiePolicyExists) {
    await client.create({
      _type: "legalPage",
      title: "Cookie Policy",
      slug: { _type: "slug", current: "addio-celibato-barcellona-cookie-policy" },
      lastUpdated: "2024-01-01",
      metaTitle: "Cookie Policy | Addio al Celibato Barcellona",
      metaDesc:  "Informativa sui cookie del sito addioalcelibato-barcellona.it",
      bodyMarkdown: `# Cookie Policy

Quando si accede a un sito web da qualsiasi dispositivo, sono generalmente inviati e memorizzati sul dispositivo stesso dei piccoli file di testo denominati "cookie".

## 1. Cosa sono i cookie

I cookie vengono inviati da un server web al browser dell'utente e memorizzati sul computer; vengono poi rimandati al sito web ad ogni visita successiva.

## 2. Tipologie di cookie utilizzati

### 2.1 Cookie tecnici di navigazione
Sono utilizzati al fine di effettuare la trasmissione di una comunicazione per consentire la corretta fruizione del sito web.

### 2.2 Cookie di funzionalità
Sono utilizzati per fornire alcuni servizi o per ricordare alcune impostazioni al fine di migliorare l'esperienza di navigazione.

### 2.3 Cookie analitici
Sono cookie utilizzati per raccogliere informazioni sull'utilizzo del sito web, come le pagine visitate o eventuali messaggi di errore.

### 2.4 Cookie di profilazione e marketing
Sono utilizzati per mostrare pubblicità in linea con le preferenze manifestate dall'utente durante la navigazione.

## 3. Gestione dei cookie

L'utente può rifiutare l'utilizzo dei cookie e in qualsiasi momento può revocare un consenso già fornito modificando le impostazioni del proprio browser o tramite il pannello delle preferenze disponibile sul nostro sito.

## 4. Titolare del trattamento

Addio al Celibato Barcellona
Avenida Paralelo Nº91 Bis Entresuelo 1ª, Barcelona 08004 (ES)
Email: addiocelibatobarcellona@gmail.com
`,
    });
    console.log("  ✓ legalPage: cookie-policy (creata)");
  } else {
    console.log("  → legalPage: cookie-policy (già esiste, skip)");
  }

  // ── legalPage: Privacy Policy ──────────────────────────────────────────────
  const privacyExists = await client.fetch(
    `*[_type == "legalPage" && slug.current == "addio-al-celibato-barcellona-privacy"][0]._id`
  );
  if (!privacyExists) {
    await client.create({
      _type: "legalPage",
      title: "Privacy Policy",
      slug: { _type: "slug", current: "addio-al-celibato-barcellona-privacy" },
      lastUpdated: "2024-01-01",
      metaTitle: "Privacy Policy | Addio al Celibato Barcellona",
      metaDesc:  "Informativa sulla privacy del sito addioalcelibato-barcellona.it",
      bodyMarkdown: `# Privacy Policy

Il presente documento descrive le modalità di gestione del sito in riferimento al trattamento dei dati personali degli utenti che lo consultano.

## Titolare del trattamento

**Addio al Celibato Barcellona**
Avenida Paralelo Nº91 Bis Entresuelo 1ª, Barcelona 08004 (ES)
Email: addiocelibatobarcellona@gmail.com

## Dati raccolti

Il sito raccoglie i seguenti dati:

- **Dati di navigazione**: indirizzo IP, tipo di browser, sistema operativo, pagine visitate, data e ora di accesso.
- **Dati forniti volontariamente**: nome, email e altri dati inseriti nel modulo di contatto.

## Finalità del trattamento

I dati vengono trattati per:

1. Rispondere alle richieste di preventivo e contatto.
2. Migliorare l'esperienza di navigazione sul sito.
3. Analisi statistiche anonime tramite Google Analytics.

## Conservazione dei dati

I dati vengono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti.

## Diritti dell'interessato

L'utente ha diritto di accedere, rettificare, cancellare i propri dati, nonché di opporsi al loro trattamento, rivolgendosi al titolare all'indirizzo email indicato.
`,
    });
    console.log("  ✓ legalPage: privacy-policy (creata)");
  } else {
    console.log("  → legalPage: privacy-policy (già esiste, skip)");
  }

  console.log("\n✅ Migrazione pagine completata.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
