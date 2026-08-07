"use client";

import { usePathname } from "next/navigation";
import { VisualEditing } from "next-sanity/visual-editing";
import BottomNav from "@/components/BottomNav";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import type { NavLink } from "@/lib/content";

interface BannerData {
  title: string;
  description: string;
  policy_label: string;
  policy_href: string;
  btn_configure: string;
  btn_reject: string;
  btn_accept: string;
}

interface Props {
  links: NavLink[];
  extraMobileLinks: NavLink[];
  logoLine1: string;
  logoLine2: string;
  ctaLabel: string;
  whatsapp: string;
  legalData: BannerData;
}

export default function SiteChrome({
  links,
  extraMobileLinks,
  logoLine1,
  logoLine2,
  ctaLabel,
  whatsapp,
  legalData,
}: Props) {
  const pathname = usePathname() ?? "";
  const isStudio = pathname.startsWith("/studio");

  if (isStudio) {
    return <VisualEditing />;
  }

  return (
    <>
      <BottomNav
        links={links}
        extraMobileLinks={extraMobileLinks}
        logoLine1={logoLine1}
        logoLine2={logoLine2}
        ctaLabel={ctaLabel}
        whatsapp={whatsapp}
      />
      <WhatsAppWidget phone={whatsapp} />
      <CookieBanner data={legalData} />
      <GoogleAnalytics />
    </>
  );
}
