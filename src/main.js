// import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {helperMixin} from "./utils/helperMixin.js";
import VueSweetalert2 from 'vue-sweetalert2';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

const app = createApp(App)

app
    .use(router)
    .mixin(helperMixin)
    .component('v-select', vSelect)

app.mount('#app')
