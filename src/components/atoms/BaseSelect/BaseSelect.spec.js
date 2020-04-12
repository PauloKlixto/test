/* eslint-disable no-undef */
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Icon } from '@/components/photons'
import BaseSelect from './BaseSelect'
import optionsData from './utils/options'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

localVue.component('Icon', Icon)

describe('BaseSelect', () => {
  let store

  store = new Vuex.Store({
    modules: {
      userAgent: {
        namespaced: true,
        getters: {
          isMobile: () => true
        }
      }
    }
  })

  const WRAPPER_MOBILE = shallowMount(BaseSelect, {
    localVue,
    store,
    propsData: { options: optionsData, value: {} }
  })

  store = new Vuex.Store({
    modules: {
      userAgent: {
        namespaced: true,
        getters: {
          isMobile: () => false
        }
      }
    }
  })

  const WRAPPER = shallowMount(BaseSelect, {
    localVue,
    store,
    propsData: { options: optionsData, value: {} }
  })

  test('Componente existe', () => {
    expect(WRAPPER.exists()).toBe(true)
  })

  test('Componente abre', () => {
    WRAPPER.vm.open()

    const IS_OPEN = WRAPPER.vm.menuOpen
    expect(IS_OPEN).toBeTruthy()
  })

  test('Componente fecha', () => {
    WRAPPER.vm.close()
    const IS_OPEN = WRAPPER.vm.menuOpen
    expect(IS_OPEN).toBeFalsy()
  })

  test('Click item de select', () => {
    let w = WRAPPER.find('.BaseSelect__Item')
    w.trigger('click')

    const IS_OPEN = WRAPPER.vm.menuOpen
    expect(IS_OPEN).toBeFalsy()
  })

  test('Click no item selecionado [true]', () => {
    WRAPPER.vm.menuOpen = true
    const IS_OPEN = WRAPPER.vm.menuOpen

    WRAPPER.find('.BaseSelect__selectedContainer').trigger('click')
    expect(IS_OPEN).toBeTruthy()
  })

  test('Click no item selecionado [false]', () => {
    WRAPPER.vm.menuOpen = false
    const IS_OPEN = WRAPPER.vm.menuOpen

    WRAPPER.find('.BaseSelect__selectedContainer').trigger('click')
    expect(IS_OPEN).toBeFalsy()
  })

  test('Select Item versão mobile', () => {
    WRAPPER_MOBILE.find('.BaseSelect__select-mobile').trigger('change')
  })

  describe('Computed - BaseSelectLabelClasses', () => {
    test('Quando tem value ou menuOpen true', () => {
      WRAPPER.setData({ menuOpen: true })
      WRAPPER.setProps({ value: { id: 0, name: 'Teste' } })
      expect(WRAPPER.vm.BaseSelectLabelClasses).toStrictEqual({
        'BaseSelect__label--upwards': true
      })
    })

    test('Quando tem value ou menuOpen false', () => {
      WRAPPER.setData({ menuOpen: false })
      WRAPPER.setProps({ value: { id: 0, name: 'Teste' } })
      expect(WRAPPER.vm.BaseSelectLabelClasses).toStrictEqual({
        'BaseSelect__label--upwards': true
      })
    })

    test('Quando não tem value ou menuOpen true', () => {
      WRAPPER.setData({ menuOpen: true })
      WRAPPER.setProps({ value: '' })
      expect(WRAPPER.vm.BaseSelectLabelClasses).toStrictEqual({
        'BaseSelect__label--upwards': true
      })
    })

    test('Quando não tem value ou menuOpen false', () => {
      WRAPPER.setData({ menuOpen: false })
      WRAPPER.setProps({ value: '' })
      expect(WRAPPER.vm.BaseSelectLabelClasses).toStrictEqual({
        'BaseSelect__label--upwards': false
      })
    })
  })

  test('watch - value', () => {
    WRAPPER.setProps({ value: false })
    WRAPPER.setProps({ value: true })
  })

  test('methods - toggleSelect', () => {
    WRAPPER.setProps({ options: [{}] })
    WRAPPER.vm.toggleSelect()

    WRAPPER.setProps({ options: [] })
    WRAPPER.vm.toggleSelect()
  })

  test('methods - setValue', () => {
    WRAPPER.vm.menuOpen = true
    WRAPPER.vm.setValue('option')
    expect(WRAPPER.emitted('input')).toBeTruthy()
    expect(WRAPPER.emitted('blur')).toBeTruthy()

    WRAPPER.vm.menuOpen = false
    WRAPPER.vm.setValue('option')
  })

  test('Componente não alterado', () => {
    expect(WRAPPER.html()).toMatchSnapshot()
  })
})
