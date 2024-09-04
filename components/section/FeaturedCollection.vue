<template>
  <Section title="Featured collection" background="secondary" class="py-20 md:py-40">
    <SectionHeader title="Featured collection" />
    <div class="section-content__wrapper">
      <ul
        class="product-list grid grid-cols-2 md:grid-cols-4 mb-8 list-none gap-x-mobile-horizontal gap-y-mobile-vertical sm:gap-x-horizontal sm:gap-y-vertical">
        <ShopifyProductItem v-for="product in products.slice(0, 4)" :key="product.id" :product="product" />
      </ul>
    </div>
  </Section>
</template>

<script setup>
const { getCollectionProducts } = useShopify();

const products = await getCollectionProducts({ collection: 'all', sortKey: 'CREATED_AT', reverse: false });

</script>

<style></style>
