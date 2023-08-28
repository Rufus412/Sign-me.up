<script setup>
import { useStore } from '../stores/counter'
//import { countryLookUp } from '../helpers/PhoneNumberLookup'
import { findCountryCode } from '../helpers/PhonenumberCountryItentifier'
import GoogleSignIn from './GoogleSignIn.vue';
import FacebookSignIn from './FacebookSignIn.vue';
import EmailSigninButton from './EmailSigninButton.vue';


</script>

<script>

export default {
  data() {
    return {
      tos: '',
      languages: [],
      loggingMethods: []
    }
  },
  methods: {
    swapLanguage(language) {
      const store = useStore()
      store.locale = language
    },
  },
  computed: {
  },
  async created() {
    try {

      async function loadConfigFiles (fileName) {
        const response = await fetch(`${import.meta.env.VITE_DEFAULT_URL}/config/${fileName}.json`);
        const a = await response.json()
        console.log(a.locales)
        return  a;
      }

      const config = await loadConfigFiles('config'); // Fetch the config
      console.log("THis is the config: " + config)
      this.languages = config.locales;
      this.loggingMethods = config.loggingMethods

    } catch (error) {
      console.error('Error loading config:', error);
    }

  },
  mounted() {
    const store = useStore()
    const params = (new URL(location)).searchParams;

    if (params.get('coupon')) {
      const couponCode = JSON.parse(atob(params.get('coupon')))
      store.makeQR("coupon", couponCode.id)
      if (couponCode.description) {
        store.couponDescription = couponCode.description
      }
      this.$router.push( {name: 'coupon'} )
    }
    else {
    if (params.get('data')) {
      var inData = JSON.parse(atob(params.get('data')))
      console.log(inData + ' This is indata from query')
      store.Member.createMembership.members[0].firstName = inData.firstName ?? ''
      store.Member.createMembership.members[0].phoneNumber = inData.phoneNumber ?? ''

      store.tosLink = inData.tos ?? ''
      this.tos = inData.tos

      let regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
      console.log(inData.phoneNumber)
      let ccIn = findCountryCode(inData.phoneNumber)
      console.log(ccIn)
      if (ccIn !== null) {
        store.Member.createMembership.members[0].countryCode = ccIn
        store.phoneInQuery = true
        store.fullCountryName = regionNames.of(ccIn)
      }

    }

    console.log(params.get('dev'))
    if (params.get('dev')) {
      console.log("Dev mode")
      store.devMode = true
      store.addMember({
        firstName: 'John',
        lastName: 'Smith',
        eMail: 'John.Smith@gmail.com',
        countryCode: 'US',
        city: 'New York',
        adress: '1 Fifth Avenue',
        postalCode: '10003',
        phoneNumber: '+46734321852',
        newsLetter: true,
        tos: true
      })
      console.log(JSON.stringify(store.Member.createMembership.members[0]))
    }

    if (params.get('PartitionKey')) {
      store.PartitionKey = params.get('PartitionKey')
    }
    if (params.get('RowKey')) {
      store.RowKey = params.get('RowKey')
    }
    if (params.get('logoID')) {
      store.logoID = params.get('logoID')
    }


    console.log(window.location.href)

    console.log(params.get('SignUpFlow'))
    if (params.get('SignUpFlow') === '0') {
      this.$router.push({ name: 'formView' })
    }
    else {
      console.log('lvl3 active')
      store.lvl3 = true
    }
  }
}
} 
</script>


<template>
  <div class="flex min-h-full flex-1 flex-col sm:px-6 lg:px-8">

    <div class="sm:mx-auto sm:w-full mt-3 sm:mt-10 sm:max-w-md">
      <h2 class="my-0 sm:my-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ $t('frontPage.header') }}
      </h2>
    </div>



    <div class=" sm:mx-auto sm:w-full mt-5 sm:mt-10 sm:max-w-[480px]">
      <div class="bg-gray-50 px-6 py-12 shadow-md sm:rounded-lg rounded-lg sm:px-12">
        <div v-if="loggingMethods.email === true">
          <EmailSigninButton/>
        </div>
        <div class="relative mt-10">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
          </div>
          <div v-if="loggingMethods.facebook === true" class="flex justify-center text-sm font-medium leading-6 w-full">
            <FacebookSignIn/>
          </div>

        </div>
        <div v-if="loggingMethods.google === true" class="mt-10 flex flex-col w-full justify-center">
          <GoogleSignIn/>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-5 sm:mt-10">
      <span class="rounded-md shadow-sm text-center justify-center item-center">
        <button v-for="(language, index) in languages" :key="index" @click="$i18n.locale = `${language}`"
          class=" border-y-0 relative inline-flex items-center justify-center bg-white w-[100px] max-w-[33%] py-2 text-center text-sm focus:bg-gray-300 font-semibold text-gray-900 hover:bg-gray-50 focus:z-10" :class="{ 'border-r-0.5 border-l-0 rounded-l-md': index === 0, 'border-r-0.5 border-l-0.5': index === 1, 'border-r-0 border-l-0.5 rounded-r-md': index === languages.length - 1}">
          {{ $t(`frontPage.languageButtons.${language}`) }}</button>
      </span>
    </div>


  </div>
</template>