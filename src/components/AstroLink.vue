<template>
  <a :href="href" :class="clazz2">
    <slot></slot>
  </a>
</template>
<script setup lang="ts">
import { inject } from "vue";

let {
  href,
  class: clazz,
  activeClass,
} = defineProps<{
  href: string;
  activeClass?: string;
  class?: string;
}>();
const url = inject("url") as URL;
const clazz2 = (activeClass && url.pathname === href) || url.pathname.startsWith(href + "/") ? (clazz ? clazz + " " + activeClass : activeClass) : (clazz ?? "");
</script>
