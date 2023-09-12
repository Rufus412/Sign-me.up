<script setup>
import { useStore } from '../stores/counter'
import { findCountryCode } from '../Services/PhonenumberCountryItentifier'
import GoogleSignIn from './GoogleSignIn.vue';
import FacebookSignIn from './FacebookSignIn.vue';
import EmailSigninButton from './EmailSigninButton.vue';
import { loadConfigFiles, setPersistedLocale } from '../Services/Translations.js'
import appleSigninButton from '../components/appleSigninButton.vue'


</script>

<script>

export default {
  data() {
    const store = useStore()
    return {
      languages: [],
      signinMethods: [],
      store: store,
      size: 0,
      imageRequired_: Boolean
    }
  },
  methods: {
    getLanguageButtonsTailwindClasses(index) {
      const classNames = [];

      if (index === 0) {
        classNames.push('border-r-0.5', 'border-l-0', 'rounded-l-md');
      }

      if (index === this.languages.length - 1) {
        classNames.push('border-r-0', 'border-l-0.5', 'rounded-r-md');
      }

      const AmountOfLanguages = this.languages.length

      switch (AmountOfLanguages) {
        case 2:
          classNames.push('max-w-[50%]')
          classNames.push('min-w-[73px]')
          break
        case 3:
          classNames.push('max-w-[33%]')
          classNames.push('min-w-[73px]')
          break
        case 4:
          classNames.push('max-w-[25%]')
          classNames.push('min-w-[56px]')
          classNames.push('languageButtons')
          break
        case 5:
          classNames.push('max-w-[20%]')
          classNames.push('min-w-[56px]')
          classNames.push('languageButtons')
          break
        case 6:
          classNames.push('max-w-[16.6666666%]')
          classNames.push('min-w-[56px]')
          classNames.push('languageButtons')
          break
        default:
          classNames.push('max-w-[16.6666666%]')
          classNames.push('min-w-[56px]')
          classNames.push('languageButtons')
          break
      }


      return classNames;
    },
  },
  computed: {

  },
  async created() {
    const store = useStore()
    try {
      const config = await loadConfigFiles('config')
      this.languages = config.locales
      this.signinMethods = config.signinMethods
      store.imageRequired = config.imageRequired

    } catch (error) {
      console.error('Error loading config:', error);
    }

  },
  async mounted() {
    const store = useStore()
    const params = (new URL(location)).searchParams;
    this.size = params.size
    if (params.get('coupon')) {
      const couponCode = JSON.parse(atob(params.get('coupon')))
      store.makeQR("coupon", couponCode.id)
      store.couponDescription = couponCode.description ?? store.couponDescription
      this.$router.push({ name: 'coupon' })
    }

    else {
      store.PartitionKey = params.get('PartitionKey')
      store.RowKey = params.get('RowKey')
      if (params.get('data')) {
        const inData = JSON.parse(atob(params.get('data')))
        store.modifyMember({
          firstName: inData.firstName,
          phoneNumber: inData.phoneNumber
        })
        store.tosLink = inData.tos ?? ''
        store.Member.createMembership.itemNumber = inData.itemNumber ?? ''
        store.logoID = inData.logoID ?? ''

        if ((store.PartitionKey ? false : true) || (store.RowKey ? false : true)) {
          console.log('Unable to fetch necessary resources from URL')
        }

        const ccIn = findCountryCode(inData.phoneNumber)
        if (ccIn !== null) {
          const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
          store.modifyMember({
            countryCode: ccIn
          })
          store.phoneInQuery = true
          store.fullCountryName ? regionNames.of(ccIn) : {}
        }
       
      }
      if (params.get('SignUpFlow') === 'Qr') {
        store.SignUpFlow = 0
        this.$router.push({ name: 'formView' })
      }
      else {
        store.SignUpFlow = 1
      }
    }
  }
} 
</script>


<template>
  <div class="flex min-h-full flex-1 flex-col sm:px-6 lg:px-8">

    <div class="sm:mx-auto sm:w-full mt-3 sm:mt-10 sm:max-w-md">
      <h2 class="my-0 sm:my-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {{ $t('frontPage.header') }}
      </h2>
    </div>

    <div class=" sm:mx-auto sm:w-full mt-5 sm:mt-10 sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow-md sm:rounded-lg rounded-lg sm:px-12">
        <div v-if="signinMethods.email === true">
          <EmailSigninButton />
        </div>
        <div v-if="signinMethods.facebook === true" class="flex mt-10 justify-center text-sm font-medium leading-6 w-full">
          <FacebookSignIn />
        </div>
        <div v-if="signinMethods.google === true" class="mt-10 flex flex-col w-full justify-center">
          <GoogleSignIn />
        </div>
        <div v-if="signinMethods.apple === true" class="flex flex-col mt-10 w-full justify-center">
          <appleSigninButton />
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-5 sm:mt-10">
      <span class="rounded-md shadow-sm text-center justify-center item-center">
        <button v-if="languages.length > 1" v-for="(language, index) in languages" :key="index"
          @click="$i18n.locale = `${language}`, setPersistedLocale(language)"
          class="border-y-0 relative inline-flex shadow-md items-center w-[100px] justify-center bg-white border-r-0.5 border-l-0.5 py-2 text-center text-sm focus:bg-gray-300 font-semibold text-gray-900 hover:bg-gray-50 focus:z-10"
          :class="getLanguageButtonsTailwindClasses(index)">
          {{ $t(`frontPage.languageButtons.${language}`) }}</button>
      </span>
    </div>


  </div>
</template>



<style scoped>
@media (max-width: 310px) {
  .languageButtons {
    margin-left: 25px;
    margin-right: 25px;
  }
}
</style>