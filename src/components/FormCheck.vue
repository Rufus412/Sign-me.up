<script setup>
import { useStore } from '../stores/counter.js';
</script>

<script>

export default {
    methods: {
        formConfirmed() {         
            const store = useStore()
            
            console.log(store.lvl3)
            if (store.lvl3 !== false) {
              this.$router.push( {name: 'selfie'} )
            }
            else {
              store.makeQR(this.inData)
              this.$router.push( {name: 'QR' })
            }
        },
        redoForm() {
            this.$router.push( {name: 'formView' })
        }
    },
    computed:{
      inData() {
        const store = useStore()
        return store.Member.createMembership.members[0]
      },
      fullCountry() {
        const store = useStore()
        let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
        return regionNames.of(store.Member.createMembership.members[0].countryCode)
      }
      

    }
}
</script>

<template>
  <div class="">
    <div class="px-4 sm:px-0">
      <h3 class="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="bg-gray-50 px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-medium leading-6 text-gray-900">Full name:</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ inData.firstName}} {{ inData.lastName }}</dd>
        </div>
        <div class="bg-white px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-medium leading-6 text-gray-900">Adress:</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ inData.adress }}</dd>
        </div>
        <div class="bg-gray-50 px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-medium leading-6 text-gray-900">Postal code:</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ inData.postalCode }}</dd>
        </div>
        <div class="bg-white px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-medium leading-6 text-gray-900">City:</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ inData.city }}</dd>
        </div>
        <div class="bg-gray-50 px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-medium leading-6 text-gray-900">Country:</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ fullCountry }}</dd>
        </div>
        <div class="bg-white px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-medium leading-6 text-gray-900">Email adress:</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ inData.eMail }}</dd>
        </div>
        <div class="bg-gray-50 px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-medium leading-6 text-gray-900">Phone Number:</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ inData.phoneNumber }}</dd>
        </div>
        
        
        
        
        
      </dl>
    </div>
    <div id="buttons" class="flex flex-col">
        <button type="button" @click="formConfirmed" class=" rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Continue</button>
        <button type="button" @click="redoForm" class="mt-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Edit</button>
    </div>
  </div>


</template>

<style scoped>
</style>