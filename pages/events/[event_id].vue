<template>
  <div v-if="pending">Loading ...</div>
  <div v-else>
    <div class="event-group-banner-container">
      <img v-if="event.group.type == 'owddm'" class="event-group-banner" src="https://owddm.github.io/public/images/events/5/0/5/516122@l.webp" alt="OWDDM" />
      <img v-else-if="event.group.type == 'kwddm'" class="event-group-banner" src="https://owddm.github.io/public/images/events/5/0/5/516122@l.webp" alt="KWDDM" />
    </div>
    <div class="event-image-map-container">
      <div class="event-image-container">
        <img class="event-image-detail" :src="event.image?.transforms.m.webp.file" alt="" />
      </div>
      <div class="event-map"><Map class="main-map" :key="update" :markers="markers" /></div>
    </div>
    <div class="event-details-container">
      <div class="event-details-description">
        <h3>{{ event?.title }}</h3>
        <div class="event-description-container">
          <Marked :text="event!.description" />
        </div>
      </div>
      <div>
        <div>Date</div>
        <div>RSVP</div>
        <div>Join Discord</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Map from "~~/components/Map.vue";
import { useEvents, getLatestEvents, Event } from "~~/utils/events";

const route = useRoute();

let events: Event[];
let event: Event | undefined;

const { pending, data } = await useEvents();

watchEffect(() => {
  if (!data.value) return;

  events = Array.from(data.value.events);
  event = events.find((event) => event.id == route.params.event_id);

  console.log(data.value);
});

const update = ref(Date.now());
const markers = computed(() => {
  update.value = Date.now();
  if (!data.value) return null;
  return getLatestEvents(data.value).map((event) => {
    return {
      lat: event.venue!.lat,
      lng: event.venue!.lng,
      title: event.title,
      subtitle: formatDate(event.time),
      type: event.group.type,
    };
  });
});

console.log({ markers });
</script>

<style scoped>
div {
  max-width: 100%;
}

.events-container {
  display: flex;
}

.event-group-banner-container {
  width: 100%;
  /* transform: scale(0.5, 0.5); */
}
.owddm-banner {
  background-image: url("https://owddm.github.io/public/images/events/5/0/5/516122@l.webp");
}
.kwddm-banner {
  background-image: url("https://owddm.github.io/public/images/events/5/0/5/516122@l.webp");
}

.event-group-banner {
  clip-path: inset(140px 0px 160px 0px);
  margin-top: -8rem;
  margin-bottom: -8rem;
}

.event-image-map-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.event-image-container {
  flex-grow: 1;
}
.event-image-detail {
  border-radius: 10px;
}

.event-map {
  flex-grow: 2;
}

.event-description-container {
  padding: 1.4rem;
}

.event-details-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
}

.event-details-description {
  flex-grow: 1;
}

.event-details-date-rsvp-discord {
  flex-direction: column;
  flex-grow: 1;
}
</style>
