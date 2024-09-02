<template>
  <div class="product-media__wrapper mb-10 md:mb-0 ">
    <Carousel>
      <CarouselContent>
        <CarouselItem v-for="image in product?.images" :key="image.id">
          <img :src="image.url" alt=""
            class="w-full h-full object-cover object-center rounded-large border border-border border-opacity-20" />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    <!-- 
    * Single Image code: not deleting it for now until i have tested the carousel properly
    -->

    <!-- <div class="product-media__container relative w-full border rounded-large"
      :style='`--ratio:${ratio};--preview-ratio:${ratio};`'>
      <div class="product__media media relative">
        <img :src="productPreviewImage" alt=""
          class="block max-w-full absolute top-0 left-0 h-full w-full overflow-hidden object-cover object-center rounded-large">
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'


const props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
});

const { product } = props;

// Computed properties for the product details : not deleting it for now until i have tested the carousel properly
// const productPreviewImage = computed(() => product?.images[0]?.url);
// const ratio = computed(() => product?.images[0]?.width / product?.images[0]?.height);

</script>

<style scoped lang="scss">
.product-media__container {
  --aspect-ratio: var(--preview-ratio);
  --ratio-percent: calc(1 / var(--aspect-ratio) * 100%);

  .media {
    padding-top: var(--ratio-percent);
  }
}
</style>