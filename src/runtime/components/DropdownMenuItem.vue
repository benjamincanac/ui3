<script lang="ts">
import type { DropdownMenuItem } from '#ui/components/DropdownMenu.vue'

interface DropdownMenuItemProps<T> {
  item: T
  active?: boolean
  class?: any
  ui: any
}

type SlotProps<T> = (props: { item: T, active: boolean }) => any

export interface DropdownMenuItemSlots<T> {
  leading: SlotProps<T>
  label: SlotProps<T>
  trailing: SlotProps<T>
}
</script>

<script setup lang="ts" generic="T extends DropdownMenuItem">
import { useForwardProps } from 'radix-vue'
import { reactiveOmit } from '@vueuse/core'
import { useAppConfig } from '#app'
import { UIcon, UAvatar, ULinkBase } from '#components'

const props = defineProps<DropdownMenuItemProps<T>>()
defineSlots<DropdownMenuItemSlots<T>>()

const appConfig = useAppConfig()
const linkProps = useForwardProps(reactiveOmit(props, 'item', 'active', 'ui', 'class'))
</script>

<template>
  <ULinkBase v-bind="linkProps" :class="props.class">
    <slot name="leading" :item="item" :active="active">
      <UAvatar v-if="item.avatar" size="2xs" v-bind="item.avatar" :class="ui.itemLeadingAvatar({ active })" />
      <UIcon v-else-if="item.icon" :name="item.icon" :class="ui.itemLeadingIcon({ active })" />
    </slot>

    <span v-if="item.label || $slots.default" :class="ui.itemLabel()">
      <slot name="label" :item="item" :active="active">
        {{ item.label }}
      </slot>
    </span>

    <span v-if="$slots.trailing || item.children?.length || item.shortcuts?.length" :class="ui.itemTrailing()">
      <slot name="trailing" :item="item" :active="active">
        <UIcon v-if="item.children?.length" :name="appConfig.ui.icons.chevronRight" :class="ui.itemTrailingIcon()" />
        <span v-else-if="item.shortcuts?.length" :class="ui.itemTrailingShortcuts()">
          <UKbd v-for="(shortcut, shortcutIndex) in item.shortcuts" :key="shortcutIndex" size="sm" v-bind="typeof shortcut === 'string' ? { value: shortcut } : shortcut" />
        </span>
      </slot>
    </span>
  </ULinkBase>
</template>
