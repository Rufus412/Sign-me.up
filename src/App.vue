<script setup>
import { RouterView } from 'vue-router'
import { useStore } from './stores/counter';
const Show = false
</script>

<script>

export default {
  data() {
    const store = useStore
    return {
      store: store
    }
  },
  mounted() {
    const store = useStore()
    document.getElementById("logo").src = store.logoID
  },
  methods: {
    homePage() {
      this.$router.push({ name: 'home' })
    }
  }
}

</script>

<template>
  <div class="h-full flex flex-col box bg-slate-300">
    <header class="row header bg-slate-300 round min-h-fit" >
      <img id="logo" src="" alt="" class="flex max-w-[90%]" @click="homePage">
    </header>
  
    <div id="head" class="row content rounded-t-3xl bg-gray-200" >
      <RouterView class=""/>
    </div>
  </div>
</template>

<style scoped>
#logo {
  margin-left: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
  transform: translate(-50%, 0);
  

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
