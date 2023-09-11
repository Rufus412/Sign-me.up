<script setup>
import { axiosService } from '../Services/AxiosService.js'
import { useStore } from '../stores/counter';
import Compressor from 'compressorjs';



</script>

<script>

export default {
    async mounted() {   
        const constraints = { video: true, audio: false };
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                this.canUseCamera = true
                this.reDraw()
                const mediaStream = stream
                const tracks = mediaStream.getTracks()
                tracks.forEach((track) => {
                    track.stop();
                });
            })
            .catch((error) => {
                this.canUseCamera = false
            });
    },
    data() {
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
            store: useStore(),
            isCaptureSupported: false,
            page: true

        }
    },
    methods: {
        async azurePush() {
            const store = useStore()
            if (this.imageInPayload) {
                try {
                    await axiosService.postImageToQueue(store.profilePicAsBase64, store.RowKey)
                    this.imagePushed = true
                }
                catch (error) {
                    console.log(`Failed to transfer image. Error: ${error}`)
                }
            }
            const xmlPayload = store.makeXML()
            try {
                await axiosService.postToQueue(xmlPayload)
                console.log("Success")
                this.$router.push({ name: 'registered' })
            }
            catch (error) {
                setTimeout(async () => {
                    try {
                        await axiosService.postToQueue(xmlPayload)
                        this.$router.push({ name: 'registered' })
                    }
                    catch (error) {
                        store.makeQR()
                        this.$router.push({ name: 'QR' })
                    }
                }, this.delayInMilliseconds);
            }
        },
        readFile() {
            var input = document.getElementById("profilePic").files[0]

            new Compressor(input, {
                quality: 0,
                success(compressedFile) {
                    const formData = new FormData();
                    const reader = new FileReader()
                    const store = useStore()
                    const data = reader.readAsDataURL(compressedFile);
                    reader.addEventListener('load', (e) => {
                        const data = e.target.result;
                        store.profilePicAsBase64 = data
                        document.getElementById("displayProfilePic").src = data
                    })
                },
                error(err) {
                    console.log(`Failed to compress. Error: ${err}`)
                    return
                },
            })

            this.continueButtonText = 'Continue'
            this.photoButtonText = 'New Photo'
            this.imageInPayload = true

        },
        IIP() {
            const store = useStore()
            if (this.imageInPayload === true || store.profilePicAsURL !== "") {
                return true
            }
            else return false
        },
        clearImage() {
            document.getElementById("displayProfilePic").src = null
            this.imageInPayload = false
        },
        async reDraw() {
            this.page = false
            setTimeout(() => {
                this.page = true
            }, 10)
        }
    }
}
</script>


<template>
    <div v-if="page" id="main" class="relative bg-white shadow-xl px-5 py-5 pb-10 rounded-xl h-fit w-full sm:w-full sm:max-w-[480px]"
        :class="{ 'mt-0': IIP(), 'mt-40': !IIP() }">
        <div class="text-center">
            <h2 v-if="!IIP()">{{ $t('selfie.header') }}</h2>
        </div>

        <div v-if="IIP()" class="absolute top-1 right-1 cursor-pointer">
            <img @click="clearImage" src="/images/deleteButton.svg" alt="" class="rot">
        </div>

        <div class="flex justify-center">
            <img v-if="IIP()" id="displayProfilePic" :src="store.profilePicAsURL" class="max-w-[300px] img">
        </div>

        <div id="buttons" class="flex flex-col mt-4">
            <input id="profilePic" type="file" @change="readFile" accept="image/*" capture="user" class="hidden">
            <div v-if="!IIP()" class="flex flex-col">
                <label :class="{ ' bg-red-500 pointer-events-none ': !canUseCamera, }" ref="capture" for="profilePic"
                    type="button"
                    class=" text-center mb-2 rounded-md px-3.5 py-2.5 text-sm text-white hover:bg-indigo-500 font-semibold shadow-sm bg-indigo-600 border-0 sm:border-2 border-black border-solid">
                    {{ $t('selfie.photoButton') }}
                </label>
                <p v-if="!canUseCamera" class="text-sm text-red-500 peer">
                    Please allow your web browser to access your camera to use this feature
                </p>
                <button type="button" @click="azurePush"
                    class="rounded-md  px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50 bg-gray-100 text-black border-0 sm:border-2 border-solid border-black">
                    {{ $t('selfie.skipButton') }}
                </button>
            </div>

            <div v-else class="flex flex-col mt-4">
                <button type="button" @click="azurePush"
                    class="mb-2 text-center rounded-md  px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-indigo-500 bg-indigo-600 text-white border-0 sm:border-2 border-solid border-black">
                    {{ $t('selfie.continueButton') }}
                </button>
                <label :class="{ ' bg-red-500 pointer-events-none ': !canUseCamera, }" ref="capture" for="profilePic"
                    type="button"
                    class=" text-center mb-2 rounded-md bg-gray-100 px-3.5 py-2.5 text-sm text-black hover:bg-gray-50 font-semibold shadow-sm border-0 sm:border-2 border-black border-solid">
                    {{ $t('selfie.newPhotoButton') }}
                </label>
                <p v-if="!canUseCamera" class="text-sm text-red-500 peer">
                    Please allow your web browser to access your camera to use this feature
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>

@media (max-width: 450px) {
    .img {
        max-width: 100%;
    }
}

.rot {
    transform: rotate(45deg);
    scale: 0.8;
}

</style>