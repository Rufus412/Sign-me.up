<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Form from './components/Form.vue'
const Show = false
</script>

<template>
  <div>
    <header>
      <img id="logo" src="./assets/Logo.png" alt="">
    </header>
  </div>
  <div class>
    <RouterView class="h-full" />
  </div>
</template>

<style scoped>
#logo {
  margin-left: 50%;
  margin-top: 10px;
  transform: translate(-29%);
  scale: 1.5;

}
</style>
