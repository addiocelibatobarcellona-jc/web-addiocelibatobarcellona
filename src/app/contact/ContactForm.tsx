"use client";

import { useActionState, useEffect, useRef } from "react";
import Script from "next/script";
import { submitContact, type FormState } from "./actions";
import { ArrowRight } from "lucide-react";

declare global {
  interface Window {
    turnstile?: { reset: (widgetId?: string) => void };
  }
}

const INITIAL: FormState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset Turnstile widget after each error so user can retry
  useEffect(() => {
    if (state.status === "error") {
      window.turnstile?.reset();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div style={{
        padding: "3rem 2rem",
        border: "1px solid rgba(58,117,255,0.3)",
        background: "rgba(58,117,255,0.06)",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
          color: "var(--blue)",
          marginBottom: "0.5rem",
        }}>
          MESSAGGIO INVIATO!
        </p>
        <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
          {state.message}
        </p>
      </div>
    );
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    background: "#0c0c0c",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    fontFamily: "var(--font-jakarta)",
    fontSize: "0.95rem",
    padding: "1rem 1.25rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.4)",
    fontWeight: 600,
    marginBottom: "0.5rem",
  };

  return (
    <>
    <Script
      src="https://challenges.cloudflare.com/turnstile/v0/api.js"
      strategy="lazyOnload"
    />
    <form ref={formRef} action={action} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <label htmlFor="name" style={labelStyle}>Nome e Cognome</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Marco Rossi"
          style={fieldStyle}
          onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
        />
      </div>

      <div>
        <label htmlFor="email" style={labelStyle}>Indirizzo Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="marco@email.com"
          style={fieldStyle}
          onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
        />
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>Messaggio / Richiesta</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Ciao! Stiamo organizzando un addio al celibato per 10 persone a luglio..."
          style={{ ...fieldStyle, resize: "vertical" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
        />
      </div>

      {state.status === "error" && (
        <p style={{ color: "#ff4d4d", fontSize: "0.85rem" }}>{state.message}</p>
      )}

      {/* Cloudflare Turnstile — injects cf-turnstile-response hidden input */}
      <div
        className="cf-turnstile"
        data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        data-theme="dark"
      />

      <button
        type="submit"
        disabled={pending}
        className="neon-cta"
        style={{ alignSelf: "flex-start", opacity: pending ? 0.6 : 1, cursor: pending ? "wait" : "pointer", border: "3px solid #fff" }}
      >
        {pending ? "INVIO IN CORSO…" : "INVIA RICHIESTA"}
        {!pending && <ArrowRight size={16} />}
      </button>
    </form>
    </>
  );
}
