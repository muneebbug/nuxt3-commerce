<template>
  <Section :title="collection?.title" class="py-20">
    <SectionHeader :title="collection?.title" class="flex gap-y-4 flex-col md:flex-row justify-between items-center">
      <ShopifySortingDropdown :list="sorting" v-model="emittedSort" @update:model-value="fetchProducts" />
    </SectionHeader>
    <div class="section-content__wrapper flex" :class="{ 'opacity-50': loading }">
      <ul
        class="collection-product__list product-list w-full grid grid-cols-2 md:grid-cols-4 mb-8 list-none gap-x-mobile-horizontal gap-y-mobile-vertical sm:gap-x-horizontal sm:gap-y-vertical">
        <ShopifyProductItem v-for="product in products" :key="product.id" :product="product" />
      </ul>
    </div>
  </Section>
</template>

<script setup lang="ts">
import { defaultSort, sorting } from '@/lib/constants';
import type { Product, Collection } from '@/lib/shopify/types';


const route = useRoute();
const searchParams = useRoute().query;

const { handle } = route.params as { handle: string };
const loading = ref(false);

const { getCollectionProducts, getCollection } = useShopify();
const collection = ref<Collection | undefined>(undefined);
collection.value = await getCollection(handle);

const { sort } = searchParams as { [key: string]: string };
const { slug, sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
const emittedSort = ref(slug) as Ref<string>;


const products = ref<Product[]>([]);

products.value = await getCollectionProducts({ collection: handle, sortKey, reverse });

const fetchProducts = async () => {
  loading.value = true;
  const { sortKey, reverse } = sorting.find((item) => item.slug === emittedSort.value) || defaultSort;
  // console.log('fetching products', sortKey, reverse);
  products.value = await getCollectionProducts({ collection: handle, sortKey, reverse });
  // update the url with the new sort
  const { push } = useRouter();
  push({ query: { ...route.query, sort: emittedSort.value } });
  loading.value = false;
}
</script>

<style>
.collection-product__list .product-card__item {
  padding-left: 0;
  padding-right: 0;
}

.facets-wrapper {
  margin-right: 5rem;
  width: 335px;
  flex-shrink: 0;
}
</style>
