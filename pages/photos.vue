<template>
  <ImageContainer galleryID="full-gallery" :groups="groups"/>
</template>

<script setup lang="ts">
import { usePhotos } from "~~/utils/utils";
const groups = (await usePhotos()).reverse();
</script>
