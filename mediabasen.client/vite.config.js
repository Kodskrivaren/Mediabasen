import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { env } from "process";

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
    ? env.ASPNETCORE_URLS.split(";")[0]
    : "https://localhost:7121";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin(), svgr()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target,
        secure: false,
      },
      "/images": {
        target,
        secure: false,
      },
    },
    port: 5173,
  },
});
