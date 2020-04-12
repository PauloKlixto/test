/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import BaseBackButton from './BaseBackButton'

describe('BaseBackButton', () => {
  const WRAPPER = shallowMount(BaseBackButton)

  test('Componente existe', () => {
    expect(WRAPPER.exists()).toBe(true)
  })

  test('Emitar funcao click', () => {
    const MOCK = { test: 'test' }
    WRAPPER.vm.click(MOCK)
    expect(WRAPPER.emitted('click')).toEqual([[MOCK]])
  })

  test('Componente não alterado', () => {
    expect(WRAPPER.html()).toMatchSnapshot()
  })
})
