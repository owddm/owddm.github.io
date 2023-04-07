<template>
  <div v-html="markdownToHtml"></div>
</template>

<script lang="ts" setup>
import { marked } from "marked";

const props = defineProps<{
  text: string;
}>();

const markdownToHtml = computed(() => {
  return marked.parse(props.text);
});
</script>
