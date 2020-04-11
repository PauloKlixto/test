<template>
  <main class="Payment">
    <section class="Payment__sidebar">
      <BaseBackButton
        class="Payment__backButton"
        label="Alterar forma de pagamento"
        is-inverted-theme
      />
      <BaseSteps :steps="steps" class="Payment__stepsInSidebar" invert-colors />
      <BaseHeading
        class="Payment__headingText"
        label="Adicione um novo cartão de crédito"
        icon="credit-card"
      />
      <BaseCreditCard
        class="Payment__creditCard"
        :card-number="form.card_number"
        :card-name="form.card_name"
        :card-date="form.card_date"
        :card-cvv="form.card_cvv"
        :company="cardType.company"
      />
    </section>
    <section class="Payment__form">
      <BaseSteps :steps="steps" class="Payment__steps" />
      <DynamicForm
        class="Payment__fields"
        :model="form"
        :blueprint="blueprint(paymentOptions)"
        :endpoint-errors="endpointErrors"
        @getCardType="getCardType"
        @submit="onSubmit"
      />
    </section>
  </main>
</template>

<script>
import {
  BaseBackButton,
  BaseCreditCard,
  BaseHeading,
  BaseSteps
} from '@/components/atoms'
import { DynamicForm } from '@/components/molecules'
import { steps, paymentOptions, mockCardType } from '@/views/payment/assets'
import blueprint from '@/views/payment/Payment.blueprint'
import Rules from '@doc88/flux-validator-js'

export default {
  name: 'Payment',
  components: {
    BaseBackButton,
    BaseCreditCard,
    BaseHeading,
    BaseSteps,
    DynamicForm
  },
  data() {
    return {
      form: {
        card_number: '',
        card_name: '',
        card_date: '',
        card_cvv: '',
        card_installments: ''
      },
      endpointErrors: {},
      cardType: mockCardType,
      steps,
      paymentOptions
    }
  },
  methods: {
    blueprint,

    getCardType() {
      this.cardType =
        this.form.card_number === ''
          ? mockCardType
          : Rules.creditCardNumber('creditCardNumber', this.form.card_number)
    },

    async onSubmit() {
      console.log('enviou')

      // const res = await payment.paymentData(this.form, (r) => r, (e) => e, () => this.setLoading(false))

      // if (res.validation) return this.endpointErrors = res.validation
      // if(!res.message) this.$router.push('/conclusion')
    }
  }
}
</script>

<style lang="scss" scoped>
$responsiveValue: 960px;

.Payment {
  background: $color-white;
  min-height: calc(100vh - 200px);
  display: grid;
  grid-template-columns: 352px 1fr;

  @media (max-width: $responsiveValue) {
    grid-template-columns: 1fr;
    grid-template-rows: 240px 1fr;
  }

  &__sidebar {
    background-color: $color-red;
    padding-top: $space-xl;
    padding-left: $space-xl;
    padding-bottom: $space-xl;
    padding-right: $space-md;

    @media (max-width: $responsiveValue) {
      display: grid;
      padding: 0;
      grid-template-columns: 40px 1fr 40px;
      grid-template-rows: 70px 70px 1fr;
      grid-template-areas: 'backButton stepsInSidebar .' '. headingText .' '. creditCard .';
      align-items: center;
      justify-items: center;
    }
  }

  &__backButton {
    margin-bottom: $space-xl;
    grid-area: backButton;
    @media (max-width: $responsiveValue) {
      margin-bottom: 0;
      margin-top: 45px;
    }
  }

  &__stepsInSidebar {
    display: none;
    @media (max-width: $responsiveValue) {
      display: block;
      grid-area: stepsInSidebar;
    }
  }

  &__headingText {
    margin-bottom: $space-lg;
    grid-area: headingText;
    max-width: 240px;
    height: 46px;
    @media (max-width: $responsiveValue) {
      margin-bottom: 0;
    }
  }

  &__creditCard {
    grid-area: creditCard;
  }

  &__form {
    padding-top: $space-xl;
    padding-right: $space-xl;
    padding-left: $space-xl;
    justify-self: end;
    width: 100%;
    max-width: 540px;
    align-items: flex-end;
    display: flex;
    flex-flow: column;
    @media (max-width: $responsiveValue) {
      padding-top: 200px;
      padding-right: 40px;
      padding-left: 40px;
      max-width: 100%;
    }
  }

  &__steps {
    margin-bottom: 40px;
    @media (max-width: $responsiveValue) {
      display: none;
    }
  }

  &__fields {
    width: 100%;
    display: grid;
    grid-template-columns: 0.95fr 0.05fr 1fr;
    align-items: self-end;
    grid-template-rows: 36px;
    grid-row-gap: 50px;
    grid-column-gap: $space-md;
    grid-template-areas:
      'card_number card_number card_number'
      'card_name card_name card_name'
      'card_date card_date card_cvv'
      'card_installments card_installments card_installments'
      '. send send';
  }
}
</style>
