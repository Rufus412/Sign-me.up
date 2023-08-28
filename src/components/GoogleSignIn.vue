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
            class="loginBtn loginBtn--google buttons flex border-0 bg-white w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 cursor-pointer "><span
                class="spanInButton text-black">{{ $t('frontPage.googleButton') }}</span></button>
    </GoogleLogin>
</template>




<style scoped>

@media (max-width: 310px) { 
    .spanInButton {
        margin-left: 25px;
        margin-right: 25px;
    }
}
</style>