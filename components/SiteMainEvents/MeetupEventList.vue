<script setup lang="ts">
import EventGroupHeader from "./EventGroupHeader.vue";
import MeetupEventItem from "./MeetupEventItem.vue";
import dayjs from "dayjs/esm";
import { Event } from "~~/utils/events";

interface EventGroup {
  name?: string
  active?: boolean
  events?: Event[]
}

defineProps<{
  eventGroups: EventGroup[] | undefined;
  type?: string;
}>()
</script>

<template>
  <div class="event-list-container">
    <EventGroupHeader :type="type"/>
    <div v-if="!eventGroups">Loading ...</div>
    <div v-else v-for="{ name, events }, index in eventGroups" :key="index">
      <h2 v-if="name" class="heading">{{name}}</h2>
      <MeetupEventItem v-for="event in events" :key="event.id" :title="event.title" :date="dayjs(event.time)" :url="`events/${event.id}`" :group="event.group.type" />
    </div>
  </div>
</template>

<style scoped>
.event-list-container {
  width: 100%;
}
.heading {
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
