<script lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { SeparatorProps } from 'radix-vue'
import type { AvatarProps } from './Avatar.vue'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui/divider'

const appConfig = _appConfig as AppConfig & { ui: { divider: Partial<typeof theme> } }

const divider = tv({ extend: tv(theme), ...(appConfig.ui?.divider || {}) })

type DividerVariants = VariantProps<typeof divider>

export interface DividerProps extends Omit<SeparatorProps, 'asChild'> {
  label?: string
  icon?: string
  avatar?: AvatarProps
  decorative?: boolean
  color?: DividerVariants['color']
  size?: DividerVariants['size']
  type?: DividerVariants['type']
  class?: any
  ui?: Partial<typeof divider.slots>
}

export interface DividerSlots {
  default(): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Separator } from 'radix-vue'
import { UAvatar, UIcon } from '#components'

const props = withDefaults(defineProps<DividerProps>(), { as: 'div' })
defineSlots<DividerSlots>()

const ui = computed(() => tv({ extend: divider, slots: props.ui })({
  color: props.color,
  orientation: props.orientation,
  size: props.size,
  type: props.type
}))
</script>

<template>
  <Separator v-bind="props" :class="ui.root({ class: props.class })">
    <div :class="ui.border()" />
    <template v-if="label || icon || avatar || $slots.default">
      <div :class="ui.container()">
        <slot>
          <span v-if="label" :class="ui.label()">
            {{ label }}
          </span>
          <UIcon v-else-if="icon" :name="icon" :class="ui.icon()" />
          <UAvatar v-else-if="avatar" size="2xs" v-bind="avatar" :class="ui.avatar()" />
        </slot>
      </div>
    </template>
    <div :class="ui.border()" />
  </Separator>
</template>
