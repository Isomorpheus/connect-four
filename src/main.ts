import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { makeServer } from './server'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development' && process.env.NODE_ENV === 'production' ) {
  makeServer()
}

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
