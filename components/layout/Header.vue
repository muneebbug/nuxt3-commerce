<template>
    <header class="header page-width">
        <BrandPrimaryButton :tiny=true class="navigation-hub-btn">
            <Icon name="ic:baseline-menu" size="30" />
        </BrandPrimaryButton>
        <NuxtLink to="/" class="header__heading-link justify-self-start text-left">
            <div class="header__logo-wrapper">
                <img src="/fuel-logo.png" alt="logo" class="header__logo max-w-[90px] lg:max-w-full" width="100">
            </div>
        </NuxtLink>
        <div class="inline-search-form ml-12 hidden lg:block">
            <div class="field flex relative w-full">
                <Input type="text" id="inline-search" placeholder="Search" class="search__input field__input" />
                <button class="absolute right-6 inset-y-0 flex items-center justify-end px-2">
                    <Icon name="ph:magnifying-glass" size="30" class="size-8 text-current" />
                </button>

            </div>
        </div>
        <div class="header__icons flex justify-self-end pr-4">
            <button @click="open" class="header__icon header__icon--cart relative flex gap-4 items-center">
                <Icon name="ph:shopping-cart-simple-light" size="30" />
                <div class="cart-count-bubble relative flex items-center gap-2 font-semibold">
                    <span class="hidden sm:flex">${{ totalAmount }}</span>
                    <span class="">({{ totalQuantity }})</span>
                </div>
            </button>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { Input } from '@/components/ui/input'

const cartStore = useCartStore();

const totalAmount = computed(() => cartStore.cart?.cost?.totalAmount?.amount || 0);
const totalQuantity = computed(() => cartStore.cart?.totalQuantity || 0);

const { open, close, isOpened } = useCartDrawer();



</script>

<style scoped lang="scss">
.header {
    padding-top: 30px;
    padding-bottom: 30px;
    display: grid;
    grid-template-areas: "left-icons heading icons";
    align-items: center;

    @media screen and (max-width: 1023px) {
        grid-template-columns: auto 2fr 1fr;
        gap: 2rem;
    }

    @media screen and (min-width: 1024px) {
        grid-template-areas:
            "hub heading inline-search icons"
            "navigation navigation navigation navigation";
        grid-template-columns: auto auto 1fr auto;

    }

}

.navigation-hub-btn {

    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;

    justify-content: center;
    @apply rounded-small;

    @media screen and (min-width: 1024px) {
        margin-right: 3rem;
        min-height: 56px;
        width: 56px;
        grid-area: hub;
    }
}

.header__heading-link {
    grid-area: heading;

    @media screen and (min-width: 1024px) {
        justify-self: center;
    }
}

.search__input {
    min-height: 2px;
    height: 5.6rem;
    padding: 1.5rem 2rem;
    padding-right: 9.8rem;
    margin: 1px;
    min-width: calc(7rem + 2px);
}

.header__icons {
    grid-area: icons;
    gap: 1.6rem;

    @media screen and (min-width: 1024px) {
        margin-left: 2.3rem;
    }
}

.header__icon--cart {
    padding: 0;
    padding-left: .07rem;
    margin-right: -1.2rem;
    min-height: 4.4rem;
    min-width: 4.4rem;
}
</style>