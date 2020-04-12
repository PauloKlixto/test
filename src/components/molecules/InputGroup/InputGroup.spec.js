/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import InputGroup from './InputGroup'

describe('InputGroup', () => {
  const WRAPPER = shallowMount(InputGroup, {
    propsData: {
      value: 'teste de input'
    }
  })

  test('Componente existe', () => {
    expect(WRAPPER.exists()).toBe(true)
  })

  describe('Computed - labelClass', () => {
    WRAPPER.setProps({ floatingLabel: true })

    test('Quando focus está ativo ou tem valor', () => {
      WRAPPER.setData({ focus: true })
      WRAPPER.setProps({ value: 'Valor mocado' })

      expect(WRAPPER.vm.labelClass).toEqual([
        { 'InputGroup__label--floating': true },
        { 'InputGroup__label--upwards': true }
      ])
    })

    test('Quando focus está inativo ou tem valor', () => {
      WRAPPER.setData({ focus: false })
      WRAPPER.setProps({ value: 'Valor mocado' })

      expect(WRAPPER.vm.labelClass).toEqual([
        { 'InputGroup__label--floating': true },
        { 'InputGroup__label--upwards': true }
      ])
    })

    test('Quando focus está ativo ou não tem valor', () => {
      WRAPPER.setData({ focus: true })
      WRAPPER.setProps({ value: '' })

      expect(WRAPPER.vm.labelClass).toEqual([
        { 'InputGroup__label--floating': true },
        { 'InputGroup__label--upwards': true }
      ])
    })

    test('Quando focus está inativo ou não tem valor', () => {
      WRAPPER.setData({ focus: false })
      WRAPPER.setProps({ value: '' })

      expect(WRAPPER.vm.labelClass).toEqual([
        { 'InputGroup__label--floating': true },
        { 'InputGroup__label--upwards': false }
      ])
    })
  })

  describe('Methods - onFocus', () => {
    test('Quando focus está ativo', () => {
      WRAPPER.setData({ focus: true })
      WRAPPER.vm.onFocus()
      expect(WRAPPER.vm.focus).toBe(false)
    })

    test('Quando focus está inativo', () => {
      WRAPPER.setData({ focus: false })
      WRAPPER.vm.onFocus()
      expect(WRAPPER.vm.focus).toBe(true)
    })
  })

  test('Methods - onLostFocus', () => {
    const mockOnFocus = jest.fn()
    WRAPPER.setMethods({ onFocus: mockOnFocus })

    WRAPPER.vm.onLostFocus()
    expect(mockOnFocus).toHaveBeenCalled()
    expect(WRAPPER.emitted('blur')).toBeTruthy()
  })

  test('Methods - inputEnterHandler', () => {
    WRAPPER.vm.inputEnterHandler()
    expect(WRAPPER.emitted('enter')).toBeTruthy()
  })

  test('Componente não alterado', () => {
    expect(WRAPPER.html()).toMatchSnapshot()
  })
})
