<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Form from './components/Form.vue'
const Show = false
</script>

<template>
  <div class="h-full flex flex-col box bg-slate-300">
      <header class="row header bg-slate-300 round min-h-fit" >
        <img id="logo" src="./assets/Logo.png" alt="">
      </header>
  
    <div id="head" class="row content rounded-t-3xl bg-gray-200" >
      <RouterView class=""/>

    </div>
  </div>
</template>

<style scoped>
#logo {
  margin-left: 50%;
  margin-top: 40px;
  scale: 1.5;
  transform: translate(-33.3333333333333%, -50%);
  

}

.box .row.header {
  flex: 0 1 auto;
  /* The above is shorthand for:
  flex-grow: 0,
  flex-shrink: 1,
  flex-basis: auto
  */
}

.box .row.content {
  flex: 1 1 auto;
}

.box .row.footer {
  flex: 0 1 40px;
}

</style>
