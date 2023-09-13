export async function setPersistedLocale(locale) {
    localStorage.setItem("user-locale", locale);

}

export async function loadConfigFiles(fileName) {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}config/${fileName}.json`);
        const a = await response.json();
        return a
    }
    catch (error) {
        console.log(`Failed to load ${import.meta.env.VITE_BASE_URL}config/${fileName}.json. Error: ${error}`)
    }
}