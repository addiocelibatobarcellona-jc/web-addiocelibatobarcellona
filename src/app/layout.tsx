import type { Metadata } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import legal from "../../public/legal.json";

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
    url: "https://www.addioalcelibato-barcellona.it",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        {children}
        <CookieBanner data={legal.cookie_banner} />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
