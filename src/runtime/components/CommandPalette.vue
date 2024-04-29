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
  prefix?: string
  label?: string
  suffix?: string
  icon?: string
  avatar?: AvatarProps
  kbds?: KbdProps['value'][] | KbdProps[]
  disabled?: boolean
  slot?: string
  select? (e: Event): void
}

export interface CommandPaletteGroup<T> {
  key: string
  label?: string
  items?: T[]
}

export interface CommandPaletteProps<T> extends Omit<ComboboxRootProps<CommandPaletteItem>, 'asChild' | 'dir' | 'open' | 'defaultOpen' | 'name' | 'filterFunction' | 'searchTerm' | 'displayValue'>, Omit<UseComponentIconsProps, 'leading' | 'trailing'> {
  selectedIcon?: string
  placeholder?: string
  groups?: CommandPaletteGroup<T>[]
  fuse?: UseFuseOptions<T>
  class?: any
  ui?: Partial<typeof commandPalette.slots>
}

export type CommandPaletteEmits<T> = Omit<ComboboxRootEmits<T>, 'update:open'>

type SlotProps<T> = (props: { item: T, index: number }) => any

export type CommandPaletteSlots<T extends { slot?: string }> = {
  empty(props: { searchTerm: string }): any
  leading: SlotProps<T>
  label: SlotProps<T>
  trailing: SlotProps<T>
  item: SlotProps<T>
} & DynamicSlots<T, SlotProps<T>>
</script>

<script setup lang="ts" generic="T extends CommandPaletteItem">
import { computed } from 'vue'
import { ComboboxRoot, ComboboxInput, ComboboxPortal, ComboboxContent, ComboboxEmpty, ComboboxViewport, ComboboxGroup, ComboboxLabel, ComboboxItem, ComboboxItemIndicator, useForwardPropsEmits } from 'radix-vue'
import { defu } from 'defu'
import { reactivePick } from '@vueuse/core'
import { useFuse } from '@vueuse/integrations/useFuse'
import { useAppConfig } from '#imports'
import { omit } from '#ui/utils'

const props = withDefaults(defineProps<CommandPaletteProps<T>>(), {
  // @ts-expect-error - Prevents selection when no `v-model` is provided
  modelValue: '',
  placeholder: 'Type a command or search...'
})
const emits = defineEmits<CommandPaletteEmits<T>>()
defineSlots<CommandPaletteSlots<T>>()

const searchTerm = defineModel<string>('searchTerm', { default: '' })

const appConfig = useAppConfig()
const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'disabled', 'multiple', 'defaultValue', 'modelValue'), emits)

const ui = computed(() => tv({ extend: commandPalette, slots: props.ui })())

const fuse = computed<UseFuseOptions<T>>(() => defu({}, props.fuse, {
  fuseOptions: {
    ignoreLocation: true,
    includeMatches: true,
    keys: ['label', 'suffix']
  },
  resultLimit: 12,
  matchAllWhenSearchEmpty: true
}))

const items = computed(() => props.groups?.flatMap(group => group.items?.map(item => ({ ...item, group: group.key })) || []) || [])

const { results } = useFuse(searchTerm, items, fuse)

const groups = computed(() => {
  if (!results.value?.length) {
    return []
  }

  const groups: Record<string, T[]> = results.value.reduce((acc, result) => {
    const { item, matches } = result
    if (!item.group) {
      return acc
    }

    acc[item.group] ||= []
    acc[item.group].push({ ...item, matches })

    return acc
  }, {})

  return Object.entries(groups).map(([key, items]) => {
    const group = props.groups?.find(group => group.key === key)
    if (!group) {
      return
    }

    return {
      ...group,
      items: items.slice(0, fuse.value.resultLimit)
    }
  }).filter(Boolean)
})

function highlight(text: string, fallback: string, { indices, value }: { indices: number[][], value: string }): string {
  if (text === value) {
    return fallback
  }

  let content = ''
  let nextUnhighlightedIndiceStartingIndex = 0

  indices.forEach((indice) => {
    const lastIndiceNextIndex = indice[1] + 1
    const isMatched = (lastIndiceNextIndex - indice[0]) >= searchTerm.value.length

    content += [
      value.substring(nextUnhighlightedIndiceStartingIndex, indice[0]),
      isMatched && '<mark>',
      value.substring(indice[0], lastIndiceNextIndex),
      isMatched && '</mark>'
    ].filter(Boolean).join('')

    nextUnhighlightedIndiceStartingIndex = lastIndiceNextIndex
  })

  content += value.substring(nextUnhighlightedIndiceStartingIndex)

  const index = content.indexOf('<mark>')
  if (index > 60) {
    content = `...${content.substring(index - 60)}`
  }

  return content || fallback
}
</script>

<template>
  <ComboboxRoot v-bind="rootProps" v-model:search-term="searchTerm" open :class="ui.root({ class: props.class })">
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
        <ComboboxEmpty :class="ui.empty()">
          <slot name="empty" :search-term="searchTerm">
            {{ searchTerm ? `No results for ${searchTerm}` : 'No results' }}
          </slot>
        </ComboboxEmpty>

        <ComboboxViewport :class="ui.viewport()">
          <ComboboxGroup v-for="(group, groupIndex) in groups" :key="`group-${groupIndex}`" :class="ui.group()">
            <ComboboxLabel v-if="group!.label" :class="ui.label()">
              {{ group!.label }}
            </ComboboxLabel>

            <ComboboxItem
              v-for="(item, index) in group!.items"
              :key="`group-${groupIndex}-${index}`"
              :value="omit(item, ['select', 'matches' as any])"
              :disabled="item.disabled"
              :class="ui.item()"
              @select="item.select"
            >
              <slot :name="item.slot || 'item'" :item="item" :index="index">
                <slot name="leading" :item="item" :index="index">
                  <slot :name="`${group!.key}-leading`" :item="item" :index="index">
                    <UAvatar v-if="item.avatar" size="2xs" v-bind="item.avatar" :class="ui.itemLeadingAvatar()" />
                    <UIcon v-else-if="item.icon" :name="item.icon" :class="ui.itemLeadingIcon()" />
                  </slot>
                </slot>

                <span v-if="item.label || $slots[`${group.key}-label`] || $slots.label" :class="ui.itemLabel()">
                  <slot name="label" :item="item" :index="index">
                    <slot :name="`${group!.key}-label`" :item="item" :index="index">
                      <span v-if="item.prefix" :class="ui.itemLabelPrefix()">{{ item.prefix }}</span>

                      {{ item.label }}

                      <!-- eslint-disable-next-line vue/no-v-html -->
                      <span v-if="item.matches?.length" :class="ui.itemLabelSuffix()" v-html="highlight(item.label, item.suffix, item.matches[0])" />
                      <span v-else-if="item.suffix" :class="ui.itemLabelSuffix()">{{ item.suffix }}</span>
                    </slot>
                  </slot>
                </span>

                <span :class="ui.itemTrailing()">
                  <slot name="trailing" :item="item" :index="index">
                    <slot :name="`${group!.key}-trailing`" :item="item" :index="index">
                      <span v-if="item.kbds?.length" :class="ui.itemTrailingKbds()">
                        <UKbd v-for="(kbd, kbdIndex) in item.kbds" :key="kbdIndex" size="md" v-bind="typeof kbd === 'string' ? { value: kbd } : kbd" />
                      </span>

                      <ComboboxItemIndicator as-child>
                        <UIcon :name="selectedIcon || appConfig.ui.icons.check" :class="ui.itemTrailingIcon()" />
                      </ComboboxItemIndicator>
                    </slot>
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
