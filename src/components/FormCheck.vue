<script setup>
import { useStore } from '../stores/counter.js';
</script>

<script>

export default {

    props: {
        info: {
            required: false
        }
    },
      data() {
        return {
        }
    },
    methods: {
        formConfirmed() {         
            const store = useStore()
            console.log(this.info + ' <------')
            store.addMember(this.info)
            this.$router.push( {name: 'QR' })
        },
        redoForm() {
            this.$emit('form-denied')
        }
    }
}
</script>

<template>
    <div>
        <body class="bg-white text-center mx-44">
            <h1 class="mt-10 p-10">Is this correct?</h1>
            <div class="">
                <div id="check" v-for="(value, key ) in info" class="text-lg grid gap-1 grid-cols-3 grid-rows-2"> {{ key }}: {{ value }}
                </div>
            </div>
            <button class="button cursor-pointer p-3 mb-10 bg-green-500 border-none" id="submit" type="button" @click="formConfirmed"> Yes!</button>
            <button class="button cursor-pointer ml-4 p-3 bg-red-500 border-none" id="redo" type="button" @click="redoForm"> No!</button>
        </body>
    </div>
</template>

<style scoped>/*
#submit {
    background-color: greenyellow;
    scale: 150%;
    margin-top: 10%;
}
#redo {
    background-color: red;
    margin-left: 20px;
    scale: 150%;
}
.button:hover 
    cursor: pointer;
}
*/
#div {
  width: 300px;
  border: 15px solid green;
  padding: 50px;
  margin: 20px;
}
</style>