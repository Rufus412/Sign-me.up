<script setup>
import { toValue } from 'vue';
import  Form  from '../components/Form.vue'
import FormCheck from '../components/FormCheck.vue'

</script>


<script>

export default {
  data() {
    return {
      info: {
        firstName: '1',
        lastName:'2',
        email: '3',
        country: '4',
        city: '5',
        adress: '6',
        zip: '7',
        phoneNumber: 0,
        gender: 'Male'
      },
      formSubmitted: false
    }
  },
  methods: {
    doSMTH(form) {
      console.log(form)
      this.formSubmitted = true
      this.info = form
      console.log("-->" + ' ' + this.info.name)
    },
    redoForm() {
      this.formSubmitted = false
    }
  }
}

</script>

<template>
  <div class="Form">
    <Form v-if="!formSubmitted" @review-submitted="doSMTH" :info="info" ></Form>
    <FormCheck v-else :info="info" @form-denied="redoForm" ></FormCheck>
  </div>
</template>

<style scoped>

</style>