<script setup lang="ts">
const loading = ref(true)

const items = [{
  label: 'Refresh the Page',
  slot: 'refresh'
}, {
  label: 'Clear Cookies and Refresh'
}, {
  label: 'Clear Cache and Refresh'
}]
</script>

<template>
  <UContextMenu :items="items" class="w-48">
    <div class="flex items-center justify-center rounded-md border border-dashed border-gray-300 dark:border-gray-700 text-sm aspect-video w-72">
      Right click here
    </div>

    <template #refresh-label>
      {{ loading ? 'Refreshing...' : 'Refresh the Page' }}
    </template>

    <template #refresh-trailing>
      <UIcon v-if="loading" name="i-heroicons-arrow-path-20-solid" class="shrink-0 size-5 text-primary-500 dark:text-primary-400 animate-spin" />
    </template>
  </UContextMenu>
</template>
