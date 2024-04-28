<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'

const people = [
  { id: 1, label: 'Wade Cooper', icon: 'i-heroicons-user' },
  { id: 2, label: 'Arlene Mccoy', icon: 'i-heroicons-user' },
  { id: 3, label: 'Devon Webb', icon: 'i-heroicons-user' },
  { id: 4, label: 'Tom Cook', icon: 'i-heroicons-user' },
  { id: 5, label: 'Tanya Fox', icon: 'i-heroicons-user' },
  { id: 6, label: 'Hellen Schmidt', icon: 'i-heroicons-user' },
  { id: 7, label: 'Caroline Schultz', icon: 'i-heroicons-user' },
  { id: 8, label: 'Mason Heaney', icon: 'i-heroicons-user' },
  { id: 9, label: 'Claudie Smitham', icon: 'i-heroicons-user' },
  { id: 10, label: 'Emil Schaefer', icon: 'i-heroicons-user' }
]

const searchTerm = ref('')
const selected = ref(people[3])

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <DefineTemplate>
    <UCommandPalette v-model="selected" v-model:search-term="searchTerm" :groups="[{ label: 'People', items: people }]" class="max-h-80" />
  </DefineTemplate>

  <div class="flex-1 flex flex-col gap-8 w-lg">
    <ReuseTemplate />

    <div class="flex items-center gap-2">
      <UModal>
        <UButton label="Open modal" color="gray" />

        <template #content>
          <ReuseTemplate />
        </template>
      </UModal>

      <UDrawer should-scale-background>
        <UButton label="Open drawer" color="gray" />

        <template #content>
          <ReuseTemplate class="border-t border-gray-200 dark:border-gray-800" />
        </template>
      </UDrawer>

      <UPopover :content="{ side: 'right', align: 'end' }">
        <UButton label="Open popover" color="gray" />

        <template #content>
          <ReuseTemplate :ui="{ input: 'h-10' }" />
        </template>
      </UPopover>
    </div>
  </div>
</template>
