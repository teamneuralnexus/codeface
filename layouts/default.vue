<script setup>
</script>
<template>
    <div>
        <div class="grid grid-cols-2 md:grid-cols-[20%_40%_40%] p-5 shadow-[0px_12px_54px_10px_#f1f2f4]" style="font-family: Roboto;">
            <div class="text-xl p-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500  to-blue-500 font-bold"  style="font-family: 'Dancing Script', cursive;">
                <nuxt-link class="cursor-pointer" to="/">CodeFace.ai</nuxt-link>
            </div>
            <div class="p-2 hidden md:block">
                <!-- Plans and Pricing Section -->
            </div>
            <div>
                <div class="grid grid-cols-2 w-fit ml-auto gap-5">
                    <h1 class="p-2 cursor-pointer hover:text-cyan-500 font-bold block ml-auto"><nuxt-link to="/auth/login">Log in</nuxt-link></h1>
                    <h1 class="bg-gradient-to-r from-cyan-500 rounded-lg  to-blue-500 shadow-lg cursor-pointer text-white p-2 px-5 hover:rounded-2xl transition-all delay-[25ms]"><nuxt-link to="/auth/signup">Get started for free</nuxt-link></h1>
                </div>
            </div>
        </div>
        <slot />
    </div>
</template>
<style scoped>
</style>