<script lang="ts">
interface Props {
  events: Event[] | undefined;
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div></div>
</template>

<style scoped>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 100%;
}

.description {
  margin-left: 1rem;
  margin-right: 1rem;
  font-weight: 100;
  padding: 1rem;
}

.title {
  padding: 1rem;
}

.topics {
  margin-left: 1rem;
  font-weight: 200;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.date {
  margin-top: -0.5rem;
  margin-left: 1rem;
  font-weight: 200;
}

.event_view {
  margin-bottom: 4rem;
  border-radius: 20px;
  width: 70vw;
  margin-left: auto;
  margin-right: auto;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
</style>
