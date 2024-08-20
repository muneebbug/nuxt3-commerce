// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  devServer: {
    port: 3000,
    host: '127.0.0.1'
  },

  modules: [
    '@pinia/nuxt',
    '@formkit/auto-animate',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@pinia-plugin-persistedstate/nuxt',
    'shadcn-nuxt',
    'nuxt-headlessui'
  ]
})