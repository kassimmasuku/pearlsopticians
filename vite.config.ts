import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      vitePrerenderPlugin({
        renderTarget: "#root",
        prerenderScript: path.resolve(__dirname, "src/prerender.tsx"),
        additionalPrerenderRoutes: ["/", "/about", "/frames", "/learn"],
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        /**
         * Evidence-based vendor splits:
         * - framer-motion is large and used across pages → own cacheable chunk
         * - react core stack shared by all routes → stable vendor chunk
         * Avoid dumping all of node_modules into one vendor (hurts parallel load).
         */
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion")) return "framer-motion";
          if (
            id.includes("react-dom") ||
            id.includes("react-router") ||
            id.includes(`${path.sep}react${path.sep}`) ||
            id.includes("/react/")
          ) {
            return "react-vendor";
          }
        },
      },
    },
  },
}));
