<script setup lang="ts">
import { NumberFieldInput } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <NumberFieldInput data-slot="input"
    :class="cn('flex w-full font-medium min-w-16 py-0 px-2 rounded-medium border border-input bg-background text-center ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.class)" />
</template>

<style scoped lang="scss">
input {
  min-height: 5rem;

  @media screen and (max-width: 749px) {
    min-height: 50px;
  }

  @media screen and (min-width: 989px) {
    min-height: 5.6rem;
  }
}
</style>