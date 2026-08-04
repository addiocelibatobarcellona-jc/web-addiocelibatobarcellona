import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current: string };
    }>(req, process.env.SANITY_WEBHOOK_SECRET);

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    switch (body._type) {
      case "blogPost":
        revalidatePath("/addio-al-celibato-barcellona-blog", "layout");
        if (body.slug?.current) {
          revalidatePath(
            `/addio-al-celibato-barcellona-blog/${body.slug.current}`
          );
        }
        break;

      case "activity":
        revalidatePath("/activities", "layout");
        if (body.slug?.current) {
          revalidatePath(
            `/activities/night/${body.slug.current}`
          );
          revalidatePath(
            `/activities/daytime/${body.slug.current}`
          );
        }
        break;

      case "siteSettings":
        revalidatePath("/", "layout");
        break;

      default:
        revalidatePath("/", "layout");
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err: unknown) {
    console.error(err);
    return new Response(
      err instanceof Error ? err.message : "Internal error",
      { status: 500 }
    );
  }
}
