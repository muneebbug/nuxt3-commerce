// composables/useShopify.js

export function useShopify() {
  const client = useNuxtApp().$shopifyClient;

  return {
    client
  };
}
