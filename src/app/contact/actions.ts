"use server";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitContact(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (!name || !email || !message) {
    return { status: "error", message: "Compila tutti i campi." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Inserisci un indirizzo email valido." };
  }

  // TODO: wire up email sending (nodemailer / Resend)
  // For now: log server-side and return success
  console.log("[CONTACT FORM]", { name, email, message });

  return {
    status: "success",
    message: "Messaggio inviato! Ti risponderemo entro poche ore.",
  };
}
