<script setup lang="tsx">
import "./Events.css";
import { transform, GroupIDFromGroupType, type EventData } from "../../utils/events";
import { groupEvents } from "../../utils/utils";
import MeetupEventList from "../events/MeetupEventList.vue";
import { onMounted, provide, ref } from "vue";

const { data, url } = defineProps<{
  data: EventData;
  url: URL;
}>();
provide("url", url);

const mounted = ref(false);
const { events } = transform(data);
const regroup = () => ({
  mixed: groupEvents(events),
  owddm: groupEvents(events.filter((event) => event.group.id == GroupIDFromGroupType.owddm)),
  kwddm: groupEvents(events.filter((event) => event.group.id == GroupIDFromGroupType.kwddm)),
});
const filtered = ref(regroup());
onMounted(() => {
  mounted.value = true;
  const doRefresh = () => (filtered.value = regroup());
  doRefresh();
  const refresh = setInterval(doRefresh, 1000);
  return () => {
    mounted.value = false;
    clearInterval(refresh);
  };
});
</script>
<template>
  <div class="events-container" v-if="mounted">
    <MeetupEventList :eventGroups="filtered.owddm!" type="owddm" />
    <MeetupEventList :eventGroups="filtered.kwddm!" type="kwddm" />
  </div>
  <div class="events-mobile-container">
    <MeetupEventList :eventGroups="filtered.mixed!" type="mixed" />
  </div>
</template>
