<template>
  <Suspense>
    <div class="event-container">
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
import "./Event.css";
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
