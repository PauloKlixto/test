const Payment = () => import(/* webpackChunkName: "payment" */ './Payment.vue')

const routes = [
  {
    name: 'Payment',
    path: '/',
    component: Payment
  }
]

export default routes
