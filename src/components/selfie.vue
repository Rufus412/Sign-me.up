<script setup>
import { axiosService } from '../Services/AxiosService.js'
import { useStore } from '../stores/counter';
import { ref } from 'vue'

const player = ref(null)
const canvas = ref(null)
const capture = ref(null)

</script>

<script>


export default {
    data() {
        const store = useStore()
        return {
            delayInMilliseconds: 1000,
            error: false,
            pictureTaken: false,
            
        }
    },
    methods: {
        azurePush() {
            const store = useStore()
            console.log(store.xml)
            let xmlPayload = store.makeXML()
            axiosService.postToQueue(xmlPayload)
                .then((response) => {
                    this.$router.push( {name: 'registered'} )
            })
                .catch(error => {
                    console.log(error)  
                    setTimeout(function() {


                        axiosService.postToQueue(xmlPayload)
                            .then((response) => {
                                this.$router.push( {name: 'registered'} )
                            })
                            .catch(error => {
                                console.log("ERROORRRR")
                                store.makeQR()
                            })


                    }, this.delayInMilliseconds);
                
            })
            this.swapView()
        },
        swapView() {
            this.$router.push( {name: 'QR' })
        },
    },
    mounted() {
    }
}

</script>


<template>

    <div v-if="!error">
        <div class="text-center">
            <p>Do you want to add a picture of your self?</p>
            <input id="profilePic" type="file" accept="image/*" capture="user" class="hidden" />
        </div>

        <div>

           

        </div>

        <div id="buttons" class="flex flex-col mt-4">
            <label ref="capture" for="profilePic" @click="draw" type="button" class="input-label text-center border-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Picture</label>
            <button type="button" @click="azurePush" class="mb-4 mt-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Skip</button>
            
        </div>
    </div>
    <div v-else>

    </div>


   
</template>

<style scoped>

#player {
    margin-left: 50%;
    transform: translate(-50%);
}
#canvas {
    margin-left: 50%;
    transform: translate(-50%);
}

.input-label {
    border: 2px solid black;
}

.modal-label{
    display: inline-block;
    line-height: 2.2em;
    padding: 0 0.62em;
    border: 1px solid #666;
    border-radius: 0.25em;
    background-image: linear-gradient( to bottom, #fff, #ccc );
    box-shadow: inset 0 0 0.1em #fff, 0.2em 0.2em 0.2em rgba( 0, 0, 0, 0.3 );
    font-family: arial, sans-serif;
    font-size: 0.8em;
 }

.modal-label:hover {
    border-color: #3c7fb1;
    background-image: linear-gradient( to bottom, #fff, #a9dbf6 );
 }

.modal-label:focus {
    padding: 0  0.56em 0 0.68em;
 }

</style>