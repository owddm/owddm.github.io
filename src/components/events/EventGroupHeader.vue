<template>
  <div v-if="type === 'mixed'" class="group-banner-mixed">
    <div class="group-banner-part group-banner-owddm">
      <img class="group-banner-logo" :src="`/logo/owddm-outline@1x.png`" alt="osaka logo" />
    </div>
    <div class="group-banner-part group-banner-kwddm">
      <img class="group-banner-logo" :src="`/logo/kwddm-outline@1x.png`" alt="kwddm logo" />
    </div>
  </div>
  <div v-else-if="type" :class="{ 'group-banner': true, [`group-banner-${type}`]: true }">
    <img class="group-banner-logo" :src="`/logo/${type}-outline@1x.png`" :alt="`${type} logo`" />
  </div>
</template>
<script setup lang="ts">
import "./EventGroupHeader.css";
defineProps({
  type: String,
});
</script>
