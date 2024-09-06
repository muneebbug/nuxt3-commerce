<template>
  <footer class="bg-foreground text-white">
    <div
      class="mx-auto items-center flex flex-col w-full max-w-7xl gap-6 px-6 py-12 text-sm md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
      <div>
        <a class="flex items-center gap-2 text-white md:pt-1" href="/">
          <div class="flex flex-none items-center justify-center w-48">
            <img src="/fuel-logo-white.png" alt="">
          </div>
        </a>
      </div>

      <!-- Navigation Links -->
      <nav class="text-center md:text-left">
        <ul class="flex flex-col gap-2 md:flex-row md:gap-12">
          <li v-for="(link, index) in navLinks" :key="index">
            <NuxtLink :to="link.path"
              class="block h6 p-2 text-lg underline-offset-4 hover:underline md:inline-block dark:hover:text-neutral-300">
              {{ link.title }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Footer Bottom -->
    <div class="border-t border-neutral-200 py-6 text-lg dark:border-neutral-700">
      <div
        class="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
        <p>© 2023-2024 FUEL, Inc. All rights reserved.</p>
        <hr class="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block">
        <p><a target="_blank" href="https://github.com/muneebbug/nuxt3-commerce">View the source</a></p>
        <p class="md:ml-auto h6">Created by <a target="_blank" href="https://github.com/muneebbug"
            class="text-white dark:text-white">@muneebbug</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const { getMenu } = useShopify();
import type { Menu } from '~/lib/shopify/types';
const navLinks = ref([]) as Ref<Menu[]>;

colorMode.preference = 'light';
onMounted(async () => {
  navLinks.value = await getMenu('footer');
});
</script>
