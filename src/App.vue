<template>
  <section class="App">
    <TheHeader class="App__header" />
    <section class="App__container">
      <router-view class="router" />
      <aside>Teste</aside>
    </section>
  </section>
</template>

<script>
import { TheHeader } from '@/components/organisms'
export default {
  name: 'App',
  components: {
    TheHeader
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>

<style lang="scss" scoped>
.App {
  background: #f7f7f7;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr minmax(80%, 1280px) 1fr;
  grid-template-rows: 80px 1fr;
  grid-template-areas:
    'header header header'
    '. container .';

  &__header {
    grid-area: header;
  }

  &__container {
    grid-area: container;
  }
}
</style>
