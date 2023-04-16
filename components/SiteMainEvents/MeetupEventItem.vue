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
    <div
      class="event-item-container"
      :class="{
        'container-upcoming': isUpcoming(dayjs(date)),
        'container-owddm': group == 'owddm' ? true : false,
        'container-kwddm': group == 'kwddm' ? true : false,
      }">
      <div class="title">
        <a :href="url">
          {{ title }}
        </a>
      </div>
      <div v-if="isUpcoming(dayjs(date))">
        <span v-if="getTimeDiffInDays(dayjs(date), dayjs()) == 1" class="date-timer">In {{ getTimeDiffInDays(dayjs(date), dayjs()) }} - day! </span>
        <span v-else-if="getTimeDiffInDays(dayjs(date), dayjs()) <= 7" class="date-timer">In {{ getTimeDiffInDays(dayjs(date), dayjs()) }} - days! </span>
        <span v-else-if="getTimeDiffInDays(dayjs(date), dayjs()) > 7 && getTimeDiffInDays(dayjs(date), dayjs()) < 28" class="date-timer">In {{ Math.floor(getTimeDiffInDays(dayjs(date), dayjs()) / 7) }} - weeks! </span>
        <span v-else-if="getTimeDiffInDays(dayjs(date), dayjs()) >= 28" class="date-timer">In {{ Math.floor(getTimeDiffInDays(dayjs(date), dayjs()) / 28) }} - months! </span>
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
  max-width: 100%;
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
