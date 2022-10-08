<script setup lang="ts">
import SiteMainBanner from "./SiteMainBanner.vue";
import SiteMainOverview from "./SiteMainOverview.vue";
import SiteMainNewsletter from "./SiteMainNewsletter.vue";
import SiteMainSurvey from "./SiteMainSurvey.vue";
import SiteMainEvents from "./SiteMainEvents.vue";
</script>

<template>
  <div class="col-1">
    <SiteMainBanner />
    <SiteMainOverview />
  </div>
  <div class="col-2">
    <SiteMainNewsletter />
    <SiteMainSurvey />
    <SiteMainEvents />
  </div>
</template>
