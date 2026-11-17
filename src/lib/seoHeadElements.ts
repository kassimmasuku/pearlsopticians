import type { PageSeo } from "@/data/seo";
import {
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
} from "@/data/seo";

export type SeoHeadElement = {
  type: string;
  props: Record<string, string>;
};

/** Build head elements from the shared SEO config for prerender injection. */
export const buildSeoHeadElements = (seo: PageSeo): SeoHeadElement[] => [
  { type: "meta", props: { name: "description", content: seo.description } },
  {
    type: "meta",
    props: { name: "robots", content: seo.robots ?? "index, follow" },
  },
  { type: "link", props: { rel: "canonical", href: seo.canonical } },
  { type: "meta", props: { property: "og:type", content: "website" } },
  { type: "meta", props: { property: "og:site_name", content: SITE_NAME } },
  { type: "meta", props: { property: "og:title", content: seo.ogTitle } },
  {
    type: "meta",
    props: { property: "og:description", content: seo.ogDescription },
  },
  { type: "meta", props: { property: "og:url", content: seo.ogUrl } },
  { type: "meta", props: { property: "og:image", content: seo.ogImage } },
  {
    type: "meta",
    props: { property: "og:image:width", content: String(OG_IMAGE_WIDTH) },
  },
  {
    type: "meta",
    props: { property: "og:image:height", content: String(OG_IMAGE_HEIGHT) },
  },
  { type: "meta", props: { property: "og:image:alt", content: OG_IMAGE_ALT } },
  {
    type: "meta",
    props: { name: "twitter:card", content: "summary_large_image" },
  },
  {
    type: "meta",
    props: { name: "twitter:title", content: seo.twitterTitle },
  },
  {
    type: "meta",
    props: { name: "twitter:description", content: seo.twitterDescription },
  },
  {
    type: "meta",
    props: { name: "twitter:image", content: seo.twitterImage },
  },
  { type: "meta", props: { name: "twitter:image:alt", content: OG_IMAGE_ALT } },
];
