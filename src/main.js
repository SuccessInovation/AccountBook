import 'bootstrap/dist/css/bootstrap.min.css' // bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // bootstrap
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

//vuedatepicker 설치
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

//기본 app, router
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('VueDatePicker', VueDatePicker)
app.use(createPinia())
app.use(router)

app.mount('#app')
