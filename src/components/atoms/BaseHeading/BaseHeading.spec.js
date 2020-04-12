/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import BaseHeading from './BaseHeading'

describe('BaseHeading', () => {
  const WRAPPER = shallowMount(BaseHeading)

  test('Componente existe', () => {
    expect(WRAPPER.exists()).toBe(true)
  })

  test('Componente não alterado', () => {
    expect(WRAPPER.html()).toMatchSnapshot()
  })
})
