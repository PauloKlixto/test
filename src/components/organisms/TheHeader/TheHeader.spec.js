/* eslint-disable no-undef */
import { shallowMount, createLocalVue } from '@vue/test-utils'
import TheHeader from './TheHeader'
import { Icon } from '@/components/photons'

const localVue = createLocalVue()
localVue.component('Icon', Icon)

describe('TheHeader', () => {
  const WRAPPER = shallowMount(TheHeader, { localVue })

  test('Componente existe', () => {
    expect(WRAPPER.exists()).toBe(true)
  })

  test('Componente não alterado', () => {
    expect(WRAPPER.html()).toMatchSnapshot()
  })
})
