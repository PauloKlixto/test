/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import DynamicForm from './DynamicForm'

const model = {
  email: '',
  password: ''
}

const blueprint = [
  {
    id: 'email',
    tag: 'InputGroup',
    model: 'email',
    rules: ['required', 'email'],
    props: {
      label: 'E-mail',
      type: 'email',
      floatingLabel: true,
      invalidLabel: 'E-mail inválido',
      autoFillColor: 'yellow'
    }
  },
  {
    id: 'password',
    model: 'password',
    tag: 'InputGroup',
    rules: ['required'],
    props: {
      label: 'Senha',
      type: 'password',
      floatingLabel: true,
      invalidLabel: 'Senha inválida',
      autoFillColor: 'yellow'
    },
    events: {
      click: 'showPassword'
    }
  }
]

describe('DynamicForm', () => {
  const WRAPPER = shallowMount(DynamicForm, {
    propsData: {
      model,
      blueprint,
      endpointErrors: {}
    }
  })

  test('Componente existe', () => {
    expect(WRAPPER.exists()).toBe(true)
  })

  test('Watch - endpointErrors', () => {
    WRAPPER.setProps({ endpointErrors: { id: 1 } })
  })

  test('Methods - setInvalidField', () => {
    WRAPPER.vm.setInvalidField({})
    WRAPPER.vm.setInvalidField({ rules: [], id: 7 })
  })

  describe('Methods - onSubmit', () => {
    const mockFn = jest.fn()
    WRAPPER.setMethods({ setInvalidFields: mockFn })

    test('Quando há invalidFields', () => {
      WRAPPER.setData({ invalidFields: ['mocked', 'anotherData'] })
      WRAPPER.vm.onSubmit()

      expect(mockFn).toHaveBeenCalled()
      expect(WRAPPER.emitted('beforeSubmit')).toBeTruthy()
    })

    test('Quando não há invalidFields', () => {
      WRAPPER.setData({ invalidFields: [] })
      WRAPPER.vm.onSubmit()

      expect(mockFn).toHaveBeenCalled()
      expect(WRAPPER.emitted('beforeSubmit')).toBeTruthy()
      expect(WRAPPER.emitted('submit')).toEqual([[WRAPPER.vm.model]])
    })
  })

  test('Componente não alterado', () => {
    expect(WRAPPER.html()).toMatchSnapshot()
  })
})
