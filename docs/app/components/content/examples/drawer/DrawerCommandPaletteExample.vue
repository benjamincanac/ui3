<script setup lang="ts">
const searchTerm = ref('')

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  params: { q: searchTerm },
  transform: (data: any[]) => {
    return data?.map(user => ({ id: user.id, label: user.name, suffix: user.email, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || []
  },
  lazy: true
})

const groups = computed(() => [{
  id: 'users',
  label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',
  items: users.value || [],
  filter: false
}])
</script>

<template>
  <UDrawer>
    <UButton label="Search users..." color="gray" variant="subtle" icon="i-heroicons-magnifying-glass" />

    <template #content>
      <UCommandPalette
        v-model:search-term="searchTerm"
        :loading="status === 'pending'"
        :groups="groups"
        placeholder="Search users..."
        class="h-96 border-t border-gray-200 dark:border-gray-800"
      />
    </template>
  </UDrawer>
</template>
