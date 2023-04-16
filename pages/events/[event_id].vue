<template>
  <div v-if="pending">Loading ...</div>
  <div v-else>
    <div class="event-group-banner-container">
      <img v-if="event.group.type == 'owddm'" class="event-group-banner" src="https://owddm.github.io/public/images/events/5/0/5/516122@l.webp" alt="OWDDM" />
      <img v-else-if="event.group.type == 'kwddm'" class="event-group-banner" src="https://owddm.github.io/public/images/events/5/0/5/516122@l.webp" alt="KWDDM" />
    </div>
    <div class="event-image-map-container">
      <img class="event-image-detail" :src="event.image?.transforms.m.webp.file" alt="" />
      <div class="event-map-detail">
        <Map class="main-map" :key="update" :markers="markers" />
      </div>
    </div>
    <div class="event-details-container">
      <div class="event-details-description">
        <h1 class="event-title">{{ event?.title }}</h1>
        <div class="event-description-container">
          <Marked :text="event!.description" />
        </div>
      </div>
      <div class="event-details-date-rsvp-discord">
        <div>
          <EventDataDisplay :date="dayjs(event?.time)" />
        </div>
        <div>
          <a v-if="event?.group.type == 'owddm'" :href="`https://www.meetup.com/ja-JP/osaka-web-designers-and-developers-meetup/events/${event?.id}`">
            <button class="rsvp">→ RSVP</button>
          </a>
          <a v-if="event?.group.type == 'kwddm'" :href="`https://www.meetup.com/ja-JP/kyoto-web-designers-and-developers-meetup/${event?.id}`">
            <button class="rsvp">→ RSVP</button>
          </a>
        </div>
        <div>
          <a href="https://discord.com/invite/k8xj8d75f6">
            <button class="join-discord">→ Join Discord</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Map from "~~/components/Map.vue";
import EventDataDisplay from "~~/components/SiteMainEvents/EventDateDisplay";
import dayjs from "dayjs/esm";
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
  margin-bottom: -9rem;
}

.event-image-map-container {
  display: flex;
  flex-direction: row;
}

.event-image-detail {
  border-radius: 10px;
  width: 70%;
  margin-left: 1rem;
  margin-right: 1rem;
}

.event-map-detail {
  border: 1px solid black;
  background-color: red;
  max-width: 25%;
}

.event-title {
  margin-left: 1rem;
}

.event-description-container {
  margin-left: 1rem;
  margin-top: 2rem;
}

.event-details-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
}

.event-details-description {
  margin-top: 1.5rem;
  margin-bottom: 3rem;
  font-weight: 300;
  width: 75%;
}

.event-details-date-rsvp-discord {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
}

.rsvp {
  width: 100%;
  border-radius: 15px;
  margin-top: 1rem;
  padding: 0.8rem;
}

.rsvp:hover {
  background-color: red;
}

.join-discord {
  width: 100%;
  border-radius: 15px;
  margin-top: 1rem;
  background-color: hsla(240, 100%, 80%, 1);
  padding: 0.8rem;
}

.join-discord:hover {
  background-color: red;
}
</style>
