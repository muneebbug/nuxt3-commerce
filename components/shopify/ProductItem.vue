<template>
  <li class="product-list__item w-full">
    <div class="card-wrapper product-card__wrapper">
      <div class="product-card__item px-6 pt-6 pb-8 bg-white rounded-large">
        <div class="card__image ratio flex items-stretch relative basis-1/3" style="--ratio-percent: 132.0%">
          <NuxtLink :to="productUrl"
            class="overlay-link absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0 z-[1]">
            {{ product.title }}
          </NuxtLink>
          <div class="card-media w-full overflow-hidden absolute bottom-0 top-0 z-0 rounded-large">
            <div class="absolute bottom-0 top-0 w-full overflow-hidden">
              <img class="h-full max-w-full absolute top-0 left-0 object-cover object-center"
                :src="productPreviewImage" />
            </div>
          </div>
        </div>
        <div class="card__content mt-8">
          <div class="card__information">
            <div class="text-center">
              <h3 class="card-heading h6 dark:text-card-foreground-secondary">
                <NuxtLink :to="productUrl">
                  {{ product.title }}
                </NuxtLink>
              </h3>
              <div class="price">
                <div class="price__container">
                  <div class="price__sale flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mt-4"
                    v-if="largestPrice > 0">
                    <span class="price-item price-item--sale text-[2rem] font-semibold text-red-700">
                      From ${{ smallestPrice }}
                    </span>
                    <span>
                      <s
                        class="price-item price-item--regular text-[1.4rem] dark:text-card-foreground-secondary font-semibold">
                        ${{ largestPrice }}
                      </s>
                    </span>
                  </div>

                  <div class="price__regular mt-4" v-else>
                    <span
                      class="price-item price-item--regular text-[2rem] dark:text-card-foreground-secondary font-semibold">
                      From ${{ smallestPrice }}
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </li>
</template>

<script lang="ts" setup>
const props = defineProps({
  product: {
    type: Object,
    default: () => { },
  },
});

const { product } = props;

const productUrl = computed(() => '/product/' + product?.handle);

const productPreviewImage = computed(() => product?.images[0]?.url);

const ratio = computed(() => product?.images[0]?.width / product?.images[0]?.height);

// smallest price of the product variants
const smallestPrice = computed(() => parseFloat(product?.priceRange?.minVariantPrice?.amount));

// largest price of the product variants
const largestPrice = computed(() => parseFloat(product?.compareAtPriceRange?.maxVariantPrice?.amount));

</script>