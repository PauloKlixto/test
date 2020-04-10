export default {
  card(value, el) {
    if (el) el.maxLength = 19

    if (typeof value === 'number') value = String(value)
    if (typeof value !== 'string') return value

    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{4})(\d)/, '$1-$2')
    value = value.replace(/(\d{4})(\d)/, '$1-$2')
    value = value.replace(/(\d{4})(\d)/, '$1-$2')
    value = value.replace(/(\d{4})(\d)/, '$1-$2')

    return value
  },

  letters(value) {
    value = value.replace(/[^a-zA-Z\s/]+$/g, '')
    return value
  },

  number(value) {
    value = value.toString().replace(/\D/g, '')
    return value
  }
}
