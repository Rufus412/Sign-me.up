<script setup>
import {useStore} from "../stores/counter.js"

</script>


<script>
export default {
    data() {
        const store = useStore()
        return {
            qrSVG: store.SvgTag,
            Description: store.couponDescription
        }
    },
    computed: {
        makeIMG() {
            let svg = this.qrSVG
            let blob = new Blob([svg], {type: 'image/svg+xml'})
            let url = URL.createObjectURL(blob);
            let img = document.getElementById('qrCode')
            
            setTimeout(() => {
                URL.revokeObjectURL(url)
            }, 100)
            return url
        }
    }
}

</script>

<template>

<div class="flex flex-col justify-center">
    <img :src="makeIMG" id="qrCode" class="mt-5 h-[75%] w-[75%] ml-[12.5%] lg:h-[50%] lg:w-[50%] lg:ml-[25%] 2xl:h-[30%] 2xl:w-[30%] 2xl:ml-[35%] m-0 p-0 border-0">

    <div class="translate mt-5 bg-white w-[300px] rounded-xl ml-[50%] flex justify-center">
        <h1 class="flex justify-center py-3">{{ Description }}</h1>
    </div>
</div>

</template>


<style scoped>
.translate {
    transform: translate(-50%);
}

</style>