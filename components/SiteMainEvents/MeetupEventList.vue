<script lang="ts">
interface Props {
  events: Event[] | undefined;
  years: number[];
  bannerUrl?: string;
}
</script>

<script setup lang="ts">
import MeetupEventItem from "./MeetupEventItem.vue";
import dayjs, { Dayjs } from "dayjs/esm";
import { Event } from "~~/utils/events";
import { isUpcoming, getUniqueItems } from "~~/utils/utils";

const props = withDefaults(defineProps<Props>(), {
  bannerUrl: "Insert event page URL",
});

const doesEventHeaderWithYearExist = (event_date: number, header_class_suffix: string): boolean => {
  let list_event_year_headers: NodeListOf<HTMLElement> = document.querySelectorAll(`h2.event_year_header_${header_class_suffix}`);
  let event_year = dayjs(event_date).get("year");
  let header_years: string[] = [];

  list_event_year_headers.forEach((header: HTMLElement) => {
    header_years.push(header.innerHTML);
  });

  let header_years_unique = getUniqueItems(header_years);
  let doesYearExist = header_years_unique.includes(event_year.toString());
  console.log(doesYearExist);

  return doesYearExist;
};

// onMounted(() => {
//   doesEventHeaderWithYearExist(props.events[50].time, "owddm");
// });
</script>

<template>
  <div class="event-list-container">
    <div class="event-list-container">
      <div class="group-banner-container">
        <img class="group-banner" src="https://owddm.github.io/public/images/events/5/0/5/516122@l.webp" alt="" />
      </div>
      <h2 :class="'event_year_header_' + events[0].group.type">Upcoming</h2>
      <h2 :class="'event_year_header_' + events[0].group.type">Upcoming</h2>
      <h2 :class="'event_year_header_' + events[0].group.type">Upcoming</h2>
      <h2 :class="'event_year_header_' + events[0].group.type">2023</h2>
      <div class="event-list-container" v-for="event in events">
        <h2>{{ years[0] }}</h2>
        <h3>{{ dayjs(event.time).get("year") }}</h3>
        <MeetupEventItem :title="event.title" :date="dayjs(event.time)" url="some url" :group="event.group.type" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-list-container {
  max-width: 100%;
}
.group-banner-container {
  max-width: 100%;
}
.group-banner {
  border-radius: 10px;
  border-top: 5px solid red;
  width: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
