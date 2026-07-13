"use client";
import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";

interface Props {
  phone: string;
}

export default function WhatsAppWidget({ phone }: Props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const send = () => {
    const text = message.trim() || "Ciao! Vorrei un preventivo per il mio addio al celibato a Barcellona.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
    setOpen(false);
    setMessage("");
  };

  return (
    <>
      {/* ── Chat popup ── */}
      {open && (
        <div style={{
          position: "fixed",
          bottom: "5.5rem",
          right: "1.5rem",
          width: "min(340px, calc(100vw - 3rem))",
          borderRadius: "16px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
          zIndex: 200,
          overflow: "hidden",
          animation: "wa-in 0.3s cubic-bezier(0.33,1,0.68,1)",
          transformOrigin: "bottom right",
        }}>

          {/* Header */}
          <div style={{
            background: "#075E54",
            padding: "1rem 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}>
            <div style={{
              width: 46, height: 46, borderRadius: "50%",
              background: "#128C7E",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              border: "2px solid rgba(255,255,255,0.25)",
              position: "relative",
            }}>
              <span style={{ fontWeight: 700, fontSize: "1.15rem", color: "#fff", fontFamily: "sans-serif" }}>M</span>
              <div style={{
                position: "absolute", bottom: 1, right: 1,
                width: 11, height: 11, borderRadius: "50%",
                background: "#25D366",
                border: "2px solid #075E54",
              }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#fff", fontWeight: 700, margin: 0, fontSize: "1rem", fontFamily: "sans-serif" }}>Maria</p>
              <p style={{ color: "rgba(255,255,255,0.72)", margin: 0, fontSize: "0.75rem", fontFamily: "sans-serif" }}>Risposta immediata</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Chiudi"
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.65)", cursor: "pointer", padding: "4px", lineHeight: 1 }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat body */}
          <div style={{
            background: "#ECE5DD",
            padding: "1.25rem 1.25rem 0.75rem",
          }}>
            <div style={{
              background: "#fff",
              borderRadius: "0 12px 12px 12px",
              padding: "0.75rem 1rem",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              maxWidth: "92%",
            }}>
              <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.55, color: "#111", fontFamily: "sans-serif" }}>
                Pronti a regalare allo sposo l&apos;ultimo viaggio da single della sua vita? 🌍 Scrivimi le date o la destinazione che state valutando e ti mando subito un preventivo personalizzato! 👇
              </p>
              <p style={{ margin: "0.35rem 0 0", fontSize: "0.67rem", color: "#999", textAlign: "right", fontFamily: "sans-serif" }}>✓✓</p>
            </div>
          </div>

          {/* Input */}
          <div style={{
            background: "#ECE5DD",
            padding: "0.75rem 1rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}>
            <input
              ref={inputRef}
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Scrivi qui la tua meta o le date..."
              style={{
                flex: 1,
                background: "#fff",
                border: "none",
                borderRadius: "24px",
                padding: "0.65rem 1rem",
                fontSize: "0.85rem",
                outline: "none",
                color: "#333",
                fontFamily: "sans-serif",
              }}
            />
            <button
              onClick={send}
              aria-label="Invia su WhatsApp"
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "#25D366",
                border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                transition: "background 0.2s",
              }}
            >
              <Send size={16} color="#fff" />
            </button>
          </div>
        </div>
      )}

      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Contattaci su WhatsApp"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          width: 56, height: 56,
          borderRadius: "50%",
          background: "#25D366",
          border: "none",
          boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 199,
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        {/* Notification dot */}
        <div style={{
          position: "absolute", top: 4, right: 4,
          width: 10, height: 10, borderRadius: "50%",
          background: "#f00",
          border: "2px solid #fff",
        }} />
      </button>
    </>
  );
}
