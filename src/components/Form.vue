<script setup>
import { useStore } from '../stores/counter';


</script>


<script>


export default {
  data() {
    const store = useStore()
    return {
      tosLink: '',
      failedSubmit: false,
      fullCountry: '',
      phoneFromQuery: false,
      store: store,
      info: store.Member.createMembership.members[0]

    }
  },
  methods: {
      onSubmit() {   
        if (Object.values(this.info).some(x => x === null || x === '')) {
          this.failedSubmit = true
        }
      
        const store = useStore()
        const Membership = this.info
        store.modifyMember(Membership)  
        store.logInMethod = store.logInMethod || 'form'
        console.log(store.logInMethod)
        this.$router.push( {name: 'formCheck' })
        
      }
    },
    mounted() {
      const store = useStore()
      if (this.$route.query.dev) {
        store.modifyMember({
          firstName: 'John',
          lastName:'Smith',
          eMail: 'John.Smith@gmail.com  ',
          countryCode: 'US',
          city: 'New York',
          adress: '1 Fifth Avenue',
          postalCode: '10003',
          phoneNumber: '+46734321852',
          newsLetter: true,
          tos: true
        })
        store.devMode = true
      } 
      this.fullCountry = store.fullCountryName
      this.tosLink = store.tosLink
      this.phoneFromQuery = store.phoneInQuery
    
  },
  computed: {
    fullCountrName() {
      const store = useStore()
      let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
      this.fullCountry = regionNames.of(store.Member.createMembership.members[0].countryCode)
      return regionNames.of(store.Member.createMembership.members[0].countryCode)
    }
  }
  
  
}   
</script>

