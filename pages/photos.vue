<template>
  <div class="photos-container">
    <ImageContainer galleryID="full-gallery" :key="update" :groups="groups" />
  </div>
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

<style scoped>
.photos-container {
  margin-top: 2rem;
}

@media screen and (orientation: landscape) {
  .photos-container {
    margin-left: env(safe-area-inset-left, 2rem);
    margin-right: env(safe-area-inset-right, 2rem);
  }
}
</style>
