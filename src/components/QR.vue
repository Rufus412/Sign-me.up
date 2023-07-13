<script setup>

import { useStore } from '../stores/counter.js'
import qrcode from 'qrcode-generator-es6'

</script>


<script>

const store = useStore()
</script>


<template >
    <meta charset="utf-8">
    <title>QRcode</title>
    <div>
        <body class="items-center h-screen w-screen"> 
            <h1 class="text-center mt-20">Show the QR code to the teller to register</h1>
            <div v-html="store.SvgTag" id="qrCode" class="h-[75%] w-[75%] ml-[12.5%] lg:h-[50%] lg:w-[50%] lg:ml-[25%] 2xl:h-[30%] 2xl:w-[30%] 2xl:ml-[35%]">
            </div>
        </body>
    </div>
</template>

<style scoped>
h1 {
    font-size: 40px;
    
}/*
#qrCode {
    transform: translate(50%, 0);
}*/
</style>

