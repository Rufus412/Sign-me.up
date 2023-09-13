import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vueCountryRegionSelect from 'vue3-country-region-select'
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import { initFacebookSdk } from './helpers/facebookInit'
import vue3GoogleLogin from 'vue3-google-login'
import { i18n, initI18n } from './helpers/I18nInit'
import VueAppleLogin from 'vue-apple-login'
import { initAppleSdk } from './helpers/appleInit.js'
import { loadConfigFiles } from './Services/Translations'


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
    const config = await loadConfigFiles('config')
    const keys = config.keys
    const signinMethods = config.signinMethods
    if (signinMethods.apple) {
        initAppleSdk(keys.appleKey)
    }
    if (signinMethods.facebook) {
        initFacebookSdk(keys.facebookKey)
    }
    initI18n()
    const app = createApp(App)
    const pinia = createPinia()
    if (signinMethods.google) {
        app.use(vue3GoogleLogin, {
            clientId: keys.googleKey
        })
    }
    app.use(pinia)
    app.use(router)

    app.use(vueCountryRegionSelect)
    app.use(VueTelInput, globalOptions)
    app.use(i18n)
    app.mount('#app')
})()








