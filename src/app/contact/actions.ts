"use server";

import { Resend } from "resend";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "addiocelibatobarcellona@gmail.com";
const FROM_EMAIL = "Addio al Celibato BCN <noreply@addioalcelibato-barcellona.it>";

async function verifyTurnstile(token: string): Promise<boolean> {
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
    }
  );
  const data = await res.json() as { success: boolean };
  return data.success;
}

export async function submitContact(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";
  const turnstileToken = formData.get("cf-turnstile-response")?.toString() ?? "";

  if (!name || !email || !message) {
    return { status: "error", message: "Compila tutti i campi." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Inserisci un indirizzo email valido." };
  }

  if (!turnstileToken) {
    return { status: "error", message: "Completa la verifica antibot." };
  }

  const humanVerified = await verifyTurnstile(turnstileToken);
  if (!humanVerified) {
    return { status: "error", message: "Verifica antibot fallita. Riprova." };
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: `Nuova richiesta di preventivo — ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
        <div style="background:#3a75ff;padding:24px 32px">
          <p style="color:#fff;font-size:12px;letter-spacing:3px;margin:0;text-transform:uppercase">Addio al Celibato Barcellona</p>
          <h1 style="color:#fff;font-size:28px;margin:8px 0 0">Nuova richiesta di preventivo</h1>
        </div>
        <div style="padding:32px;background:#fff;border:1px solid #eee;border-top:none">
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px;width:120px">Nome</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">
                <a href="mailto:${email}" style="color:#3a75ff">${email}</a>
              </td>
            </tr>
          </table>
          <div style="margin-top:24px">
            <p style="color:#666;font-size:13px;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px">Messaggio</p>
            <div style="background:#f8f8f8;padding:16px;border-left:3px solid #3a75ff;font-size:15px;line-height:1.7;white-space:pre-wrap">${message}</div>
          </div>
          <div style="margin-top:28px">
            <a href="mailto:${email}?subject=Re: Richiesta preventivo addio al celibato" style="background:#3a75ff;color:#fff;padding:12px 24px;text-decoration:none;font-weight:600;display:inline-block;border-radius:4px">Rispondi a ${name}</a>
          </div>
        </div>
        <p style="color:#999;font-size:12px;padding:16px 0;text-align:center">addioalcelibato-barcellona.it</p>
      </div>
    `,
  });

  if (error) {
    console.error("[RESEND ERROR]", error);
    return {
      status: "error",
      message: "Errore nell'invio. Riprova o contattaci su WhatsApp.",
    };
  }

  return {
    status: "success",
    message: "Messaggio inviato! Ti risponderemo entro poche ore.",
  };
}
