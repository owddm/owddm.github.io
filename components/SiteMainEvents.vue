<script setup lang="ts">
import { ref } from "vue";
import EventItem from "./SiteMainEvents/EventItem.vue";

enum Region {
  OSAKA = "osaka",
  KYOTO = "kyoto",
}

enum Status {
  Active = "active",
  Inactive = "inactive",
}

// State
let isOsakaEventsVisible = ref(true);
let isKyotoEventsVisible = ref(true);

// Event Handlers
const toggleOsaka = () => {
  isOsakaEventsVisible.value = !isOsakaEventsVisible.value;
};

const toggleKyoto = () => {
  isKyotoEventsVisible.value = !isKyotoEventsVisible.value;
};
</script>

<template>
  <section>
    <div class="event-header">
      <h2>JOIN OUR EVENTS!</h2>
      <div>
        <button
          title="Toggle visibility of events in Osaka"
          :class="isOsakaEventsVisible ? 'active' : 'inactive'"
          @:click="toggleOsaka"
        >
          <span class="at">@</span>OSAKA
        </button>
        <button
          title="Toggle visibility of events in Kyoto"
          :class="isKyotoEventsVisible ? 'active' : 'inactive'"
          @:click="toggleKyoto"
        >
          <span class="at">@</span>KYOTO
        </button>
      </div>
    </div>
    <p>
      Every month, we get together<br />in Osaka, and Kyoto<br />to talk about
      technology, design, and startups.
    </p>
    <div class="event_container">
      <ul class="list-reset event-list">
        <!-- TODO: Decide how to source the data for the event list -->
        <!-- * Data source for the list of events has not be determined.
        * For now, the <EventItem> Component basically accepts two props
        * an `isVisible` prop that is used to toggle the visibility of an
        * event based on @OSAKA @KYOTO toggle buttons and a prop called 
        * `data` that accepts an object with the details of the event.
        -->
        <EventItem
          :isVisible="isOsakaEventsVisible"
          :data="{
            region: Region.OSAKA,
            title: 'Hiding from the heat (Login UX & Live Coding)',
            imageURL: 'images/meetupimg.png',
            eventLink: {
              text: 'Osaka Web Designers and Developers Meetup',
              url: '#',
            },
            eventTime: 'SAT, JUL 23 · 5:00 PM JST',
            status: Status.Active,
          }"
        />
        <EventItem
          :isVisible="isKyotoEventsVisible"
          :data="{
            region: Region.KYOTO,
            title: 'Hiding from the heat (Login UX & Live Coding)',
            imageURL: 'images/meetupimg.png',
            eventLink: {
              text: 'Osaka Web Designers and Developers Meetup',
              url: '#',
            },
            eventTime: 'SAT, JUL 23 · 5:00 PM JST',
            status: Status.Inactive,
          }"
        />
        <EventItem
          :isVisible="isKyotoEventsVisible"
          :data="{
            region: Region.KYOTO,
            title: 'Hiding from the heat (Login UX & Live Coding)',
            imageURL: 'images/meetupimg.png',
            eventLink: {
              text: 'Osaka Web Designers and Developers Meetup',
              url: '#',
            },
            eventTime: 'SAT, JUL 23 · 5:00 PM JST',
            status: Status.Inactive,
          }"
        />
        <EventItem
          :isVisible="isKyotoEventsVisible"
          :data="{
            region: Region.KYOTO,
            title: 'Hiding from the heat (Login UX & Live Coding)',
            imageURL: 'images/meetupimg.png',
            eventLink: {
              text: 'Osaka Web Designers and Developers Meetup',
              url: '#',
            },
            eventTime: 'SAT, JUL 23 · 5:00 PM JST',
            status: Status.Inactive,
          }"
        />
        <EventItem
          :isVisible="isKyotoEventsVisible"
          :data="{
            region: Region.KYOTO,
            title: 'Hiding from the heat (Login UX & Live Coding)',
            imageURL: 'images/meetupimg.png',
            eventLink: {
              text: 'Osaka Web Designers and Developers Meetup',
              url: '#',
            },
            eventTime: 'SAT, JUL 23 · 5:00 PM JST',
            status: Status.Inactive,
          }"
        />
      </ul>
    </div>
  </section>
</template>
