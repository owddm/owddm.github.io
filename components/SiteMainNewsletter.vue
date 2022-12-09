<template>
  <section>
    <h2 class="capitalize">newsletter</h2>
    <form class="newsletter">
      <label class="sr-only" for="mailList">Email</label>
      <input type="email" id="mailList" name="mailList" placeholder="email address" />
      <button type="submit">SUBSCRIBE</button>
    </form>
  </section>
</template>

<style scoped>
.capitalize {
  text-transform: uppercase;
}
</style>
