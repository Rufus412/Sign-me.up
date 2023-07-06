<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Form from './components/Form.vue'
const Show = false
</script>

<template>
  <header>
    

    <div class="wrapper">

      <nav>
        <RouterLink to="/" v-if="Show">Home</RouterLink> 
        <RouterLink to="/about" v-if="Show">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
