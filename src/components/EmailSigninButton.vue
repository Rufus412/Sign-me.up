<script setup>

</script>


<template>
    <router-link to="/form" custom v-slot="{ navigate }">
        <button id="emailSignin" type="submit" @click="navigate"
            class="loginBtn loginBtn--email flex border-0 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-md hover:bg-indigo-500 ">
            <span class="spanInButton">{{ $t('frontPage.emailButton') }}</span>
        </button>
    </router-link>
</template>

<style scoped>

@media (max-width: 310px) { 
    .spanInButton {
        margin-left: 25px;
        margin-right: 25px;
    }
}

</style>