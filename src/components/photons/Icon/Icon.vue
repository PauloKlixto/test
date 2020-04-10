<template>
  <img class="Icon" v-bind="$attrs" :src="src" @click="$emit('click')" />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      default: 'icons'
    }
  },
  computed: {
    src() {
      return require(`@/assets/${this.path}/${this.name}.svg`)
    }
  }
}
</script>
