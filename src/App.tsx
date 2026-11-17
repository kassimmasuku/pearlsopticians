import { lazy, Suspense, type ComponentType } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import BranchContactProvider from "@/components/BranchContactProvider";
import StructuredData from "@/components/StructuredData";

/**
 * Client app — route components are lazy for SPA navigations.
 * The active route is passed as `initialPage` (already loaded in main.tsx)
 * so the first hydrate render does not suspend. React.lazy always suspends
 * once on first use even when the module is cached, which would otherwise
 * render Suspense fallback={null} and mismatch prerendered HTML (#418/#423).
 */
const LazyIndex = lazy(() => import("@/pages/Index"));
const LazyAbout = lazy(() => import("@/pages/About"));
const LazyFrameCatalog = lazy(() => import("@/pages/FrameCatalog"));
const LazyLearnAboutEyes = lazy(() => import("@/pages/LearnAboutEyes"));
const LazyNotFound = lazy(() => import("@/pages/NotFound"));

export type AppProps = {
  /** Already-resolved page component for the URL being hydrated */
  initialPage?: ComponentType | null;
  /** Pathname that `initialPage` corresponds to */
  initialPath?: string;
};

const KNOWN_PATHS = new Set(["/", "/about", "/frames", "/learn"]);

const App = ({ initialPage = null, initialPath = "/" }: AppProps) => {
  const InitialPage = initialPage;

  const page = (path: string, Lazy: ComponentType) => {
    if (InitialPage && initialPath === path) {
      return <InitialPage />;
    }
    return <Lazy />;
  };

  const notFound =
    InitialPage && !KNOWN_PATHS.has(initialPath) ? (
      <InitialPage />
    ) : (
      <LazyNotFound />
    );

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BranchContactProvider>
        <StructuredData />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={page("/", LazyIndex)} />
            <Route path="/about" element={page("/about", LazyAbout)} />
            <Route path="/frames" element={page("/frames", LazyFrameCatalog)} />
            <Route path="/learn" element={page("/learn", LazyLearnAboutEyes)} />
            <Route path="*" element={notFound} />
          </Routes>
        </Suspense>
      </BranchContactProvider>
    </TooltipProvider>
  );
};

export default App;
