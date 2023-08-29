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


export async function translations(locales) {
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

export async function loadLocaleMessages(locale) {
    const response = await fetch(`${import.meta.env.VITE_DEFAULT_URL}/config/locales/${locale}.json`);
    return response.json();
  }


export async function loadConfigFiles(fileName) {
    const response = await fetch(`${import.meta.env.VITE_DEFAULT_URL}/config/${fileName}.json`);
    return response.json();
  }

export async function setPersistedLocale(locale) {
    localStorage.setItem("user-locale", locale);
    
}