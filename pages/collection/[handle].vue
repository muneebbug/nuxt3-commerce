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
      {{ data.collection.products.nodes }}
    </pre> -->
  </Section>
</template>

<script setup>
const route = useRoute();
const { handle } = route.params;
const { getCollectionProducts, getCollection } = useShopify();
const collection = await getCollection(handle);

const products = await getCollectionProducts({ collection: handle, sortKey: 'CREATED_AT', reverse: true });
</script>

<style></style>
