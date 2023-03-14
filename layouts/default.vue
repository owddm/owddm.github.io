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
  padding: 3rem;
}
.footer {
  margin-top: 3rem;
}
</style>
