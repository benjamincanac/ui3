<script setup lang="ts">
import { refDebounced } from '@vueuse/core'

import type { User } from '~/types'

const fruits = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek']

const { data: users2 } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  transform: (data: User[]) => {
    return data?.map(user => ({ id: user.id, label: user.name, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || []
  }
})

const searchTerm = ref('')
const searchTermDebounced = refDebounced(searchTerm, 200)

const { data: users3, pending } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  params: { q: searchTermDebounced },
  transform: (data: User[]) => {
    return data?.map(user => ({ id: user.id, label: user.name, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || []
  }
})

const statuses = [{
  label: 'Backlog',
  icon: 'i-heroicons-question-mark-circle'
}, {
  label: 'To Do',
  icon: 'i-heroicons-plus-circle'
}, {
  label: 'In Progress',
  icon: 'i-heroicons-arrow-up-circle'
}, {
  label: 'Done',
  icon: 'i-heroicons-check-circle'
}, {
  label: 'Canceled',
  icon: 'i-heroicons-x-circle'
}]

const selected1 = ref(fruits[0])
const selected2 = ref(users2.value![0])
const selected3 = ref(users3.value![0])
const status = ref()
</script>

<template>
  <div class="flex flex-col gap-4 w-48">
    <UInputMenu v-model="selected1" :items="[[{ label: 'Fruits', type: 'label' }, ...fruits], [{ label: 'Vegetables', type: 'label' }, ...vegetables]]" />

    <UInputMenu v-model="selected2" :items="users2!" />

    <UInputMenu v-model="selected3" v-model:search-term="searchTerm" :items="users3!" :loading="pending" :filter="false" />

    <UInputMenu v-model="status" :items="statuses" placeholder="Search status..." icon="i-heroicons-magnifying-glass" trailing-icon="i-heroicons-chevron-up-down-20-solid" />
  </div>
</template>
