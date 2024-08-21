<template>
  <li class="product-list__item w-full md:flex-1">
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
        <div class="card__content">
          <div class="card__information">
            <div class="text-center">
              <h3 class="card-heading h6">
                <NuxtLink :to="productUrl">
                  {{ product.title }}
                </NuxtLink>
              </h3>
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

const productPreviewImage = computed(() => product?.images?.nodes[0]?.originalSrc);

</script>