import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

const app = createApp(App)
app.config.globalProperties.serverUrl = 'https://server.moontomi.com'

app
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
