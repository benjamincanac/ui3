<script lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui/chip'

const appConfig = _appConfig as AppConfig & { ui: { chip: Partial<typeof theme> } }

const chip = tv({ extend: tv(theme), ...(appConfig.ui?.chip || {}) })

type ChipVariants = VariantProps<typeof chip>

export interface ChipProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /** Display some text inside the chip. */
  text?: string | number
  color?: ChipVariants['color']
  size?: ChipVariants['size']
  position?: ChipVariants['position']
  /** When `true`, translate the chip at the edge for non rounded elements. */
  inset?: boolean
  /** When `true`, render the chip relatively to the parent. */
  standalone?: boolean
  class?: any
  ui?: Partial<typeof chip.slots>
}

export interface ChipEmits {
  (e: 'update:show', payload: boolean): void
}

export interface ChipSlots {
  default(props?: {}): any
  content(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'radix-vue'
import { useAvatarGroup } from '../composables/useAvatarGroup'

const props = withDefaults(defineProps<ChipProps>(), {
  inset: false,
  standalone: false
})
defineSlots<ChipSlots>()

const show = defineModel<boolean>('show', { default: true })

const { size } = useAvatarGroup(props)

const ui = computed(() => chip({
  color: props.color,
  size: size.value,
  position: props.position,
  inset: props.inset,
  standalone: props.standalone
}))
</script>

<template>
  <Primitive :as="as" :class="ui.root({ class: [props.class, props.ui?.root] })">
    <slot />

    <span v-if="show" :class="ui.base({ class: props.ui?.base })">
      <slot name="content">
        {{ text }}
      </slot>
    </span>
  </Primitive>
</template>
