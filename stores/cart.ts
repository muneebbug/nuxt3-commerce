// store/cart.ts
import { defineStore } from 'pinia';
import type { Cart } from '@/lib/shopify/types';


export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cart: null as Cart | null,
      isLoading: false as boolean,
    };
  },
  actions: {
    setCart(cart: Cart) {
      console.log("Setting cart");
      this.cart = cart;
    },
    setLoading(isLoading : boolean) {
      this.isLoading = isLoading;
    },
  },
});
