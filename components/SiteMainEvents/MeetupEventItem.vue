<script lang="ts">
interface Props {
  title: string;
  date: Dayjs;
  url: string;
  group: string;
}
</script>

<script setup lang="ts">
import dayjs, { Dayjs } from "dayjs/esm";
import { getTimeDiffInDays } from "~~/utils/utils";

let currentDate: dayjs.Dayjs = dayjs();

withDefaults(defineProps<Props>(), {
  title: "Insert Event Title",
  date: function () {
    return dayjs();
  },
  url: "Insert event page URL",
  group: "owddm",
});

const isUpcomingEvent = (date: Dayjs): boolean => {
  let currentDate: dayjs.Dayjs = dayjs();
  let timeDifferenceInDays = getTimeDiffInDays(date, currentDate);
  return timeDifferenceInDays > 0;
};
</script>

<template>
  <Transition>
    <div
      class="event-item-container"
      :class="{
        'container-upcoming': isUpcomingEvent(dayjs(date)),
        'container-owddm': group == 'owddm' ? true : false,
        'container-kwddm': group == 'kwddm' ? true : false,
      }">
      <div class="title">
        <a href="{{ url }}">
          {{ title }}
        </a>
      </div>
      <div v-if="isUpcomingEvent(dayjs(date))">
        <span v-if="getTimeDiffInDays(dayjs(date), currentDate) == 1" class="date-timer">In {{ getTimeDiffInDays(dayjs(date), currentDate) }} - day! </span>
        <span v-else-if="getTimeDiffInDays(dayjs(date), currentDate) <= 7" class="date-timer">In {{ getTimeDiffInDays(dayjs(date), currentDate) }} - days! </span>
        <span v-else-if="getTimeDiffInDays(dayjs(date), currentDate) > 7 && getTimeDiffInDays(dayjs(date), currentDate) < 28" class="date-timer">In {{ Math.floor(getTimeDiffInDays(dayjs(date), currentDate) / 7) }} - weeks! </span>
        <span v-else-if="getTimeDiffInDays(dayjs(date), currentDate) >= 28" class="date-timer">In {{ Math.floor(getTimeDiffInDays(dayjs(date), currentDate) / 28) }} - months! </span>
        <span class="date">{{ dayjs(date).format("ddd. MMMM D YYYY [at] H:mm") }}</span>
      </div>
      <div v-else>
        <span class="date">{{ dayjs(date).format("ddd. MMMM D YYYY [at] H:mm") }}</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.title {
  font-weight: 600;
  margin-left: 0.5rem;
}

.event-item-container {
  border-left-style: solid;
  margin-top: 0.1rem;
}

.container-owddm {
  border-left-color: red;
}

div.container-owddm a:hover {
  color: red;
}

.container-kwddm {
  border-left-color: purple;
}

div.container-kwddm a:hover {
  color: purple;
}

.container-upcoming {
  border-left-width: 6px;
}

.date {
  font-weight: 200;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.date-timer {
  font-weight: 600;
  margin-left: 0.5rem;
  font-size: 0.8rem;
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
