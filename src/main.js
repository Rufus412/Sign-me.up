import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vueCountryRegionSelect from 'vue3-country-region-select'
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import { initFacebookSdk } from './helpers/facebookInit'
import vue3GoogleLogin from 'vue3-google-login'
import { i18n, initI18n } from './helpers/I18nInit';
import VueAppleLogin from 'vue-apple-login';



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



(async () => {
    initFacebookSdk()
    initI18n()
    const app = createApp(App);
    const pinia = createPinia()
    app.use(pinia)
    app.use(router)

    app.use(vue3GoogleLogin, {
        clientId: '886736602258-smn2otlk08g3bfo60c3930bufmqs7k9a.apps.googleusercontent.com'
    })
    app.use(VueAppleLogin, {
        clientId: 'K9HA2G4JD5se.sannes.membership',
        scope: 'name email',
        redirectURI: 'https://sannes.se',
        state: "20:00",
        usePopup: true,
      });
    app.use(vueCountryRegionSelect)
    app.use(VueTelInput, globalOptions)
    app.use(i18n);
    app.mount('#app')
})()








