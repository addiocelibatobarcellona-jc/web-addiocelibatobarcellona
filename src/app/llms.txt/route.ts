import { NextResponse } from "next/server";
import blogPosts from "../../../public/blog-posts.json";
import activitiesDetail from "../../../public/activities-detail.json";

const BASE = "https://www.addioalcelibato-barcellona.it";

type ActivityDetail = { slug: string; category: string; name: string; intro: string };
type BlogPost = { slug: string; title: string; metaDescription: string | null };

export function GET() {
  const notturne = (activitiesDetail as ActivityDetail[]).filter((a) => a.category === "notturne");
  const pomeridiane = (activitiesDetail as ActivityDetail[]).filter((a) => a.category === "pomeridiane");

  const content = `# Addio al Celibato Barcellona

> Agenzia italiana specializzata in addii al celibato e al nubilato a Barcellona dal 2017. Solo Barcellona, zero intermediari, preventivo gratuito.

Siamo italiani che vivono a Barcellona da più di 20 anni. Organizziamo esclusivamente feste di addio al celibato e nubilato nella città, garantendo la massima qualità senza intermediari. Offriamo 20+ attività tra notturne e pomeridiane, pacchetti personalizzati e piena assistenza durante il soggiorno.

Contatti: +34 673 180 796 · addiocelibatobarcellona@gmail.com
Sede: Avenida Paralelo Nº91 Bis Entresuelo 1ª, Barcelona 08004 (ES) · CIF: B65268237

## Pagine principali

- [Home](${BASE}/): Pagina principale — attività, pacchetti, recensioni e preventivo
- [Attività Notturne](${BASE}/attivita/notturne/): Strip show, cena con spogliarellista, discoteche VIP, limousine
- [Attività Pomeridiane](${BASE}/attivita/pomeridiane/): Catamarano, beerbike, escape room, paddle surf, vespa GPS
- [Addio al Nubilato](${BASE}/addio-al-nubilato/): Attività e pacchetti dedicati all'addio al nubilato
- [Preventivo Gratis](${BASE}/addio-al-celibato-barcellona-contatti/): Modulo di contatto, risposta entro poche ore
- [Chi Siamo](${BASE}/chi-siamo-idee-per-laddio-al-celibato/): Storia e valori dell'agenzia
- [Blog](${BASE}/addio-al-celibato-barcellona-blog/): Idee, consigli e guide per organizzare l'addio perfetto

## Attività Notturne

${notturne.map((a) => `- [${a.name}](${BASE}/attivita/notturne/${a.slug}/): ${a.intro.slice(0, 120).replace(/\n/g, " ")}`).join("\n")}

## Attività Pomeridiane

${pomeridiane.map((a) => `- [${a.name}](${BASE}/attivita/pomeridiane/${a.slug}/): ${a.intro.slice(0, 120).replace(/\n/g, " ")}`).join("\n")}

## Blog — Articoli

${(blogPosts as BlogPost[]).map((p) => `- [${p.title}](${BASE}/${p.slug}/): ${(p.metaDescription ?? "").slice(0, 120)}`).join("\n")}

## Optional

- [Sitemap XML](${BASE}/sitemap.xml)
- [Cookie Policy](${BASE}/addio-celibato-barcellona-cookie-policy/)
- [Privacy Policy](${BASE}/addio-al-celibato-barcellona-privacy/)
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
