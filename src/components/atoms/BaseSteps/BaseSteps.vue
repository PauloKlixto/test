<template>
  <section class="BaseSteps" :class="BaseStepsClasses">
    <section class="BaseSteps__list" v-for="item in steps" :key="item.id">
      <Icon v-show="item.active" class="BaseSteps__icon" name="check" />
      <span v-show="!item.active" class="BaseSteps__step">{{ item.step }}</span>
      <span class="BaseSteps__name">{{ item.name }}</span>
    </section>
    <section class="BaseSteps__responsive">
      <strong>Etapa {{ activeStep.step }}</strong> de {{ steps.length }}
    </section>
  </section>
</template>

<script>
export default {
  name: 'BaseSteps',
  props: {
    steps: {
      type: Array,
      required: true
    },
    invertColors: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    activeStep() {
      return this.steps.filter(step => step.active)[0]
    },
    BaseStepsClasses() {
      return { 'BaseSteps--inverted': this.invertColors }
    }
  }
}
</script>

<style lang="scss" scoped>
$responsiveValue: 960px;

.BaseSteps {
  font-size: 13px;
  color: $color-red;
  display: flex;

  &--inverted {
    color: $color-white;

    .BaseSteps__list {
      &:before {
        @include chevronAlt($color-white);
      }
    }

    .BaseSteps__icon {
      border: 1px solid $color-white;
    }

    .BaseSteps__step {
      border: 1px solid $color-white;
    }
  }

  &__responsive {
    display: none;

    @media (max-width: $responsiveValue) {
      display: block;
    }
  }

  &__list {
    position: relative;
    padding-left: 50px;
    display: flex;
    align-items: center;
    &:before {
      @include chevronAlt($color-red);
      left: 20px;
      transform: rotateZ(135deg) translateY(0px);
    }
    &:first-child {
      padding-left: 0;
      &:before {
        display: none;
      }
    }
    @media (max-width: $responsiveValue) {
      display: none;
    }
  }
  &__icon {
    display: flex;
    border: 1px solid $color-red;
    border-radius: 50%;
    width: 13px;
    height: 13px;
    padding: 4px;
    margin-right: 7.5px;
    background-color: $color-red;
  }
  &__step {
    display: flex;
    border: 1px solid $color-red;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 7.5px;
  }
  &__name {
    display: block;
  }
}
</style>
