<script setup>
import { toValue } from 'vue';
import  Form  from '../components/Form.vue'
import FormCheck from '../components/FormCheck.vue'
import { apiService } from '../Services/APIService'
import  router from '../router/index.js'
import { useStore } from '../stores/counter'
//import { countryLookUp } from '../helpers/PhoneNumberLookup'
import { findCountryCode } from '../helpers/PhonenumberCountryItentifier'


</script>

<script>

/*
window.checkLoginState = async res => {
  FB.getLoginStatus(function(response) {
    if (!response.authResponse) {return}
    if (isConnected(response)) { 
        getUserData()
         
        router.push({ name: 'formCheck'})  
    }
  })
}
*/


window.fb_login = res => {
            FB.login(function(response) {
        
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    //console.log(response); // dump complete info
                    console.log(response.authResponse)
                    let access_token = response.authResponse.accessToken; //get access token
                    let user_id = response.authResponse.userID; //get FB UID

                    apiService.getName()
                    router.push({ name: 'formCheck'})
                } else {
                    //user hit cancel button
                    console.log('User cancelled login or did not fully authorize.');
        
                }
            }, {
                scope: 'public_profile,email'
            });
        }


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
            let access_token = response.authResponse.accessToken; //get access token
            let user_id = response.authResponse.userID; //get FB UID

            
            apiService.getName()
            this.swapView()
        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

          }
        }, { scope: 'public_profile,email'});
      },
      getUserData() {
          apiService.getName(apiService.getLogginData())
           
      },
      isConnected(response) {
        if (response.status === 'connected') {
            return true
          }
      },
      swapView() {
        console.log("swappingView")
        this.$router.push( {name: 'formCheck' })
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

function getUserData() {
          apiService.getName(apiService.getLogginData())
           
        }



function isConnected(response) {
            if (response.status === 'connected') {
              return true
            }
          }  
</script>


<template>

  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register as a member</h2>
    </div>

    
    
    <div class=" sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-gray-50 mt-10 px-6 py-12 shadow sm:rounded-lg rounded-lg sm:px-12">
          <div>
            <router-link to="/formview" custom v-slot="{ navigate }">
                <button type="submit" @click="navigate" className="fb-login-button" class="flex border-0 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register with Email</button>
            </router-link>
          </div>
        <div>
          <div class="relative mt-10">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
            </div>
            <div class="relative flex justify-center text-sm font-medium leading-6 w-full" >
              <button type="button" @click="checkLoginState" class="flex border-0 w-full justify-center rounded-md bg-[#1877F2] bg-[url(../assets/FacebookF.png)]  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Register using facebook</button>
            </div>
            
          </div>

          
        </div>
      </div>


    </div>
    <a class="text-center mt-5" :href="this.tos">Terms and conditions</a>
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