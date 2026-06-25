"use client";

export default function CookiePrefsReset() {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("cookie_consent");
        window.location.reload();
      }}
      className="footer-legal-link"
      style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
    >
      Modifica preferenze cookie
    </button>
  );
}
