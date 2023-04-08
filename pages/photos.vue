<template>
  <ImageContainer galleryID="full-gallery" :key="update" :groups="groups"/>
</template>

<script setup lang="ts">
import { usePhotos, Group } from "~~/utils/photos";
const groups = ref<Group[]>([]);
const update = ref(Date.now());
const { data } = await usePhotos();
watchEffect(() => {
  if (!data.value) return;
  groups.value = Array.from(data.value!).reverse();
  update.value = Date.now();
});
</script>
