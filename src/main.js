import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import PageContent from '@/components/PageContent'

import 'buefy/lib/buefy.css'

Vue.use(Buefy)
Vue.component('page-content', PageContent)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
