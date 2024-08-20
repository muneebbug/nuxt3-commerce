// plugins/shopify-client.js
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export default defineNuxtPlugin((nuxtApp) => {
    const { storeDomain, apiVersion, publicAccessToken } = useRuntimeConfig().public;
    const storefrontApiClient = createStorefrontApiClient({
        storeDomain: storeDomain,
        apiVersion: apiVersion,
        publicAccessToken: publicAccessToken,
    });

    // Attach the client to the global app context
    nuxtApp.provide('shopifyClient', storefrontApiClient);
});
