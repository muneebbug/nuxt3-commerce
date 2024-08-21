<template>
  <div class="section-header__bar mb-12" :class="{ 'text-center': props.centered }">
    <h2 class="title h2" v-if="props.title !== ''">
      {{ props.title }}
    </h2>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  centered: {
    type: Boolean,
    default: false,
  }
});

</script>

<style></style>