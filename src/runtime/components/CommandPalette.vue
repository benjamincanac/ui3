<script lang="ts">
import { tv } from 'tailwind-variants'
import type { ComboboxRootProps, ComboboxRootEmits } from 'radix-vue'
import type { AppConfig } from '@nuxt/schema'
import type { UseFuseOptions } from '@vueuse/integrations/useFuse'
import _appConfig from '#build/app.config'
import theme from '#build/ui/command-palette'
import { UInput, UAvatar, UIcon, UKbd } from '#components'
import type { UseComponentIconsProps } from '#ui/composables/useComponentIcons'
import type { AvatarProps, KbdProps } from '#ui/types'
import type { DynamicSlots } from '#ui/types/utils'

const appConfig = _appConfig as AppConfig & { ui: { commandPalette: Partial<typeof theme> } }

const commandPalette = tv({ extend: tv(theme), ...(appConfig.ui?.commandPalette || {}) })

export interface CommandPaletteItem {
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

export interface CommandPaletteProps<T> extends Omit<ComboboxRootProps<T>, 'asChild' | 'dir' | 'open' | 'defaultOpen' | 'name' | 'filterFunction'>, Omit<UseComponentIconsProps, 'leading' | 'trailing'> {
  selectedIcon?: string
  placeholder?: string
  groups?: CommandPaletteGroup<T>[]
  fuse?: UseFuseOptions<T>
  class?: any
  ui?: Partial<typeof commandPalette.slots>
}

export interface CommandPaletteEmits extends ComboboxRootEmits {}

type SlotProps<T> = (props: { item: T, index: number }) => any

export type CommandPaletteSlots<T extends { slot?: string }> = {
  leading: SlotProps<T>
  label: SlotProps<T>
  trailing: SlotProps<T>
  item: SlotProps<T>
} & DynamicSlots<T, SlotProps<T>>
</script>

<script setup lang="ts" generic="T extends CommandPaletteItem">
import { computed } from 'vue'
import { ComboboxRoot, ComboboxInput, ComboboxPortal, ComboboxContent, ComboboxEmpty, ComboboxViewport, ComboboxGroup, ComboboxLabel, ComboboxItem, ComboboxItemIndicator, useForwardPropsEmits } from 'radix-vue'
import { reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { useAppConfig } from '#imports'

const props = withDefaults(defineProps<CommandPaletteProps<T>>(), {
  placeholder: 'Type a command or search...'
})
const emits = defineEmits<CommandPaletteEmits>()
defineSlots<CommandPaletteSlots<T>>()

const appConfig = useAppConfig()
const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultValue', 'disabled', 'displayValue', 'modelValue', 'multiple', 'searchTerm'), emits)

const ui = computed(() => tv({ extend: commandPalette, slots: props.ui })())

const fuse = computed<UseFuseOptions<T>>(() => defu({}, props.fuse, {
  fuseOptions: {
    keys: ['label']
  },
  resultLimit: 12,
  matchAllWhenSearchEmpty: true
}))
</script>

<template>
  <ComboboxRoot v-bind="rootProps" open :class="ui.root({ class: props.class })">
    <ComboboxInput as-child>
      <UInput
        variant="none"
        autofocus
        :icon="icon || appConfig.ui.icons.search"
        :loading="loading"
        :loading-icon="loadingIcon"
        :placeholder="placeholder"
        :class="ui.input()"
      />
    </ComboboxInput>

    <ComboboxPortal :disabled="true">
      <ComboboxContent :class="ui.content()" :dismissable="false">
        <ComboboxEmpty :class="ui.empty()" />

        <ComboboxViewport :class="ui.viewport()">
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
              @select.prevent
            >
              <slot :name="item.slot || 'item'" :item="item" :index="index">
                <slot name="leading" :item="item" :index="index">
                  <UAvatar v-if="item.avatar" size="2xs" v-bind="item.avatar" :class="ui.itemLeadingAvatar()" />
                  <UIcon v-else-if="item.icon" :name="item.icon" :class="ui.itemLeadingIcon()" />
                </slot>

                <span v-if="item.label || $slots.label" :class="ui.itemLabel()">
                  <slot name="label" :item="item" :index="index">
                    {{ item.label }}
                  </slot>
                </span>

                <span :class="ui.itemTrailing()">
                  <slot name="trailing" :item="item" :index="index">
                    <span v-if="item.kbds?.length" :class="ui.itemTrailingKbds()">
                      <UKbd v-for="(kbd, kbdIndex) in item.kbds" :key="kbdIndex" size="md" v-bind="typeof kbd === 'string' ? { value: kbd } : kbd" />
                    </span>

                    <ComboboxItemIndicator as-child>
                      <UIcon :name="selectedIcon || appConfig.ui.icons.check" :class="ui.itemTrailingIcon()" />
                    </ComboboxItemIndicator>
                  </slot>
                </span>
              </slot>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
