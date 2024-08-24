<template>
  <Section title="Shop by goal">
    <SectionHeader title="Shop by goal" :centered="true" />
    <div class="section-content__wrapper">
      <ul
        class="collection-list grid grid-cols-3 mb-8 p-0 list-none gap-x-mobile-horizontal gap-y-mobile-vertical sm:gap-x-horizontal sm:gap-y-vertical">
        <ShopifyCollectionItem v-for="collection in data.collections.nodes" :key="collection.id"
          :collection="collection" />
      </ul>
    </div>
  </Section>
</template>

<script setup>
const { client } = useShopify();

const { data, error } = await useAsyncData('collections', async () => {
  const collectionsQuery = `
    query CollectionsQuery {
      collections(first: 3) {
        nodes {
          id
          title
          handle
        }
      }
    }
  `;

  const { data, errors } = await client.request(collectionsQuery);
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
