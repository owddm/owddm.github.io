<script lang="ts">
import { type MeetupEvent } from "../../utils/events";
interface Props {
  event: Pick<MeetupEvent, "title" | "time" | "id" | "group" | "isCancelled">;
}
</script>

<script setup lang="ts">
import dayjs from "dayjs";
import { getTimeDiffInDays, isUpcoming } from "../../utils/utils";

const { event } = defineProps<Props>();

const title = event.title;
const date = dayjs(event.time);
const url = `/events/${event.id}`;
const group = event.group.type;

const upcoming = isUpcoming(event);
</script>

<template>
  <Transition>
    <div
      class="event-item-container"
      :class="{
        'container-upcoming': upcoming,
        'container-owddm': group == 'owddm' ? true : false,
        'container-kwddm': group == 'kwddm' ? true : false,
      }">
      <div
        :class="{
          title: true,
          'title-cancelled': !!event.isCancelled,
        }">
        <a :href="url">
          {{ title }}
        </a>
      </div>
      <div v-if="upcoming">
        <span v-if="getTimeDiffInDays(dayjs(date), dayjs()) == 1" class="date-timer">In {{ getTimeDiffInDays(dayjs(date), dayjs()) }} - day! </span>
        <span v-else-if="getTimeDiffInDays(dayjs(date), dayjs()) <= 7" class="date-timer">In {{ getTimeDiffInDays(dayjs(date), dayjs()) }} - days! </span>
        <span v-else-if="getTimeDiffInDays(dayjs(date), dayjs()) > 7 && getTimeDiffInDays(dayjs(date), dayjs()) < 28" class="date-timer">In {{ Math.floor(getTimeDiffInDays(dayjs(date), dayjs()) / 7) }} - weeks! </span>
        <span v-else-if="getTimeDiffInDays(dayjs(date), dayjs()) >= 28" class="date-timer">In {{ Math.floor(getTimeDiffInDays(dayjs(date), dayjs()) / 28) }} - months! </span>
      </div>
      <span class="date">{{ dayjs(date).format("ddd. MMMM D YYYY [at] H:mm") }}</span>
    </div>
  </Transition>
</template>

<style>
.event-item-container .title {
  font-weight: 600;
  margin-left: 0.5rem;
}

.event-item-container .title-cancelled {
  text-decoration: line-through;
}

.event-item-container {
  border-left-style: solid;
  margin-top: 0.1rem;
  max-width: 100%;
}

.event-item-container.container-owddm {
  border-left-color: var(--color-osaka);
}

.event-item-container.container-owddm a:hover {
  color: var(--color-osaka);
}

.event-item-container.container-kwddm {
  border-left-color: var(--color-kyoto);
}

.event-item-container.container-kwddm a:hover {
  color: var(--color-kyoto);
}

.event-item-container.container-upcoming {
  border-left-width: 6px;
}

.event-item-container .date {
  font-weight: 200;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.event-item-container .date-timer {
  font-weight: 600;
  margin-left: 0.5rem;
  font-size: 0.8rem;
}

.event-item-container .v-enter-active,
.event-item-container .v-leave-active {
  transition: opacity 0.3s ease;
}

.event-item-container .v-enter-from,
.event-item-container .v-leave-to {
  opacity: 0;
}
</style>
