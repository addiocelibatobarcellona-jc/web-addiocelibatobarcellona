import type { Metadata } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import BottomNav from "@/components/BottomNav";
import legal from "../../public/legal.json";
import data from "../../public/data.json";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

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
  },
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Addio al Celibato Barcellona",
  "url": "https://www.addioalcelibato-barcellona.it/",
  "logo": "https://www.addioalcelibato-barcellona.it/images/2017-logoaddioalcelibatoblancohori2-1.png",
  "image": "https://www.addioalcelibato-barcellona.it/images/2017-ADDIO-SPICY-MIX-S.jpg",
  "description": "Organizziamo addii al celibato e al nubilato a Barcellona dal 2017. Strip show, discoteche, limousine, paddle surf e molto altro.",
  "telephone": "+34673180796",
  "email": "addiocelibatobarcellona@gmail.com",
  "foundingDate": "2017",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Avenida Paralelo Nº91 Bis Entresuelo 1ª",
    "addressLocality": "Barcelona",
    "postalCode": "08004",
    "addressCountry": "ES",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.3748,
    "longitude": 2.1537,
  },
  "openingHours": "Mo-Fr 10:00-18:00",
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "areaServed": {
    "@type": "City",
    "name": "Barcelona",
  },
  "sameAs": [
    "https://maps.app.goo.gl/oaPeRnXLkWpVScSv8",
    "https://it.trustpilot.com/review/addioalcelibato-barcellona.it",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${bebas.variable} ${jakarta.variable}`}
    >
      <body className="bg-[#080808] text-white antialiased font-jakarta">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
        <BottomNav
          links={data.navbar.links as { href: string; label: string }[]}
          logoLine1={data.navbar.logo_line1}
          logoLine2={data.navbar.logo_line2}
          ctaLabel={data.navbar.cta_label}
          whatsapp={data.site.whatsapp}
        />
        {children}
        <WhatsAppWidget phone={data.site.whatsapp} />
        <CookieBanner data={legal.cookie_banner} />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
