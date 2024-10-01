<script setup lang="ts">
import EventGroupHeader from "./EventGroupHeader.vue";
import MeetupEventItem from "./MeetupEventItem.vue";
import { type MeetupEvent } from "../../utils/events";

interface EventGroup {
  name?: string;
  active?: boolean;
  events?: MeetupEvent[];
}

defineProps<{
  eventGroups: EventGroup[];
  type?: string;
}>();
</script>

<template>
  <div class="event-list-container">
    <EventGroupHeader :type="type!" />
    <div v-for="({ name, events }, index) in eventGroups" :key="index">
      <h2 v-if="name" class="heading">{{ name }}</h2>
      <MeetupEventItem v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<style>
.event-list-container {
  width: 100%;
}

.event-list-container .heading {
  font-weight: 100;
  letter-spacing: 0.025em;
  margin-top: 1rem;
  margin-bottom: 0.2rem;
  margin-left: 0.2rem;
  border-bottom: 2px solid;
  border-bottom-color: rgb(218 207 207);
}

.event-list-container .v-enter-active,
.event-list-container .v-leave-active {
  transition: opacity 0.3s ease;
}

.event-list-container .v-enter-from,
.event-list-container .v-leave-to {
  opacity: 0;
}
</style>
