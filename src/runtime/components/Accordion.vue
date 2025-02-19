<script lang="ts">
import { tv } from 'tailwind-variants'
import type { AccordionRootProps, AccordionRootEmits, AccordionItemProps } from 'radix-vue'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui/accordion'
import type { DynamicSlots } from '../types/utils'

const appConfig = _appConfig as AppConfig & { ui: { accordion: Partial<typeof theme> } }

const accordion = tv({ extend: tv(theme), ...(appConfig.ui?.accordion || {}) })

export interface AccordionItem extends Pick<AccordionItemProps, 'disabled'> {
  label?: string
  icon?: string
  trailingIcon?: string
  slot?: string
  content?: string
  /** A unique value for the accordion item. Defaults to the index. */
  value?: string
}

export interface AccordionProps<T> extends Pick<AccordionRootProps, 'collapsible' | 'defaultValue' | 'modelValue' | 'type' | 'disabled'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  items?: T[]
  /**
   * The icon displayed on the right side of the trigger.
   * @defaultValue appConfig.ui.icons.chevronDown
   */
  trailingIcon?: string
  class?: any
  ui?: Partial<typeof accordion.slots>
}

export interface AccordionEmits extends AccordionRootEmits {}

type SlotProps<T> = (props: { item: T, index: number, open: boolean }) => any

export type AccordionSlots<T extends { slot?: string }> = {
  leading: SlotProps<T>
  default: SlotProps<T>
  trailing: SlotProps<T>
  content: SlotProps<T>
  body: SlotProps<T>
} & DynamicSlots<T, SlotProps<T>>
</script>

<script setup lang="ts" generic="T extends AccordionItem">
import { computed } from 'vue'
import { AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent, useForwardPropsEmits } from 'radix-vue'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'

const props = withDefaults(defineProps<AccordionProps<T>>(), {
  type: 'single',
  collapsible: true
})
const emits = defineEmits<AccordionEmits>()
const slots = defineSlots<AccordionSlots<T>>()

const appConfig = useAppConfig()
const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'collapsible', 'defaultValue', 'disabled', 'modelValue', 'type'), emits)

const ui = computed(() => accordion({
  disabled: props.disabled
}))
</script>

<template>
  <AccordionRoot v-bind="rootProps" :class="ui.root({ class: [props.class, props.ui?.root] })">
    <AccordionItem
      v-for="(item, index) in items"
      v-slot="{ open }"
      :key="index"
      :value="item.value || String(index)"
      :disabled="item.disabled"
      :class="ui.item({ class: props.ui?.item })"
    >
      <AccordionHeader :class="ui.header({ class: props.ui?.header })">
        <AccordionTrigger :class="ui.trigger({ class: props.ui?.trigger, disabled: item.disabled })">
          <slot name="leading" :item="item" :index="index" :open="open">
            <UIcon v-if="item.icon" :name="item.icon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
          </slot>

          <span v-if="item.label || !!slots.default" :class="ui.label({ class: props.ui?.label })">
            <slot :item="item" :index="index" :open="open">{{ item.label }}</slot>
          </span>

          <slot name="trailing" :item="item" :index="index" :open="open">
            <UIcon :name="item.trailingIcon || trailingIcon || appConfig.ui.icons.chevronDown" :class="ui.trailingIcon({ class: props.ui?.trailingIcon })" />
          </slot>
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent v-if="item.content || !!slots.content || (item.slot && !!slots[item.slot]) || !!slots.body || (item.slot && !!slots[`${item.slot}-body`])" :class="ui.content({ class: props.ui?.content })">
        <slot :name="item.slot || 'content'" :item="item" :index="index" :open="open">
          <div :class="ui.body({ class: props.ui?.body })">
            <slot :name="item.slot ? `${item.slot}-body`: 'body'" :item="item" :index="index" :open="open">
              {{ item.content }}
            </slot>
          </div>
        </slot>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
