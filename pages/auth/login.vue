<script setup>
definePageMeta({
    layout: 'auth'
})

const loading = ref(false)
const email = ref(null)
const password = ref(null)


const changeLoadingIndicator = () => {
    loading.value = !loading.value
}

const login = async () => {
    try {
        changeLoadingIndicator()
        const result = await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
                email: email.value,
                password: password.value
            }
        })
        if(result.statusCode=200) {
            changeLoadingIndicator()
            await navigateTo('/dashboard')
        }
    } catch (error) {
        alert(error)
        
    }
}

onMounted(async ()=>{
    const user = useUser()
    if(user.value!=null) {
        await navigateTo('/dashboard')
    }
})

</script>
<template>
    <div>
        <div class="p-2 ">
            <h1 class="text-2xl font-extrabold mb-10 ">
                Welcome back! Log in to your account <Icon v-if="loading" name="line-md:loading-loop" class="text-blue-500"/>
                <nuxt-link class="text-neutral-400 text-sm block cursor-pointer w-fit" to="/auth/signup">Not a user yet? Create
                    account</nuxt-link>
            </h1>
            <form @submit.prevent="login">
                <h1 class="text-lg font-bold mb-2">
                    Email Address
                </h1>
                <input type="email"
                    v-model="email"
                    required="true"
                    class="border-2 mb-5 border-gray-300 focus:outline-gray-400 rounded-lg w-3/5 px-5 py-1"
                    placeholder="you@example.com" />
                <div class="text-lg font-bold mb-2 grid grid-cols-2 w-3/5">
                    <h1>Password</h1>
                    <div class="ml-auto w-fit">
                        <nuxt-link class="text-neutral-400 text-xs block mt-2 cursor-pointer">Forgot
                            Password?</nuxt-link>
                    </div>
                </div>
                <input type="password" v-model="password" required="true" class="border-2 border-gray-300 focus:outline-gray-400 rounded-lg w-3/5 px-5 py-1"
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" />
                <input type="submit"
                    class="w-3/5 block my-5 bg-gradient-to-r from-cyan-500 rounded-lg  to-blue-500 shadow-lg cursor-pointer text-white p-2 text-center px-5 hover:rounded-2xl transition-all delay-[25ms]"
                    value="Log in" />
            </form>
            <div class="flex items-center w-3/5 my-5">
                <div class="flex-1 border-t-2 border-gray-200"></div>
                <span class="px-3 text-gray-500 bg-white">OR</span>
                <div class="flex-1 border-t-2 border-gray-200"></div>
            </div>
            <div class="w-3/5">
                <div
                    class="px-5 cursor-pointer my-5 grid grid-cols-[10%_90%] py-3 text-center shadow-lg  rounded-lg border-gray-200 bg-gray-100 hover:bg-gray-200">
                    <Icon name="flat-color-icons:google" class="size-6 mr-2" />
                    <h1 class="text-center">Continue with google</h1>
                </div>
                <div
                    class="px-5 cursor-pointer mt-5 grid grid-cols-[10%_90%] py-3 text-center shadow-lg  rounded-lg border-gray-200 bg-gray-100 hover:bg-gray-200">
                    <Icon name="logos:microsoft-icon" class="size-6 mr-2" />
                    <h1 class="text-center">Continue with microsoft</h1>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>