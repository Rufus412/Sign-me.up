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
        <h1>Is this correct?</h1>
        <div id="check" v-for="(value, key ) in info" > {{ key }}: {{ value }}
        </div>
        <button class="button" id="submit" type="button" @click="formConfirmed"> Yes!</button>
        <button class="button" id="redo" type="button" @click="redoForm"> No!</button>
    </div>
</template>

<style scoped>
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
.button:hover {
    cursor: pointer;
}

</style>