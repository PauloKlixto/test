/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import BaseButton from './BaseButton'

describe('BaseButton', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(BaseButton)
  })

  test('Componente existe', () => {
    expect(wrapper.exists()).toBe(true)
  })

  describe('Clique no componente', () => {
    test('Chamar a função click', () => {
      const stub = jest.fn()
      wrapper.setMethods({ click: stub })

      wrapper.find('.BaseButton').trigger('click')
      expect(stub).toBeCalled()
    })

    test('Emitar funcao click', () => {
      wrapper.vm.click()
      expect(wrapper.emitted('click')).toBeTruthy()
    })
  })

  test('Componente não alterado', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
