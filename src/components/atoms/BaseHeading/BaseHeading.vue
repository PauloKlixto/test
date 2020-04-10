<template>
  <section class="BaseHeading">
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
    }
  }
}
</script>
