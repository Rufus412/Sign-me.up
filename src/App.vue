<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Form from './components/Form.vue'
const Show = false
</script>

<template>
  <header class="">
      <img id="logo" src="./assets/Logo.png" class="ml-[50%] mt-2" >
  </header>

  <RouterView />
</template>

<style scoped>
#logo {
  transform: translate(-50%);
}
</style>
