<template>
  <Section title="Featured collection" background="secondary" class="py-20 md:py-40">
    <SectionHeader title="Featured collection" />
    <div class="section-content__wrapper">
      <ul
        class="product-list flex flex-wrap mb-8 list-none gap-x-mobile-horizontal gap-y-mobile-vertical sm:gap-x-horizontal sm:gap-y-vertical">
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

const fetchProducts = async () => {
  const productsQuery = `
    query ProductsQuery {
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

onMounted(async () => {
  const { data } = await fetchProducts();
  products.value = data?.products?.nodes;
});


</script>

<style></style>