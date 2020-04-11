<template>
  <form class="DynamicForm" @submit.prevent="onSubmit">
    <component
      :is="i.tag"
      v-for="i in blueprint"
      :ref="i.id"
      :key="i.id"
      :value="value(i)"
      v-bind="i.props"
      :class="componentClass(i)"
      :style="componentStyle(i)"
      :model="model"
      :data-test="i.id"
      :invalid="invalidString(i)"
      :is-invalid="isInvalid(i.id)"
      :invalid-label="invalidString(i)"
      :invalid-fields="invalidFields"
      autocomplete="no"
      v-on="events(i)"
      @blur="setInvalidField(i)"
      @input="input(i, $event)"
    >
      {{ i.content }}
    </component>
    <slot />
  </form>
</template>

<script>
import { BaseSelect, BaseButton } from '@/components/atoms'
import { InputGroup } from '@/components/molecules'
import Rules from '@doc88/flux-validator-js'

export default {
  name: 'DynamicForm',
  components: {
    BaseSelect,
    BaseButton,
    InputGroup
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    blueprint: {
      type: Array,
      required: true,
      validator: items => {
        return (
          items.filter(item => {
            return (
              Object.prototype.hasOwnProperty.call(item, 'id') &&
              Object.prototype.hasOwnProperty.call(item, 'tag')
            )
          }).length === items.length
        )
      }
    },
    endpointErrors: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      invalidFields: []
    }
  },
  watch: {
    endpointErrors() {
      this.setInvalidFields()
    }
  },
  methods: {
    componentClass(i) {
      const customClass = i.class ? `DynamicForm__${i.class}` : ''
      return `DynamicForm__${i.id} ${customClass}`
    },

    componentStyle(i) {
      return `grid-area: ${i.id}; ${i.style}`
    },

    isInvalid(id) {
      if (this.endpointErrors)
        return (
          this.invalidFields.includes(id) ||
          Object.prototype.hasOwnProperty.call(this.endpointErrors, id)
        )
    },

    isValidField(rules, value) {
      return !rules.filter(rule => {
        if (rule) return !Rules[rule](rule, value).valid
      }).length
    },

    setInvalidField(field) {
      if (!field.rules) return

      const rules = field.rules
      const id = field.id

      const isValid = this.isValidField(rules, this.model[id])
      if (isValid) {
        this.invalidFields = this.invalidFields.filter(i => i !== id)
      } else {
        if (!this.invalidFields.includes(id)) this.invalidFields.push(id)
      }
    },

    setInvalidFields() {
      for (let i in this.blueprint) {
        const field = this.blueprint[i]
        if (field.rules) this.setInvalidField(field)
      }
    },

    invalidString(i) {
      if (this.endpointErrors)
        if (Object.prototype.hasOwnProperty.call(this.endpointErrors, i.id))
          return this.endpointErrors[i.id].join('\r\n')
      if (i.props) return i.props.invalidLabel
    },

    events(item) {
      let events = { ...this.$listeners }
      if (item.events) {
        for (let i in item.events) {
          events[i] = e => this.$emit(item.events[i], e)
        }
      }
      return events
    },

    getFieldReference(model, field) {
      // Itera se o field é um objeto e guarda a árvore de referência
      if (typeof field === 'string') return { model, field }
      const objKey = Object.keys(field)[0]
      return this.getFieldReference(model[objKey], field[objKey])
    },

    value(field) {
      if (!field.model) return
      if (typeof field.model === 'string') return this.model[field.model]

      const ref = this.getFieldReference(this.model, field.model)
      return ref.model[ref.field]
    },

    input(field, e) {
      delete this.endpointErrors[field.id]
      if (typeof field.model === 'string') return (this.model[field.model] = e)

      let ref = this.getFieldReference(this.model, field.model)
      ref.model[ref.field] = e
    },

    onSubmit() {
      this.setInvalidFields()
      this.$emit('beforeSubmit')

      this.invalidFields.length
        ? window.scrollTo(0, 0)
        : this.$emit('submit', this.model)
    }
  }
}
</script>

<style lang="scss" scoped>
.DynamicForm {
  grid-area: main;
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 25px;
  grid-template-columns: repeat(12, 1fr);

  label {
    text-transform: uppercase;
    font-weight: 900;
    font-size: 0.75rem;
    @media (min-width: $viewport-sm) {
      transform: translateY(100%);
    }
  }
}
</style>
