<script lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { ToastProviderProps } from 'radix-vue'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui/toaster'

const appConfig = _appConfig as AppConfig & { ui: { toaster: Partial<typeof theme> } }

const toaster = tv({ extend: tv(theme), ...(appConfig.ui?.toaster || {}) })

type ToasterVariants = VariantProps<typeof toaster>

export interface ToasterProps extends Omit<ToastProviderProps, 'swipeDirection'> {
  position?: ToasterVariants['position']
  class?: any
  ui?: Partial<typeof toaster.slots>
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ToastProvider, ToastViewport, useForwardProps } from 'radix-vue'
import { reactivePick } from '@vueuse/core'
import { useToast } from '#imports'
import { UToast } from '#components'

const props = defineProps<ToasterProps>()

const providerProps = useForwardProps(reactivePick(props, 'duration', 'label', 'swipeThreshold'))

const { toasts, remove } = useToast()

const swipeDirection = computed(() => {
  switch (props.position) {
  case 'top-center':
    return 'up'
  case 'top-right':
  case 'bottom-right':
    return 'right'
  case 'bottom-center':
    return 'down'
  case 'top-left':
  case 'bottom-left':
    return 'left'
  }
  return 'right'
})

const ui = computed(() => tv({ extend: toaster, slots: props.ui })({
  position: props.position,
  swipeDirection: swipeDirection.value
}))
</script>

<template>
  <ToastProvider :swipe-direction="swipeDirection" v-bind="providerProps">
    <UToast v-for="toast of toasts" :key="toast.id" v-bind="toast" :class="ui.base()" />

    <ToastViewport :class="ui.viewport({ class: props.class })" />
  </ToastProvider>
</template>
