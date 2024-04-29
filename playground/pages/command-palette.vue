<script setup lang="ts">
import { createReusableTemplate, refDebounced } from '@vueuse/core'

type User = {
  id: number
  name: string
  email: string
  phone: string
}

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const searchTerm = ref('')
const searchTermDebounced = refDebounced(searchTerm, 200)

const { data: users, pending } = await useFetch<User[]>('https://jsonplaceholder.typicode.com/users', {
  params: { q: searchTermDebounced },
  transform: (data) => {
    return data.map(user => ({ label: user.name }))
  },
  lazy: true
})
</script>

<template>
  <DefineTemplate>
    <UCommandPalette v-model:search-term="searchTerm" :loading="pending" :groups="[{ label: 'Users', items: users }]" class="max-h-80" />
  </DefineTemplate>

  <div class="flex-1 flex flex-col gap-8 w-lg">
    <UCard :ui="{ body: '!p-0' }">
      <ReuseTemplate />
    </UCard>

    <div class="flex items-center justify-between gap-2">
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

      <UPopover :content="{ align: 'start' }">
        <UButton label="Open popover" color="gray" />

        <template #content>
          <ReuseTemplate :ui="{ input: 'h-10' }" />
        </template>
      </UPopover>
    </div>
  </div>
</template>
