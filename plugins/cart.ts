// plugins/cart.ts

export default defineNuxtPlugin(async (nuxtApp) => {
    const { createCartAndSetCookie, initializeCart } = useCart();
    const { getCart } = useShopify();
    const cookie = useCookie('cartId');
    nuxtApp.hook('app:mounted', async () => {
        if (!cookie.value) {
            try {
                const cart = await createCartAndSetCookie();

                if (cart) {
                    initializeCart(cart);
                }


            } catch (error) {
                console.error('Failed to create cart and set cookie:', error);
            }
        }
        else {
            try {
                const cart = await getCart(cookie.value);
                console.log(cart);

                if (cart) {
                    initializeCart(cart);
                }
            } catch (error) {
                console.error('Failed to get cart:', error);
            }   
        }
    });
});
