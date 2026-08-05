/**
 * QA rapido con Playwright — desktop + mobile
 * Uso: node scripts/qa-check.mjs [base_url]
 * Default: https://addioalcelibato-barcellona.it
 */
import { chromium } from "@playwright/test";

const BASE = process.argv[2] || "https://addioalcelibato-barcellona.it";

const PAGES = [
  { path: "/",                                         label: "Home" },
  { path: "/chi-siamo-idee-per-laddio-al-celibato",   label: "Chi Siamo" },
  { path: "/attivita",                                 label: "Attività (tutte)" },
  { path: "/attivita/notturne",                        label: "Attività Notturne" },
  { path: "/attivita/pomeridiane",                     label: "Attività Pomeridiane" },
  { path: "/addio-al-nubilato",                        label: "Nubilato" },
  { path: "/addio-al-celibato-barcellona-blog",        label: "Blog" },
  { path: "/domande-frequenti-addio-al-celibato",      label: "FAQ" },
  { path: "/addio-al-celibato-barcellona-contatti",    label: "Contatti" },
  // Sample activities
  { path: "/attivita/notturne/addio-al-celibato-con-spogliarellista/", label: "Activity: Addio Classico" },
  { path: "/attivita/pomeridiane/addio-al-celibato-catamarano-barcellona/", label: "Activity: Catamarano" },
];

const VIEWPORTS = [
  { name: "Desktop", width: 1440, height: 900 },
  { name: "Mobile",  width: 390,  height: 844, isMobile: true },
];

const RED   = (s) => `\x1b[31m${s}\x1b[0m`;
const GREEN = (s) => `\x1b[32m${s}\x1b[0m`;
const YELLOW= (s) => `\x1b[33m${s}\x1b[0m`;
const BOLD  = (s) => `\x1b[1m${s}\x1b[0m`;

async function checkPage(page, url, label, viewport) {
  const issues = [];

  try {
    const response = await page.goto(url, { waitUntil: "load", timeout: 20000 });
    const status = response?.status() ?? 0;

    if (status === 404 || status >= 500) {
      issues.push(`HTTP ${status}`);
    }

    // Check for Next.js error overlay
    const hasError = await page.locator("nextjs-portal").count();
    if (hasError > 0) issues.push("Next.js error overlay visible");

    // Check for horizontal scroll on mobile
    if (viewport.isMobile) {
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      if (scrollWidth > clientWidth + 2) {
        issues.push(`Horizontal overflow: scrollWidth ${scrollWidth}px > clientWidth ${clientWidth}px`);
      }
    }

    // Check nav is present (desktop) or burger (mobile)
    if (viewport.isMobile) {
      const burger = await page.locator("button[aria-label='Apri menu']").count();
      if (burger === 0) issues.push("Mobile burger button not found");
    } else {
      const nav = await page.locator("header").count();
      if (nav === 0) issues.push("Header not found");
    }

    // Scroll to trigger lazy images, then check broken ones (exclude lazy not-yet-loaded)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);
    const brokenImgs = await page.evaluate(() => {
      return Array.from(document.images)
        .filter(img => img.getAttribute("loading") !== "lazy" || img.getBoundingClientRect().top < window.innerHeight * 3)
        .filter(img => img.src && !img.complete || img.naturalWidth === 0)
        .map(img => img.src.replace(/^https?:\/\/[^/]+/, ""));
    });
    if (brokenImgs.length > 0) issues.push(`Broken images: ${brokenImgs.slice(0,3).join(", ")}`);

  } catch (e) {
    issues.push(`Error: ${e.message.split("\n")[0]}`);
  }

  const tag = `[${viewport.name.padEnd(7)}] ${label.padEnd(30)}`;
  if (issues.length === 0) {
    console.log(GREEN(`  ✓ ${tag}`));
  } else {
    console.log(RED(`  ✗ ${tag}`));
    issues.forEach(i => console.log(YELLOW(`      → ${i}`)));
  }

  return issues.length === 0;
}

async function run() {
  console.log(BOLD(`\nQA Check — ${BASE}`));
  console.log("─".repeat(60));

  const browser = await chromium.launch({ headless: true });
  let passed = 0, failed = 0;

  for (const vp of VIEWPORTS) {
    console.log(BOLD(`\n${vp.name} (${vp.width}×${vp.height})`));
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: !!vp.isMobile,
      userAgent: vp.isMobile
        ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        : undefined,
    });
    const page = await context.newPage();

    for (const p of PAGES) {
      const ok = await checkPage(page, BASE + p.path, p.label, vp);
      ok ? passed++ : failed++;
    }

    await context.close();
  }

  await browser.close();

  console.log("\n" + "─".repeat(60));
  console.log(`Result: ${GREEN(`${passed} passed`)}, ${failed > 0 ? RED(`${failed} failed`) : "0 failed"}`);
  console.log("");

  if (failed > 0) process.exit(1);
}

run().catch(e => { console.error(e); process.exit(1); });
