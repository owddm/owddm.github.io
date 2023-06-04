<template>
  <div class="events-container">
    <MeetupEventList :eventGroups="owddm" type="owddm" />
    <MeetupEventList :eventGroups="kwddm" type="kwddm" />
  </div>
  <div class="events-mobile-container">
    <MeetupEventList :eventGroups="mixed" type="mixed" />
  </div>
</template>

<script setup lang="ts">
import MeetupEventList from "~~/components/SiteMainEvents/MeetupEventList.vue";
import { useEvents, GroupIDFromGroupType } from "~~/utils/events";
import { groupEvents } from "~~/utils/utils";

const { data } = useEvents();
const mixed = computed(() => groupEvents(data.value?.events))
const owddm = computed(() => groupEvents(data.value?.events.filter(event => event.group.id == GroupIDFromGroupType.owddm)))
const kwddm = computed(() => groupEvents(data.value?.events.filter(event => event.group.id == GroupIDFromGroupType.kwddm)))
</script>

<style scoped>

.events-container {
  display: flex;
  width: 100%;
  gap: var(--space);
  padding: 0 var(--space);
}

.events-mobile-container {
  display: none;
  padding: 0 var(--space);
}

@media only screen and (max-width: 760px) {
  .events-container {
    display: none;
  }
  .events-mobile-container {
    display: block;
  }
}
</style>
