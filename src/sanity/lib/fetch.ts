import "server-only";
import { draftMode } from "next/headers";
import { client } from "./client";
import type { QueryParams } from "next-sanity";

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<T> {
  const { isEnabled: isDraftMode } = await draftMode();

  if (isDraftMode) {
    return client.fetch<T>(query, params, {
      perspective: "drafts",
      stega: true,
      token: process.env.SANITY_API_READ_TOKEN,
      useCdn: false,
      next: { revalidate: 0 },
    });
  }

  return client.fetch<T>(query, params, {
    perspective: "published",
    useCdn: true,
    next: { tags },
  });
}
