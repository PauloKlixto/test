/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import Payment from './Payment'
import { mockCardType } from '@/views/payment/assets'

describe('Payment', () => {
  const WRAPPER = shallowMount(Payment)

  test('Componente existe', () => {
    expect(WRAPPER.exists()).toBe(true)
  })

  describe('Methods - getCardType', () => {
    test('Quando o card_number está vazio', () => {
      WRAPPER.setData({
        form: { card_number: '' }
      })
      WRAPPER.vm.getCardType()
      expect(WRAPPER.vm.cardType).toEqual(mockCardType)
    })
    test('Quando o card_number não está vazio', () => {
      WRAPPER.setData({
        form: { card_number: '4325' }
      })
      WRAPPER.vm.getCardType()
      expect(WRAPPER.vm.cardType).toEqual({
        company: 'visa',
        name: 'creditCardNumber',
        valid: true
      })
    })
  })

  test('Componente não alterado', () => {
    expect(WRAPPER.html()).toMatchSnapshot()
  })
})
