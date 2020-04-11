<template>
  <section class="TheHeader">
    <section class="TheHeader__container">
      <Icon name="logo" />
      <ul class="TheHeader__mockMenu">
        <li class="TheHeader__mockMenuItem" v-for="(item, i) in 5" :key="i" />
      </ul>
    </section>
  </section>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style lang="scss" scoped>
.TheHeader {
  /* Box model */
  display: grid;
  grid-template-columns: 1fr minmax(80%, 1280px) 1fr;
  grid-template-areas: '. container .';

  /* Visual */
  background: $color-white;
  border-bottom: 1px solid $color-light;

  &__container {
    /* Box model */
    grid-area: container;
    display: grid;
    grid-template-columns: 1fr 560px;
    align-items: center;

    @media (max-width: $viewport-md) {
      grid-template-columns: 1fr;
    }
  }

  &__mockMenu {
    /* Box model */
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: $space-md;
    padding: 0;
    margin: 0;

    /* Visual */
    list-style: none;

    @media (max-width: $viewport-md) {
      display: none;
    }
  }

  &__mockMenuItem {
    /* Box model */
    width: 100px;
    height: 18px;

    /* Visual */
    background: $color-light;
    border-radius: 5px;
  }
}
</style>
