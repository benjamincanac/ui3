<script lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { PrimitiveProps } from 'radix-vue'
import type { AvatarProps, IconProps, ButtonProps } from '#ui/types'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui/alert'

const appConfig = _appConfig as AppConfig & { ui: { alert: Partial<typeof theme> } }

const alert = tv({ extend: tv(theme), ...(appConfig.ui?.alert || {}) })

type AlertVariants = VariantProps<typeof alert>

export interface AlertProps extends Omit<PrimitiveProps, 'asChild'> {
  title?: string
  description?: string
  icon?: IconProps['name']
  avatar?: AvatarProps
  color?: AlertVariants['color']
  actions?: ButtonProps[]
  variant?: AlertVariants['variant']
  closable?: boolean
  close?: ButtonProps
  class?: any,
  ui?: Partial<typeof alert.slots>
}

export interface AlertSlots {
  title(): any
  description(): any
  leading(): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'radix-vue'
import { UAvatar, UIcon } from '#components'

const props = withDefaults(defineProps<AlertProps>(), {
  as: 'div'
})

defineSlots<AlertSlots>()

const show = defineModel<boolean>('show', { default: true })

const multiline = computed(() => !!props.title && !!props.description)

const ui = computed(() => tv({ extend: alert, slots: props.ui })({
  color: props.color,
  variant: props.variant
}))

</script>

<template>
  <Primitive v-if="show" :as="as" :class="ui.root({ class: props.class, multiline })">
    <slot name="leading" :avatar="avatar" :icon="icon">
      <UAvatar v-if="avatar" size="2xl" v-bind="avatar" :class="ui.avatar()" />
      <UIcon v-else-if="icon" :name="icon" :class="ui.icon()" />
    </slot>
    
    <div :class="ui.wrapper()">
      <p v-if="(title || $slots.title)" :class="ui.title()">
        <slot name="title" :title="title">
          {{ title }}
        </slot>
      </p>
      <p v-if="description || $slots.description" :class="ui.description()">
        <slot name="description" :description="description">
          {{ description }}
        </slot>
      </p>

      <div v-if="multiline && actions?.length" :class="ui.actions({ multiline: true })">
        <UButton
          v-for="(action, index) in actions"
          :key="index"
          size="xs"
          color="white"
          v-bind="action"
        />
      </div>
    </div>
    <div v-if="(!multiline && actions?.length) || closable || close" :class="ui.actions({ multiline: false })">
      <template v-if="!multiline">
        <UButton
          v-for="(action, index) in actions"
          :key="index"
          size="xs"
          color="white"
          v-bind="action"
        />
      </template>

      <UButton
        v-if="closable"
        :icon="appConfig.ui.icons.close"
        size="sm"
        color="gray"
        variant="link"
        aria-label="Close"
        :class="ui.close()"
        @click.stop="show = !show"
      />
      <UButton
        v-else-if="close"
        v-bind="close"
        :class="ui.close()"
        @click.stop="show = !show"
      />
    </div>
  </Primitive>
</template>
