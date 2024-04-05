<script lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { SeparatorProps } from 'radix-vue'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui/divider'

const appConfig = _appConfig as AppConfig & { ui: { divider: Partial<typeof theme> } }

const divider = tv({ extend: tv(theme), ...(appConfig.ui?.divider || {}) })

type DividerVariants = VariantProps<typeof divider>

export interface DividerProps extends Omit<SeparatorProps, 'asChild'> {
  class?: any
  decorative?: boolean
  orientation?: DividerVariants['orientation']
  ui?: Partial<typeof divider.slots>
}

export interface DividerSlots {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Separator } from 'radix-vue'

const props = withDefaults(defineProps<DividerProps>(), {
  as: 'div',
  orientation: 'horizontal'
})

const ui = computed(() => tv({ extend: divider, slots: props.ui })({
  orientation: props.orientation
}))
</script>

<template>
  <Separator v-bind="props" :class="ui.base({ class: props.class })" />
</template>
