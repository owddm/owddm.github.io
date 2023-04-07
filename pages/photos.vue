<template>
  <ImageContainer galleryID="full-gallery" :groups="groups"/>
</template>

<script setup lang="ts">
import { usePhotos, Group } from "~~/utils/photos";
const groups = ref<Group[]>([]);
const { data } = await usePhotos();
watchEffect(() => {
  if (!data.value) return;
  groups.value = Array.from(data.value!).reverse();
});
</script>
