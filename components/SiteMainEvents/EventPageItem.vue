<script lang="ts" setup>
import { MeetupEvent } from "~~/utils/utils";
const props = defineProps<{
  eventGalleryID: string;
  events: MeetupEvent[];
}>();
</script>

<template>
  <div class="event_view">
    <div>
      <h2 class="title">
        {{ owddm[75].title }}
      </h2>
    </div>
    <br />
    <p class="date">{{ formatDate(owddm[75].time) }} @ {{ owddm[75].venue[0].name }}</p>
    <div class="topics">
      <span v-for="topic in owddm[75].topics"> {{ topic }} | </span>
    </div>
    <img :src="owddm[75].image.transforms.l.webp.file" :alt="owddm[75].name" />
    <div class="description">
      <Marked :text="owddm[75].description" />
    </div>
  </div>
</template>

<style scoped>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 100%;
}

.description {
  margin-left: 1rem;
  margin-right: 1rem;
  font-weight: 100;
  padding: 1rem;
}

.title {
  padding: 1rem;
}

.topics {
  margin-left: 1rem;
  font-weight: 200;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.date {
  margin-top: -0.5rem;
  margin-left: 1rem;
  font-weight: 200;
}

.event_view {
  margin-bottom: 4rem;
  border-radius: 20px;
  width: 70vw;
  margin-left: auto;
  margin-right: auto;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  /* box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset; */
}
</style>
