import Vue from 'vue'
import Router from 'vue-router'
import views from '@/views'
import navGuards from './navGuards'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [...views]
})

navGuards(router)

export default router
