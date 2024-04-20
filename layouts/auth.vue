<script setup>
definePageMeta({
    layout: false
})
</script>
<template>
    <div>
        <div class="grid md:grid-cols-[60%_40%] h-screen font-[Roboto]">
            <div class="p-5">
                <div class="text-xl mb-10 p-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500  to-blue-500 font-bold"  style="font-family: 'Dancing Script', cursive;">
                    <h1 class="cursor-pointer"><nuxt-link to="/">CodeFace.ai</nuxt-link></h1>
                </div>
                <slot />
            </div>
            <div class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white relative">
                <div class="sticky top-0">

                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
</style>