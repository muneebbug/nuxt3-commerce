<template>
  <Section :title="data.collection.title" class="py-20 md:py-40">
    <SectionHeader :title="data.collection.title" />
    <div class="section-content__wrapper">
      <ul
        class="product-list grid grid-cols-4 mb-8 list-none gap-x-mobile-horizontal gap-y-mobile-vertical sm:gap-x-horizontal sm:gap-y-vertical">
        <ShopifyProductItem v-for="product in data.collection.products.nodes" :key="product.id" :product="product" />
      </ul>
    </div>

    <!-- <pre>
      {{ data.collection.products.nodes }}
    </pre> -->
  </Section>
</template>

<script setup>
const route = useRoute();
const { handle } = route.params;
const { client } = useShopify();

const { data, error } = await useAsyncData(`collection-${handle}`, async () => {
  const collectionQuery = `
    query collectionQuery {
      collection(handle: "${handle}") {
        id
        title
        handle
        products(first: 250) {
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

  const { data, errors } = await client.request(collectionQuery);
  if (errors) {
    throw new Error(errors);
  }
  return data;
});

if (error) {
  console.log(error);
}
</script>

<style></style>
