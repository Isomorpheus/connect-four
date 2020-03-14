import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueScreen from 'vue-screen';

//server logic
import { makeServer } from './server'

Vue.config.productionTip = false
makeServer()

Vue.use(VueScreen);
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
