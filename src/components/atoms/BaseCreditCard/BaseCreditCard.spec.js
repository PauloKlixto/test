/* eslint-disable no-undef */
import { shallowMount, createLocalVue } from '@vue/test-utils'
import BaseCreditCard from './BaseCreditCard'
import { Icon } from '@/components/photons'

const localVue = createLocalVue()
localVue.component('Icon', Icon)

describe('BaseCreditCard', () => {
  let WRAPPER

  beforeEach(() => {
    WRAPPER = shallowMount(BaseCreditCard, { localVue })
  })

  test('Componente existe', () => {
    expect(WRAPPER.exists()).toBe(true)
  })

  test('Watch - cardCvv', () => {
    WRAPPER.setProps({ cardCvv: '49' })
    WRAPPER.setProps({ cardCvv: '493' })
  })

  test('Watch - cardName', () => {
    WRAPPER.setProps({ cardName: 'João da Silv' })
    WRAPPER.setProps({ cardName: 'João da Silva' })
  })

  describe('Computed - creditCardPreviewNumber', () => {
    test('Quando cardNumber está vazio', () => {
      WRAPPER.setProps({ cardNumber: '' })
      expect(WRAPPER.vm.creditCardPreviewNumber).toEqual('**** **** **** ****')
    })

    test('Quando cardNumber não está vazio [completo]', () => {
      WRAPPER.setProps({ cardNumber: '4092949204949244' })
      expect(WRAPPER.vm.creditCardPreviewNumber).toEqual('4092 9492 0494 9244')
    })

    test('Quando cardNumber não está vazio [incompleto]', () => {
      WRAPPER.setProps({ cardNumber: '40929492049' })
      expect(WRAPPER.vm.creditCardPreviewNumber).toEqual('4092 9492 049')
    })
  })

  describe('Computed - creditCardPreviewDate', () => {
    test('Quando cardDate está vazio', () => {
      WRAPPER.setProps({ cardDate: '' })
      expect(WRAPPER.vm.creditCardPreviewDate).toEqual('00/00')
    })

    test('Quando cardDate não está vazio [ano completo]', () => {
      WRAPPER.setProps({ cardDate: '072021' })
      expect(WRAPPER.vm.creditCardPreviewDate).toEqual('07/2021')
    })

    test('Quando cardDate não está vazio [ano 2 digitos]', () => {
      WRAPPER.setProps({ cardDate: '0722' })
      expect(WRAPPER.vm.creditCardPreviewDate).toEqual('07/22')
    })
  })

  test('Computed - cardStylesData', () => {
    WRAPPER.setProps({ company: 'visa' })

    expect(WRAPPER.vm.cardStylesData).toEqual({
      image: 'visa',
      height: '20px'
    })
  })

  describe('Method - cardStylesByCompany', () => {
    test('cartão visa', () => {
      expect(WRAPPER.vm.cardStylesByCompany('visa')).toEqual({
        image: 'visa',
        height: '20px'
      })
    })
    test('cartão american-express', () => {
      expect(WRAPPER.vm.cardStylesByCompany('american-express')).toEqual({
        image: 'american-express',
        height: '42px'
      })
    })
    test('cartão mastercard', () => {
      expect(WRAPPER.vm.cardStylesByCompany('mastercard')).toEqual({
        image: 'mastercard',
        height: '30px'
      })
    })
  })

  test('Componente não alterado', () => {
    expect(WRAPPER.html()).toMatchSnapshot()
  })
})
