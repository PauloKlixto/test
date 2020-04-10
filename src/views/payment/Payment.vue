<template>
  <main class="Payment">
    <section class="Payment__sidebar">
      <BaseBackButton
        class="Payment__backButton"
        label="Alterar forma de pagamento"
        is-inverted-theme
      />
    </section>
    <section class="Payment__form">Form</section>
  </main>
</template>

<script>
import { BaseBackButton } from '@/components/atoms'
export default {
  name: 'Payment',
  components: { BaseBackButton }
}
</script>

<style lang="scss" scoped>
.Payment {
  background: $color-white;
  min-height: calc(100vh - 200px);
  display: grid;
  grid-template-columns: 352px 1fr;

  &__sidebar {
    background-color: $color-red;
    padding-top: $space-xl;
    padding-left: $space-xl;
    padding-bottom: $space-xl;
  }

  &__backButton {
    margin-bottom: $space-xl;
  }

  &__form {
    padding-top: $space-xl;
    padding-right: $space-xl;
    padding-bottom: $space-xl;
    justify-self: end;
  }
}
</style>
