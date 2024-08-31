<template>
  <div class="h-full">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
import { provideUseId } from '@headlessui/vue';

// import type { Cart } from '@/lib/shopify/types';
provideUseId(() => useId());


</script>
