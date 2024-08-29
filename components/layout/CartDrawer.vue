<template>
  <Sheet v-model:open="isOpened">
    <SheetContent side="right" class="max-w-full w-[600px] flex flex-col p-0">
      <SheetHeader class="mb-4 p-6 pb-0">
        <SheetTitle>
          Shopping cart
        </SheetTitle>
      </SheetHeader>
      <ScrollArea class="h-full px-6" v-if="items && items.length > 0">
        <div class="drawer__cart-items-wrapper">

          <div class="drawer__cart-item border rounded-large mb-8" v-for="item in items" :key="item.id">
            <div class="cart-item__media relative">
              <NuxtLink :onclick="close"
                class="cart-item__media-link block absolute bottom-0 left-0 right-0 top-0 w-full h-full"
                :to="`/product/${item.merchandise?.product?.handle}`">
              </NuxtLink>
              <img class="rounded-medium" :src="item.merchandise?.product?.featuredImage?.url"
                :alt="item.merchandise?.product?.title" />
            </div>
            <div class="cart-item__details">
              <NuxtLink :onclick="close" :to="`/product/${item.merchandise?.product?.handle}`" class="h6">
                {{ item.merchandise?.product?.title }}
              </NuxtLink>
              <dl class="mt-2">
                <div class="product-options">
                  <span v-for="(option, index) in item.merchandise.selectedOptions" :key="option.value">
                    <!-- slash will be added if there are more options -->
                    {{ option.value }} {{ item.merchandise.selectedOptions.length > index + 1 ? '/' : '' }}
                  </span>
                </div>
              </dl>
              <div class="cart_price_items mt-2 font-bold text-[22px]">
                ${{ item.cost.totalAmount.amount }}
              </div>
            </div>
            <div class="cart-item__quantity flex flex-col justify-center items-center">
              <div class="quantity-input mb-4">
                <NumberField id="age" :default-value="1" :min="0" v-model="item.quantity"
                  @update:model-value="updateItemLocal({ merchandiseId: item.merchandise?.id, quantity: item.quantity })">
                  <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldContent>
                </NumberField>
              </div>

              <button @click="removeItem(null, item?.merchandise?.id)"
                class="text-center w-full font-bold underline text-destructive">
                Remove
              </button>
            </div>
          </div>
        </div>
      </ScrollArea>
      <!-- Empty Cart -->
      <div class="cart-empty px-6" v-else>
        <div class="cart-empty__wrapper border rounded-large p-12 flex flex-col items-center justify-center">
          <div class="empty-icon mb-2">
            <Icon name="ph:shopping-cart-simple-light" size="60" />
          </div>
          <div class="empty-text mb-8">
            <h1 class="h4">
              Your cart is empty
            </h1>
          </div>
          <div class="empty-button">
            <BrandPrimaryLinkButton to="/">
              Continue Shopping
            </BrandPrimaryLinkButton>
          </div>
        </div>
      </div>

      <div v-if="items && items.length > 0"
        class="cart-footer flex justify-center items-center p-6 shadow shadow-slate-300">
        <BrandPrimaryButton class="w-full" @click="redirectToCheckout">
          Checkout
        </BrandPrimaryButton>
      </div>


    </SheetContent>

  </Sheet>
</template>

<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'

import type { Cart } from '~/lib/shopify/types';
import ScrollArea from '../ui/scroll-area/ScrollArea.vue';

const { isOpened } = useCartDrawer()
const cart = computed<Cart | undefined>(() => useCartStore().cart);

const items = computed(() => useCartStore().cart?.lines)
const { close } = useCartDrawer();
const { removeItem, updateItemQuantity, redirectToCheckout } = useCart();

const nuxtApp = useNuxtApp();

const updateItemLocal = async (payload: {
  merchandiseId: string;
  quantity: number;
}) => {
  console.log(payload.quantity)
  await updateItemQuantity(null, payload);
}

nuxtApp.hook('page:start', () => {
  close();
});
</script>

<style lang="scss">
.drawer__cart-item {
  display: grid;
  grid-template-columns: 10rem 1fr 13rem;
  grid-template-areas:
    "media item-details quantity";
  column-gap: 2rem;
  padding: 3rem;

  @media screen and (max-width: 639px) {
    padding: 1.5rem;
    display: flex;
    flex-wrap: wrap;
  }
}

.cart-item__media {
  grid-area: media;

  @media screen and (max-width: 639px) {
    width: 100%;
    max-width: 85px;
    margin-bottom: 1rem;
  }
}

.cart-item__details {
  width: auto;
  grid-area: 'item-details';

  @media screen and (max-width: 639px) {
    width: calc(100% - 105px);
    min-width: calc(100% - 105px);
  }
}

.cart-item__quantity {
  grid-area: quantity;

  @media screen and (max-width: 639px) {
    width: 100%;
    margin-top: 10px;
  }
}
</style>