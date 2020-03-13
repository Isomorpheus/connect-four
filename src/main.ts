import Vue from 'vue'
import App from './App.vue'
import store from './store'

//server logic
import { makeServer } from './server'

Vue.config.productionTip = false

makeServer()

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
