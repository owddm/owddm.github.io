// @ts-check
import { defineConfig } from "astro/config";
import AstroVue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [AstroVue({})],
});
