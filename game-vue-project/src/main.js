import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { store } from './useStore'

const app = createApp(App)

app.use(router)
app.provide('store');
app.use(Toast);
app.mount('#app')
