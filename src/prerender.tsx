/**
 * Build-time-only prerender entry (vite-prerender-plugin).
 * Kept separate from the client bundle so react-dom/server and
 * vite-prerender-plugin/parse are not shipped to browsers.
 */
import { StaticRouter } from "react-router-dom/server";
import AppPrerender from "./AppPrerender";
import { getSeoForPath } from "@/data/seo";
import { buildSeoHeadElements } from "@/lib/seoHeadElements";
import { buildJsonLdHeadElement } from "@/data/structuredData";

export async function prerender(data: { url: string }) {
  const { renderToString } = await import("react-dom/server");
  const { parseLinks } = await import("vite-prerender-plugin/parse");

  const html = renderToString(
    <StaticRouter location={data.url}>
      <AppPrerender />
    </StaticRouter>,
  );
  const links = parseLinks(html);
  const seo = getSeoForPath(data.url);

  return {
    html,
    links: new Set(links),
    head: {
      lang: "en",
      title: seo.title,
      elements: new Set([...buildSeoHeadElements(seo), buildJsonLdHeadElement(data.url)]),
    },
  };
}
