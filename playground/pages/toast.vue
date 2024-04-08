<script setup lang="ts">
import theme from '#build/ui/toaster'

const positions = Object.keys(theme.variants.position)

const toast = useToast()
const appConfig = useAppConfig()

const notification = ref()
const count = ref(1)

function notify () {
  notification.value = toast.add({
    title: 'Toast',
    description: `This is the toast ${count.value++}`,
    duration: 0
  })
}
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <URadioGroup v-model="appConfig.toaster.position" legend="Position" :options="positions" :ui="{ fieldset: 'flex-row !gap-4' }" />

    <UButton label="Open" color="gray" @click="notify" />
  </div>
</template>
