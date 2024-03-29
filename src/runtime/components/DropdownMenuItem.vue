<script lang="ts">
import type { DropdownMenuItem } from '#ui/components/DropdownMenu.vue'

interface DropdownMenuItemProps<T> {
  item: T
  active?: boolean
  class?: any
  ui: any
}

type SlotProps<T> = (props: { item: T, active?: boolean }) => any

export interface DropdownMenuItemSlots<T> {
  leading: SlotProps<T>
  label: SlotProps<T>
  trailing: SlotProps<T>
}
</script>

<script setup lang="ts" generic="T extends DropdownMenuItem">
import { useAppConfig } from '#app'
import { UIcon, UAvatar } from '#components'

const props = defineProps<DropdownMenuItemProps<T>>()
defineSlots<DropdownMenuItemSlots<T>>()

const appConfig = useAppConfig()
</script>

<template>
  <slot name="leading" :item="props.item" :active="active">
    <UAvatar v-if="props.item.avatar" size="2xs" v-bind="props.item.avatar" :class="ui.itemLeadingAvatar({ active })" />
    <UIcon v-else-if="props.item.icon" :name="props.item.icon" :class="ui.itemLeadingIcon({ active })" />
  </slot>

  <span v-if="props.item.label || $slots.default" :class="ui.itemLabel()">
    <slot name="label" :item="props.item" :active="active">
      {{ props.item.label }}
    </slot>
  </span>

  <span v-if="$slots.trailing || props.item.children?.length || props.item.shortcuts?.length" :class="ui.itemTrailing()">
    <slot name="trailing" :item="props.item" :active="active">
      <UIcon v-if="props.item.children?.length" :name="appConfig.ui.icons.chevronRight" :class="ui.itemTrailingIcon()" />
      <span v-else-if="props.item.shortcuts?.length" :class="ui.itemTrailingShortcuts()">
        <UKbd v-for="(shortcut, shortcutIndex) in props.item.shortcuts" :key="shortcutIndex" size="sm" v-bind="typeof shortcut === 'string' ? { value: shortcut } : shortcut" />
      </span>
    </slot>
  </span>
</template>
