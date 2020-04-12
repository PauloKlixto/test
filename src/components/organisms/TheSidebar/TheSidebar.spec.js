/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import TheSidebar from './TheSidebar'

describe('TheSidebar', () => {
  const WRAPPER = shallowMount(TheSidebar)

  test('Componente existe', () => {
    expect(WRAPPER.exists()).toBe(true)
  })

  test('Componente não alterado', () => {
    expect(WRAPPER.html()).toMatchSnapshot()
  })
})
