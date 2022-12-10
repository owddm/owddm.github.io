import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/gregoryking/Desktop/Main/Development/OWDDM/OWDDM Site/owddm_fork/owddm.com/node_modules/.pnpm/nuxt@3.0.0/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}