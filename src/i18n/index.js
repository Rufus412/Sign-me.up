import { createI18n } from "vue-i18n";
import { useStore } from "../stores/counter";

const messages = {
  en: {
    frontPage: {
      header: "Complete membership registration",
      emailButton: "Complete With Email",
      facebookButton: "Complete With Facebook",
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
      tosLabel: "I agree to the terms of service",
      continueButton: "Continue",
      fullNameLabel: "Full name",
      editButton: "Edit"
      // ... add other translations as needed
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
      tosLabel: "Jag godkänner användarvillkoren",
      continueButton: "Fortsätt",
      fullNameLabel: "Fullständigt namn",
      editButton: "Redigera"
      // ... add other translations as needed
    },
    selfie: {
      header: "Vill du lägga till ett foto av dig själv?",
      photoButton: "Ta foto",
      skipButton: "Hoppa över",
      newPhotoButton: "Nytt foto",
      continueButton: "Fortsätt",
    },
    qrPage: {
      showToTeller: "Visa QR-koden för att slutföra registreringen",
      error: "Ett fel inträffade",
    },
    confirmationPage: {
      ty: "Tack!",
    },
  },
  da: { // Danish translations
    frontPage: {
      header: "Fuldfør medlemsregistrering",
      emailButton: "Fuldfør med e-mail",
      facebookButton: "Fuldfør med Facebook",
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
      tosLabel: "Jeg accepterer vilkår og betingelser",
      continueButton: "Fortsæt",
      fullNameLabel: "Fulde navn",
      editButton: "Redigere"
      // ... add other translations as needed
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



export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true, // <--- add this
  messages,
});