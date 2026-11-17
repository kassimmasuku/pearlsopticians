import {
  BRAND_LOGO_URL,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
  getSeoForPath,
  seoByPath,
} from "@/data/seo";

/** Stable Schema.org entity identifiers */
export const ORG_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const BRANCH_CHINHOYI_ID = `${SITE_ORIGIN}/#branch-chinhoyi`;
export const BRANCH_FOURTH_STREET_ID = `${SITE_ORIGIN}/#branch-fourth-street`;
export const BRANCH_SECOND_STREET_ID = `${SITE_ORIGIN}/#branch-second-street`;

export const JSON_LD_SCRIPT_ID = "pearl-json-ld";

type JsonLdNode = Record<string, unknown>;

const postalAddress = (streetAddress: string): JsonLdNode => ({
  "@type": "PostalAddress",
  streetAddress,
  addressLocality: "Harare",
  addressCountry: "ZW",
});

const parentOrganization: JsonLdNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Pearls Opticians (Pvt) Ltd",
  alternateName: SITE_NAME,
  url: `${SITE_ORIGIN}/`,
  email: "info@pearlsopticians.co.zw",
  logo: {
    "@type": "ImageObject",
    url: BRAND_LOGO_URL,
    width: 1024,
    height: 1024,
  },
  image: [BRAND_LOGO_URL, DEFAULT_OG_IMAGE],
  department: [
    { "@id": BRANCH_CHINHOYI_ID },
    { "@id": BRANCH_FOURTH_STREET_ID },
    { "@id": BRANCH_SECOND_STREET_ID },
  ],
};

const branchChinhoyi: JsonLdNode = {
  "@type": "Optician",
  "@id": BRANCH_CHINHOYI_ID,
  name: "Chinhoyi Branch",
  telephone: "+263 77 947 3630",
  address: postalAddress("Shops 17 & 18, Corner Chinhoyi Street & Kwame Nkrumah"),
  parentOrganization: { "@id": ORG_ID },
  url: `${SITE_ORIGIN}/`,
};

const branchFourthStreet: JsonLdNode = {
  "@type": "Optician",
  "@id": BRANCH_FOURTH_STREET_ID,
  name: "4th Street Branch",
  telephone: "+263 77 966 3642",
  address: postalAddress(
    "Shop No.7, Afgate House, 49 George Silundika Avenue, Corner 4th Street",
  ),
  parentOrganization: { "@id": ORG_ID },
  url: `${SITE_ORIGIN}/`,
};

const branchSecondStreet: JsonLdNode = {
  "@type": "Optician",
  "@id": BRANCH_SECOND_STREET_ID,
  name: "2nd Street Branch",
  telephone: "+263 79 053 8771",
  address: postalAddress(
    "No.2 ICL Building, Sam Nujoma Street and Samora Machel Avenue",
  ),
  parentOrganization: { "@id": ORG_ID },
  url: `${SITE_ORIGIN}/`,
};

const websiteEntity: JsonLdNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  url: `${SITE_ORIGIN}/`,
  publisher: { "@id": ORG_ID },
};

const sharedGraph = [
  parentOrganization,
  branchChinhoyi,
  branchFourthStreet,
  branchSecondStreet,
  websiteEntity,
];

type PageSchemaConfig = {
  "@type": "WebPage" | "AboutPage" | "CollectionPage";
  "@id": string;
  name: string;
  /** Extra page properties such as about / mainEntity */
  extras?: JsonLdNode;
};

const pageSchemaByPath: Record<string, PageSchemaConfig> = {
  "/": {
    "@type": "WebPage",
    "@id": `${SITE_ORIGIN}/#webpage`,
    name: seoByPath["/"].title,
    extras: {
      about: { "@id": ORG_ID },
      mainEntity: { "@id": ORG_ID },
    },
  },
  "/about": {
    "@type": "AboutPage",
    "@id": `${SITE_ORIGIN}/about#webpage`,
    name: seoByPath["/about"].title,
    extras: {
      about: { "@id": ORG_ID },
      mainEntity: { "@id": ORG_ID },
    },
  },
  "/frames": {
    "@type": "CollectionPage",
    "@id": `${SITE_ORIGIN}/frames#webpage`,
    name: seoByPath["/frames"].title,
    extras: {
      about: { "@id": ORG_ID },
    },
  },
  "/learn": {
    "@type": "WebPage",
    "@id": `${SITE_ORIGIN}/learn#webpage`,
    name: seoByPath["/learn"].title,
    extras: {
      about: { "@id": ORG_ID },
    },
  },
};

const normalizePath = (pathname: string): string => {
  if (!pathname || pathname === "/") return "/";
  return pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
};

/** Build the JSON-LD @graph for a route (shared entities + page schema). */
export const getStructuredDataGraph = (pathname: string): JsonLdNode => {
  const path = normalizePath(pathname);
  const seo = getSeoForPath(path);
  const pageConfig = pageSchemaByPath[path] ?? {
    "@type": "WebPage" as const,
    "@id": `${seo.canonical}#webpage`,
    name: seo.title,
  };

  const pageEntity: JsonLdNode = {
    "@type": pageConfig["@type"],
    "@id": pageConfig["@id"],
    name: pageConfig.name,
    url: seo.canonical,
    isPartOf: { "@id": WEBSITE_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: seo.ogImage,
    },
    ...(pageConfig.extras ?? {}),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [...sharedGraph, pageEntity],
  };
};

export const getStructuredDataJson = (pathname: string): string =>
  JSON.stringify(getStructuredDataGraph(pathname));

/** Head element for vite-prerender-plugin injection. */
export const buildJsonLdHeadElement = (pathname: string) => ({
  type: "script",
  props: {
    type: "application/ld+json",
    id: JSON_LD_SCRIPT_ID,
  },
  children: getStructuredDataJson(pathname),
});
