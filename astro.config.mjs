// @ts-check
import { defineConfig } from "astro/config";
import AstroVue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [AstroVue({})],
  redirects: {
    'discord': 'https://discord.com/invite/k8xj8d75f6'
  }
});
