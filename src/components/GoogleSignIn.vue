<script setup>

import { googleTokenLogin } from "vue3-google-login"
import { decodeCredential } from 'vue3-google-login'
import { useStore } from "../stores/counter";
import { axiosService } from "../Services/AxiosService"

</script>



<script>

export default {
    methods: {
        login() {
            googleTokenLogin().then(async (response) => {
                console.log("Handle the response", response)
                const userData = await axiosService.getGoogleProfileInfo(response.access_token)
                console.log("Api response " + userData.data.given_name)

                const store = useStore()
                store.Member.createMembership.members[0].firstName = userData.data.given_name
                store.Member.createMembership.members[0].lastName = userData.data.family_name
                store.Member.createMembership.members[0].eMail = userData.data.email
                this.$router.push( {name: "formCheck"})
            })
        }   
    }
}

</script>


<template>

    <GoogleLogin :callback="callback">
        <button @click="login" class="loginBtn loginBtn--google flex border-0 bg-white w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm "><span class="text-black" >Complete with Google</span></button>
    </GoogleLogin>
    
</template>




<style scoped>


#navButton {
    position: absolute;
    top: 20%;
    right: 50%;
    transform: translate(50%);
}


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
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}


/* Facebook */
.loginBtn--facebook {
  background-color: #1877F2;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
}
.loginBtn--facebook:before {
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}
#fbText {
  transform: translate(-10%);
}


.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
}
.loginBtn--google:before {
  border-right: #D3D3D3 1px solid;
  background: url('../assets/Google_G.png') 6px 6px no-repeat;
}

</style>