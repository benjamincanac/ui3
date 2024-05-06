<script setup lang="ts">
const links = [{
  label: 'Home',
  to: '/'
}, {
  slot: 'dropdown' as const,
  icon: 'i-heroicons-ellipsis-horizontal',
  children: [{
    label: 'Documentation'
  }, {
    label: 'Themes'
  }, {
    label: 'GitHub'
  }]
}, {
  label: 'Components',
  disabled: true
}, {
  label: 'Breadcrumb'
}]
</script>

<template>
  <UBreadcrumb :links="links">
    <template #dropdown="{ link }">
      <UDropdownMenu :items="link.children">
        <UButton :icon="link.icon" color="gray" variant="link" class="p-0" />
      </UDropdownMenu>
    </template>
  </UBreadcrumb>
</template>
