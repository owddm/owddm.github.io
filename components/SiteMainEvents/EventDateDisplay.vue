<script lang="ts">
interface Props {
  date: Dayjs;
}
</script>

<script setup lang="ts">
import dayjs, { Dayjs } from "dayjs/esm";
import { getTimeDiffInDays, isUpcoming } from "~~/utils/utils";

withDefaults(defineProps<Props>(), {
  title: "Insert Event Title",
  date: function () {
    return dayjs();
  },
  url: "Insert event page URL",
  group: "owddm",
});
</script>

<template>
  <Transition>
    <div class="event-item-container">
      <div v-if="isUpcoming(dayjs(date))">
        <span class="date">&#128337; {{ dayjs(date).format("ddd. MMMM D YYYY") }}</span> <br />
        <span class="date">&emsp; {{ dayjs(date).format("H:mm") }} - {{ dayjs(date).add(7200000).format("H:mm") }}</span> <br />
        <span v-if="getTimeDiffInDays(dayjs(date), dayjs()) == 1" class="date-timer">&emsp; That's in {{ getTimeDiffInDays(dayjs(date), dayjs()) }} - day! </span>
        <span v-else-if="getTimeDiffInDays(dayjs(date), dayjs()) <= 7" class="date-timer">&emsp; That's in {{ getTimeDiffInDays(dayjs(date), dayjs()) }} - days! </span>
        <span v-else-if="getTimeDiffInDays(dayjs(date), dayjs()) > 7 && getTimeDiffInDays(dayjs(date), dayjs()) < 28" class="date-timer">&emsp; That's in {{ Math.floor(getTimeDiffInDays(dayjs(date), dayjs()) / 7) }} - weeks! </span>
        <span v-else-if="getTimeDiffInDays(dayjs(date), dayjs()) >= 28" class="date-timer">&emsp; That's in {{ Math.floor(getTimeDiffInDays(dayjs(date), dayjs()) / 28) }} - months! </span>
      </div>
      <div v-else>
        <span class="date">&#128337; {{ dayjs(date).format("ddd. MMMM D YYYY") }}</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.event-item-container {
  margin-top: 0.1rem;
  max-width: 100%;
  background-color: #e5e7eb; /* TailwindCSS Gray 200 */
  padding: 0.5rem;
  border-radius: 10px;
  letter-spacing: 0.05em;
}

.date {
  font-weight: 500;
  margin-left: 0.5rem;
}

.date-timer {
  font-weight: 600;
  margin-left: 0.5rem;
}
</style>
