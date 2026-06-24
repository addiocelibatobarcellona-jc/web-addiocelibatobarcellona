"use client";

import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import type { NavLink } from "@/lib/content";

interface Props {
  links: NavLink[];
  ctaLabel: string;
  whatsapp: string;
}

export default function MobileMenu({ links, ctaLabel, whatsapp }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[#2a2a2a] text-white"
        aria-label="Apri menu"
      >
        <Menu size={18} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-100 flex flex-col"
          style={{ background: "#080808" }}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#1a1a1a]">
            <span className="font-bebas text-xl tracking-widest" style={{ color: "var(--gold)" }}>
              ADDIO AL CELIBATO BCN
            </span>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-[#2a2a2a] text-white"
              aria-label="Chiudi menu"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-col flex-1 justify-center px-8 gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-bebas text-[2.8rem] leading-none tracking-wide py-3 border-b border-[#1a1a1a] transition-colors hover:text-(--gold)"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="px-8 py-8">
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-red w-full py-4 rounded text-lg"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
