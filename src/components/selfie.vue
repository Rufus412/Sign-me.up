<script setup>
import { axiosService } from '../Services/AxiosService.js'
import { useStore } from '../stores/counter';
import { ref, onMounted } from 'vue'
import Compressor from 'compressorjs';



</script>

<script>


export default {
    async mounted() {
        const constraints = { video: true, audio: false }; // Request video access only

        console.log("in setup")
        navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            this.canUseCamera = true
            console.log("allowed")
            const mediaStream = stream
            const tracks = mediaStream.getTracks()
            tracks.forEach((track) => {
                track.stop();
            });
        })
        .catch((error) => {
            this.canUseCamera = false
            console.error('Error accessing the camera:', error);
        });
    },
    data() {
        const store = useStore()
        return {
            delayInMilliseconds: 1000,
            error: false,
            pictureTaken: false,
            canUseCamera: false,
            imagePushed: false,
            memberPushed: false,
            imageInPayload: false,
            continueButtonText: 'Skip',
            photoButtonText: 'Take Photo',
            createError: false,

            //picture,
            
        }
    },
    methods: {
        
        async azurePush() {
            const store = useStore()
            store.createApiError = this.createError
            if (this.imageInPayload) {
                await axiosService.postImageToQueue(store.profilePicAsBase64, store.RowKey).then((response) => {
                    this.imagePushed = true
                    
                    console.log("imagePushed")
                    if ( this.memberPushed )  {
                        this.$router.push( {name: 'registered'} )
                    }
                })
                .catch(error => {
                    console.log("Failed to pass image to server error: " + error)
                })
            }


            let xmlPayload = store.makeXML()
            await axiosService.postToQueue(xmlPayload)
                .then((response) => {
                    
                    this.$router.push( {name: 'registered'} )
                    
            })
                .catch(error => {
                    console.log(error)  
                    setTimeout(() => {


                        axiosService.postToQueue(xmlPayload)
                            .then((response) => {
                                this.$router.push( {name: 'registered'} )
                            })
                            .catch(error => {
                                console.log("ERROORRRR")
                                store.makeQR()
                                this.$router.push( {name: 'QR'})
                            })


                    }, this.delayInMilliseconds);
            })
        },
        readFile() {
            var input = document.getElementById("profilePic").files[0]

            new Compressor(input, {
                quality: 0,

                // The compression process is asynchronous,
                // which means you have to access the `result` in the `success` hook function.
                success(compressedFile)  {
                    const formData = new FormData();

                // The third parameter is required for server


                const reader = new FileReader()
                const store = useStore()
                console.log("changed")
                const data = reader.readAsDataURL(compressedFile);
                reader.addEventListener('load', (e) => {
                    const data = e.target.result;
                    store.profilePicAsBase64 = data
                    //console.log(data)
                    document.getElementById("displayProfilePic").src = data
                })
                },
                error(err) {
                console.log(err.message);
                },
            })
            
            this.continueButtonText = 'Continue'
            this.photoButtonText = 'New Photo'
            this.imageInPayload = true
        }
    }
}

</script>


<template>

    <div>
        <div class="text-center">
            <p>Do you want to add a photo of your self?</p>
            <input type="checkbox" v-model="createError" id="checkBoxTos">
            <label class="ml-2" id="checkBoxTos">API error</label>
            
        </div>

        <div class="flex justify-center">
            <img id="displayProfilePic" src="" class="max-w-[300px]" >
        </div>

        <div id="buttons" class="flex flex-col mt-4 text-center">
            <input id="profilePic" type="file" @change="readFile" accept="image/*" capture="user" class="hidden" :class="{ disabled : !canUseCamera, 'peer': !canUseCamera}" />
            <div v-if="!imageInPayload" class="flex flex-col">
                <label :class="{ ' bg-red-500 pointer-events-none ': !canUseCamera,}" ref="capture" for="profilePic" type="button" class=" text-center mb-2 rounded-md px-3.5 py-2.5 text-sm text-white hover:bg-indigo-500 font-semibold shadow-sm bg-indigo-600 border-0 sm:border-2 border-black border-solid">{{ photoButtonText }}</label>
                <p v-if="!canUseCamera" class="text-sm text-red-500 peer">Please allow your web browser to access your camera to use this feature</p>
                <button type="button" @click="azurePush" class="rounded-md  px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50 bg-gray-100 text-black border-0 sm:border-2 border-solid border-black" >{{ continueButtonText }}</button>
            </div>

            <div v-else class="flex flex-col mt-4 text-center"> 
                <button type="button" @click="azurePush" class="mb-2 rounded-md  px-3.5 py-2.5 text-sm font-semibold text shadow-sm hover:bg-indigo-500 bg-indigo-600 text-white border-0 sm:border-2 border-solid border-black" >{{ continueButtonText }}</button>
                <label :class="{ ' bg-red-500 pointer-events-none ': !canUseCamera,}" ref="capture" for="profilePic" type="button" class=" text-center mb-2 rounded-md bg-gray-100 px-3.5 py-2.5 text-sm text-black hover:bg-gray-50 font-semibold shadow-sm border-0 sm:border-2 border-black border-solid">{{ photoButtonText }}</label>
                <p v-if="!canUseCamera" class="text-sm text-red-500 peer">Please allow your web browser to access your camera to use this feature</p>
            </div>


        </div>
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
</style>