import type { Metadata, Viewport } from "next";
import type { NavLink } from "@/lib/content";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getContent } from "@/lib/content";
import SiteChrome from "@/components/SiteChrome";
import legalJson from "../../public/legal.json";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.addioalcelibato-barcellona.it"),
  title: "Addio al Celibato Barcellona | Dal 2017 – Miglior Prezzo Garantito",
  description:
    "Organizziamo addii al celibato e al nubilato a Barcellona dal 2017. Strip show, discoteche, limousine, paddle surf e molto altro. Preventivo gratuito!",
  keywords:
    "addio al celibato barcellona, addio al nubilato barcellona, pacchetti celibato barcellona, festa addio celibato barcellona",
  authors: [{ name: "Addio al Celibato Barcellona" }],
  openGraph: {
    title: "Addio al Celibato Barcellona | Dal 2017",
    description:
      "La tua festa leggendaria a Barcellona. Miglior prezzo garantito dal 2017.",
    locale: "it_IT",
    type: "website",
    url: "https://www.addioalcelibato-barcellona.it/",
    images: [
      {
        url: "/images/2017-ADDIO-SPICY-MIX-S.jpg",
        width: 1200,
        height: 630,
        alt: "Addio al Celibato Barcellona – Festa leggendaria dal 2017",
      },
    ],
    siteName: "Addio al Celibato Barcellona",
  },
  twitter: {
    card: "summary_large_image",
    title: "Addio al Celibato Barcellona | Dal 2017",
    description:
      "La tua festa leggendaria a Barcellona. Miglior prezzo garantito dal 2017.",
    images: ["/images/2017-ADDIO-SPICY-MIX-S.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getContent();

  return (
    <html
      lang="it"
      className={`${bebas.variable} ${jakarta.variable}`}
    >
      <head>
        {/* Preconnect for Sanity CDN image delivery */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className="bg-[#080808] text-white antialiased font-jakarta">
        <SiteChrome
          links={data.navbar.links as NavLink[]}
          extraMobileLinks={(data.navbar.mobile_extra_links ?? []) as NavLink[]}
          logoLine1={data.navbar.logo_line1}
          logoLine2={data.navbar.logo_line2}
          ctaLabel={data.navbar.mobile_cta_label ?? data.navbar.cta_label}
          whatsapp={data.site.whatsapp}
          legalData={legalJson.cookie_banner}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
