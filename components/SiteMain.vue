<template>
  <Map class="main-map" :key="update" :markers="markers" />
</template>
<script setup type="ts">
import Map from '~~/components/Map.vue';
import { useEvents, getLatestEvents } from '~~/utils/events';

const { data: events } = await useEvents()
const markers = ref([])
const update = ref(Date.now())

watchEffect(() => {
  if (!events.value) return
  const latest = getLatestEvents(events.value)
  update.value = Date.now()
  markers.value = latest.map(event => {
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
