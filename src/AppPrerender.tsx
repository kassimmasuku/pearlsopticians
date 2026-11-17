import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import BranchContactProvider from "@/components/BranchContactProvider";
import StructuredData from "@/components/StructuredData";
import Index from "./pages/Index";
import About from "./pages/About";
import FrameCatalog from "./pages/FrameCatalog";
import LearnAboutEyes from "./pages/LearnAboutEyes";
import NotFound from "./pages/NotFound";

/**
 * Sync-import app shell for build-time prerender only.
 * Suspense mirrors the client App tree so hydrateRoot matches providers/wrappers.
 * Pages are sync imports so Suspense never falls back during renderToString.
 */
const AppPrerender = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BranchContactProvider>
      <StructuredData />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/frames" element={<FrameCatalog />} />
          <Route path="/learn" element={<LearnAboutEyes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BranchContactProvider>
  </TooltipProvider>
);

export default AppPrerender;
