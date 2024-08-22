<template>
  <Section title="Shop by goal">
    <SectionHeader title="Shop by goal" :centered=true />
    <div class="section-content__wrapper">
      <ul
        class="collection-list grid grid-cols-3 mb-8 p-0 list-none gap-x-mobile-horizontal gap-y-mobile-vertical sm:gap-x-horizontal sm:gap-y-vertical">
        <ShopifyCollectionItem v-for="collection in collections" :key="collection.id" :collection="collection" />
      </ul>
    </div>
  </Section>
</template>

<script setup>
const collections = ref([]);
const { client } = useShopify();

const fetchCollections = async () => {
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
    console.log(errors);
  }
  return { data, errors };
}

onMounted(async () => {
  const { data } = await fetchCollections();
  collections.value = data?.collections?.nodes;
});


</script>
