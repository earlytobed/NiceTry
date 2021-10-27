import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: "mdi",
})

new Vue({
  vuetify,
  router,
  store,
  TiptapVuetifyPlugin,
  render: h => h(App),
}).$mount('#app')
