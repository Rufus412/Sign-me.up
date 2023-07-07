<script setup>

import BaseInut from './BaseInput.vue';



</script>


<script>




export default {
  props: {
    info: {
      type: Object
    }
  },
  methods: {
      onSubmit() {
          
          if (this.info.name === '' || this.info.email === ''|| this.info.gender === '' || this.info.phonenumber === '') {
              alert("Not everyy field has been filed in!")
              return
          }
          const Membership = this.info
          this.$emit('review-submitted', Membership)
          console.log("emitted")
          //this.name = ''
          //this.email = ''
          //this.gender = ''
          //this.phonenumber = ''
      }
    }
  };
  
    
</script>

<template>
  <div id="form">
    <form class="membership-form" @submit.prevent="onSubmit ">
    <h3>SignUp</h3>
    
    <BaseInut v-model="info.firstName"
    label="First name"
    type="text"
    />
    <BaseInut v-model="info.lastName"
    label="Last name"
    type="text"
    />
    <BaseInut v-model="info.email"
    label="Email"
    type="text"
    />
    <BaseInut v-model="info.country"
    label="Country"
    type="text"
    />
    <BaseInut v-model="info.city"
    label="City"
    type="text"
    />
    <BaseInut v-model="info.adress"
    label="Adress"
    type="text"
    />
    <BaseInut v-model="info.zip"
    label="Zip"
    type="text"
    />
    <BaseInut v-model="info.phoneNumber"
    label="PhoneNumber"
    type="number"
    />
  
    <label for="gender">Gender:</label>
    <select id="gender" v-model="info.gender">
      <option>Male</option>
      <option>Female</option>
      <option>Neither</option>
    </select>

    

    
    <input id="submit" class="button" type="submit" value="Submit">
  </form>
  </div>
</template>

<style scoped>
.membership-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#submit {
  margin-top: 10px;
}
#form {
  width: 300px;
  height: 110%;
  border: solid black 3px;
  background-color: wheat;
}

</style>
