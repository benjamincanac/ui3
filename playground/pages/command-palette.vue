<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'

type User = {
  id: number
  name: string
  email: string
  phone: string
}

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
const toast = useToast()

const searchTerm = ref('')
// const searchTermDebounced = refDebounced(searchTerm, 200)
const selected = ref([])

const { data: users, pending } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  // params: { q: searchTermDebounced },
  transform: (data: User[]) => {
    return data?.map(user => ({ icon: 'i-heroicons-user', label: user.name, suffix: user.email })) || []
  },
  lazy: true
})

const groups = computed(() => [{
  key: 'users',
  label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',
  items: users.value!
}, {
  key: 'actions',
  items: [{
    id: 'new-file',
    label: 'Add new file',
    icon: 'i-heroicons-document-plus',
    select: (e: Event) => {
      e.preventDefault()
      toast.add({ title: 'New file added!' })
    },
    kbds: ['meta', 'N']
  }, {
    id: 'new-folder',
    label: 'Add new folder',
    icon: 'i-heroicons-folder-plus',
    select: (e: Event) => {
      e.preventDefault()
      toast.add({ title: 'New folder added!' })
    },
    kbds: ['meta', 'F']
  }, {
    id: 'hashtag',
    label: 'Add hashtag',
    icon: 'i-heroicons-hashtag',
    select: (e) => {
      e.preventDefault()
      toast.add({ title: 'Hashtag added!' })
    },
    kbds: ['meta', 'H']
  }, {
    id: 'label',
    label: 'Add label',
    icon: 'i-heroicons-tag',
    select: (e) => {
      e.preventDefault()
      toast.add({ title: 'Label added!' })
    },
    kbds: ['meta', 'L']
  }]
}])

function onSelect(item: any) {
  console.log(item)
}
</script>

<template>
  <DefineTemplate>
    <UCommandPalette
      v-model="selected"
      v-model:search-term="searchTerm"
      multiple
      :loading="pending"
      :groups="groups"
      :fuse="{ fuseOptions: { threshold: 0.2 } }"
      class="max-h-80"
      @update:model-value="onSelect"
    />
  </DefineTemplate>

  <div class="flex-1 flex flex-col gap-8 w-lg">
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

      <UPopover :content="{ side: 'right', align: 'start' }">
        <UButton label="Open popover" color="gray" />

        <template #content>
          <ReuseTemplate :ui="{ input: 'h-10' }" placeholder="Search..." class="w-48" />
        </template>
      </UPopover>
    </div>

    <UCard :ui="{ body: '!p-0' }">
      <ReuseTemplate />
    </UCard>
  </div>
</template>
