<template>
  <section class="BaseSteps">
    <section class="BaseSteps__list" v-for="item in steps" :key="item.id">
      <Icon v-show="item.active" class="BaseSteps__icon" name="check" />
      <span v-show="!item.active" class="BaseSteps__step">{{ item.step }}</span>
      <span class="BaseSteps__name">{{ item.name }}</span>
    </section>
  </section>
</template>

<script>
export default {
  name: 'BaseSteps',
  props: {
    steps: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseSteps {
  font-size: 13px;
  color: $color-red;
  display: flex;

  &__list {
    position: relative;
    padding-left: 50px;
    display: flex;
    align-items: center;
    &:before {
      @include chevronAlt($color-red);
      left: 20px;
      transform: rotateZ(135deg) translateY(0px);
    }
    &:first-child {
      padding-left: 0;
      &:before {
        display: none;
      }
    }
  }
  &__icon {
    display: flex;
    border: 1px solid $color-red;
    border-radius: 50%;
    width: 13px;
    height: 13px;
    padding: 4px;
    margin-right: 7.5px;
    background-color: $color-red;
  }
  &__step {
    display: flex;
    border: 1px solid $color-red;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 7.5px;
  }
  &__name {
    display: block;
  }
}
</style>
