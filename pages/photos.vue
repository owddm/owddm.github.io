<template>
  <ImageContainer galleryID="full-gallery" :key="update" :groups="groups"/>
</template>

<script setup lang="ts">
import { usePhotos, Group } from "~~/utils/photos";
const { data } = await usePhotos();
const update = ref(Date.now());
const groups = computed<Group[]>(() => {
  update.value = Date.now();
  if (!data.value) return [];
  return Array.from(data.value!).reverse();
});
</script>
