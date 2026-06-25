"use client";

import { useState, useEffect } from "react";

interface BannerData {
  title: string;
  description: string;
  policy_label: string;
  policy_href: string;
  btn_configure: string;
  btn_reject: string;
  btn_accept: string;
}

const STORAGE_KEY = "cookie_consent";

export default function CookieBanner({ data }: { data: BannerData }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
    window.dispatchEvent(new Event("cookie-consent-accepted"));
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setVisible(false);
  }

  function configure() {
    // Decline analytics and navigate to cookie policy for more info
    reject();
    window.location.href = data.policy_href;
  }

  if (!visible) return null;

  const btnBase: React.CSSProperties = {
    fontFamily: "var(--font-bebas)",
    fontSize: "0.95rem",
    letterSpacing: "0.12em",
    padding: "0.65rem 1.4rem",
    border: "2px solid",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    transition: "background 0.18s, color 0.18s",
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "1.5rem",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 9999,
      width: "min(96vw, 720px)",
      background: "#fff",
      color: "#000",
      padding: "1.5rem 1.75rem",
      boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
    }}>
      <div>
        <p style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "1.15rem",
          letterSpacing: "0.06em",
          color: "#000",
          marginBottom: "0.35rem",
        }}>
          {data.title}
        </p>
        <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "#333", margin: 0 }}>
          {data.description}{" "}
          <a
            href={data.policy_href}
            style={{ color: "var(--blue)", textDecoration: "underline", fontWeight: 600 }}
          >
            {data.policy_label}
          </a>
        </p>
      </div>

      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
        <button
          onClick={configure}
          style={{
            ...btnBase,
            background: "transparent",
            color: "#000",
            borderColor: "rgba(0,0,0,0.2)",
          }}
        >
          {data.btn_configure}
        </button>

        <button
          onClick={reject}
          style={{
            ...btnBase,
            background: "transparent",
            color: "#000",
            borderColor: "rgba(0,0,0,0.2)",
          }}
        >
          {data.btn_reject}
        </button>

        <button
          onClick={accept}
          style={{
            ...btnBase,
            background: "var(--blue)",
            color: "#fff",
            borderColor: "var(--blue)",
            marginLeft: "auto",
          }}
        >
          {data.btn_accept}
        </button>
      </div>
    </div>
  );
}
