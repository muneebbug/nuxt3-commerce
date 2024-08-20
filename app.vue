<template>
  <div>
    <NuxtRouteAnnouncer />

    {{ product.title }}
  </div>
</template>


<script setup>
const product = ref({});

const { fetchProductByHandle } = useShopify();

onMounted(async () => {
  const { data } = await fetchProductByHandle('biozyme-vita-blend-combo-pack');
  console.log(data);
  product.value = data?.product;

});
</script>