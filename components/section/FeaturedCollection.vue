<template>
  <Section title="Featured collection" background="secondary" class="py-20 md:py-40">
    <SectionHeader title="Featured collection" />
    <div class="section-content__wrapper">
      <ul
        class="product-list grid grid-cols-4 mb-8 list-none gap-x-mobile-horizontal gap-y-mobile-vertical sm:gap-x-horizontal sm:gap-y-vertical">
        <ShopifyProductItem v-for="product in products" :key="product.id" :product="product" />
      </ul>
    </div>

    <!-- <pre>
      {{ products }}
    </pre> -->
  </Section>
</template>

<script setup>
const { client } = useShopify();
const products = ref([]);
const collection = ref([]);

const fetchProducts = async () => {
  const productsQuery = `
    query productsQuery {
      collection(handle: "all") {
        id
        title
        products(first: 4) {
          nodes {
            id
            title
            handle
            images(first: 1) {
              nodes {
                id
                originalSrc
                altText
              }
            }
            compareAtPriceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;
  const { data, errors } = await client.request(productsQuery);
  if (errors) {
    console.log(errors);
  }
  return { data, errors };
};


const { data } = await fetchProducts();
collection.value = data?.collection;
products.value = data?.collection?.products?.nodes;



</script>

<style></style>