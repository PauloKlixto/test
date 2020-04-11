<template>
  <section
    ref="creditCardPreview"
    class="BaseCreditCard"
    :class="BaseCreditCardClasses"
  >
    <div class="BaseCreditCard__background" :style="creditCardPreviewStyles">
      <div class="BaseCreditCard__top">
        <Icon
          v-if="company"
          :name="cardStylesData.image"
          path="images/cards"
          :style="creditCardIconStyles"
        />
      </div>
      <div class="BaseCreditCard__bottom">
        <p class="BaseCreditCard__cardNumber">
          {{ creditCardPreviewNumber }}
        </p>
        <p class="BaseCreditCard__cardName">
          {{ cardName || 'Nome do titular' }}
        </p>
        <p class="BaseCreditCard__validAt">
          <span class="BaseCreditCard__validAt--value">
            {{ creditCardPreviewDate }}
          </span>
        </p>
      </div>
      <div class="BaseCreditCard__cvv">
        {{ editedCvv }}
      </div>
    </div>
  </section>
</template>

<script>
import creditCardInative from '@/assets/images/credit-card-inative.svg'
import creditCardInativeInverse from '@/assets/images/credit-card-inative-inverse.svg'
import creditCard from '@/assets/images/credit-card.svg'
import creditCardInverse from '@/assets/images/credit-card-inverse.svg'

export default {
  name: 'BaseCreditCard',
  props: {
    cardNumber: {
      type: String,
      default: ''
    },
    cardName: {
      type: String,
      default: ''
    },
    cardDate: {
      type: String,
      default: ''
    },
    cardCvv: {
      type: String,
      default: ''
    },
    company: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      creditCardWith: 0,
      hasChangingCardCvv: false
    }
  },
  watch: {
    cardCvv() {
      this.hasChangingCardCvv = true
    },
    cardNumber() {
      this.hasChangingCardCvv = false
    },
    cardName() {
      this.hasChangingCardCvv = false
    },
    cardDate() {
      this.hasChangingCardCvv = false
    }
  },
  computed: {
    BaseCreditCardClasses() {
      return { 'BaseCreditCard--move': this.hasChangingCardCvv }
    },
    creditCardPreviewStyles() {
      return this.hasChangingCardCvv
        ? this.bgPreviewStyles(creditCardInverse, creditCardInativeInverse)
        : this.bgPreviewStyles(creditCard, creditCardInative)
    },
    editedCvv() {
      let code = '*'
      return code.repeat(this.cardCvv.length)
    },
    creditCardIconStyles() {
      return { height: this.cardStylesData.height }
    },
    creditCardPreviewNumber() {
      if (this.cardNumber === '') return '**** **** **** ****'

      let value = this.cardNumber

      value = value.replace(/(\d{4})(\d)/, '$1 $2')
      value = value.replace(/(\d{4})(\d)/, '$1 $2')
      value = value.replace(/(\d{4})(\d)/, '$1 $2')
      value = value.replace(/(\d{4})(\d)/, '$1 $2')

      return value
    },
    creditCardPreviewDate() {
      if (this.cardDate === '') return '00/00'

      let value = this.cardDate

      value = value = value.replace(/(\d{2})(\d)/, '$1/$2')

      return value
    },
    cardStylesData() {
      return this.cardStylesByCompany(this.company)
    }
  },
  mounted() {
    this.setCreditCardWith()
  },
  methods: {
    bgPreviewStyles(bg, bgInative) {
      return {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          this.company === '' ? `url(${bgInative})` : `url(${bg})`
      }
    },
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
          visa: this.cardStylesObject('visa')
        }
      }

      return stateMachine()[company]
    }
  }
}
</script>

<style lang="scss" scoped>
%creditCardText {
  color: $color-white;
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.2),
    2px 2px 5px rgba(0, 0, 0, 0.3);
  font-size: 16px;

  @media (max-width: 445px) {
    font-size: 10px;
  }
}

.BaseCreditCard {
  /* Box model */
  width: 365px;
  height: 224.4px;
  box-shadow: 0px 10px 10px -8px rgba(0, 0, 0, 0.4);
  border-radius: 11px;
  transition: transform 0.5s;

  @media (max-width: 445px) {
    width: 240px;
    height: 147.5px;
    box-shadow: none;
  }

  &--move {
    transform: rotateY(180deg);
    transition: transform 0.5s;

    .BaseCreditCard__top,
    .BaseCreditCard__bottom {
      display: none;
    }

    .BaseCreditCard__background {
      transform: rotateY(180deg);
    }

    .BaseCreditCard__cvv {
      display: block;
    }
  }

  &__background {
    width: inherit;
    height: inherit;
    display: flex;
    flex-flow: column;
    padding: 2rem;
  }

  &__top {
    /* Positioning */
    position: relative;

    /* Box model */
    flex: 1;
    display: flex;
    @media (max-width: 445px) {
      transform: scale(0.75) translateX(-30px);
    }
  }

  &__bottom {
    /* Box model */
    flex: 1;
    display: grid;
    grid-template-rows: 1fr 25px;
    grid-template-columns: 1fr 80px;
    grid-template-areas:
      'card card'
      'name validAt';
  }

  &__cvv {
    display: none;
    transform: translate3d(140px, 80px, 0);
  }

  &__validAt {
    grid-area: validAt;
    text-align: right;

    &--value {
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

    @media (max-width: 445px) {
      font-size: 15.5px;
    }
  }
}
</style>
