import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    output: "hybrid",
    site: "https://surfstock.dk",
    integrations: [react(), sitemap()],
    adapter: netlify(),
});
