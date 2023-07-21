<script setup>
import { toValue } from 'vue';
import  Form  from '../components/Form.vue'
import FormCheck from '../components/FormCheck.vue'
import { apiService } from '../Services/APIService'
import  router from '../router/index.js'
import { useStore } from '../stores/counter'
</script>

<script>




window.checkLoginState = async res => {
  FB.getLoginStatus(function(response) {
    if (isConnected(response)) { 
        getUserData()
        router.push({ name: 'formCheck'})
      
    }
  })
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
            <router-link
                to="/formview"
                custom
                v-slot="{ navigate }"
            >
                <button type="submit" @click="navigate" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in with Email</button>
            </router-link>
          </div>
        <div>
          <div class="relative mt-10">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-200" />
            </div>
            <div class="relative flex justify-center text-sm font-medium leading-6">
              <div
              class="rounded-md w-full"
              className="fb-login-button"
              data-size="large"
              data-button-type="continue_with"
              data-onlogin="checkLoginState();"
              sm:data-width="384"
              ></div>
            </div>
            
          </div>

          
        </div>
      </div>


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