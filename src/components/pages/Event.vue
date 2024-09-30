<template>
  <Suspense>
    <div>
      <AstroLink href="/events" class="event-group-banner-container">
        <EventGroupHeader :type="event.group.type" />
      </AstroLink>
      <div class="event-image-map-container">
        <img v-if="image" class="event-image-detail" :src="image.file" alt="" />
        <div class="event-map-detail">
          <div class="event-map">
            <EventMap class="main-map" :key="update" :markers="markers" />
          </div>
          <div class="event-location-details-container">
            <div class="event-location-details">
              <a target="_blank" rel="noopener noreferrer" :href="`https://www.google.com/maps/search/?api=1&query=${event.venue?.lat}%2C${event.venue?.lng}`">
                {{ event.venue?.name }}
              </a>
              <br />
              <span>{{ event.venue?.address }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="event-image-date-container-mobile">
        <img v-if="image" class="event-image-detail" :src="image.file" alt="" />
        <div class="event-date-container-mobile">
          <EventDateDisplay :event="event!" :v-if="event" />
        </div>
        <h1
          :class="{
            'event-title-mobile': true,
            'event-title-cancelled': !!event.isCancelled,
          }">
          {{ event.title }}
        </h1>
        <sub v-if="!!event.isCancelled">(Cancelled)</sub>
        <div class="event-description-container">
          <Marked :text="event!.description" />
        </div>
        <div class="event-rsvp-discord-mobile">
          <div>
            <a target="_blank" rel="noopener noreferrer" :v-if="event.group" :href="`https://www.meetup.com/en-US/${event.group.urlname}/events/${event.id}`">
              <button class="rsvp">→ RSVP</button>
            </a>
          </div>
          <div>
            <a target="_blank" rel="noopener noreferrer" href="https://discord.com/invite/k8xj8d75f6">
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
              <a target="_blank" rel="noopener noreferrer" :href="`https://www.google.com/maps/search/?api=1&query=${event.venue?.lat}%2C${event.venue?.lng}`">
                {{ event.venue?.name }}
              </a>
              <br />
              <span>{{ event.venue?.address }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="event-details-container">
        <div class="event-details-description">
          <h1
            :class="{
              'event-title': true,
              'event-title-cancelled': !!event.isCancelled,
            }">
            {{ event.title }}
          </h1>
          <sub v-if="!!event.isCancelled" class="event-cancelled">(Cancelled)</sub>
          <div class="event-description-container">
            <Marked :text="event!.description" />
          </div>
        </div>
        <div class="event-details-date-rsvp-discord">
          <div>
            <EventDateDisplay :event="event!" :v-if="event" />
          </div>
          <div>
            <a class="button rsvp" target="_blank" rel="noopener noreferrer" :v-if="event.group" :href="`https://www.meetup.com/en-US/${event.group.urlname}/events/${event.id}`"> → RSVP </a>
          </div>
          <div>
            <a class="button join-discord" target="_blank" rel="noopener noreferrer" href="https://discord.com/invite/k8xj8d75f6"> → Join Discord </a>
          </div>
        </div>
      </div>
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import EventMap from "../EventMap.vue";
import EventDateDisplay from "../events/EventDateDisplay.vue";
import EventGroupHeader from "../events/EventGroupHeader.vue";
import Marked from "../Marked.vue";
import AstroLink from "../AstroLink.vue";
import { computed, ref, provide } from "vue";
import { formatDate } from "../../utils/utils";
import { type MapMarker } from "../../utils/map";
import { transform, type EventData } from "../../utils/events";

const { eventId, events, url } = defineProps<{
  eventId: string;
  events: EventData;
  url: URL;
}>();
provide("url", url);

const event = transform(events).events.find((event) => event.id === eventId)!;
const image = event.image?.transforms?.m?.webp;

const update = ref(Date.now());
const markers = computed(() => {
  update.value = Date.now();
  if (!event && Array(event).length != 1) return null;
  return Array(event).map((event): MapMarker => {
    return {
      lat: event!.venue!.lat,
      lng: event!.venue!.lng,
      title: event!.title,
      subtitle: formatDate(event!.time),
      type: event!.group.type,
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
  display: block;
  margin: var(--space);
  margin-top: 0;
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

.event-cancelled {
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
  background-color: #e5e7eb;

  /* TailwindCSS Gray 200 */
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

.event-title-cancelled {
  text-decoration: line-through;
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

.event-details-date-rsvp-discord .button {
  --button-width: 100%;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  color: var(--color-white);
  text-decoration: none;
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
  background-color: hsl(240deg 100% 80% / 100%);
  padding: 0.8rem;
}

.join-discord:hover {
  background-color: red;
}

@media only screen and (width <= 768px) {
  .event-group-banner {
    margin-top: -5rem;
    margin-bottom: -5rem;
    clip-path: inset(100px 0 100px 0);
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

@media only screen and (width <= 420px) {
  .event-group-banner {
    margin-top: -2rem;
    margin-bottom: -1rem;
    clip-path: inset(40px 0 40px 0);
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
    margin: -1rem auto 0.5rem;
    display: block;
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
    width: 10rem;
    margin-left: 1rem;
  }

  .join-discord {
    width: 10rem;
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

@media screen and (orientation: landscape) and (width <= 896px) {
  .event-image-map-container {
    margin-left: env(safe-area-inset-left, 2rem);
    margin-right: env(safe-area-inset-right, 2rem);
  }

  .event-image-detail {
    width: 60%;
  }

  .event-map-detail {
    max-width: 40%;
  }

  .event-details-container {
    margin-left: env(safe-area-inset-left, 2rem);
    margin-right: env(safe-area-inset-right, 2rem);
  }

  .event-details-description {
    margin-top: -0.1rem;
    max-width: 60%;
  }

  .event-details-date-rsvp-discord {
    width: 40%;
    margin-left: 2rem;
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

.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 1rem;
}
</style>
