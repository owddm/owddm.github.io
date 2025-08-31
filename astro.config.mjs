// @ts-check
import { defineConfig } from "astro/config";
import AstroReact from "@astrojs/react";
import * as redirects from './redirects.json';

// https://astro.build/config
export default defineConfig({
  integrations: [AstroReact({})],
  redirects,
});
