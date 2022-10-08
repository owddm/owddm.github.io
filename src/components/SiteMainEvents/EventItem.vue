<script lang="ts">
interface Props {
  isVisible?: boolean;
  data: Data;
}

interface Data {
  region?: Region;
  imageURL?: string;
  title: string;
  eventTime?: string;
  eventLink: {
    text: string;
    url: string;
  };
  status?: Status;
}

enum Region {
  OSAKA = "osaka",
  KYOTO = "kyoto",
}

enum Status {
  Active = "active",
  Inactive = "inactive",
}
</script>

<script setup lang="ts">
withDefaults(defineProps<Props>(), {
  imageURL: "../../../public/meetupimg.png",
  region: Region.OSAKA,
  eventTime: "Insert Event Time",
  title: "Insert Event Title",
  eventLink: () => {
    return {
      text: "Insert Link Text",
      url: "#",
    };
  },
  isVisible: true,
});
</script>

<template>
  <Transition>
    <div v-show="isVisible">
      <li
        class="event"
        :class="data.status == Status.Inactive ? 'inactive' : 'active'"
        :data-meetup="data.region"
      >
        <div class="event-image"><img :src="data.imageURL" alt="" /></div>
        <div>
          <span class="event-time">{{ data.eventTime }}</span>
          {{ data.title }}
          <a class="event-link" :href="data.eventLink.url">{{
            data.eventLink.text
          }}</a>
        </div>
      </li>
    </div>
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
