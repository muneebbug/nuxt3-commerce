<template>
  <Section title="Featured collection" background="secondary" class="py-20 md:py-40">
    <SectionHeader title="Featured collection" />
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
const { client } = useShopify();

const { data, error } = await useAsyncData('featuredCollection', async () => {
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
    throw new Error(errors);
  }
  return data;
});

if (error) {
  console.log(error);
}
</script>

<style></style>
