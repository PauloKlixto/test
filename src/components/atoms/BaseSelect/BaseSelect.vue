<template>
  <div class="BaseSelect" :class="componentClasses">
    <input
      ref="BaseSelect__input"
      v-bind="$attrs"
      type="hidden"
      name="BaseSelect__input"
    />

    <label class="BaseSelect__label" :class="BaseSelectLabelClasses">
      {{ label }}
    </label>
    <div class="BaseSelect__container" :class="{ open: menuOpen }">
      <div
        class="BaseSelect__selectedContainer"
        @click.prevent.stop="toggleSelect"
      >
        <div class="BaseSelect__selected" :title="value.name">
          {{ value.name }}
        </div>
      </div>

      <select v-if="isMobile" class="BaseSelect__select-mobile">
        <option
          v-for="option in options"
          :id="option.id"
          :key="option.id"
          :value="option"
          @click="setValue(option)"
        >
          {{ option.name }}
        </option>
      </select>
      <div v-else ref="items" class="BaseSelect__Items">
        <div
          v-for="option in options"
          :key="option.id"
          class="BaseSelect__Item"
          :title="option.name"
          @click="setValue(option)"
        >
          {{ option.name }}
        </div>
      </div>
    </div>
    <p v-if="isInvalid" class="BaseSelect__invalidLabel">
      {{ invalidLabel }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BaseSelect',
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true,
      validator: items =>
        items.filter(item => {
          return (
            Object.prototype.hasOwnProperty.call(item, 'id') &&
            Object.prototype.hasOwnProperty.call(item, 'name')
          )
        }).length === items.length
    },
    value: {
      type: [Object, String, Number],
      required: true
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
      menuOpen: false,
      maxLength: 17,
      title: ''
    }
  },
  computed: {
    ...mapGetters({
      isMobile: 'userAgent/isMobile'
    }),

    componentClasses() {
      return { 'BaseSelect--invalid': this.isInvalid }
    },

    BaseSelectLabelClasses() {
      return { 'BaseSelect__label--upwards': !!this.value || this.menuOpen }
    }
  },
  watch: {
    // Se o valor recebido não for um objeto, transforma em objeto
    value(val) {
      if (typeof val === 'string' || typeof val === 'number')
        this.$emit('input', { id: val, name: val })
    }
  },

  methods: {
    toggleSelect() {
      if (this.options.length === 1) return
      this.menuOpen ? this.close() : this.open()
    },

    open() {
      window.addEventListener('click', this.toggleSelect)
      this.menuOpen = true
      let h = 108
      this.$refs.items.style.maxHeight = h + 'px'
    },

    close() {
      window.removeEventListener('click', this.toggleSelect)
      this.menuOpen = false
      this.$refs.items.style.maxHeight = '0px'
    },

    setValue(option) {
      if (!this.menuOpen) return

      this.$emit('input', option)
      this.$emit('blur', option)
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseSelect {
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    & > * {
      pointer-events: none;
    }
  }
  &__label {
    font-size: 17px;
    color: $color-light;
    transform: translateY(10px);
    display: block;

    &--upwards {
      font-size: 13px;
      transform: translateY(0px);
    }
  }
  &__container {
    position: relative;
    border-bottom: 1px solid $color-light;
    box-sizing: border-box;

    &:before {
      @include chevronAlt($color-red);
      right: 5px;
      bottom: 10px;
      transform: rotateZ(225deg);
    }

    &.open {
      &:before {
        transform: rotateZ(45deg);
      }
    }

    .BaseSelect--invalid & {
      border-bottom: 1px solid $color-red;
      color: $color-red;
    }
  }
  &__invalidLabel {
    padding: 5px 10px;
    font-size: 12px;
    color: $color-red;
    font-weight: 900;
    position: absolute;
  }
  &__selectedContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
    padding-bottom: 5px;
    padding-left: 10px;
    cursor: pointer;
  }
  &__selected {
    font-weight: 100;
    font-size: 0.9rem;
    white-space: nowrap;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__Items {
    position: absolute;
    width: calc(100% + 2px);
    left: 0;
    top: 100%;
    border: 1px solid $color-light;
    border-top: none;
    height: auto;
    max-height: 0;
    overflow-y: auto;
    transition: max-height 0.2s;
    transition-timing-function: linear;
    z-index: $z-dropdown;

    .BaseSelect--invalid & {
      border: none;
    }
  }
  &__Item {
    padding: 5px 15px;
    font-weight: 100;
    font-size: 0.9rem;
    cursor: pointer;
    background-color: #fff;
    text-transform: initial;
    white-space: nowrap;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      background-color: $color-light;
    }
    &:first-child {
      margin-top: 2px;
    }
  }
  &__select-mobile {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
