<script setup lang="ts">
const items = [
  {
    label: 'Icons',
    icon: 'i-heroicons-face-smile'
  },
  {
    label: 'Colors',
    icon: 'i-heroicons-swatch'
  },
  {
    label: 'Components',
    icon: 'i-heroicons-cube-transparent'
  }
]
</script>

<template>
  <UAccordion :items="items">
    <template #content="{ item }">
      <p class="pb-3.5 text-sm text-gray-500 dark:text-gray-400">
        This is the {{ item.label }} panel.
      </p>
    </template>
  </UAccordion>
</template>
