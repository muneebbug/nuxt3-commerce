<template>
    <div>
        <select v-model="colorMode.preference" class="border dark:bg-gray-900 dark:text-white dark:border-gray-700">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();

</script>

<style></style>