<template>
  <section
    ref="creditCardPreview"
    class="BaseCreditCard"
    :style="creditCardPreviewStyles"
  >
    <div class="BaseCreditCard__top">
      <Icon
        :name="cardStylesData.image"
        path="images/cards"
        :style="creditCardIconStyles"
      />
    </div>
    <div class="BaseCreditCard__bottom">
      <p class="BaseCreditCard__cardNumber" :style="colorCardInBg">
        {{ creditCardPreviewNumber }}
      </p>
      <p class="BaseCreditCard__cardName" :style="colorCardInBg">
        {{ cardName }}
      </p>
      <p class="BaseCreditCard__validAt">
        <span class="BaseCreditCard__validAt--value" :style="colorCardInBg">
          {{ cardDate }}
        </span>
      </p>
      <!-- <p class="BaseCreditCard__cvv">
        <span class="BaseCreditCard__cvv--label">cvv</span>
        <span class="BaseCreditCard__cvv--value" :style="colorCardInBg">
          {{ cardCvv }}
        </span>
      </p> -->
    </div>
  </section>
</template>

<script>
import creditCardInative from '@/assets/images/credit-card-inative.svg'
import creditCard from '@/assets/images/credit-card.svg'

export default {
  name: 'BaseCreditCard',
  props: {
    form: {
      type: Object,
      required: true
    },
    cardNumber: {
      type: String,
      default: '**** **** **** ****'
    },
    cardName: {
      type: String,
      default: 'Nome do titular'
    },
    cardDate: {
      type: String,
      default: '00/00'
    },
    cardCvv: {
      type: String,
      default: '***'
    },
    company: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      creditCardWith: 0
    }
  },
  computed: {
    creditCardPreviewStyles() {
      return {
        background:
          this.company === 'default'
            ? `url(${creditCardInative})`
            : `url(${creditCard})`
      }
    },
    creditCardIconStyles() {
      return { height: this.cardStylesData.height }
    },
    colorCardInBg() {
      return { backgroundColor: this.cardStylesData.color }
    },
    creditCardPreviewNumber() {
      if (this.cardNumber === '**** **** **** ****') return this.cardNumber

      let value = this.cardNumber

      value = value.replace(/(\d{4})(\d)/, '$1 $2')
      value = value.replace(/(\d{4})(\d)/, '$1 $2')
      value = value.replace(/(\d{4})(\d)/, '$1 $2')
      value = value.replace(/(\d{4})(\d)/, '$1 $2')

      return value
    },
    cardStylesData() {
      if (this.company) return this.cardStylesByCompany(this.company)
      return this.cardStylesObject('maestro', '30px')
    }
  },
  mounted() {
    this.setCreditCardWith()
  },
  methods: {
    setCreditCardWith() {
      this.creditCardWith = this.$refs.creditCardPreview.offsetWidth
    },
    cardStylesObject(image, height = '20px') {
      return { image, height }
    },
    cardStylesByCompany(company) {
      let stateMachine = () => {
        return {
          'american-express': this.cardStylesObject('american-express', '42px'),
          'diners-club': this.cardStylesObject('diners-club', '40px'),
          discover: this.cardStylesObject('discover', '15px'),
          elo: this.cardStylesObject('elo'),
          hiper: this.cardStylesObject('hiper'),
          hipercard: this.cardStylesObject('hipercard'),
          jcb: this.cardStylesObject('jcb', '30px'),
          maestro: this.cardStylesObject('maestro', '30px'),
          mastercard: this.cardStylesObject('mastercard', '30px'),
          mir: this.cardStylesObject('mir'),
          unionpay: this.cardStylesObject('unionpay', '30px'),
          visa: this.cardStylesObject('visa'),
          default: this.cardStylesObject('maestro', '30px')
        }
      }

      return stateMachine()[company]
    }
  }
}
</script>

<style lang="scss" scoped>
%cardAnimation {
  transition: background 1s ease;
}

%creditCardText {
  color: $color-white;
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.2),
    2px 2px 5px rgba(0, 0, 0, 0.3);
  font-size: 16px;
  @extend %cardAnimation;
}

.BaseCreditCard {
  /* Box model */
  width: 365px;
  height: 224.4px;
  display: flex;
  flex-flow: column;
  padding: 2rem;
  box-shadow: 0px 10px 10px -8px rgba(0, 0, 0, 0.4);
  border-radius: 11px;

  /* Misc */
  @extend %cardAnimation;

  &__top {
    /* Positioning */
    position: relative;

    /* Box model */
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  &__bottom {
    /* Box model */
    flex: 1;
    display: grid;
    grid-template-rows: 1fr repeat(2, 22.5px);
    grid-template-columns: 1fr 72px;
    grid-template-areas:
      'card card'
      'name name'
      'validAt cvv';
  }

  &__validAt {
    grid-area: validAt;
  }

  &__cvv {
    grid-area: cvv;
  }

  &__validAt,
  &__cvv {
    &--value {
      /* Typographic */
      font-size: 20px;

      /* Misc */
      @extend %creditCardText;
    }
  }
  &__cardName {
    /* Box model */
    grid-area: name;

    /* Typographic */
    text-transform: uppercase;

    /* Misc */
    @extend %creditCardText;
  }
  &__cardNumber {
    /* Box model */
    grid-area: card;

    /* Typographic */
    font-size: 24px;

    /* Misc */
    @extend %creditCardText;
  }
}
</style>
