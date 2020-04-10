import Vue from 'vue'
import App from './App.vue'
import router from '@/plugins/router'
import store from './store'
import './registerServiceWorker'
import maskFilters from '@/plugins/mask/maskFilters.js'

Vue.config.productionTip = false

// Photons
import { Icon } from '@/components/photons'

// Create Masks
maskFilters.noSpecialCharacters()
maskFilters.setFilters()

// Global Components
Vue.component('Icon', Icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
