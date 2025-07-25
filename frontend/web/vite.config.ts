import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/movies": "http://localhost:8080",
      "/omdb": "http://localhost:8080",
    },
  },
});
