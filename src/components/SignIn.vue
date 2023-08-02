<script setup>
import { apiService } from '../Services/APIService'
import { useStore } from '../stores/counter'
//import { countryLookUp } from '../helpers/PhoneNumberLookup'
import { findCountryCode } from '../helpers/PhonenumberCountryItentifier'
import Compressor from 'compressorjs';


</script>

<script>

export default {
    data() {
      return {
        tos: ''
      }
    },
    methods: {
      checkLoginState() {
        FB.login((response) => {
        
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            console.log(response.authResponse)
            const store = useStore()
            
            console.log("This is the UID " + response.authResponse.userID)
            store.memberID = response.authResponse.userID

            
            apiService.getName()
            this.$router.push( {name: 'formCheck' })
        } else {
            //user hit cancel button
            console.log('User cancelled login or dd not fully authorize.');

          }
        }, { scope: 'public_profile,email'});
      },
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

  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ $t('frontPage.header') }}</h2>
    </div>

    
    
    <div class=" sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-gray-50 mt-10 px-6 py-12 shadow sm:rounded-lg rounded-lg sm:px-12">
          <div>
            <router-link to="/formview" custom v-slot="{ navigate }">
                <button type="submit" @click="navigate" className="fb-login-button" class="flex border-0 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{ $t('frontPage.emailButton') }}</button>
            </router-link>
          </div>
        <div>
          <div class="relative mt-10">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
            </div>
            <div class="relative flex justify-center text-sm font-medium leading-6 w-full" >
              <button type="button" @click="checkLoginState" class="flex border-0 w-full justify-center rounded-md bg-[#1877F2] bg-[url(../assets/FacebookF.png)]  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#458FEF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {{ $t('frontPage.facebookButton') }}
              </button>
            </div>
            
          </div>

          
        </div>
      </div>


    </div>
    <a class="text-center mt-5" :href="tos" target="_blank">{{ $t('frontPage.tac') }}</a>

    <div class="flex justify-center mt-10">
      <span class="isolate inline-flex rounded-md shadow-sm">
        <button type="button" @click="$i18n.locale = 'en'" class="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">English</button>
        <button type="button" @click="$i18n.locale = 'sv'" class="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">Swedish</button>
        <button type="button" @click="$i18n.locale = 'da'" class="relative -ml-px inline-flex items-center  rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">Danish</button>
      </span>

    </div>
  </div>
</template>



<style scoped>


#navButton {
    position: absolute;
    top: 20%;
    right: 50%;
    transform: translate(50%);
}

</style>