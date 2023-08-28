import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from "vue-i18n";
import App from './App.vue'
import router from './router'
import vueCountryRegionSelect from 'vue3-country-region-select'
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import { initFacebookSdk } from './helpers/facebookInit'
import { initGoogleSdk } from './helpers/googleInit'
//import i18n from "./i18n"
import GoogleSignInPlugin from "vue3-google-signin"
import vue3GoogleLogin from 'vue3-google-login'



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

async function loadLocaleMessages(locale) {
    const response = await fetch(`${import.meta.env.VITE_DEFAULT_URL}/config/locales/${locale}.json`);
    return response.json();
  }


  async function loadConfigFiles(fileName) {
    const response = await fetch(`${import.meta.env.VITE_DEFAULT_URL}/config/${fileName}.json`);
    return response.json();
  }


const i18n = createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    globalInjection: true,
  });

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








