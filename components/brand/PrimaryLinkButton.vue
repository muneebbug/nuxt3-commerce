<template>
    <NuxtLink :to="props.to"
        class="button button--primary bg-primary text-foreground inline-flex content-center items-center cursor-pointer break-words rounded-medium">
        <slot />
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    to: {
        type: String,
        default: '',
    },
});
</script>


<style lang="scss">
.button {
    min-width: calc(12rem + 2px);
    min-height: 5.6rem;
    padding: 1rem 3rem;
    line-height: 1.6rem;
    font-weight: 700;

    @media screen and (max-width: 749px) {
        padding: 1rem 2rem;
    }

    @media screen and (min-width: 992px) {
        padding: 1.5rem 5rem;
    }
}
</style>