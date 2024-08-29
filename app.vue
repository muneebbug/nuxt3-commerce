<template>
  <div class="h-full">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
import { provideUseId } from '@headlessui/vue';

// import type { Cart } from '@/lib/shopify/types';
provideUseId(() => useId());

const { createCartAndSetCookie, initializeCart } = useCart();
const { getCart } = useShopify();
const cookie = useCookie('cartId');

// Define the fetchCart function
const fetchCart = async () => {
  if (!cookie.value) {
    try {
      const cart = await createCartAndSetCookie();

      if (cart) {
        initializeCart(cart);
      }
    } catch (error) {
      console.error('Failed to create cart and set cookie:', error);
    }
  } else {
    try {
      const cart = await getCart(cookie.value);
      initializeCart(cart);
    } catch (error) {
      console.error('Failed to get cart:', error);
    }
  }
};



onServerPrefetch(async () => {
  await fetchCart();
});


</script>
