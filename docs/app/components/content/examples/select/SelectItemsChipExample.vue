<script setup lang="ts">
const items = ref([
  {
    label: 'bug',
    value: 'bug',
    chip: {
      color: 'red' as const
    }
  },
  {
    label: 'enhancement',
    value: 'enhancement',
    chip: {
      color: 'blue' as const
    }
  },
  {
    label: 'feature',
    value: 'feature',
    chip: {
      color: 'violet' as const
    }
  }
])

function getChip(value: string) {
  return items.value.find(item => item.value === value)?.chip
}
</script>

<template>
  <USelect default-value="bug" :items="items" class="w-40">
    <template #leading="{ modelValue, ui }">
      <UChip
        v-if="modelValue"
        v-bind="getChip(modelValue)"
        inset
        standalone
        :size="ui.itemLeadingChipSize()"
        :class="ui.itemLeadingChip()"
      />
    </template>
  </USelect>
</template>
