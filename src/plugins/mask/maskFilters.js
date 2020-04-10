import Vue from 'vue'
import Mask from './Mask.js'

const moneyToNumber = value => {
  if (!value || typeof value === 'number') return value
  value = value.replace(/[^0-9]/gm, '')
  return Number(value)
}

const noSpecialCharacters = value => {
  if (!value) return value
  if (typeof value === 'number') return value
  if (Array.isArray(value)) return value
  return value.replace(/[^a-zA-Z0-9]/gm, '')
}

const setFilters = () => {
  for (const fn in Mask) {
    const maskFn = Mask[fn]
    Vue.filter(fn, maskFn)
  }

  Vue.filter('noSpecialCharacters', noSpecialCharacters)
  Vue.filter('moneyToNumber', moneyToNumber)
}

export default {
  noSpecialCharacters,
  setFilters
}
