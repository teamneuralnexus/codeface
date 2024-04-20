<script setup>
</script>
<template>
    <div>
        <div class="grid sticky bg-white top-0 z-10 grid-cols-2 md:grid-cols-[20%_40%_40%] p-5 py-0  shadow-[0px_12px_54px_10px_#f1f2f4]" style="font-family: Roboto;">
            <div class="text-xl p-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500  to-blue-500 font-bold"  style="font-family: 'Dancing Script', cursive;">
                <nuxt-link class="cursor-pointer" to="/dashboard">CodeFace.ai</nuxt-link>
            </div>
            <div class="p-2 hidden md:block">
                <!-- Plans and Pricing Section -->
            </div>
        </div>
            <slot />
    </div>
</template>
<style scoped>
</style>