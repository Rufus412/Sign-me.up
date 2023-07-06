<script setup>

import { useStore } from '../stores/counter.js'
import qrcode from 'qrcode-generator-es6'

</script>



<script>

const store = useStore()
//document.getElementById('qrCode').innerHTML = store.SvgTag

document.getElementsByTagName('body')[0].innerHTML = store.SvgTag

</script>

<template>
    <meta charset="utf-8">
    <title>QR Code Gallery</title>
    <body id="qrCode"> 

    </body>
</template>

<style scoped>

#qrCode {
    position: relative;
    size: 10%;
}
</style>