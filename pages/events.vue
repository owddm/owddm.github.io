<template>
  <div>
    <MeetupEventItem title="OK" :date="dayjs(1680919000000)" url="some url" :group="Object.keys({ owddm })[0]" />
    <MeetupEventItem title="OK" :date="dayjs(1681019000000)" url="some url" :group="Object.keys({ owddm })[0]" />
    <MeetupEventItem title="OK" :date="dayjs(1683019000000)" url="some url" :group="Object.keys({ owddm })[0]" />
    <MeetupEventItem title="OK" :date="dayjs(1687019000000)" url="some url" :group="Object.keys({ owddm })[0]" />
    <MeetupEventItem title="OK" :date="dayjs(1683019000000)" url="some url" :group="Object.keys({ kwddm })[0]" />
    <MeetupEventItem title="OK" :date="dayjs(1687019000000)" url="some url" :group="Object.keys({ kwddm })[0]" />
    <MeetupEventItem title="OK" :date="dayjs(1680019000000)" url="some url" :group="Object.keys({ kwddm })[0]" />
  </div>
</template>

<script setup lang="ts">
import MeetupEventItem from "~~/components/SiteMainEvents/MeetupEventItem.vue";
import { MeetupEventRaw, MeetupEvent, useEvents, getUniqueItems, getYearFromMeetupEvents, getTimeDiffInDays } from "~~/utils/utils";
// * Must import esm version or will cause an error in Vite
import dayjs from "dayjs/esm";
const owddm = await useEvents("15632202");
// const kwddm = await useEvents("36450361");
console.log({ owddm });
// console.log({ kwddm });

enum Group {
  owddm = "owddm",
  kwddm = "kwddm",
}

// TODO:
/*
- Create component for upcoming event
  - Include in x weeks
- Create component for past events
- Use the array of years to create separate heading elements for each year
- Create date function that takes the current date of the event and calculates in xx weeks.
- Upcoming events will basically be events, that appear later the client's current date.
- Clicking on an event should jump to the event page.
*/

// let uniqueYears: number[] = getUniqueItems(getYearFromMeetupEvents(owddm)).reverse();

// let date1 = dayjs(1680318000000);
// let date2 = dayjs();

// console.log(getTimeDiffInDays(date1, date2));
</script>

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
}
</style>
