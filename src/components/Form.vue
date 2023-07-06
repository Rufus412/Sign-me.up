<script setup>
/*
defineProps({
  info: {
    type: Object,
    reqired: true,
    default: {
      name: '',
      email: '',
      gender: ''
      phonenumber: ''
    }
  }
})*/


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
          const Membership = {
              name: this.info.name,
              email: this.info.email,
              gender: this.info.gender,
              phonenumber: this.info.phonenumber
          }
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
    <label for="name">Name:</label>
    <input id="name" v-model="info.name" >

    <label for="email">Email:</label>      
    <input id="email" v-model="info.email">
  
    <label for="gender">Gender:</label>
    <select id="gender" v-model="info.gender">
      <option>Male</option>
      <option>Female</option>
      <option>Neither</option>
    </select>
  
    <label for="phonenumber">PhoneNumber:</label>
    <input id="phonenumber" v-model="info.phonenumber">

    

    
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
