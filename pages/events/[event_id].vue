<template>
  <div v-if="pending">Loading ...this is coming from the event slug.</div>
  <div v-else>
    <div class="event-group-banner-container">
      <img v-if="event?.group.type == 'owddm'" class="event-group-banner" src="https://owddm.github.io/public/images/events/5/0/5/516122@l.webp" alt="OWDDM" />
      <img v-else-if="event?.group.type == 'kwddm'" class="event-group-banner" src="https://owddm.github.io/public/images/events/5/0/5/516520@l.webp" alt="KWDDM" />
      <img v-else class="event-group-banner" src="https://owddm.github.io/public/images/events/5/0/5/516122@l.webp" alt="OWDDM" />
    </div>
    <div class="event-image-map-container">
      <img class="event-image-detail" :src="event?.image?.transforms.m.webp.file" alt="" />
      <div class="event-map-detail">
        <div class="event-map">
          <EventMap class="main-map" :key="update" :markers="markers" />
        </div>
        <div class="event-location-details-container">
          <div class="event-location-details">
            <a :href="`https://www.google.com/maps/search/?api=1&query=${event?.venue?.lat}%2C${event?.venue?.lng}`">
              {{ event?.venue?.name }}
            </a>
            <br />
            <span>{{ event?.venue?.address }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="event-image-date-container-mobile">
      <img class="event-image-detail" :src="event?.image?.transforms.m.webp.file" alt="" />
      <div class="event-date-container-mobile">
        <EventDateDisplay :date="dayjs(event?.time)" />
      </div>
      <h1 class="event-title-mobile">{{ event?.title }}</h1>
      <div class="event-description-container">
        <Marked :text="event!.description" />
      </div>
      <div class="event-rsvp-discord-mobile">
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
      <div class="event-map-detail">
        <div class="event-map">
          <EventMap class="main-map" :key="update" :markers="markers" />
        </div>
        <div class="event-location-details-container">
          <div class="event-location-details">
            <a :href="`https://www.google.com/maps/search/?api=1&query=${event?.venue?.lat}%2C${event?.venue?.lng}`">
              {{ event?.venue?.name }}
            </a>
            <br />
            <span>{{ event?.venue?.address }}</span>
          </div>
        </div>
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
          <EventDateDisplay :date="dayjs(event?.time)" />
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
import EventMap from "~~/components/EventMap.vue";
import EventDateDisplay from "~~/components/SiteMainEvents/EventDateDisplay.vue";
import dayjs from "dayjs/esm";
import { useEvents, Event } from "~~/utils/events";
import { MapMarker } from "~/utils/map";

const route = useRoute();

let events: Event[];
let event: Event | undefined;

const { pending, data } = await useEvents();

watchEffect(() => {
  if (!data.value) return;

  events = Array.from(data.value.events);
  event = events.find((event) => event.id == route.params.event_id);
});

const update = ref(Date.now());
const markers = computed(() => {
  update.value = Date.now();
  if (!event && Array(event).length != 1) return null;
  return Array(event).map((event): MapMarker => {
    return {
      lat: event!.venue!.lat,
      lng: event!.venue!.lng,
      title: event?.title,
      subtitle: formatDate(event!.time),
      type: event?.group.type as "owddm" | "kwddm",
    };
  });
});
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

.event-image-date-container-mobile {
  display: none;
}

.event-image-detail {
  border-radius: 10px;
  width: 75%;
  margin-left: 1rem;
}

.event-map-detail {
  max-width: 25%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.event-map {
  width: 100%;
  height: 90%;
  display: flex;
}

.event-location-details-container {
  container-type: inline-size;
  background-color: #e5e7eb; /* TailwindCSS Gray 200 */
  height: 10%;
  margin-left: 1rem;
  margin-right: 1rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.event-location-details {
  font-weight: 300;
  font-size: 0.7rem;
  padding: 0.3rem;
}

.event-title {
  margin-left: 1rem;
  line-height: normal;
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
  max-width: 75%;
  margin-right: 0.5rem;
}

.event-details-date-rsvp-discord {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-self: start;
  width: 25%;
  margin-left: 1rem;
}

.rsvp {
  width: 100%;
  border-radius: 10px;
  margin-top: 1rem;
  padding: 0.8rem;
}

.rsvp:hover {
  background-color: red;
}

.join-discord {
  width: 100%;
  border-radius: 10px;
  margin-top: 1rem;
  background-color: hsla(240, 100%, 80%, 1);
  padding: 0.8rem;
}

.join-discord:hover {
  background-color: red;
}

@media only screen and (max-width: 768px) {
  .event-group-banner {
    margin-top: -5rem;
    margin-bottom: -5rem;
    clip-path: inset(100px 0px 100px 0px);
  }

  .event-image-detail {
    border-radius: 10px;
    width: 65%;
    margin-left: 1rem;
  }

  .event-map-detail {
    max-width: 35%;
  }

  .event-details-container {
    margin-top: 1rem;
  }

  .event-details-description {
    max-width: 65%;
    margin-right: 0.5rem;
  }

  .event-details-date-rsvp-discord {
    width: 35%;
    margin-left: 2rem;
  }

  .event-rsvp-discord-mobile {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
  }

  .event-title {
    margin-top: -2rem;
    font-size: 1.6rem;
  }

  .event-title-mobile {
    font-size: 1.6rem;
    line-height: normal;
    padding: 1rem;
  }

  .event-description-container {
    margin-top: 0.5rem;
  }
}

@media only screen and (max-width: 420px) {
  .event-group-banner {
    margin-top: -2rem;
    margin-bottom: -1rem;
    clip-path: inset(40px 0px 40px 0px);
  }

  .event-image-map-container {
    display: none;
  }

  .event-image-date-container-mobile {
    display: block;
  }

  .event-image-detail {
    border-radius: 10px;
    width: 96%;
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-top: -1rem;
    margin-bottom: 0.5rem;
  }

  .event-date-container-mobile {
    width: 96%;
    margin-left: auto;
    margin-right: auto;
  }

  .event-details-container {
    display: none;
  }

  .rsvp {
    width: 11rem;
    margin-left: 1rem;
  }

  .join-discord {
    width: 11rem;
    margin-right: 1rem;
  }

  .event-map-detail {
    height: 16rem;
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }

  .event-map {
    width: 98%;
    margin-left: auto;
    margin-right: auto;
  }

  .event-location-details-container {
    margin-top: -0.2rem;
    height: 14%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}

@container (inline-size < 240px) {
  .event-location-details {
    font-size: 0.6rem;
    padding: 0.2rem;
  }
}

@container (inline-size < 180px) {
  .event-location-details {
    font-size: 0.5rem;
    padding: 0.2rem;
  }
}
</style>
