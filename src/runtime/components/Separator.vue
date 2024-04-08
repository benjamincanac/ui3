<script lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { SeparatorProps as _SeparatorProps } from 'radix-vue'
import type { AvatarProps } from './Avatar.vue'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui/separator'

const appConfig = _appConfig as AppConfig & { ui: { separator: Partial<typeof theme> } }

const separator = tv({ extend: tv(theme), ...(appConfig.ui?.separator || {}) })

type SeparatorVariants = VariantProps<typeof separator>

export interface SeparatorProps extends Omit<_SeparatorProps, 'asChild'> {
  label?: string
  icon?: string
  avatar?: AvatarProps
  decorative?: boolean
  color?: SeparatorVariants['color']
  size?: SeparatorVariants['size']
  type?: SeparatorVariants['type']
  class?: any
  ui?: Partial<typeof separator.slots>
}

export interface SeparatorSlots {
  default(): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Separator, useForwardProps } from 'radix-vue'
import { reactivePick } from '@vueuse/core'
import { UAvatar, UIcon } from '#components'

const props = withDefaults(defineProps<SeparatorProps>(), { as: 'div' })
const rootProps = useForwardProps(reactivePick(props, 'decorative', 'orientation'))
const avatarProps = useForwardProps(reactivePick(props, 'avatar'))

defineSlots<SeparatorSlots>()

const ui = computed(() => tv({ extend: separator, slots: props.ui })({
  color: props.color,
  orientation: props.orientation,
  size: props.size,
  type: props.type
}))
</script>

<template>
  <Separator v-bind="rootProps" :class="ui.root({ class: props.class })">
    <div :class="ui.border()" />
    <template v-if="label || icon || avatar || $slots.default">
      <div :class="ui.container()">
        <slot>
          <span v-if="label" :class="ui.label()">
            {{ label }}
          </span>
          <UIcon v-else-if="icon" :name="icon" :class="ui.icon()" />
          <UAvatar v-else-if="avatarProps" size="2xs" v-bind="avatarProps" :class="ui.avatar()" />
        </slot>
      </div>
    </template>
    <div :class="ui.border()" />
  </Separator>
</template>
