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
import { computed, provide } from 'vue'

const props = defineProps<AvatarGroupProps>()
const slots = defineSlots<AvatarGroupSlots>()

const ui = computed(() => tv({ extend: avatarGroup, slots: props.ui })({
  size: props.size
}))

const max = computed(() => typeof props.max === 'string' ? Number.parseInt(props.max, 10) : props.max)

const visibleAvatars = computed(() => {
  const avatars = slots.default()
  if (!max.value || max.value <= 0) return avatars.reverse()

  return avatars.slice(0, max.value).reverse()
})

const hiddenCount = computed(() => {
  return slots.default().length - visibleAvatars.value.length
})

provide('avatar-size', computed(() => props.size))
</script>

<template>
  <div :class="ui.root()">
    <UAvatar v-if="hiddenCount > 0" :text="`+${hiddenCount}`" :class="ui.base()" />
    <component :is="avatar" v-for="(avatar, count) in visibleAvatars" :key="count" :class="ui.base()" />
  </div>
</template>
