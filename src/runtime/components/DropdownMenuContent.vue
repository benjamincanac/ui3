<script lang="ts">
import type { DropdownMenuContentProps as RadixDropdownMenuContentProps, DropdownMenuContentEmits as RadixDropdownMenuContentEmits } from 'radix-vue'
import type { DropdownMenuItem } from '#ui/components/DropdownMenu.vue'
import type { DropdownMenuItemSlots } from '#ui/components/DropdownMenuItem.vue'

interface DropdownMenuContentProps<T> extends Omit<RadixDropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> {
  items?: T[] | T[][]
  portal?: boolean
  sub?: boolean
  class?: any
  ui: any
}

interface DropdownMenuContentEmits extends RadixDropdownMenuContentEmits {}

interface DropdownMenuContentSlots<T> extends DropdownMenuItemSlots<T> {
  default(): any
}
</script>

<script setup lang="ts" generic="T extends DropdownMenuItem">
import { computed } from 'vue'
import { DropdownMenu } from 'radix-vue/namespaced'
import { useForwardPropsEmits } from 'radix-vue'
import { reactiveOmit } from '@vueuse/core'
import { ULink, UDropdownMenuItem } from '#components'
import { omit } from '#ui/utils'

const props = defineProps<DropdownMenuContentProps<T>>()
const emits = defineEmits<DropdownMenuContentEmits>()
const slots = defineSlots<DropdownMenuContentSlots<T>>()

const contentProps = useForwardPropsEmits(reactiveOmit(props, 'sub', 'items', 'portal', 'class', 'ui'), emits)
const proxySlots = omit(slots, ['default'])

const groups = computed(() => props.items?.length ? (Array.isArray(props.items[0]) ? props.items : [props.items]) as T[][] : [])
</script>

<template>
  <DropdownMenu.Portal :disabled="!portal">
    <component :is="sub ? DropdownMenu.SubContent : DropdownMenu.Content" :class="props.class" v-bind="contentProps">
      <DropdownMenu.Group v-for="(group, index) in groups" :key="`group-${index}`" :class="ui.group()">
        <template v-for="(item, itemIndex) in group" :key="`group-${index}-${itemIndex}`">
          <DropdownMenu.Label v-if="item.type === 'label'" :class="ui.label()">
            <UDropdownMenuItem :item="item" :ui="ui">
              <template v-for="(_, name) in proxySlots" #[name]="slotData: any">
                <slot :name="name" v-bind="slotData" />
              </template>
            </UDropdownMenuItem>
          </DropdownMenu.Label>
          <DropdownMenu.Sub v-else-if="item?.children?.length">
            <DropdownMenu.SubTrigger
              as="button"
              type="button"
              :disabled="item.disabled"
              :open="item.open"
              :default-open="item.defaultOpen"
              :text-value="item.label"
              :class="ui.item()"
            >
              <UDropdownMenuItem :item="item" :ui="ui">
                <template v-for="(_, name) in proxySlots" #[name]="slotData: any">
                  <slot :name="name" v-bind="slotData" />
                </template>
              </UDropdownMenuItem>
            </DropdownMenu.SubTrigger>

            <UDropdownMenuContent
              sub
              :class="props.class"
              :ui="ui"
              :portal="portal"
              :items="item.children"
              side="right"
              align="start"
              :align-offset="-4"
              :side-offset="3"
              v-bind="item.content"
            >
              <template v-for="(_, name) in proxySlots" #[name]="slotData: any">
                <slot :name="name" v-bind="slotData" />
              </template>
            </UDropdownMenuContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Item v-else as-child :disabled="item.disabled" :text-value="item.label" @select="item.select">
            <ULink v-slot="{ active, ...slotProps }" v-bind="omit((item as DropdownMenuItem), ['label', 'icon', 'avatar', 'shortcuts', 'slot', 'open', 'defaultOpen', 'select', 'children', 'type'])" custom>
              <ULinkBase v-bind="slotProps" :class="ui.item({ active })">
                <UDropdownMenuItem :item="item" :active="active" :ui="ui">
                  <template v-for="(_, name) in proxySlots" #[name]="slotData: any">
                    <slot :name="name" v-bind="slotData" />
                  </template>
                </UDropdownMenuItem>
              </ULinkBase>
            </ULink>
          </DropdownMenu.Item>
        </template>
      </DropdownMenu.Group>

      <slot />
    </component>
  </DropdownMenu.Portal>
</template>
