<script setup>
import { useStore } from '../stores/counter.js';
</script>

<script>

export default {
  methods: {
    formConfirmed() {
      const store = useStore()
      if (store.SignUpFlow === 0) {
        store.makeQR()
        this.$router.push({ name: 'QR' })
      }
      else {
        store.makeQR()
        this.$router.push({ name: 'selfie' })
      }
    },
    redoForm() {
      this.$router.push({ name: 'formView' })
    }
  },
  computed: {
    inData() {
      const store = useStore()
      return store.Member.createMembership.members[0]
    },
    fullCountry() {
      const store = useStore()
      if (this.inData.countryCode === "") {
        return ""
      }
      else {
        let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        return regionNames.of(this.inData.countryCode)
      }
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
  <div class="bg-white shadow-xl px-3 pb-5 rounded-xl h-fit w-full sm:max-w-[480px]">
    <div class="px-4 sm:px-0">
      <h3 class="text-base font-semibold leading-7 text-gray-900">{{ $t('form.title') }}</h3>
    </div>

    <div class="mt-6 border-t border-gray-100 ">
      <dl class="divide-y divide-gray-100">
        <div class="bg-gray-50 px-3 py-3 grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-3 sm:px-3">
          <dt class="text-sm font-medium leading-6 col-span-3 sm:col-span-3 text-gray-900">{{ $t("form.fullNameLabel") }}:</dt>
          <p class="mt-1 text-sm leading-6 text-gray-700 col-span-4 sm:col-span-2 sm:mt-0 listedInfo">{{ inData.firstName }} {{ inData.lastName }}</p>
        </div>

        <div class="bg-white px-3 py-3 grid grid-cols-1 items-center sm:grid-cols-1 gap-1.5 sm:gap-3 sm:px-3">
          <dt class="text-sm font-medium leading-6 col-span-3 sm:col-span-3 text-gray-900">{{ $t("form.addressLabel") }}:</dt>
          <p class="mt-1 text-sm leading-6 text-gray-700 col-span-4 sm:mt-0 listedInfo">{{ inData.adress }}</p>
          <p class="text-sm leading-6 text-gray-700 col-span-4 sm:mt-0 listedInfo">{{ inData.postalCode }} {{ inData.city }}</p>
          <p class="text-sm leading-6 text-gray-700 col-span-4 sm:mt-0 listedInfo">{{ fullCountry }}</p>
        </div>

        <div class="bg-gray-50 px-3 py-3 grid sm:grid grid-cols-1 sm:grid-cols-1 gap-1.5 sm:gap-3 sm:px-3">
          <dt class="text-sm font-medium leading-6 sm:col-span-3 col-span-1 text-gray-900">{{ $t("form.contactInfo") }}:</dt>
          <p class="ml-5 block flex-col mt-1 text-sm leading-6 text-gray-700 col-span-4 sm:mt-0 listedInfo">{{ inData.eMail }}</p>
          <p class="text-sm leading-6 text-gray-700 col-span-4 sm:mt-0 listedInfo">{{ inData.phoneNumber }}</p>
        </div>

        <input v-if="getLoginMethod !== 'form'" type="checkbox" v-model="inData.tos" id="checkBoxTos" class="mt-4">
        <label v-if="getLoginMethod !== 'form'" class="ml-2" id="checkBoxTos">
          <span>{{ $t('form.tos1Label') }}</span>
          <a :href="getTos" target="_blank">{{ $t('form.tos2Label') }}</a>
        </label>
      </dl>
    </div>


    <div id="buttons" class="flex flex-col">
      <button type="button" @click="formConfirmed" :disabled="!inData.tos"
        :class="{ 'cursor-not-allowed': !inData.tos, 'bg-slate-300': !inData.tos, 'hover:bg-indigo-500': inData.tos }"
        class=" rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm border-0 sm:border-2 border-black border-solid">
        {{ $t('form.continueButton') }}
      </button>
      <button type="button" @click="redoForm"
        class="mt-2 rounded-md bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm border-0 sm:border-2 border-black border-solid hover:bg-gray-50">
        {{ $t('form.editButton') }}
      </button>
    </div>
  </div>
</template>

<style scoped>

@media (max-width: 340px) {
  .listedInfo {
    margin-left: auto;
  }
}
@media (min-width: 340px) {
  .listedInfo {
    margin-left: 40px;
  }
}
@viewport {
    zoom: 1;
}
</style>