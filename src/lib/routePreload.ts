/** Normalize pathname for route matching (trailing slash, empty → "/"). */
export const normalizePath = (pathname: string): string => {
  if (!pathname || pathname === "/") return "/";
  const path = pathname.split("?")[0].split("#")[0];
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
};
