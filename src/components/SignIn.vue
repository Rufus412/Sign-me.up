<script setup>
import { useStore } from '../stores/counter'
//import { countryLookUp } from '../helpers/PhoneNumberLookup'
import { findCountryCode } from '../helpers/PhonenumberCountryItentifier'
import GoogleSignIn from './GoogleSignIn.vue';
import FacebookSignIn from './FacebookSignIn.vue';


</script>

<script>

export default {
    data() {
      return {
        tos: ''
      }
    },
    methods: {
      swapLanguage(language) {
        const store = useStore()
        store.locale = language
      }
    },
    mounted() {

        const store = useStore()
        
        const params = (new URL(location)).searchParams;

        if (params.get('data')) {
          var inData = JSON.parse(atob(params.get('data')))
          console.log(inData + ' This is indata from query')
          store.Member.createMembership.members[0].firstName = inData.firstName ?? ''
          store.Member.createMembership.members[0].phoneNumber = inData.phoneNumber ?? ''

          store.tosLink = inData.tos ?? ''
          this.tos = inData.tos

          let regionNames = new Intl.DisplayNames(['en'], {type: 'region'})
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
                lastName:'Smith',
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


        console.log(window.location.href)

        console.log(params.get('SignUpFlow'))
        if (params.get('SignUpFlow') === '0') {
          this.$router.push( {name: 'formView'})
        }
        else {
          console.log('lvl3 active')
          store.lvl3 = true
        }
    }
} 
</script>


<template>

  <div class="flex min-h-full flex-1 flex-col sm:px-6 lg:px-8">

    <div class="sm:mx-auto sm:w-full mt-10 sm:max-w-md">
      <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ $t('frontPage.header') }}</h2>
    </div>

    
    
    <div class=" sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-gray-50 mt-10 px-6 py-12 shadow-md sm:rounded-lg rounded-lg sm:px-12">
        <div>
          <router-link to="/formview" custom v-slot="{ navigate }">
              <button type="submit" @click="navigate" class="loginBtn loginBtn--email flex border-0 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 ">{{ $t('frontPage.emailButton') }}</button>
          </router-link>
        </div>
    
        <div class="relative mt-10">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
          </div>
          <div class="flex justify-center text-sm font-medium leading-6 w-full" >
            <FacebookSignIn>

            </FacebookSignIn>
          </div>
          
        </div>
        <div class="mt-10 flex flex-col w-full justify-center">
          <GoogleSignIn>

          </GoogleSignIn>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-10">
      <span class="rounded-md shadow-sm">
        <button type="button" @click="$i18n.locale = 'en'" class="border-y-0 border-l-0 relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm focus:bg-gray-300 font-semibold text-gray-900 hover:bg-gray-50 focus:z-10">{{ $t('frontPage.languageButtons.englishButton') }}</button>
        <button type="button" @click="$i18n.locale = 'sv'" class="border-y-0 border-x-1 relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold focus:bg-gray-300 text-gray-900 hover:bg-gray-50 focus:z-10">{{ $t('frontPage.languageButtons.swedishButton') }}</button>
        <button type="button" @click="$i18n.locale = 'da'" class="border-y-0 border-r-0 relative -ml-px inline-flex items-center  rounded-r-md bg-white px-3 py-2 text-sm focus:bg-gray-300 font-semibold text-gray-900 hover:bg-gray-50 focus:z-10">{{ $t('frontPage.languageButtons.danishButton') }}</button>
      </span>
    </div>


  </div>
</template>



<style scoped>

.loginBtn {
  box-sizing: border-box;
  position: relative;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}



.loginBtn--email:before {
  border-right: #364e92 1px solid;
  background: url('../assets/emailIcon3.png') 3px 8px no-repeat;
}


</style>