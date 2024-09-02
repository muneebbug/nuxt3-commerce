<template>
  <Section title="Shop by goal">
    <SectionHeader title="Shop by goal" :centered="true" />
    <div class="section-content__wrapper">
      <ul
        class="collection-list grid grid-cols-1 md:grid-cols-3 mb-8 p-0 list-none gap-x-mobile-horizontal gap-y-mobile-vertical sm:gap-x-horizontal sm:gap-y-vertical">
        <ShopifyCollectionItem v-for="collection in collections.slice(0, 3)" :key="collection.id"
          :collection="collection" />
      </ul>
    </div>
  </Section>
</template>

<script setup>
const { getCollections } = useShopify();

const collections = await getCollections();

</script>

<style></style>
