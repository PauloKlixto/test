<template>
  <div class="InputGroup" :class="InputGroupClass">
    <label v-if="!!label" class="InputGroup__label" :class="labelClass">
      {{ label }}
    </label>
    <input
      ref="input"
      class="InputGroup__input"
      v-bind="$attrs"
      :value="maskedValue"
      @focus="onFocus"
      @blur="onLostFocus"
      @input="debounceInput"
      @keyup="onKeyup"
      @keyup.enter="inputEnterHandler"
    />

    <p v-if="isInvalid" class="InputGroup__invalidLabel">
      {{ invalidLabel }}
    </p>
    <slot />
  </div>
</template>

<script>
import Mask from '@/plugins/mask/Mask.js'

export default {
  name: 'InputGroup',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    floatingLabel: {
      type: Boolean,
      default: false
    },
    debounceTime: {
      type: Number,
      default: 500
    },
    mask: {
      type: String,
      default: ''
    },
    isInvalid: {
      type: Boolean,
      default: false
    },
    invalidLabel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      debounce: null,
      focus: false
    }
  },
  computed: {
    InputGroupClass() {
      return { 'InputGroup--invalid': !!this.isInvalid }
    },
    labelClass() {
      return [
        { 'InputGroup__label--floating': this.floatingLabel },
        { 'InputGroup__label--upwards': !!this.focus || !!this.value }
      ]
    },
    maskedValue() {
      return this.mask
        ? Mask[this.mask](this.value, this.$refs.input)
        : this.value
    }
  },

  methods: {
    onFocus() {
      this.focus = !this.focus
    },

    onLostFocus() {
      this.onFocus()
      this.$emit('blur')
    },

    onKeyup(e) {
      let value = e ? e.target.value : this.value
      value = this.mask ? Mask[this.mask](value, this.$refs.input) : value
      if (this.mask) this.$emit('input', this.removeMask(value))
    },

    setFocus() {
      this.$refs.input.focus()
    },

    removeMask(val) {
      return this.$options.filters.noSpecialCharacters(val)
    },

    debounceInput(e) {
      const val = this.mask ? this.removeMask(e.target.value) : e.target.value
      this.$emit('input', val)

      clearTimeout(this.debounce)
      this.debounce = setTimeout(
        () => this.$emit('debounce', val),
        this.debounceTime
      )
    },

    inputEnterHandler() {
      this.$emit('enter')
    }
  }
}
</script>

<style lang="scss" scoped>
.InputGroup {
  position: relative;
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    color: $color-dark;
    .InputGroup__input {
      background-color: $color-light;
    }
  }

  &__label {
    color: $color-light;
    font-size: 17px;
    transition: transform 0.2s;
    pointer-events: none;
    &--floating {
      position: absolute;
      transform: translateY(5px);
    }
    &--upwards {
      transform: translateY(-20px);
      font-size: 13px;
    }
  }

  &__input {
    border-bottom: 1px solid $color-light;
    padding: 9px 0;
    width: 100%;
    background: transparent;

    .InputGroup--invalid & {
      color: $color-red;
      border-bottom: 1px solid $color-red;
    }
  }

  &__invalidLabel {
    padding: 5px 10px;
    font-size: 12px;
    color: $color-red;
    font-weight: 900;
    position: absolute;
  }
}
</style>
