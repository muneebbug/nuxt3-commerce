<template>
  <li class="collection-list__item w-full md:flex-1">
    <div class="card-wrapper h-full">
      <div
        class="card h-full flex flex-nowrap gap-x-horizontal gap-y-vertical p-[1.5rem] md:p-[3rem] border rounded-medium md:rounded-large border-border border-opacity-20">
        <div class="card__content basis-2/3">
          <div class="card__information flex flex-col justify-between h-full">
            <div class="product__count">
              6 Items
            </div>
            <div class="card-title__description">
              <h3 class="card__heading h5">
                <NuxtLink :to="collectionUrl">
                  {{ collection.title }}
                </NuxtLink>
              </h3>
            </div>
            <div class="card-collection__button">
              <BrandPrimaryLinkButton :to="collectionUrl" :tiny="true">
                <Icon name="material-symbols-light:arrow-outward" size="20" />
              </BrandPrimaryLinkButton>
            </div>
          </div>
        </div>
        <div class="card__image ratio flex items-stretch relative basis-1/3" style="--ratio-percent: 132.0%">
          <NuxtLink :to="collectionUrl"
            class="overlay-link absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0 z-[1]">
            {{ collection.title }}
          </NuxtLink>
          <div class="card-media w-full overflow-hidden absolute bottom-0 top-0 z-0 rounded-large">
            <div class="absolute bottom-0 top-0 w-full overflow-hidden">
              <img class="h-full max-w-full absolute top-0 left-0 object-cover object-center"
                src="https://ienergy-active.myshopify.com/cdn/shop/files/homeCollection1.webp?v=1712645961&width=535" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
  collection: {
    type: Object,
    default: () => { },
  },
});

const { collection } = props;

const collectionUrl = computed(() => '/collection/' + collection?.handle);

</script>

<style scoped lang="scss">
.ratio:before {
  content: "";
  width: 0;
  height: 0;
  padding-bottom: var(--ratio-percent);
}
</style>
