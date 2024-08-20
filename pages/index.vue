<template>
  <div>
    <h1>Hello world!</h1>
    <pre>
      {{ product }}
    </pre>
  </div>
</template>
<script setup>
const product = ref({});

const { client } = useShopify();
const fetchProductByHandle = async (handle) => {
  const productQuery = `
      query ProductQuery($handle: String) {
        product(handle: $handle) {
          id
          title
          handle
        }
      }
    `;
  const { data, errors } = await client.request(productQuery, {
    variables: { handle },
  });
  return { data, errors };
};


onMounted(async () => {
  const { data } = await fetchProductByHandle('biozyme-vita-blend-combo-pack');
  console.log(data);
  product.value = data?.product;

});
</script>

<style></style>