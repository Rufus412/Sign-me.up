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
        name: '',
        email: '',
        gender: '',
        phonenumber: ''
      },
      formSubmitted: false
    }
  },
  methods: {
    doSMTH(form) {
      console.log(form)
      this.formSubmitted = true
      this.info.name = form.name
      this.info.email = form.email
      this.info.gender = form.gender
      this.info.phonenumber = form.phonenumber
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