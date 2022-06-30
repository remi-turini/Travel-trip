import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import VueGoogleMaps from '@fawmi/vue-google-maps'

createApp(App).use(router).use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAJ--TiFm_qi81Yc6A-yqY_mjb9bXU8Z7g',
    },
}).mount('#app')
