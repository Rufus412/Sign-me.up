<script setup>
import { apiService } from '../Services/APIService';
import { useStore } from '../stores/counter';

</script>



<script>

export default {
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
          this.$router.push({ name: 'formCheck' })
        } else {
          //user hit cancel button
          console.log('User cancelled login or dd not fully authorize.');

        }
      }, { scope: 'public_profile,email' });
    },
  }
}
</script>





<template>
  <button type="button" @click="checkLoginState"
    class="loginBtn loginBtn--facebook flex border-0 w-full justify-center cursor-pointer rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-[#458FEF] ">
    <span class="spanInButton text-white" id="fbText">{{ $t('frontPage.facebookButton') }}</span>
  </button>
</template>




<style scoped>

@media (max-width: 340px) { 
    .spanInButton {
        margin-left: 25px;
        margin-right: 25px;
    }
}
</style>