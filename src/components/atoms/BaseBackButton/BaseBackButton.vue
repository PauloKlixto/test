<template>
  <section>
    <component
      :is="tag"
      class="BaseBackButton"
      :class="BaseBackButtonClasses"
      @click="click"
    >
      {{ label }}
    </component>
  </section>
</template>

<script>
export default {
  name: 'BaseBackButton',

  props: {
    tag: {
      type: String,
      default: 'a',
      validator: val => ['button', 'a'].includes(val)
    },
    label: {
      type: String,
      default: ''
    },
    isInvertedTheme: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    BaseBackButtonClasses() {
      return {
        'BaseBackButton--invert': this.isInvertedTheme
      }
    }
  },

  methods: {
    click(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
$responsiveValue: 960px;

.BaseBackButton {
  font-size: 13px;
  padding-left: 20px;
  display: block;
  position: relative;
  cursor: pointer;

  @media (max-width: $responsiveValue) {
    overflow: hidden;
    width: 0px;
  }

  &:before {
    @include chevronAlt($color-white);
    left: 0;
    transform: rotateZ(-45deg) translateY(5px);
  }

  &--invert {
    color: $color-white;
  }
}
</style>
