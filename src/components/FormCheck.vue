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
              store.makeQR()
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
      },
      getTos() {
        const store = useStore() 
        return store.tosLink
      },
      getLoginMethod() {
        const store = useStore()
        return store.logInMethod
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
          <dt class="text-sm font-medium leading-6 text-gray-900">{{ $t("form.fullNameLabel")}}:</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ inData.firstName}} {{ inData.lastName }}</dd>
        </div>
        <div class="bg-white px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-medium leading-6 text-gray-900">{{ $t("form.addressLabel")}}:</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ inData.adress }}</dd>
        </div>
        <div class="bg-gray-50 px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-medium leading-6 text-gray-900">{{ $t("form.postalCodeLabel")}}:</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ inData.postalCode }}</dd>
        </div>
        <div class="bg-white px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-medium leading-6 text-gray-900">{{ $t("form.cityLabel")}}:</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ inData.city }}</dd>
        </div>
        <div class="bg-gray-50 px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-medium leading-6 text-gray-900">{{ $t("form.countryLabel")}}:</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ fullCountry }}</dd>
        </div>
        <div class="bg-white px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-medium leading-6 text-gray-900">{{ $t("form.emailLabel")}}:</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ inData.eMail }}</dd>
        </div>
        <div class="bg-gray-50 px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-medium leading-6 text-gray-900">{{ $t("form.phoneNumberLabel")}}:</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ inData.phoneNumber }}</dd>
        </div>
        <input v-if="getLoginMethod !== 'form'" type="checkbox" v-model="inData.tos" id="checkBoxTos" class="mt-4">
        <a v-if="getLoginMethod !== 'form'" class="ml-2" id="checkBoxTos" :href="getTos" target="_blank" >{{ $t("form.tosLabel")}}</a><br>
        
        
        
        
        
      </dl>
    </div>
    <div id="buttons" class="flex flex-col">
        <button type="button" @click="formConfirmed" :disabled="!inData.tos"  :class="{ 'cursor-not-allowed': !inData.tos, 'bg-slate-300':!inData.tos, 'hover:bg-indigo-500': inData.tos }" class=" rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm border-0 sm:border-2 border-black border-solid">Continue</button>
        <button type="button" @click="redoForm"  class="mt-2 rounded-md bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm border-0 sm:border-2 border-black border-solid hover:bg-gray-50">Edit</button>
    </div>
  </div>


</template>

<style scoped>
</style>