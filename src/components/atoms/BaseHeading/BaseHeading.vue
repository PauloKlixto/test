<template>
  <section class="BaseHeading">
    <aside v-if="hasIcon" class="BaseHeading__icon">
      <Icon :name="icon" />
    </aside>
    <h1>{{ label }}</h1>
  </section>
</template>

<script>
export default {
  name: 'BaseHeading',
  props: {
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasIcon() {
      return this.icon !== ''
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseHeading {
  color: $color-white;
  font-size: 20px;
  display: flex;

  &__icon {
    border: 2px solid $color-white;
    border-radius: 50%;
    height: 40px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: $space-md;
  }
}
</style>
