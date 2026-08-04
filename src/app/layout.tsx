import type { Metadata } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import BottomNav from "@/components/BottomNav";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import legal from "../../public/legal.json";
import { getContent } from "@/lib/content";

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


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getContent();
  const { isEnabled: isDraftMode } = await draftMode();
  return (
    <html
      lang="it"
      className={`${bebas.variable} ${jakarta.variable}`}
    >
      <body className="bg-[#080808] text-white antialiased font-jakarta">
        <BottomNav
          links={data.navbar.links as { href: string; label: string }[]}
          logoLine1={data.navbar.logo_line1}
          logoLine2={data.navbar.logo_line2}
          ctaLabel={data.navbar.cta_label}
          whatsapp={data.site.whatsapp}
        />
        {children}
        {isDraftMode && <VisualEditing />}
        <WhatsAppWidget phone={data.site.whatsapp} />
        <CookieBanner data={legal.cookie_banner} />
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
