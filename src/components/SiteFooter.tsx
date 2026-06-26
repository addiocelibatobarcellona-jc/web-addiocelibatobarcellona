import { getContent } from "@/lib/content";
import CookiePrefsReset from "@/components/CookiePrefsReset";

export default function SiteFooter() {
  const c = getContent();

  return (
    <footer style={{ background: "#000", borderTop: "1px solid #0e0e0e", padding: "5rem 6vw 9rem" }}>
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "4rem" }} className="footer-grid">

          <div className="footer-logo-col">
            <div style={{ marginBottom: "1.25rem" }}>
              <span style={{ display: "block", fontFamily: "var(--font-bebas)", fontSize: "1.5rem", letterSpacing: "0.15em", color: "var(--blue)" }}>
                {c.footer.logo_line1}
              </span>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
                {c.footer.logo_line2}
              </span>
            </div>
            <p style={{ fontSize: "0.82rem", lineHeight: 1.75, color: "#fff", fontWeight: 500, maxWidth: "36ch" }}>
              {c.footer.description}
            </p>
          </div>

          <div className="footer-links-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
            <div>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "1.25rem", fontWeight: 700 }}>Attività</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {c.footer.activity_links.map((l) => (
                  <li key={l.href}><a href={l.href} className="footer-link">{l.label}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "1.25rem", fontWeight: 700 }}>Contatti</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[
                  { href: "/addio-al-celibato-barcellona-contatti", label: "Contattaci", external: false },
                  { href: `https://wa.me/${c.site.whatsapp}`, label: "WhatsApp", external: true },
                  { href: `tel:${c.site.phone}`, label: c.site.phone, external: false },
                ].map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined} className="footer-link">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #222", marginTop: "4rem", paddingTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>© {new Date().getFullYear()} {c.footer.copyright}</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {c.footer.legal_links.map((l) => (
              <a key={l.href} href={l.href} className="footer-legal-link">{l.label}</a>
            ))}
            <CookiePrefsReset />
          </div>
        </div>
      </div>
    </footer>
  );
}
