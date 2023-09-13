<script setup>
import { axiosService } from '../Services/AxiosService';
import { useStore } from '../stores/counter';
</script>


<script>

export default {
    methods: {
        async appleSignIn() {
            try {
                const appleResponse = await AppleID.auth.signIn();
                const JWT = appleResponse.authorization.id_token
                const token = this.parseJwt(JWT)
                const store = useStore()
                //console.log(appleResponse + "   " + appleResponse.user + "    " + token)
                if (appleResponse && appleResponse.user && token.iss === "https://appleid.apple.com" ) {
                    const userData = appleResponse.user;
                    store.modifyMember({
                        eMail: userData.email,
                        firstName: userData.name.firstName,
                        lastName: userData.name.lastName,
                    })
                    
                    store.logInMethod = 'apple'
                    store.memberID = token.sub
                    
                    this.$router.push({ name: 'formCheck' });
                } else if (appleResponse && JWT) {
                    store.modifyMember({
                        eMail: token.email
                    })
                    store.logInMethod = 'apple'
                    store.memberID = token.sub
                    this.$router.push({ name: 'formView'})
                }
                else {
                    console.log("User closed window")
                }
            } catch (error) {
                console.error('Apple Sign-In error:', error);
            }
        },
        parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        }
    }
}

</script>



<template>
    <button @click="appleSignIn"
        class="loginBtn loginBtn--apple buttons flex border-0 bg-black w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-md hover:bg-gray-800 cursor-pointer ">
        <span class="spanInButton text-white">{{ $t('frontPage.appleButton') }}</span>
    </button>
</template>



<style scoped>
@media (max-width: 305px) {
    .spanInButton {
        margin-left: 25px;
        margin-right: 25px;
    }
}
</style>