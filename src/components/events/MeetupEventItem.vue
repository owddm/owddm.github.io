<script lang="ts">
import { type MeetupEvent } from "../../utils/events";
interface Props {
  event: Pick<MeetupEvent, "title" | "time" | "id" | "group" | "isCancelled">;
}
</script>

<script setup lang="ts">
import "./MeetupEventItem.css";
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
      class="meetup-event-item-container"
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
