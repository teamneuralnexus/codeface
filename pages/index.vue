<script setup>
onMounted(async ()=>{
    const user = useUser()
    if(user.value!=null) {
        await navigateTo('/dashboard')
    }
})
</script>
<template>
    
</template>
<style scoped>
</style>