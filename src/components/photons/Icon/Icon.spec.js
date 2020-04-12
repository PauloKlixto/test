/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import Icon from './Icon'

describe('Icon', () => {
  const WRAPPER = shallowMount(Icon, {
    propsData: {
      name: 'check'
    }
  })

  test('Componente existe', () => {
    expect(WRAPPER.exists()).toBe(true)
  })

  test('Possui as classes necessárias', () => {
    expect(WRAPPER.find('img').classes()).toContain('Icon')
  })

  test('Contém o svg na tag img', () => {
    expect(WRAPPER.find('img').attributes().src).toEqual('check.svg')
  })

  test('Componente não alterado', () => {
    expect(WRAPPER.html()).toMatchSnapshot()
  })
})
