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
                console.log("Api response " + userData.data.id)

                const store = useStore()
                store.Member.createMembership.members[0].firstName = userData.data.given_name || ""
                store.Member.createMembership.members[0].lastName = userData.data.family_name || ""
                store.Member.createMembership.members[0].eMail = userData.data.email || ""
                store.memberID = userData.data.id || ""
                store.profilePicAsURL = userData.data.picture || ""
                store.logInMethod = "google"
                this.$router.push({ name: "formCheck" })
            })
        }
    }
}

</script>


<template>
    <GoogleLogin :callback="callback">
        <button @click="login"
            class="loginBtn loginBtn--google flex border-0 bg-white w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 cursor-pointer "><span
                class="text-black">{{ $t('frontPage.googleButton') }}</span></button>
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

.loginBtn--google:before {
    border-right: #D3D3D3 1px solid;
    background: url('../assets/Google_G.png') 6px 6px no-repeat;
}
</style>