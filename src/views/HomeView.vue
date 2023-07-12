<script setup>
import { toValue } from 'vue';
import  Form  from '../components/Form.vue'
import FormCheck from '../components/FormCheck.vue'

</script>


<script>

export default {
  data() {
    return {
      formSubmitted: false
    }
  },

  methods: {
    doSMTH(form) {
      console.log(form)
      console.log("-->")
    },
  }
}

</script>

<template>
  <div class="Form">
    <Form v-if="!formSubmitted" @review-submitted="doSMTH"></Form>
    <FormCheck v-else  ></FormCheck>
  </div>
</template>

<style scoped>

</style>