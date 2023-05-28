<template>
  <Map class="main-map" :key="update" :markers="markers" v-if="markers" />
</template>
<script setup type="ts">
import Map from '~~/components/Map.vue';
import { useEvents, getLatestEvents } from '~~/utils/events';

const { data: events } = await useEvents()
const update = ref(Date.now())
const markers = computed(() => {
  update.value = Date.now()
  if (!events.value) return null
  return getLatestEvents(events.value).map(event => {
    return {
      lat: event.venue.lat,
      lng: event.venue.lng,
      title: event.title,
      subtitle: formatDate(event.time),
      type: event.group.type
    }
  })
})
</script>