import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api/gemini": {
        target: "https://generativelanguage.googleapis.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gemini/, ""),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            const url = new URL(req.url, "https://generativelanguage.googleapis.com");
            url.searchParams.set("key", process.env.VITE_GEMINI_API_KEY || "");
            proxyReq.path = url.pathname + url.search;
          });
        },
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-three": ["three"],
          "vendor-icons": ["lucide-react"],
        },
      },
    },
  },
});
