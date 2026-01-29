import { defineConfig } from "vite";
import path from "path";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwind(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    target: "esnext", //browsers can handle the latest ES features
  },
  base: "/competence-mmi/",

});
