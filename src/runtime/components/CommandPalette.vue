<script lang="ts">
import { tv } from 'tailwind-variants'
import type { ComboboxRootProps, ComboboxRootEmits } from 'radix-vue'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui/command-palette'
import type { UseComponentIconsProps } from '#ui/composables/useComponentIcons'
import type { AvatarProps, KbdProps, LinkProps } from '#ui/types'
import type { DynamicSlots } from '#ui/types/utils'

const appConfig = _appConfig as AppConfig & { ui: { commandPalette: Partial<typeof theme> } }

const commandPalette = tv({ extend: tv(theme), ...(appConfig.ui?.commandPalette || {}) })

export interface CommandPaletteItem extends Omit<LinkProps, 'type'> {
  label?: string
  icon?: string
  avatar?: AvatarProps
  kbds?: KbdProps['value'][] | KbdProps[]
  disabled?: boolean
  slot?: string
  select? (e: Event): void
}

export interface CommandPaletteGroup<T> {
  label?: string
  items: T[]
}

export interface CommandPaletteProps<T> extends Omit<ComboboxRootProps<T>, 'asChild' | 'dir' | 'open' | 'defaultOpen' | 'name'>, Pick<UseComponentIconsProps, 'icon' | 'loading' | 'loadingIcon'> {
  selectedIcon?: string
  placeholder?: string
  groups?: CommandPaletteGroup<T>[]
  class?: any
  ui?: Partial<typeof commandPalette.slots>
}

export interface CommandPaletteEmits extends ComboboxRootEmits {}

type SlotProps<T> = (props: { item: T, active?: boolean, index: number }) => any

export type CommandPaletteSlots<T extends { slot?: string }> = {
  leading: SlotProps<T>
  label: SlotProps<T>
  trailing: SlotProps<T>
  item: SlotProps<T>
} & DynamicSlots<T, SlotProps<T>>
</script>

<script setup lang="ts" generic="T extends CommandPaletteItem">
import { computed } from 'vue'
import { ComboboxRoot, ComboboxInput, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxLabel, ComboboxItem, useForwardProps, useForwardPropsEmits } from 'radix-vue'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'

const props = withDefaults(defineProps<CommandPaletteProps<T>>(), {
  placeholder: 'Type a command or search...'
})
const emits = defineEmits<CommandPaletteEmits>()
defineSlots<CommandPaletteSlots<T>>()

const appConfig = useAppConfig()
const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultValue', 'disabled', 'displayValue', 'filterFunction', 'modelValue', 'multiple', 'searchTerm'), emits)
const inputProps = useForwardProps(reactivePick(props, 'icon', 'loading', 'loadingIcon', 'placeholder'))

const ui = computed(() => tv({ extend: commandPalette, slots: props.ui })())
</script>

<template>
  <ComboboxRoot v-bind="rootProps" open :class="ui.root({ class: props.class })">
    <ComboboxInput as-child>
      <UInput size="xl" variant="none" v-bind="inputProps" :class="ui.input()" />
    </ComboboxInput>

    <ComboboxContent :class="ui.content()">
      <ComboboxEmpty :class="ui.empty()" />

      <ComboboxGroup v-for="(group, groupIndex) in groups" :key="`group-${groupIndex}`" :class="ui.group()">
        <ComboboxLabel v-if="group.label" :class="ui.label()">
          {{ group.label }}
        </ComboboxLabel>

        <ComboboxItem
          v-for="(item, index) in group.items"
          :key="`group-${groupIndex}-${index}`"
          :value="item"
          :disabled="item.disabled"
          :class="ui.item()"
          @select="item.select"
        >
          {{ item.label }}
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxContent>
  </ComboboxRoot>
</template>
