<script lang="ts">
import { tv } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui/avatar-group'
import type { AvatarProps } from '#ui/types'

const appConfig = _appConfig as AppConfig & { ui: { avatarGroup: Partial<typeof theme> } }

const avatarGroup = tv({ extend: tv(theme), ...(appConfig.ui?.avatarGroup || {}) })

export interface AvatarGroupProps {
  size?: AvatarProps['size']
  max?: number | string
  class?: any
  ui?: Partial<typeof avatarGroup.slots>
}

export interface AvatarGroupSlots {
  default(): any
}
</script>

<script setup lang="ts">
import { computed, h, cloneVNode, type VNode } from 'vue'
import { UAvatar } from '#components'
import { getSlotsChildren } from '#ui/utils'

const props = defineProps<AvatarGroupProps>()
const slots = defineSlots<AvatarGroupSlots>()

const ui = computed(() => tv({ extend: avatarGroup, slots: props.ui })())

const max = computed(() => typeof props.max === 'string' ? Number.parseInt(props.max, 10) : props.max)

const children = computed(() => getSlotsChildren(slots))

const clones = computed(() => children.value.map((node: VNode, index: number) => {
  const vProps: any = {}

  if (!props.max || (max.value && index < max.value)) {
    if (props.size) {
      vProps.size = props.size
    }

    vProps.class = ui.value.base({ class: node.props?.class || '' })

    return cloneVNode(node, vProps)
  }

  if (max.value !== undefined && index === max.value) {
    return h(UAvatar, {
      size: props.size,
      text: `+${children.value.length - max.value}`,
      class: ui.value.base()
    })
  }

  return null
}).filter(Boolean).reverse())

const Render = () => h('div', { class: ui.value.root() }, clones.value)
</script>

<template>
  <Render />
</template>
