<template>
  <div class="product grid grid-cols-2">
    <div class="product-media__wrapper">
      <div class="product-media__container relative w-full border border-foreground-200 rounded-large"
        :style='`--ratio:${ratio};--preview-ratio:${ratio};`'>
        <div class="product__media media relative">
          <img :src="productPreviewImage" alt=""
            class="block max-w-full absolute top-0 left-0 h-full w-full overflow-hidden object-cover object-center rounded-large">
        </div>
      </div>
    </div>
    <div class="product-info__wrapper pl-20">
      <div class="product-info">
        <p class="uppercase">
          {{ product.vendor }}
        </p>
        <div class="product__title">
          <h1 class="h3">
            {{ product.title }}
          </h1>
        </div>
        <div class="price">
          <div class="price__container">
            <div class="price__sale flex flex-wrap items-center gap-x-4 gap-y-2 mt-4"
              v-if="currentVariantCompareAtPrice > 0 && currentVariantCompareAtPrice > currentVariantPrice">
              <span class="price-item price-item--sale text-[2.8rem] font-semibold text-red-700">
                ${{ currentVariantPrice }}
              </span>
              <span>
                <s class="price-item price-item--regular text-[1.4rem] font-semibold">
                  ${{ currentVariantCompareAtPrice }}
                </s>
              </span>
            </div>

            <div class="price__regular mt-4" v-else>
              <span class="price-item price-item--regular text-[2.8rem] font-semibold">
                ${{ currentVariantPrice }}
              </span>
            </div>

            <!-- Dynamically generated options -->
            <div class="variant-radios my-12">
              <fieldset v-for="option in options" :key="option.id" class="mb-12">
                <HeadlessRadioGroup v-model="selectedOptions[option.name]" class="space-y-2">
                  <HeadlessRadioGroupLabel class="block mb-4 "><span class="font-bold">{{ option.name }}</span> : {{
                    selectedOptions[option.name] }}</HeadlessRadioGroupLabel>
                  <div class="flex flex-wrap gap-x-2 gap-y-2">
                    <HeadlessRadioGroupOption v-for="optionValue in option.optionValues" :key="optionValue.name"
                      v-slot="{ checked }" :value="optionValue.name">
                      <div
                        class="bg-white px-[2rem] py-[1.7rem] text-center select-none cursor-pointer border rounded-small"
                        :class="checked ? 'border-black' : 'border-foreground-200'">
                        {{ optionValue.name }}
                      </div>
                    </HeadlessRadioGroupOption>
                  </div>

                </HeadlessRadioGroup>
              </fieldset>


            </div>

            <!-- 
            {{ selectedOptions }}

            {{ selectedValues }}

            <pre>
              {{ currentVariant }}
            </pre> -->

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Define the props
const props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
});

// Destructure the product from props
const { product } = props;

// Computed properties for the product details
const productPreviewImage = computed(() => product?.images?.nodes[0]?.url);
const ratio = computed(() => product?.images?.nodes[0]?.width / product?.images?.nodes[0]?.height);

const options = computed(() => product?.options || []);

// Reactive object to store selected options
const selectedOptions = ref({});


const currentVariant = computed(() => product?.variants?.nodes?.find((variant) => {
  return !variant.selectedOptions.map((option, index) => {
    return selectedValues.value[index] === option.value;
  })
    .includes(false);
}));

// { "Flavor": "Berry Burst", "Weight": "500 g" } to [ "Berry Burst", "500 g" ]
const selectedValues = computed(() => {
  // return Object.values(selectedOptions.value);
  return Object.keys(selectedOptions.value).map(key => selectedOptions.value[key]);
});

// Computed properties for the current variant
const currentVariantPrice = computed(() => parseFloat(currentVariant.value?.price.amount));
const currentVariantCompareAtPrice = computed(() => parseFloat(currentVariant.value?.compareAtPrice.amount));




// Initialize selectedOptions with default values
onMounted(() => {
  options.value.forEach(option => {
    selectedOptions.value[option.name] = option.optionValues[0]?.name || '';
  });
});



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
