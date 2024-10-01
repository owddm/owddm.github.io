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
defineProps({
  type: String,
});
</script>
<style>
.group-banner-owddm {
  border-top: 5px solid var(--color-osaka);
  background-image: url("/banner/owddm-image.webp");
}

.group-banner-kwddm {
  border-top: 5px solid var(--color-kyoto);
  background-image: url("/banner/kwddm-image.webp");
}

.group-banner,
.group-banner-mixed {
  width: 100%;
  height: 25vw;
  max-height: 200px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
}

.group-banner-mixed {
  justify-content: stretch;
}

.group-banner-part {
  display: flex;
}

.group-banner,
.group-banner-part {
  background-size: cover;
  align-items: center;
  justify-content: center;
}

.group-banner-logo {
  width: 45%;
  max-width: 320px;
}
</style>
