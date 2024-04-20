<script setup>

const logout = async () => {
    $fetch('/api/auth/logout', {
        method: 'POST'
    }).then(async () => {
        await navigateTo('/auth/login')
    })
}

</script>
<template>
    <div>
        <nuxt-link to="/app">Go to APP</nuxt-link>
        Inside Dashboard
        <br />
        <button @click="logout" class="bg-black text-white mb-10">Log out</button>
    </div>
</template>
<style>
.splitpanes__splitter {
    border-left: 0px !important;
    width: 0px !important;
}
</style>