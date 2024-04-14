<script setup lang="ts">
import theme from '#build/ui/switch'

const sizes = Object.keys(theme.variants.size)
const checked = ref(false)
</script>

<template>
  <div class="grid grid-cols-6 gap-4 items-center">
    <USwitch v-for="size in sizes" :key="size" v-model:checked="checked" :size="(size as any)" label="Switch me" />
    <USwitch
      v-for="size in sizes"
      :key="size"
      v-model:checked="checked"
      :size="(size as any)"
      label="Switch me"
      description="This is a description"
    />
    <USwitch
      v-for="size in sizes"
      :key="size"
      v-model:checked="checked"
      :size="(size as any)"
      label="Switch me"
      unchecked-icon="i-heroicons-x-mark-20-solid"
      checked-icon="i-heroicons-check-20-solid"
    />
    <USwitch
      v-for="size in sizes"
      :key="size"
      v-model:checked="checked"
      :size="(size as any)"
      label="Switch me"
      unchecked-icon="i-heroicons-x-mark-20-solid"
      checked-icon="i-heroicons-check-20-solid"
      loading
    />
    <USwitch v-model:checked="checked" label="Switch me" disabled />
  </div>
</template>
