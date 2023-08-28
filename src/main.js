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
import { translations, loadLocaleMessages, loadConfigFiles } from './Services/Translations';
import { i18n } from './helpers/I18nInit';



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
    const response = await loadConfigFiles("config")
    const locales = (response.locales)
    for (const locale of locales) {
        try {
            const messages = await loadLocaleMessages(locale);
            i18n.global.setLocaleMessage(locale, messages);
        }
        catch(error) {
            console.log(`Language file for ${locale} not found!`)
        }
    }

    i18n.global.locale.value = await translations(locales)
    const app = createApp(App);
    const pinia = createPinia()
    app.use(pinia)
    app.use(router)

    app.use(vue3GoogleLogin, {
        clientId: '886736602258-smn2otlk08g3bfo60c3930bufmqs7k9a.apps.googleusercontent.com'
    })
    app.use(vueCountryRegionSelect)
    app.use(VueTelInput, globalOptions)
    app.use(i18n);
    app.mount('#app')
})()








