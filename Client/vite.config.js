import { defineConfig } from "vite";
import { env } from "vite-plugin-env";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    env({
      prefix: "",
    }),
  ],
  base: "/vite-deploy/",
});
