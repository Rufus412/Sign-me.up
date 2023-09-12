<script setup>

import { googleTokenLogin } from "vue3-google-login"
import { useStore } from "../stores/counter";
import { axiosService } from "../Services/AxiosService"

</script>



<script>

export default {
    methods: {
        async login() {
            try {
                const response = await googleTokenLogin()
                if(response && response.access_token && response.expires_in > 0) {
                    try {
                        const userData = await axiosService.getGoogleProfileInfo(response.access_token)
                        const store = useStore()
                        store.modifyMember({
                            firstName: userData.data.given_name,
                            lastName: userData.data.family_name,
                            eMail: userData.data.email,
                        })
                        store.memberID = userData.data.id || ""
                        //store.profilePicAsURL = userData.data.picture || ""
                        store.logInMethod = "google"
                        this.$router.push({ name: "formCheck" })
                    }
                    catch(error) {
                        console.log(`Failed to login with google. Error: ${error}`)
                    }
                }
                else {
                    console.log("Failed to authenticate with google")
                }
            }
            catch(error) {
                console.log(`Failed to login with google. Error: ${error}`)
            }
        }
    }
}

</script>


<template>
    <GoogleLogin>
        <button @click="login"
            class="loginBtn loginBtn--google buttons flex border-0 bg-white w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-md hover:bg-gray-100 cursor-pointer ">
            <span class="spanInButton text-black">{{ $t('frontPage.googleButton') }}</span>
        </button>
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