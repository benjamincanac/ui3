<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <UModal v-model:open="open" title="Modal with footer" description="This is useful when you want a form in a Modal." :ui="{ footer: 'justify-end' }">
    <UButton label="Open" color="gray" variant="subtle" />

    <template #body>
      <Placeholder class="h-48" />
    </template>

    <template #footer>
      <UButton label="Cancel" color="gray" variant="outline" @click="open = false" />
      <UButton label="Submit" color="gray" />
    </template>
  </UModal>
</template>
