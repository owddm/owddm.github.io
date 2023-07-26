<template>
  <div class="container">
    <SiteHeader />
    <main><slot /></main>
    <SiteFooter />
  </div>
</template>
<style scoped>
@media screen and (orientation: landscape) {
  main {
    margin-left: env(safe-area-inset-left, 2rem);
    margin-right: env(safe-area-inset-right, 2rem);
  }
}
</style>
