<script setup>

</script>

<script>

export default {
    methods: {
        nextScreen() {
            this.$router.push( {name: submissionConfiramtion} )
        }
    }
}

</script>


<template>

    <div class="text-center">
        <p>Do you want to add a picture of your self?</p>
    </div>

    <div id="buttons" class="mt-12 flex flex-col">
        <button type="button" @click="formConfirmed" class=" rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Picture</button>
        <button type="button" @click="nextScreen" class="mt-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Skip</button>
    </div>


   
</template>