<template>
  <div class="h-fit rounded-xl bg-white shadow-xl px-4">
    <form @submit.prevent="onSubmit" > 
      <div class="space-y-12">

        <div class="border-b border-gray-900/10 pb-8 pt-3 ">
          <h2 class="text-base font-semibold leading-7 text-gray-900"> {{ $t("form.title") }}</h2>

          <div class="mt-5 grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">{{ $t("form.firstNameLabel")}}</label>
              <div class="mt-0">
                <input required pattern="\S+.*" type="text" name="first-name" id="first-name" :placeholder="$t('form.firstNameLabel')" v-model="info.firstName" autocomplete="given-name" class="block w-[99%] rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" :class="{ 'invalid:[&:not(:focus):invalid]:border-red-500': failedSubmit }"  />
                <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block" :class="{ 'peer-[&:not(:focus):invalid]:block': failedSubmit }"  >
                  Enter a valid value!
              </span>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">{{ $t("form.lastNameLabel")}}</label>
              <div class="mt-0">
                <input required pattern="\S+.*" type="text" name="last-name" v-model="info.lastName" id="last-name" :placeholder="$t('form.lastNameLabel')" autocomplete="family-name" class="block w-[99%] rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" :class="{ 'invalid:[&:not(:focus):invalid]:border-red-500': failedSubmit }" />
                <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block" :class="{ 'peer-[&:not(:focus):invalid]:block': failedSubmit }"  >
                  Enter a valid value!
              </span>
              </div>
            </div>

            <div class="sm:col-span-4">
              <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">{{ $t("form.addressLabel")}}</label>
              <div class="mt-0">
                <input required pattern="\S+.*" type="text" name="street-address" v-model="info.adress" id="street-address" :placeholder="$t('form.addressLabel')" autocomplete="street-address" class="block w-[99%] rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" :class="{ 'invalid:[&:not(:focus):invalid]:border-red-500': failedSubmit }"/>
                <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block" :class="{ 'peer-[&:not(:focus):invalid]:block': failedSubmit }"  >
                  Enter a valid value!
              </span>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">{{ $t("form.postalCodeLabel")}}</label>
              <div class="mt-0">
                <input required pattern="\S+.*" type="text" name="postal-code" id="postal-code" v-model="info.postalCode" :placeholder="$t('form.postalCodeLabel')" autocomplete="postal-code" class="block w-[99%] rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" :class="{ 'invalid:[&:not(:focus):invalid]:border-red-500': failedSubmit }"/> 
                <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block" :class="{ 'peer-[&:not(:focus):invalid]:block': failedSubmit }"  >
                  Enter a valid value!
              </span>
              </div>
            </div>

            <div class="sm:col-span-3 sm:col-start-4">
              <label for="city" class="block text-sm font-medium leading-6 text-gray-900">{{ $t("form.cityLabel")}}</label>
              <div class="mt-0">
                <input required pattern="\S+.*" type="text" name="city" id="city" v-model="info.city" :placeholder="$t('form.cityLabel')" autocomplete="address-level2" class="block w-[99%] rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer " :class="{ 'invalid:[&:not(:focus):invalid]:border-red-500': failedSubmit }"/>
                <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block" :class="{ 'peer-[&:not(:focus):invalid]:block': failedSubmit }"  >
                  Enter a valid value!
              </span>
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">{{ $t("form.countryLabel")}}</label>
              <div class="mt-0">
                <country-select pattern="\S+.*" :autocomplete="true" :country="info.country" id="country" name="country" :placeholder="(fullCountry || $t('form.selectCountryLabel'))" v-model="info.countryCode" class="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :class="{ 'invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer': failedSubmit }"/>
                <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block" :class="{ 'peer-[&:not(:focus):invalid]:block': failedSubmit }"  >
                Enter a valid value!
              </span>
              </div>
            </div>

            <div class="sm:col-span-5">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">{{ $t("form.emailLabel")}}</label>
              <div class="mt-0">
                <input id="email" required name="email" type="email" v-model="info.eMail" :placeholder="$t('form.emailLabel')" autocomplete="email" class="block w-[99%] rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" :class="{ 'invalid:[&:not(:focus):invalid]:border-red-500': failedSubmit }"/>
                <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block" :class="{ 'peer-[&:not(:focus):invalid]:block': failedSubmit }"  >
                  Enter a valid Email!
              </span>
              </div>
            </div>

            <div class="sm:col-span-full">
              <label for="country" class="block text-sm font-medium leading-6 text-gray-900">{{ $t("form.phoneNumberLabel")}}</label>
              <div class="mt-0">
                <input  id="country" pattern="\+[0-9 ]{5,}$" required name="country" v-model="info.phoneNumber" :disabled="phoneFromQuery" autocomplete="tel" placeholder="+1 (555) 987-6543" class="block w-[99%] rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" :class="{ 'invalid:[&:not(:focus):invalid]:border-red-500': failedSubmit }"/>
                <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block" :class="{ 'peer-[&:not(:focus):invalid]:block': failedSubmit }"  >
                Enter a valid internationall phone number (starting with +)
              </span>
                
              </div>
            </div>


            <div class="sm:col-span-3 mt-0">
              <input type="checkbox" v-model="info.newsLetter" id="checkBoxNews">
              <label class="ml-2">{{ $t("form.newslettersLabel")}}</label><br>
              <input type="checkbox" v-model="info.tos" id="checkBoxTos">
              <label v-if="store.logInMethod !== 'form'" class="ml-2" id="checkBoxTos"><span>{{  $t('form.tos1Label') }}</span><a :href="tosLink" target="_blank" >{{  $t('form.tos2Label') }}</a></label>
            </div> 
            <div class="flex flex-col sm:col-span-full">
              
              <button type="submit" :disabled="!info.tos"  :class="{ 'cursor-not-allowed': !info.tos, 'bg-slate-300':!info.tos, 'hover:bg-indigo-500': info.tos }" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  border-0 sm:border-2 border-black border-solid">{{ $t('form.continueButton') }}</button>
            </div>
          </div>
          
        </div>

        
      </div>

    </form>
  </div>
</template>


<style scoped>
#checkBoxNews {
  transform: scale(1.25);
  margin-top: 10px;
}
#checkBoxTos {
  transform: scale(1.25);
  margin-top: 10px
}
</style>
