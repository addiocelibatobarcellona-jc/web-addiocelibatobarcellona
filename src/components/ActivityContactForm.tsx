"use client";

import { useActionState, useEffect } from "react";
import Script from "next/script";
import { submitContact, type FormState } from "@/app/contact/actions";
import { ArrowRight } from "lucide-react";

declare global {
  interface Window {
    turnstile?: { reset: (widgetId?: string) => void };
  }
}

const INITIAL: FormState = { status: "idle", message: "" };

export default function ActivityContactForm({ activityName }: { activityName: string }) {
  const [state, action, pending] = useActionState(submitContact, INITIAL);

  useEffect(() => {
    if (state.status === "error") {
      window.turnstile?.reset();
    }
  }, [state]);

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#fff",
    fontFamily: "var(--font-jakarta)",
    fontSize: "0.9rem",
    padding: "0.85rem 1rem",
    outline: "none",
    transition: "border-color 0.2s",
    borderRadius: 0,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.6rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.65)",
    fontWeight: 700,
    marginBottom: "0.4rem",
  };

  if (state.status === "success") {
    return (
      <div style={{
        padding: "2rem",
        border: "1px solid rgba(58,117,255,0.3)",
        background: "rgba(58,117,255,0.06)",
        textAlign: "center",
      }}>
        <p style={{ fontFamily: "var(--font-bebas)", fontSize: "1.6rem", color: "var(--blue)", marginBottom: "0.4rem" }}>
          MESSAGGIO INVIATO!
        </p>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.88rem", lineHeight: 1.6 }}>
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <>
    <Script
      src="https://challenges.cloudflare.com/turnstile/v0/api.js"
      strategy="lazyOnload"
    />
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
      <input type="hidden" name="activity" value={activityName} />

      <div>
        <label htmlFor="act-name" style={labelStyle}>Nome e Cognome</label>
        <input
          id="act-name"
          name="name"
          type="text"
          required
          placeholder="Marco Rossi"
          style={fieldStyle}
          onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
        />
      </div>

      <div>
        <label htmlFor="act-email" style={labelStyle}>Email</label>
        <input
          id="act-email"
          name="email"
          type="email"
          required
          placeholder="marco@email.com"
          style={fieldStyle}
          onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
        />
      </div>

      <div>
        <label htmlFor="act-message" style={labelStyle}>Messaggio</label>
        <textarea
          id="act-message"
          name="message"
          required
          rows={4}
          placeholder={`Ciao! Siamo interessati a ${activityName}…`}
          style={{ ...fieldStyle, resize: "vertical" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
        />
      </div>

      {state.status === "error" && (
        <p style={{ color: "#ff4d4d", fontSize: "0.82rem" }}>{state.message}</p>
      )}

      <div
        className="cf-turnstile"
        data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        data-theme="dark"
      />

      <button
        type="submit"
        disabled={pending}
        className="neon-cta"
        style={{
          alignSelf: "stretch",
          justifyContent: "center",
          opacity: pending ? 0.6 : 1,
          cursor: pending ? "wait" : "pointer",
          border: "3px solid #fff",
        }}
      >
        {pending ? "INVIO IN CORSO…" : "RICHIEDI PREVENTIVO"}
        {!pending && <ArrowRight size={15} />}
      </button>
    </form>
    </>
  );
}
