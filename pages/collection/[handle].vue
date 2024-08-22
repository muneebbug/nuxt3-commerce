<template>
  <Section :title="collection.title" class="py-20 md:py-40">
    <SectionHeader :title="collection.title" />
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
const route = useRoute();
const { handle } = route.params;

const { client } = useShopify();

const products = ref([]);

const collection = ref([]);

const fetchCollection = async () => {
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
    console.log(errors);
  }
  return { data, errors };
}

onMounted(async () => {
  const { data } = await fetchCollection();
  collection.value = data?.collection;
  products.value = data?.collection?.products?.nodes;
});

</script>

<style></style>