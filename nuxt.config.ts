// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxt/fonts",
    "@sidebase/nuxt-pdf"
  ],
  nitro: {
    runtimeConfig: {
      dbUrl: process.env.DB_URL,
      azureOpenAiApiKey: process.env.AZURE_OPENAI_API_KEY
    }
  }
})