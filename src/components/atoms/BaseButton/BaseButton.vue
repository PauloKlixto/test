<template>
  <component
    :is="tag"
    type="button"
    v-bind="$attrs"
    class="BaseButton"
    :disabled="disabled"
    @click="click"
  >
    <span v-if="!!label" class="BaseButton__Text">
      {{ label }}
    </span>
  </component>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    tag: {
      type: String,
      default: 'button',
      validator: val => ['button', 'a'].includes(val)
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
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
.BaseButton {
  height: 51px;
  -webkit-appearance: none;
  display: flex;
  background: inherit;
  padding: 0 10px;
  cursor: pointer;
  align-items: center;
  position: relative;
  white-space: nowrap;
  background: $color-red;
  border-radius: 10px;

  &:hover {
    filter: brightness(90%) contrast(150%);
  }

  &__Text {
    text-transform: uppercase;
    font-size: 16px;
    letter-spacing: 0.001rem;
    color: $color-white;
    text-align: center;
    display: block;
    width: 100%;
  }

}
</style>
