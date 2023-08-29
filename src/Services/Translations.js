export async function setPersistedLocale(locale) {
    localStorage.setItem("user-locale", locale);
    
}

export async function loadConfigFiles(fileName) {
    const response = await fetch(`${import.meta.env.VITE_DEFAULT_URL}/config/${fileName}.json`);
    return response.json();
  }
