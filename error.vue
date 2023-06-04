<script setup>
const error = useError();

const props = defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="container">
    <div>
      <SiteHeader />
    </div>
    <div class="error-container">
      <h2>Error: {{ error.statusCode }}</h2>
      <h4>{{ error.message }}</h4>
      <p v-if="error.statusCode === 404 || '404'">Sorry seems like that page is not available</p>
      <br />
      <div>
        <button @click="handleError">Return to Home</button>
      </div>
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

.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 1rem;
}
</style>
