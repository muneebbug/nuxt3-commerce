// composables/useShopify.js

export function useShopify() {
  const client = useNuxtApp().$shopifyClient as any;

  const fetchProductByHandle = async (handle: string) => {
    const productQuery = `
      query ProductQuery($handle: String) {
        product(handle: $handle) {
          id
          title
          handle
        }
      }
    `;
    const { data, errors } = await client.request(productQuery, {
      variables: { handle },
    });
    return { data, errors };
  };

  return {
    fetchProductByHandle
  };
}
