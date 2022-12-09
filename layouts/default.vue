<template>
  <div class="container">
    <div>
      <SiteHeader />
    </div>
    <div>
      <slot />
    </div>
    <div class="footer">
      <SiteFooter />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.footer {
  margin-top: auto;
  padding-bottom: 1rem;
}
</style>
