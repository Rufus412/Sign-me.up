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
        <body> 
            <h1 class="text-center mt-20">Show the QR code to the teller to register</h1>
            <div v-html="store.SvgTag" id="qrCode" >
            </div>
        </body>
    </div>
</template>

<style scoped>
h1 {
    font-size: 40px;
    
}
#qrCode {
    transform: scale(0.6);
    margin-top: -20%;
}
</style>

