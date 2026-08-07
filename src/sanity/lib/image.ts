import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0];

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/** Returns a CDN URL string or falls back to the legacy /images/ path */
export function resolveActivityImage(
  sanityImage: SanityImageSource | null | undefined,
  legacyPath: string | undefined,
  width = 1200
): string | undefined {
  if (sanityImage && (sanityImage as { asset?: unknown }).asset) {
    return urlFor(sanityImage).width(width).auto("format").url();
  }
  return legacyPath ?? undefined;
}
