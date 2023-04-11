<template>
  <div class="events-container">
    <div v-if="pending">Loading ...</div>
    <div class="events-group-container" v-else>
      <div>
        <MeetupEventList :events="owddm" :years="owddm_year" />
      </div>
    </div>
    <div v-if="pending">Loading ...</div>
    <div class="events-group-container" v-else>
      <div>
        <MeetupEventList :events="kwddm" :years="kwddm_year" />
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

  // * Pass an array of unique years to MeetupEventList
  owddm_year = getUniqueItems(getYearFromMeetupEvents(owddm));
  kwddm_year = getUniqueItems(getYearFromMeetupEvents(kwddm));
});

// TODO:
/*
- Create component for upcoming event
  - Include in x weeks
- Create component for past events
- Use the array of years to create separate heading elements for each year
- Create date function that takes the current date of the event and calculates in xx weeks.
- Upcoming events will basically be events, that appear later the client's current date.
- Clicking on an event should jump to the event page.
*/
</script>

<style scoped>
div {
  max-width: 100%;
}

.events-container {
  display: flex;
}
.events-group-container {
  padding: 0.5rem;
}
/*
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 100%;
}

.description {
  margin-left: 1rem;
  margin-right: 1rem;
  font-weight: 100;
  padding: 1rem;
}

.title {
  padding: 1rem;
}

.topics {
  margin-left: 1rem;
  font-weight: 200;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.date {
  margin-top: -0.5rem;
  margin-left: 1rem;
  font-weight: 200;
}

.event_view {
  margin-bottom: 4rem;
  border-radius: 20px;
  width: 70vw;
  margin-left: auto;
  margin-right: auto;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
} */
</style>
