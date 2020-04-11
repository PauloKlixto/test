export default paymentOptions => [
  {
    id: 'card_number',
    tag: 'InputGroup',
    model: 'card_number',
    rules: ['required'],
    props: {
      mask: 'card',
      label: 'Número do cartão',
      type: 'text',
      floatingLabel: true,
      invalidLabel: 'Número de cartão inválido'
    },
    events: {
      input: 'getCardType'
    }
  },
  {
    id: 'card_name',
    tag: 'InputGroup',
    model: 'card_name',
    rules: ['required'],
    props: {
      label: 'Nome (igual ao cartão)',
      type: 'text',
      floatingLabel: true,
      invalidLabel: 'Insira seu nome completo'
    }
  },
  {
    id: 'card_date',
    tag: 'InputGroup',
    model: 'card_date',
    rules: ['required'],
    props: {
      mask: 'cardDate',
      label: 'Validade',
      type: 'text',
      floatingLabel: true,
      invalidLabel: 'Data inválida'
    }
  },
  {
    id: 'card_cvv',
    tag: 'InputGroup',
    model: 'card_cvv',
    rules: ['required'],
    props: {
      label: 'CVV',
      type: 'number',
      floatingLabel: true,
      invalidLabel: 'Código inválido'
    }
  },
  {
    id: 'card_installments',
    tag: 'BaseSelect',
    model: 'card_installments',
    rules: ['required'],
    props: {
      label: 'Número de parcelas',
      options: paymentOptions,
      invalidLabel: 'insira o número de parcelas'
    }
  },
  {
    id: 'send',
    tag: 'BaseButton',
    props: {
      label: 'Continuar',
      type: 'submit'
    }
  }
]
