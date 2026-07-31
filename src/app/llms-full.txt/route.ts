import { NextResponse } from "next/server";
import blogPosts from "../../../public/blog-posts.json";
import activitiesDetail from "../../../public/activities-detail.json";

const BASE = "https://www.addioalcelibato-barcellona.it";

type ActivityDetail = {
  slug: string; category: string; name: string; price: string | null;
  intro: string; description: string; includes: string[]; notes: string | null;
};
type BlogPost = {
  slug: string; title: string; date: string;
  metaDescription: string | null; bodyMarkdown: string;
};

function section(title: string, url: string, body: string) {
  return `\n\n${"=".repeat(72)}\n# ${title}\nURL: ${url}\n${"=".repeat(72)}\n\n${body.trim()}\n`;
}

export function GET() {
  const parts: string[] = [];

  // Header
  parts.push(`# Addio al Celibato Barcellona — Contenuto Completo del Sito
URL: ${BASE}/
Generato: ${new Date().toISOString()}

Agenzia italiana specializzata in addii al celibato e nubilato a Barcellona dal 2017.
Contatti: +34 673 180 796 | addiocelibatobarcellona@gmail.com
Sede: Avenida Paralelo Nº91 Bis Entresuelo 1ª, Barcelona 08004 (ES)`);

  // Activities
  for (const a of activitiesDetail as ActivityDetail[]) {
    const cat = a.category;
    const url = `${BASE}/attivita/${cat}/${a.slug}/`;
    const body = [
      a.intro,
      "",
      a.description,
      "",
      a.includes.length ? `Incluso:\n${a.includes.map((i) => `- ${i}`).join("\n")}` : "",
      a.price ? `\nPrezzo: ${a.price}` : "",
      a.notes ? `\nNote: ${a.notes}` : "",
    ].join("\n");
    parts.push(section(`${a.name} (${cat})`, url, body));
  }

  // Blog posts
  for (const p of blogPosts as BlogPost[]) {
    const url = `${BASE}/${p.slug}/`;
    const body = [
      p.metaDescription ? `${p.metaDescription}\n` : "",
      `Data: ${p.date.slice(0, 10)}`,
      "",
      p.bodyMarkdown,
    ].join("\n");
    parts.push(section(p.title, url, body));
  }

  return new NextResponse(parts.join(""), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
