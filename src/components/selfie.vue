<script setup>
import { axiosService } from '../Services/AxiosService.js'
import { useStore } from '../stores/counter';
import { ref, onMounted } from 'vue'



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

            //picture,
            
        }
    },
    methods: {
        
        async azurePush() {
            const store = useStore()

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
                    if ( this.imagePushed ) {
                        this.$router.push( {name: 'registered'} )
                    }
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
            var input = document.getElementById("profilePic")
            const reader = new FileReader()
            const store = useStore()
            console.log("changed")
            const data = reader.readAsDataURL(input.files[0]);
            if (input.files[0].size > 1000) {
                this.imageInPayload = true
            }
            reader.addEventListener('load', (e) => {
                const data = e.target.result;
                store.profilePicAsBase64 = data
                //console.log(data)
                document.getElementById("displayProfilePic").src = data
            })
            
            this.continueButtonText = 'Continue'
            this.photoButtonText = 'New Photo'
        }
    }
}

</script>


<template>

    <div>
        <div class="text-center">
            <p>Do you want to add a photo of your self?</p>
            
        </div>

        <div class="flex justify-center">
            <img id="displayProfilePic" src="" class="max-w-[300px]" >
        </div>

        <div id="buttons" class="flex flex-col mt-4 text-center">
            <input id="profilePic" type="file" @change="readFile" accept="image/*" capture="user" class="hidden" :class="{ disabled : !canUseCamera, 'peer': !canUseCamera}" />
            <label :class="{ ' bg-red-500 pointer-events-none ': !canUseCamera, }" ref="capture" for="profilePic" type="button" class="input-label  text-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-2 border-black border-solid">{{ photoButtonText }}</label>
            <p v-if="!canUseCamera" class="text-sm text-red-500 peer">Please allow your web browser to access your camera to use this feature</p>
            <button type="button" @click="azurePush" class="mb-4 mt-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">{{ continueButtonText }}</button>
            
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