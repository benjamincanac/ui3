<script setup lang="ts">
import theme from '#build/ui/toaster'

const positions = Object.keys(theme.variants.position)

const { toasts, add, update, remove } = useToast()
const appConfig = useAppConfig()

const count = ref(1)
const last = computed(() => toasts.value[toasts.value.length - 1])

const templates = (n: number) => [{
    title: 'Toast',
    description: `This is the toast ${n}`
  }, {
    title: `Toast ${n}`
  }, {
    description: `This is the toast ${n}`
  }, {
    title: 'Toast',
    description: `This is the toast ${n}`,
    icon: 'i-heroicons-rocket-launch'
  }, {
    title: `Toast ${n}`,
    icon: 'i-heroicons-rocket-launch'
  }, {
    description: `This is the toast ${n}`,
    icon: 'i-heroicons-rocket-launch'
  }, {
    title: 'Toast',
    description: `This is the toast ${n}`,
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    }
  }, {
    title: 'Toast',
    description: `This is the toast ${n}`,
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    },
    actions: [{
      label: 'Action',
      click () {
        console.log('Action clicked')
      }
    }]
  }, {
    title: `Toast ${n}`,
    icon: 'i-heroicons-rocket-launch',
    actions: [{
      label: 'Action',
      color: 'gray' as const,
      click () {
        console.log('Action clicked')
      }
    }]
  }, {
    description: `This is the toast ${n}`,
    icon: 'i-heroicons-rocket-launch',
    actions: [{
      label: 'Action',
      color: 'primary' as const,
      variant: 'outline' as const,
      click () {
        console.log('Action clicked')
      }
    }]
  }]

function addToast () {
  const n = count.value++

  const template = templates(n)[Math.floor(Math.random() * templates(n).length)]

  add({
    ...template,
    click (toast) {
      console.log(`Toast ${toast.id} clicked`)
    }
  })
}

function updateToast () {
  if (!last.value) {
    return
  }

  update(last.value.id, {
    title: 'Toast updated',
    description: `This is the updated toast ${count.value++}`
  })
}

function removeToast () {
  if (!last.value) {
    return
  }

  remove(last.value.id)
}
</script>

<template>
  <div class="flex flex-col items-center gap-8">
    <div>
      <URadioGroup v-model="appConfig.toaster.position" :options="positions" />
      <UCheckbox v-model="appConfig.toaster.expand" label="Expand" class="mt-1" />
      <UInput v-model="appConfig.toaster.duration" label="Duration" type="number" class="mt-1" />
    </div>

    <div class="flex items-center gap-2">
      <UButton label="Add new" color="gray" @click="addToast" />
      <UButton label="Update last" color="gray" @click="updateToast" />
      <UButton label="Remove last" color="gray" @click="removeToast" />
    </div>
  </div>
</template>
