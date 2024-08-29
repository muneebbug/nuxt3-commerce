// composables/useCart.ts
import type { Cart } from '@/lib/shopify/types';
export function useCart() {
  const { createCart, addToCart, removeFromCart, getCart, updateCart } = useShopify();
  const cartStore = useCartStore();

  const initializeCart = async (cart : Cart | undefined) => {
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

      const { isOpened, open } = useCartDrawer();
      
      if (!isOpened.value === true) {
        open();
      }
    }
    catch (e) {
      console.log(e);
      return 'Error adding item to cart';
    }
  };


  async function removeItem(prevState: any,merchandiseId: string) {
    console.log('removeItem', merchandiseId);
  let cartId = useCookie('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  try {
    const cart = await getCart(cartId);

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find((line) => line.merchandise.id === merchandiseId);

    if (lineItem && lineItem.id) {
      const cart = await removeFromCart(cartId, [lineItem.id]);
      cartStore.setCart(cart);
    } else {
      return 'Item not found in cart';
    }
  } catch (e) {
    return 'Error removing item from cart';
  }
  }async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
 let cartId = useCookie('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart(cartId);

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find((line) => line.merchandise.id === merchandiseId);

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        const cart = await removeFromCart(cartId, [lineItem.id]);
        cartStore.setCart(cart);
      } else {
        const cart = await updateCart(cartId, [
          {
            id: lineItem.id,
            merchandiseId,
            quantity
          }
        ]);

        cartStore.setCart(cart);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      const cart = await addToCart(cartId, [{ merchandiseId, quantity }]);
      cartStore.setCart(cart);
    }
  } catch (e) {
    console.error(e);
    return 'Error updating item quantity';
  }
}

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
    removeItem,
    updateItemQuantity,
    redirectToCheckout,
    createCartAndSetCookie
  };
}