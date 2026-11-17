import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { normalizePath } from "@/lib/routePreload";

const rootEl = document.getElementById("root")!;

/** Specifiers must match App.tsx lazy() imports exactly. */
const preloadActiveRoute = (pathname: string) => {
  const path = normalizePath(pathname);
  if (path === "/") return import("@/pages/Index");
  if (path === "/about") return import("@/pages/About");
  if (path === "/frames") return import("@/pages/FrameCatalog");
  if (path === "/learn") return import("@/pages/LearnAboutEyes");
  return import("@/pages/NotFound");
};

const boot = async () => {
  const pathname = window.location.pathname;
  const initialPath = normalizePath(pathname);
  const mod = await preloadActiveRoute(pathname);
  const initialPage = mod.default;

  const tree = (
    <BrowserRouter>
      <App initialPage={initialPage} initialPath={initialPath} />
    </BrowserRouter>
  );

  if (import.meta.env.DEV) {
    createRoot(rootEl).render(tree);
  } else {
    // Pass the already-loaded page module so the first hydrate render does not
    // suspend via React.lazy (which always suspends once, even when cached).
    hydrateRoot(rootEl, tree);
  }
};

void boot();
