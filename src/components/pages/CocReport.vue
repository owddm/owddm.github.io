<template>
  <section class="coc-report">
    <div class="coc-content">
      <h1 class="coc-title">Code of Conduct - Reporting Guide</h1>
      <div class="coc-description-container">
        <p>If you believe someone is violating <a href="/coc">the code of conduct</a> we ask that you report it to <a href="/about#organization">the OWDDM・KWDDM organizer</a> using the <a href="mailto:owddm@proton.me">owddm@proton.me</a> email address.</p>
        <p>All reports will be kept confidential. In some cases we may determine that a public statement will need to be made. If that's the case, the identities of all victims and reporters will remain confidential unless those individuals instruct us otherwise.</p>
        <p>
          <strong>If you believe anyone is in physical danger, please notify appropriate law enforcement first.</strong>
        </p>
        <p>If you are unsure what law enforcement agency is appropriate, please include this in your report and we will attempt to notify them.</p>
        <p>If you are unsure whether the incident is a violation, or whether the space where it happened is covered by our code of conduct, we encourage you to still report it.</p>
        <p>We would much rather have a few extra reports where we decide to take no action, than miss a report of an actual violation.</p>
        <p>We do not look negatively on you if we find the incident is not a violation.</p>
        <p>And knowing about incidents that are not violations, or happen outside our spaces, can also help us to improve the Code of Conduct or the processes surrounding it.</p>
        <h3>In your report please include:</h3>
        <ul>
          <li>Your contact info <em>(so we can get in touch with you if we need to follow up)</em></li>
          <li>Names <em>(real, nicknames, or pseudonyms)</em> of any individuals involved. If there were other witnesses besides you, please try to include them as well.</li>
          <li>When and where the incident occurred. Please be as specific as possible.</li>
          <li>Your account of what occurred. If there is a publicly available record (e.g. a link to a Discord message or Meetup comment) please include a link and/or screenshot.</li>
          <li>Any extra context you believe existed for the incident.</li>
          <li>If you believe this incident is ongoing.</li>
          <li>Any other information you believe we should have.</li>
        </ul>
        <h3>What happens after you file a report?</h3>
        <p>
          We promise to acknowledge the issue with a reply within 72 hours
          <em>(and will aim for much quicker than that)</em>. If you are at an physical event and you feel comfortable doing-so, it would be helpful to notify the event organizer that you submitted an report.
        </p>
        <p>The organizers will meet to review the incident and determine:</p>
        <ul>
          <li>What happened.</li>
          <li>Whether this event constitutes a code of conduct violation.</li>
          <li>Who the bad actor was.</li>
          <li>Whether this is an ongoing situation, or if there is a threat to anyone's physical safety.</li>
          <li>
            If this is determined to be an ongoing incident or a threat to physical safety, the organizers' immediate priority will be to protect everyone involved. This means we may delay an "official" response until we believe that the situation has ended and that everyone is
            physically safe.
          </li>
        </ul>
        <p>The organizers will give their best effort responding to the situation and responses may include:</p>
        <ul>
          <li>Nothing <em>(if we determine no violation occurred)</em>.</li>
          <li>A private reprimand from the organizers to the individual(s) involved.</li>
          <li>A public reprimand.</li>
          <li>An imposed vacation <em>(i.e. asking someone to "take a week off" from Discord and skip the next meetup)</em>.</li>
          <li>A permanent or temporary ban from some or all OWDDM・KWDDM spaces <em>(Discord Chat, Meetups, etc.)</em>.</li>
          <li>A request for a public or private apology.</li>
          <li>A public incident report.</li>
        </ul>
        <p>We'll respond as soon as we can to the person who filed the report with either a resolution or an explanation of why the situation is not yet resolved.</p>
        <p>Futhermore, once we've determined our final action, we'll let them know what action <em>(if any)</em> we'll be taking.</p>
        <p>We'll take into account feedback from the reporter on the appropriateness of our response, but we don't guarantee we'll act on it.</p>
        <h3>What if your report concerns a possible violation by the organizer?</h3>
        <p>
          The group organizer occasionally hands over the responsibility to run events to volunteers. <em>(see: <a href="/about#organization">the organizer section on the about page</a>)</em>. No person other than <strong>the group organizer</strong> will process the violations.
          Event organizers will not receive a copy.
        </p>
        <p>As there is currently only one organizer of the group, it is a problem if your issue concerns them. In that case, we ask you to contact a trusted Volunteer. Together with other Volunteers, they may be able to support and help you.</p>
        <h3>Reconsideration</h3>
        <p>Any of the parties directly involved or affected can request reconsideration of the organizers’s decision.</p>
        <p>
          To make such a request, contact the organizer using
          <a href="mailto:owddm@proton.me">owddm@proton.me</a> with your request and motivation and the organizer will review the case.
        </p>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { provide } from "vue";

const { url } = defineProps<{
  url: URL;
}>();
provide("url", url);
</script>
<style>
.coc-content {
  padding: var(--space) max(var(--space), env(safe-area-inset-right)) var(--space) max(var(--space), env(safe-area-inset-left));
}

.coc-title,
.coc-description-container > p,
.coc-description-container > h3,
.coc-description-container > ul > li {
  margin: var(--space) 3rem 0 2rem;
  line-height: normal;
}

.coc-content ul {
  margin: var(--space) 0 0 0;
}
</style>
