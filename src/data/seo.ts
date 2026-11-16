/** Site-wide SEO defaults and per-route metadata for Pearls Opticians. */

export const SITE_ORIGIN = "https://pearlsopticians.co.zw";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/images/og-default.jpg`;
export const SITE_NAME = "Pearls Opticians";

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  /** Absolute canonical URL */
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  /** Optional robots directive (e.g. noindex for 404) */
  robots?: string;
};

const page = (
  path: string,
  title: string,
  description: string,
  extras: Partial<Pick<PageSeo, "ogImage" | "robots">> = {},
): PageSeo => {
  const canonical = path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
  const image = extras.ogImage ?? DEFAULT_OG_IMAGE;
  return {
    path,
    title,
    description,
    canonical,
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonical,
    ogImage: image,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    robots: extras.robots,
  };
};

export const seoByPath: Record<string, PageSeo> = {
  "/": page(
    "/",
    "Pearls Opticians | Professional Eye Care in Harare, Zimbabwe",
    "Discover professional eye care and quality eyewear at Pearls Opticians in Harare, Zimbabwe. Explore our services, eyewear collection and branches.",
  ),
  "/about": page(
    "/about",
    "About Pearls Opticians | Our Story and Eye Care Team",
    "Learn more about Pearls Opticians, our team, our approach to eye care and our commitment to helping people see better.",
  ),
  "/frames": page(
    "/frames",
    "Eyeglasses and Frames | Pearls Opticians Zimbabwe",
    "Explore the eyewear collection at Pearls Opticians. Discover different frame styles and find eyewear that suits your preferences.",
  ),
  "/learn": page(
    "/learn",
    "Eye Health and Vision Information | Pearls Opticians",
    "Explore helpful information about eye health, vision conditions and eye care from Pearls Opticians.",
  ),
  "/404": page(
    "/404",
    "Page Not Found | Pearls Opticians",
    "The page you are looking for could not be found. Return to Pearls Opticians for eye care and eyewear in Harare, Zimbabwe.",
    { robots: "noindex, follow" },
  ),
};

export const getSeoForPath = (pathname: string): PageSeo => {
  const normalized = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return seoByPath[normalized] ?? seoByPath["/404"];
};
