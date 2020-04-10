<template>
  <section class="app">
    <router-view class="router" />
  </section>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
}
</style>
