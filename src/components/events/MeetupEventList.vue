<script setup lang="ts">
import "./MeetupEventList.css";
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
