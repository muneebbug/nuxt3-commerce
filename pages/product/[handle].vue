<template>
  <div>
    <Section class="py-20">
      <ShopifyProductDetails :product="product" v-if="product?.id" />
    </Section>
    <!-- <pre>
      {{ data?.product?.variants?.nodes }}
    </pre> -->
  </div>
</template>

<script setup>
const route = useRoute();
const { handle } = route.params;

const { getProduct } = useShopify();
const product = await getProduct(handle);
</script>

<style></style>
