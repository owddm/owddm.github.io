import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "/Users/gregoryking/Desktop/Main/Development/OWDDM/OWDDM Site/owddm_fork/owddm.com/node_modules/.pnpm/nuxt@3.0.0/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}