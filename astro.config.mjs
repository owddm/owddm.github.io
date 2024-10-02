// @ts-check
import { defineConfig } from "astro/config";
import AstroReact from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [AstroReact({})],
  redirects: {
    discord: "https://discord.com/invite/k8xj8d75f6",
  },
});
