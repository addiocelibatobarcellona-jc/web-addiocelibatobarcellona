export const BASE_URL = "https://www.addioalcelibato-barcellona.it" as const;

/** Canonical @id for the Organization/LocalBusiness entity. */
export const ORG_ID = `${BASE_URL}/#organization` as const;

/** Inline reference to the canonical org entity — use in provider/author/publisher. */
export const orgRef = { "@id": ORG_ID } as const;
