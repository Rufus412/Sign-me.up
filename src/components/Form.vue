<script setup>
import { useStore } from '../stores/counter';


</script>


<script>


export default {
  data() {
    return {
      info: {
          firstName: '',
          lastName:'',
          eMail: '',
          country: '',
          city: '',
          adress: '',
          postalCode: '',
          phoneNumber: '',
          newsLetter: true,
          tos: false
      },
      tosLink: ''


    }
  },
  methods: {
      onSubmit() {  
        if (Object.values(this.info).some(x => x === null || x === '')) {
          alert("Not every field has been filed in!")
          return
        }
        else if (this.info.phoneNumber.charAt(0) !== '+') {
          alert("Make sure to have a + infront of your phone number")
          return
        }
        else if( this.info.eMail.replace('@', '').length + 1 !== this.info.eMail.length) {
          return
        }
        else if ( this.info.eMail.indexOf('.', this.info.eMail.indexOf('@')) === -1) {
          alert("Invalid E-Mail adress")
          return
        }

        const store = useStore()
        const Membership = this.info
        store.addMember(Membership)  
        console.log("emitted")
        store.Member.createMembership.itemNumber = (this.$route.query.itemNumber)
        this.$router.push( {name: 'formCheck' })
        
        
      }
    },
    mounted() {
      const store = useStore()
      if (this.$route.query.dev) {
        store.addMember({
          firstName: 'John',
          lastName:'Smith',
          eMail: 'John.Smith@gmail.com  ',
          country: 'United States',
          city: 'New York',
          adress: '1 Fifth Avenue',
          postalCode: '10003',
          phoneNumber: '+46734321852',
          newsLetter: true,
          tos: true
        })
        store.devMode = true
      } 
      this.info = store.Member.createMembership.members[0]
      this.tosLink = this.$route.query.tos

    }
  }
  
    
</script>

<template>
  <div class="">
    <form @submit.prevent="onSubmit">
      <div class="space-y-12">

        <div class="border-b border-gray-900/10 pb-12 ">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

          <div class="mt-5 grid grid-cols-1 gap-x-5 gap-y-[3%] sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name:</label>
              <div class="mt-0">
                <input type="text" name="first-name" id="first-name" v-model="info.firstName" autocomplete="given-name" class="block w-[99%] rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
              <div class="mt-0">
                <input type="text" name="last-name" v-model="info.lastName" id="last-name" autocomplete="family-name" class="block w-[99%] rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " />
              </div>
            </div>

            
            <div class="sm:col-span-4">
              <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Street address</label>
              <div class="mt-0">
                <input type="text" name="street-address" v-model="info.adress" id="street-address" autocomplete="street-address" class="block w-[99%] rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">Postal code</label>
              <div class="mt-0">
                <input type="text" name="postal-code" id="postal-code" v-model="info.postalCode" autocomplete="postal-code" class="block w-[99%] rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-3 sm:col-start-4">
              <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
              <div class="mt-0">
                <input type="text" name="city" id="city" v-model="info.city" autocomplete="address-level2" class="block w-[99%] rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Country</label>
              <div class="mt-0">
                <country-select :country="info.country" :countryName="true" id="country" name="country" type="country" v-model="info.country" class="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-5">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div class="mt-0">
                <input id="email" name="email" type="email" v-model="info.eMail" autocomplete="email" class="block w-[99%] rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-full">
              <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
              <div class="mt-0">
                <input  id="country" name="country" v-model="info.phoneNumber" placeholder="+1 (555) 987-6543" class="block w-[99%] rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"/>
              </div>
            </div>


            <div class="sm:col-span-3 mt-0">
              <input type="checkbox" v-model="info.newsLetter" id="checkBoxNews">
              <label class="ml-2">I want to receive newsletters</label><br>
              <input type="checkbox" v-model="info.tos" id="checkBoxTos">
              <a class="ml-2" id="checkBoxTos" :href="tosLink" >I agree to the terms of service</a><br>
            </div> 
            <div class="flex flex-col sm:col-span-full">
              
              <button type="submit" :disabled="!info.tos"  :class="{ 'cursor-not-allowed': !info.tos, 'bg-slate-300':!info.tos, 'hover:bg-indigo-500': info.tos }" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">Continue</button>
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
  margin-top: 10px;
}
</style>
