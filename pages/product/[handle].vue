<template>
  <div>
    <Section class="py-20">
      <ShopifyProductDetails :product="product" v-if="product.id" />
    </Section>
    <!-- <pre>
      {{ product?.variants?.nodes }}
    </pre> -->
  </div>
</template>

<script setup>
const route = useRoute();
const { handle } = route.params;

const { client } = useShopify();

const product = ref({});

const fetchProduct = async () => {
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
    console.log(errors);
  }
  return { data, errors };
}


const { data } = await fetchProduct();
product.value = data?.product;

</script>

<style></style>