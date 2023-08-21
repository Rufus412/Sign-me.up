import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vueCountryRegionSelect from 'vue3-country-region-select'
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import { initFacebookSdk } from './helpers/facebookInit'
import { initGoogleSdk } from './helpers/googleInit'
import i18n from "./i18n"



const globalOptions = {
    mode: 'international',
    dropdownOptions: {
        showSearchBox: true,
        showDialCodeInSelection: true
    },
    showDialCodeInSelection: {
        showDialCode: true,
        
    },
    inputClasses: Object,
};
initFacebookSdk().then(initGoogleSdk().then(mountApp()));




function mountApp(){

    const pinia = createPinia()
    const app = createApp(App)
    app.use(pinia)
    app.use(router)
    app.use(i18n)
    app.use(vueCountryRegionSelect)
    app.use(VueTelInput, globalOptions)
    app.mount('#app')
}



