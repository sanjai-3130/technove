import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  server: {
    host: "0.0.0.0",
    hmr: true,
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: [
      "technova-mmx8.onrender.com"
    ]
  }
});
