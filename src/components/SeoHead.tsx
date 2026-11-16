import { useEffect } from "react";
import type { PageSeo } from "@/data/seo";
import { SITE_NAME } from "@/data/seo";

const META_ATTR = "data-pearl-seo";

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    Object.entries(attrs).forEach(([key, value]) => {
      if (key !== "content") el!.setAttribute(key, value);
    });
    el.setAttribute(META_ATTR, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("content", attrs.content);
};

const upsertLink = (rel: string, href: string) => {
  const selector = `link[rel="${rel}"]`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute(META_ATTR, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * Applies page-specific title, description, canonical and social metadata.
 * Safe for CSR navigation and readable from a central seo config for future prerender.
 */
const SeoHead = ({ seo }: { seo: PageSeo }) => {
  useEffect(() => {
    document.title = seo.title;

    upsertMeta('meta[name="description"]', { name: "description", content: seo.description });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: seo.robots ?? "index, follow",
    });

    upsertLink("canonical", seo.canonical);

    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: seo.ogTitle });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: seo.ogDescription,
    });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: seo.ogUrl });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: seo.ogImage });

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.twitterTitle });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: seo.twitterDescription,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: seo.twitterImage,
    });
  }, [seo]);

  return null;
};

export default SeoHead;
