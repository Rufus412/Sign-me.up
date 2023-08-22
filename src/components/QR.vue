<script setup>

import { useStore } from '../stores/counter.js'

</script>


<script>

const store = useStore()
</script>


<template >
    <meta charset="utf-8">
    <title>QRcode</title>
    <div v-html="store.SvgTag" id="qrCode" class="mt-3 h-[75%] w-[75%] ml-[12.5%] lg:h-[50%] lg:w-[50%] lg:ml-[25%] 2xl:h-[30%] 2xl:w-[30%] 2xl:ml-[35%] m-0 p-0 border-0">
            </div>
    <div class="">
        <body> 
            <div class="px-5 py-10">
                <div class="bg-white rounded-xl py-2 box-border flex flex-col">
                    <h2 v-if="store.lvl3" class="text-center text-red-500">{{ $t("qrPage.error")}}</h2>
                    <h2 class="text-center" :class="{'text-red-500': store.lvl3}">{{ $t("qrPage.showToTeller")}}</h2>
                </div>
            </div>
            
        </body>
    </div>
</template>

<style scoped>
</style>

