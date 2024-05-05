<script lang="ts">
import { provide, computed } from 'vue'
import { tv } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui/button-group'
import type { ButtonProps } from './Button.vue'

const appConfig = _appConfig as AppConfig & { ui: { buttonGroup: Partial<typeof theme> } }

const buttonGroup = tv({ extend: tv(theme), ...(appConfig.ui?.buttonGroup) })

export interface ButtonGroupProps {
  size?: ButtonProps['size']
  class?: any
  ui?: Partial<typeof buttonGroup.slots>
}

export interface ButtonGroupSlots {
  default(): any
}
</script>

<script setup lang="ts">
const props = defineProps<ButtonGroupProps>()
defineSlots<ButtonGroupSlots>()

const ui = computed(() => tv({ extend: buttonGroup, slots: props.ui })())

provide('button-group', {
  size: props.size
})
</script>

<template>
  <div :class="ui.base({ class: props.class })">
    <slot />
  </div>
</template>
