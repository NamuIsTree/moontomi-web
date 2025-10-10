import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

// Tiptap plugins
import ElementPlus from 'element-plus'
import ElementTiptapPlugin from 'element-tiptap-vue3-fixed'
import 'element-tiptap-vue3-fixed/lib/style.css'

loadFonts()

const app = createApp(App)
app.config.globalProperties.serverUrl = 'https://server.moontomi.com'
// app.config.globalProperties.serverUrl = 'http://localhost:8000'

app
  .use(router)
  .use(store)
  .use(vuetify)
  .use(ElementPlus)
  .use(ElementTiptapPlugin)
  .mount('#app')
