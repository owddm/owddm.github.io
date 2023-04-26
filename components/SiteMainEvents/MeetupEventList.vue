<script lang="ts">
interface Props {
  events: Event[] | undefined;
  years: number[];
  bannerURL?: string;
}
</script>

<script setup lang="ts">
import MeetupEventItem from "./MeetupEventItem.vue";
import dayjs from "dayjs/esm";
import { Event } from "~~/utils/events";
import { isUpcoming } from "~~/utils/utils";

const props = withDefaults(defineProps<Props>(), {});

const bannerStyling = computed(() => ({
  "group-banner-owddm": props.events![0].group.type == "owddm",
  "group-banner-kwddm": props.events![0].group.type == "kwddm",
}));
</script>

<template>
  <div class="event-list-container">
    <div class="event-list-container">
      <div v-if="bannerURL" class="group-banner-container">
        <img :class="bannerStyling" class="group-banner group-banner-owddm" :src="bannerURL" :alt="events![0].group.type + ' banner'" />
      </div>
      <h2 class="year-heading">Upcoming</h2>
      <div class="event-list-container" v-for="event in events">
        <div v-if="isUpcoming(dayjs(event.time))">
          <MeetupEventItem :title="event.title" :date="dayjs(event.time)" :url="`events/${event.id}`" :group="event.group.type" />
        </div>
      </div>
      <div v-for="year in years">
        <h2 class="year-heading">{{ year }}</h2>
        <div class="event-list-container" v-for="event in events">
          <div v-if="dayjs(event.time).get('year') == year && !isUpcoming(dayjs(event.time))">
            <MeetupEventItem :title="event.title" :date="dayjs(event.time)" :url="`events/${event.id}`" :group="event.group.type" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-list-container {
  max-width: 100%;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
}
.group-banner-container {
  max-width: 100%;
}
.group-banner {
  border-radius: 10px;
  width: 100%;
}

.group-banner-owddm {
  border-top: 5px solid red;
}
.group-banner-kwddm {
  border-top: 5px solid purple;
}

.year-heading {
  font-weight: 100;
  letter-spacing: 0.025em;
  margin-top: 1rem;
  margin-bottom: 0.2rem;
  margin-left: 0.2rem;
  border-bottom: 2px solid;
  border-bottom-color: rgb(218, 207, 207);
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
