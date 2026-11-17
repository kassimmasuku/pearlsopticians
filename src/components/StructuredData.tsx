import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  JSON_LD_SCRIPT_ID,
  getStructuredDataJson,
} from "@/data/structuredData";

/**
 * Keeps a single JSON-LD script in document.head in sync with the current route.
 * Prerender injects the same script id into the initial HTML; this updates it on CSR navigation.
 */
const StructuredData = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const json = getStructuredDataJson(pathname);
    let el = document.getElementById(JSON_LD_SCRIPT_ID) as HTMLScriptElement | null;

    if (!el) {
      el = document.createElement("script");
      el.id = JSON_LD_SCRIPT_ID;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }

    el.textContent = json;

    // Remove any legacy duplicate JSON-LD scripts without our id
    document.querySelectorAll('script[type="application/ld+json"]').forEach((node) => {
      if (node.id !== JSON_LD_SCRIPT_ID) {
        node.remove();
      }
    });
  }, [pathname]);

  return null;
};

export default StructuredData;
