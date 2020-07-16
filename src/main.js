import Vue from 'vue'
import VuePapaParse from 'vue-papa-parse'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(VuePapaParse)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
