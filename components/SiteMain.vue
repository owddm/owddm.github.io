<template>
  <Map class="main-map" :markers="markers" />
</template>
<script setup type="ts">
import Map from './map';
import { useEvents, getLatestEvents } from '~~/utils/events';

const { data: events } = await useEvents()
const markers = ref([])

watchEffect(() => {
  if (!events.value) return
  const latest = getLatestEvents(events.value)
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
