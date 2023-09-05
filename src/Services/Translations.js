export async function setPersistedLocale(locale) {
    localStorage.setItem("user-locale", locale);
    
}

export async function loadConfigFiles(fileName) {
    const response = await fetch(`${import.meta.env.VITE_IMPORT_URL}${import.meta.env.BASE_URL}config/${fileName}.json`);
    
    console.log(`${import.meta.env.VITE_DEFAULT}`)
    console.log(`${JSON.stringify(import.meta.env)}`)
    console.log(`${import.meta.env.VITE_IMPORT_URL}${import.meta.env.BASE_URL}config/${fileName}.json`)
    const a = await response.json();
    console.log(a)
    return a 
  }