import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: [
    '@pinia/nuxt',
    '@formkit/auto-animate',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@pinia-plugin-persistedstate/nuxt',
    'shadcn-nuxt',
    'nuxt-headlessui',
    '@nuxtjs/color-mode',
  ],

  googleFonts: {
    families: {
      "DM Sans": ['400', '500', '700', '800', '900'],
      Oswald: ['400', '500', '700', '800', '900'],
    },
  },

  css: [
    resolve('./assets/scss/global.scss')
  ],

  imports: {
    dirs: [resolve('./stores'), '~/stores'],
  },
  
  // module::pinia
  pinia: {
    storesDirs: ['~/stores/**', '#/stores/**', '@/stores/**'],
  },

  // module::headlessui
  headlessui: {
    prefix: 'Headless',
  },
  
  // module::color-mode
  colorMode: {
    classSuffix: '',
  },
  
  devtools: { enabled: true },

  devServer: {
    port: 3000,
    host: '127.0.0.1'
  },

  runtimeConfig: {
    public: {
      storeDomain: process.env.NUXT_PUBLIC_SHOPIFY_STOREFRONT_STORE_DOMAIN,
      apiVersion: process.env.NUXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION,
      publicAccessToken: process.env.NUXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN
    }
  },


})