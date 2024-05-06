<script lang="ts">
import { tv } from 'tailwind-variants'
import type { NavigationMenuRootProps, NavigationMenuRootEmits, NavigationMenuItemProps } from 'radix-vue'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui/navigation-menu'
import type { AvatarProps, BadgeProps, LinkProps, SeparatorProps } from '#ui/types'
import type { DynamicSlots } from '#ui/types/utils'

const appConfig = _appConfig as AppConfig & { ui: { navigationMenu: Partial<typeof theme> } }

const navigationMenu = tv({ extend: tv(theme), ...(appConfig.ui?.navigationMenu || {}) })

export interface NavigationMenuLink extends LinkProps, Pick<NavigationMenuItemProps, 'value'> {
  label?: string
  icon?: string
  avatar?: AvatarProps
  badge?: string | number | BadgeProps
  slot?: string
  select? (e: MouseEvent): void
}

export interface NavigationMenuProps<T> extends Omit<NavigationMenuRootProps, 'asChild' | 'dir'> {
  links?: T[] | T[][]
  separator?: SeparatorProps
  class?: any
  ui?: Partial<typeof navigationMenu.slots>
}

export interface NavigationMenuEmits extends NavigationMenuRootEmits {}

type SlotProps<T> = (props: { link: T, index: number, active?: boolean }) => any

export type NavigationMenuSlots<T extends { slot?: string }> = {
  'link': SlotProps<T>
  'link-leading': SlotProps<T>
  'link-label': SlotProps<T>
  'link-trailing': SlotProps<T>
} & DynamicSlots<T, SlotProps<T>>
</script>

<script setup lang="ts" generic="T extends NavigationMenuLink">
import { computed } from 'vue'
import { NavigationMenuRoot, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, useForwardPropsEmits } from 'radix-vue'
import { reactivePick } from '@vueuse/core'
import { UIcon, UAvatar, UBadge, ULink, ULinkBase } from '#components'
import { omit } from '#ui/utils'

const props = withDefaults(defineProps<NavigationMenuProps<T>>(), { orientation: 'horizontal' })
const emits = defineEmits<NavigationMenuEmits>()
defineSlots<NavigationMenuSlots<T>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'modelValue', 'defaultValue', 'delayDuration', 'skipDelayDuration', 'orientation'), emits)

const ui = computed(() => tv({ extend: navigationMenu, slots: props.ui })({ orientation: props.orientation }))

const lists = computed(() => props.links?.length ? (Array.isArray(props.links[0]) ? props.links : [props.links]) as T[][] : [])
</script>

<template>
  <NavigationMenuRoot v-bind="rootProps" :class="ui.root({ class: props.class })">
    <template v-for="(list, listIndex) in lists" :key="`list-${listIndex}`">
      <NavigationMenuList :class="ui.list()">
        <NavigationMenuItem v-for="(link, index) in list" :key="`list-${listIndex}-${index}`" :value="link.value || String(index)" :class="ui.item()">
          <ULink v-slot="{ active, ...slotProps }" v-bind="omit(link, ['label', 'value', 'icon', 'avatar', 'badge', 'slot', 'select'])" custom>
            <NavigationMenuLink as-child :active="active" @select="link.select">
              <ULinkBase v-bind="slotProps" :class="ui.link({ active, disabled: !!link.disabled })">
                <slot :name="link.slot || 'link'" :link="link" :index="index">
                  <slot :name="link.slot ? `${link.slot}-leading`: 'link-leading'" :link="link" :active="active" :index="index">
                    <UAvatar v-if="link.avatar" size="2xs" v-bind="link.avatar" :class="ui.linkLeadingAvatar({ active, disabled: !!link.disabled })" />
                    <UIcon v-else-if="link.icon" :name="link.icon" :class="ui.linkLeadingIcon({ active, disabled: !!link.disabled })" />
                  </slot>

                  <span v-if="link.label || $slots[link.slot ? `${link.slot}-label`: 'link-label']" :class="ui.linkLabel()">
                    <slot :name="link.slot ? `${link.slot}-label`: 'link-label'" :link="link" :active="active" :index="index">
                      {{ link.label }}
                    </slot>
                  </span>

                  <span v-if="link.badge || $slots[link.slot ? `${link.slot}-trailing`: 'link-trailing']" :class="ui.linkTrailing()">
                    <slot :name="link.slot ? `${link.slot}-trailing`: 'link-trailing'" :link="link" :active="active" :index="index">
                      <UBadge
                        v-if="link.badge"
                        color="white"
                        size="sm"
                        v-bind="(typeof link.badge === 'string' || typeof link.badge === 'number') ? { label: link.badge } : link.badge"
                        :class="ui.linkTrailingBadge()"
                      />
                    </slot>
                  </span>
                </slot>
              </ULinkBase>
            </NavigationMenuLink>
          </ULink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <USeparator v-if="orientation === 'vertical' && listIndex < lists.length - 1" v-bind="separator" orientation="horizontal" :class="ui.separator()" />
    </template>
  </NavigationMenuRoot>
</template>
