import { createI18n } from "vue-i18n";
//import { useStore } from "../stores/counter";
//import { messages } from "../../locales/locales.js"


/*
const messages2 = {
  en: {
    frontPage: {
      header: "Complete membership registration",
      emailButton: "Complete With Email",
      facebookButton: "Complete With Facebook",
      googleButton: "Complete with Google",
      tac: "Terms and Conditions",
    },
    form: {
      title: "Personal Information",
      firstNameLabel: "First name",
      lastNameLabel: "Last name",
      addressLabel: "Address",
      postalCodeLabel: "Postal code",
      cityLabel: "City",
      countryLabel: "Country",
      selectCountryLabel: "Select country",
      emailLabel: "Email address",
      phoneNumberLabel: "Phone Number",
      newslettersLabel: "I want to receive newsletters",
      tos1Label: "I agree to the ",
      tos2Label: "terms of service",
      continueButton: "Continue",
      fullNameLabel: "Full name",
      editButton: "Edit",
      contactInfo: "Contact information"
    },
    selfie: {
      header: "Do you want to add a photo of yourself?",
      photoButton: "Take Photo",
      skipButton: "Skip",
      newPhotoButton: "New Photo",
      continueButton: "Continue",
    },
    qrPage: {
      showToTeller: "Show the QR code to the teller to complete registration",
      error: "An error occurred",
    },
    confirmationPage: {
      ty: "Thank You!",
    },
  },
  sv: {
    frontPage: {
      header: "Slutför medlemsregistrering",
      emailButton: "Slutför med e-post",
      facebookButton: "Slutför med Facebook",
      googleButton: "Slutför med Google",
      tac: "Villkor och regler",
    },
    form: {
      title: "Personlig Information",
      firstNameLabel: "Förnamn",
      lastNameLabel: "Efternamn",
      addressLabel: "Adress",
      postalCodeLabel: "Postnummer",
      cityLabel: "Stad",
      countryLabel: "Land",
      selectCountryLabel: "Välj land",
      emailLabel: "E-postadress",
      phoneNumberLabel: "Telefonnummer",
      newslettersLabel: "Jag vill få nyhetsbrev",
      tos1Label: "Jag godkänner ",
      tos2Label: "användarvillkoren",
      continueButton: "Fortsätt",
      fullNameLabel: "Fullständigt namn",
      editButton: "Redigera",
      contactInfo: "Kontaktinformation"
    },
    selfie: {
      header: "Vill du lägga till ett foto av dig själv?",
      photoButton: "Ta foto",
      skipButton: "Hoppa över",
      newPhotoButton: "Nytt foto",
      continueButton: "Fortsätt",
    },
    qrPage: {
      showToTeller: "Visa QR-koden för att slutföra registrationen",
      error: "Ett fel inträffade",
    },
    confirmationPage: {
      ty: "Tack!",
    },
  },
  da: {
    frontPage: {
      header: "Fuldfør medlemsregistrering",
      emailButton: "Fuldfør med e-mail",
      facebookButton: "Fuldfør med Facebook",
      googleButton: "Fuldfør med Google",
      tac: "Vilkår og betingelser",
    },
    form: {
      title: "Personlige Oplysninger",
      firstNameLabel: "Fornavn",
      lastNameLabel: "Efternavn",
      addressLabel: "Adresse",
      postalCodeLabel: "Postnummer",
      cityLabel: "By",
      countryLabel: "Land",
      selectCountryLabel: "Vælg land",
      emailLabel: "E-mailadresse",
      phoneNumberLabel: "Telefonnummer",
      newslettersLabel: "Jeg ønsker at modtage nyhedsbreve",
      tos1Label: "Jeg accepterer ",
      tos2Label: "vilkår og betingelser",
      continueButton: "Fortsæt",
      fullNameLabel: "Fulde navn",
      editButton: "Redigere",
      contactInfo: "Kontaktinformation"
    },
    selfie: {
      header: "Ønsker du at tilføje et foto af dig selv?",
      photoButton: "Tag foto",
      skipButton: "Spring over",
      newPhotoButton: "Nyt foto",
      continueButton: "Fortsæt",
    },
    qrPage: {
      showToTeller: "Vis QR-koden til kassen for at fuldføre registreringen",
      error: "Der opstod en fejl",
    },
    confirmationPage: {
      ty: "Tak!",
    },
  },
};

*/

/*
async function loadLanguageJson() {
  console.log("fetching json  ")
  const response = await fetch(`${import.meta.env.VITE_DEFAULT_URL}/locales/en.json`);
  const en = await response.json();
  console.log("THis is the response: " + JSON.stringify(response))
  console.log("THis is the JSON: " + JSON.stringify(en))

  return en;
}

// Usage example in a component
async function someComponentLogic() {
  const en = await loadLanguageJson('en');

  console.log(en);
  return en
}



export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages: someComponentLogic(),
  });
*/


export function initI18n() {
  return new Promise(resolve => {
    async function loadLanguageJson(locale) {
      const response = await fetch(`${import.meta.env.VITE_DEFAULT_URL}/locales/${locale}.json`);
      const jsonData = await response.json();
      return jsonData;
    }

    (async () => {
      const en = await loadLanguageJson('en'); // Load English messages
      const fr = await loadLanguageJson('fr'); // Load French messages

      const i18n = createI18n({
        locale: import.meta.env.VITE_DEFAULT_LOCALE,
        fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
        legacy: false,
        globalInjection: true,
        messages: {
          en,
          fr,
          // Other languages and their messages can be added here
        },
      });
    })();
  })
}

