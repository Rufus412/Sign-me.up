import { createI18n } from "vue-i18n";
import { loadConfigFiles } from "../Services/Translations";

export const i18n = createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    globalInjection: true,
  });



export async function initI18n() {
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
}

function getUserLocale() {
    const locale = window.navigator.language ||
      window.navigator.userLanguage ||
      Trans.defaultLocale
    return {
      locale: locale,
      localeNoRegion: locale.split('-')[0]
    }
}
  
function getPersistedLocale() {
    const persistedLocale = localStorage.getItem("user-locale")
    return persistedLocale
}


async function translations(locales) {
    const persistedLocale = getPersistedLocale()
    const browserLocale = getUserLocale()
    if (locales.includes(persistedLocale) ){
        return persistedLocale
    }
    else if (locales.includes(browserLocale.localeNoRegion)) {
        return browserLocale.localeNoRegion
    }
    else return 'en'
}

async function loadLocaleMessages(locale) {
    const response = await fetch(`${import.meta.env.VITE_IMPORT_URL}${import.meta.env.BASE_URL}config/locales/${locale}.json`);
    return response.json();
  }
