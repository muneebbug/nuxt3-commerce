// composables/useCart.ts
import type { Cart } from '@/lib/shopify/types';
export function useCart() {
  const { createCart, addToCart, removeFromCart, getCart } = useShopify();
  const cartStore = useCartStore();

  const initializeCart = async (cart : Cart) => {
    cartStore.setLoading(true);
    try {
      cartStore.setCart(cart);
    } finally {
      cartStore.setLoading(false);
    }
  };
  

  async function addItem(selectedVariantId : string | undefined, quantity : number = 1){
    let cartId = useCookie('cartId')?.value;
    if (!cartId || !selectedVariantId) return 'Error adding item to cart';

    try {
      const cart = await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity }]);
      cartStore.setCart(cart);
    }
    catch (e) {
      console.log(e);
      return 'Error adding item to cart';
    }
  };

  async function redirectToCheckout() {
    let cartId = useCookie('cartId')?.value;
    if (!cartId) return 'Missing cartId Value';

    let cart = await getCart(cartId);

    if (!cart) return 'Error Fetching Cart';

    navigateTo(cart.checkoutUrl);
  }

  async function createCartAndSetCookie() {
    let cart = await createCart();
    const cookie = useCookie('cartId');
    cookie.value = cart.id!

    return cart;
  } 

  return {
    initializeCart,
    addItem,
    redirectToCheckout,
    createCartAndSetCookie
  };
}