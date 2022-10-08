<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <h1 class="custom-font-title">OWDDM / KWDDM</h1>
    <nav role="navigation">
      <ul class="list-reset">
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/photos">Photos</RouterLink>
        </li>
        <li>
          <RouterLink to="/contact">Contact</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* Styles are imported from the global CSS file 'style.css' */
</style>
