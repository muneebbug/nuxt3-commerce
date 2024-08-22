<template>
  <section :class="{ 'bg-secondary': props.background === 'secondary' }">
    <div :class="classes">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts" setup>

const props = defineProps({
  pageWidth: {
    type: Boolean,
    default: true,
  },
  background: {
    type: String,
    default: '',
  },
});

const classes = computed(() => {
  return {
    'page-width': props.pageWidth
  };
});


</script>
