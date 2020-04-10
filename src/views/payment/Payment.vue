<template>
  <main class="Payment">
    <section class="Payment__sidebar">
      <BaseBackButton
        class="Payment__backButton"
        label="Alterar forma de pagamento"
        is-inverted-theme
      />
      <BaseHeading
        class="Payment__headingText"
        label="Adicione um novo cartão de crédito"
        icon="credit-card"
      />
      <BaseCreditCard :form="form" />
    </section>
    <section class="Payment__form">Form</section>
  </main>
</template>

<script>
import { BaseBackButton, BaseCreditCard, BaseHeading } from '@/components/atoms'
export default {
  name: 'Payment',
  components: { BaseBackButton, BaseCreditCard, BaseHeading },
  data() {
    return {
      form: {
        card_name: '',
        card_number: '',
        card_month: '',
        card_year: '',
        card_cvv: ''
      }
    }
  }
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
    padding-right: $space-md;
  }

  &__backButton {
    margin-bottom: $space-xl;
  }

  &__headingText {
    margin-bottom: $space-lg;
  }

  &__form {
    padding-top: $space-xl;
    padding-right: $space-xl;
    padding-bottom: $space-xl;
    justify-self: end;
  }
}
</style>
