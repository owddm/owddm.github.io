<script setup lang="ts">
import "./EventDateDisplay.css";
import { type MeetupEvent } from "../../utils/events";
import dayjs from "dayjs";
import { getTimeDiffInDays, isUpcoming } from "../../utils/utils";

interface Props {
  event: Pick<MeetupEvent, "title" | "isCancelled" | "time">;
}

const { event } = defineProps<Props>();
const upcoming = isUpcoming(event);
const date = dayjs(event.time);
</script>

<template>
  <Transition>
    <div class="event-item-container">
      <div v-if="upcoming">
        <span class="date">&#128337; {{ dayjs(date).format("ddd. MMMM D, YYYY") }}</span> <br />
        <span class="date">&emsp; {{ dayjs(date).format("H:mm") }} - {{ dayjs(date).add(7200000).format("H:mm") }}</span> <br />
        <span v-if="getTimeDiffInDays(dayjs(date), dayjs()) == 1" class="date-timer">&emsp; That's in {{ getTimeDiffInDays(dayjs(date), dayjs()) }} - day! </span>
        <span v-else-if="getTimeDiffInDays(dayjs(date), dayjs()) <= 7" class="date-timer">&emsp; That's in {{ getTimeDiffInDays(dayjs(date), dayjs()) }} - days! </span>
        <span v-else-if="getTimeDiffInDays(dayjs(date), dayjs()) > 7 && getTimeDiffInDays(dayjs(date), dayjs()) < 28" class="date-timer">&emsp; That's in {{ Math.floor(getTimeDiffInDays(dayjs(date), dayjs()) / 7) }} - weeks! </span>
        <span v-else-if="getTimeDiffInDays(dayjs(date), dayjs()) >= 28" class="date-timer">&emsp; That's in {{ Math.floor(getTimeDiffInDays(dayjs(date), dayjs()) / 28) }} - months! </span>
      </div>
      <div v-else>
        <span class="date">&#128337; {{ dayjs(date).format("ddd. MMMM D, YYYY") }}</span>
      </div>
    </div>
  </Transition>
</template>
