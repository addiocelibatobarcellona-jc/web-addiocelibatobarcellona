import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { disable } = await draftMode();
  disable();
  const redirectTo = searchParams.get("redirect") ?? "/";
  redirect(redirectTo);
}
