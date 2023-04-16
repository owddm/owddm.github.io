<template>
  <div class="events-container">
    <div v-if="pending">Loading ...</div>
    <div v-else>
      <div>
        <MeetupEventList :events="owddm" :years="owddm_year" :bannerURL="'https://owddm.github.io/public/images/events/5/0/5/516122@l.webp'" />
      </div>
    </div>
    <div v-if="pending">Loading ...</div>
    <div v-else>
      <div>
        <MeetupEventList :events="kwddm" :years="kwddm_year" :bannerURL="'https://owddm.github.io/public/images/events/5/0/5/516520@l.webp'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MeetupEventList from "~~/components/SiteMainEvents/MeetupEventList.vue";
import { useEvents, GroupIDFromGroupType, Event } from "~~/utils/events";
import { getYearFromMeetupEvents, getUniqueItems } from "~~/utils/utils";

let events: Event[];
let owddm: Event[];
let owddm_year: number[];
let kwddm: Event[];
let kwddm_year: number[];

const { pending, data } = await useEvents();

console.log(data);

watchEffect(() => {
  if (!data.value) return;

  events = Array.from(data.value.events);

  owddm = events?.filter((event) => {
    return event.group.id == GroupIDFromGroupType.owddm;
  });

  kwddm = events?.filter((event) => {
    return event.group.id == GroupIDFromGroupType.kwddm;
  });

  // * Additional chronological sort on the frontend just to make sure events are in the correct order.
  owddm = owddm?.sort(function (event_a, event_b) {
    return event_b.time - event_a.time;
  });
  kwddm = kwddm?.sort(function (event_a, event_b) {
    return event_b.time - event_a.time;
  });

  // * Pass an array of unique years to MeetupEventList
  owddm_year = getUniqueItems(getYearFromMeetupEvents(owddm));
  kwddm_year = getUniqueItems(getYearFromMeetupEvents(kwddm));
});
</script>

<style scoped>
div {
  max-width: 100%;
}

.events-container {
  display: flex;
}
</style>
