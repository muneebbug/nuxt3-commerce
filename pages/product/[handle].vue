<template>
  <div>
    <Section class="py-20">
      <ShopifyProductDetails :product="data.product" v-if="data?.product?.id" />
    </Section>
    <!-- <pre>
      {{ data?.product?.variants?.nodes }}
    </pre> -->
  </div>
</template>

<script setup>
const route = useRoute();
const { handle } = route.params;

const { client } = useShopify();

const { data, error } = await useAsyncData('product', async () => {
  const productQuery = `
    query productQuery {
      product(handle: "${handle}") {
        id
        title
        handle
        descriptionHtml
        vendor
        images(first: 1) {
            nodes {
              id
              url
              height
              width
              altText
            }
        }
        options(first: 3) {
          id
          name
          optionValues {
            id
            name
          }
        }
        variants(first: 99) {
          nodes {
            id
            title
            price {
              amount
            }
            compareAtPrice {
              amount
            }
            availableForSale
            sku
            selectedOptions {
              name
              value
            }
          }
        }
        compareAtPriceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }`;

  const { data, errors } = await client.request(productQuery);
  if (errors) {
    throw new Error(errors);
  }
  return data;
}
);

if (error) {
  console.log(error);
}
</script>

<style></style>
