// plugins/shopify-client.js
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export default defineNuxtPlugin((nuxtApp) => {
    const storefrontApiClient = createStorefrontApiClient({
        storeDomain: 'http://dynamicfuel.myshopify.com',
        apiVersion: '2024-07',
        publicAccessToken: '5e1b434412bad24634086c95b9b6e225',
    });

    // Attach the client to the global app context
    nuxtApp.provide('shopifyClient', storefrontApiClient);
});
