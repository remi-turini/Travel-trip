import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import VueGoogleMaps from '@fawmi/vue-google-maps'

createApp(App).use(router).use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyApOfF7yGbMxsi0cPlqOEES6j9qIY3j_6Y',
    },
}).mount('#app')
