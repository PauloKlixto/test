/* eslint-disable no-undef */
import { shallowMount, createLocalVue } from '@vue/test-utils'
import BaseSteps from './BaseSteps'
import { steps } from '@/views/payment/assets'
import { Icon } from '@/components/photons'

const localVue = createLocalVue()
localVue.component('Icon', Icon)

describe('BaseSteps', () => {
  const WRAPPER = shallowMount(BaseSteps, {
    localVue,
    propsData: {
      steps
    }
  })

  test('Componente existe', () => {
    expect(WRAPPER.exists()).toBe(true)
  })

  test('Componente não alterado', () => {
    expect(WRAPPER.html()).toMatchSnapshot()
  })
})
