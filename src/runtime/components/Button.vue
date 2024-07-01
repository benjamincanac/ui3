<script lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui/button'
import type { LinkProps } from './Link.vue'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'

const appConfig = _appConfig as AppConfig & { ui: { button: Partial<typeof theme> } }

const button = tv({ extend: tv(theme), ...(appConfig.ui?.button || {}) })

type ButtonVariants = VariantProps<typeof button>

export interface ButtonProps extends UseComponentIconsProps, Omit<LinkProps, 'raw' | 'custom'> {
  label?: string
  color?: ButtonVariants['color']
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  /** Render the button with equal padding on all sides. */
  square?: boolean
  /** Render the button full width. */
  block?: boolean
  class?: any
  loadingAuto?: boolean
  onClick?: (event: Event) => void | Promise<void>;
  ui?: Partial<typeof button.slots>
}

export interface ButtonSlots {
  leading(props?: {}): any
  default(props?: {}): any
  trailing(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed, ref, inject, type Ref } from 'vue'
import { useForwardProps } from 'radix-vue'
import { useComponentIcons, useButtonGroup } from '#imports'
import { UIcon, ULink } from '#components'
import { pickLinkProps } from '../utils/link'

const props = defineProps<ButtonProps>()
const slots = defineSlots<ButtonSlots>()

const linkProps = useForwardProps(pickLinkProps(props))

const { orientation, size: buttonSize } = useButtonGroup<ButtonProps>(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(computed(() => {
  return { ...props, loading: isLoading.value }
}))

const ui = computed(() => tv({ extend: button, slots: props.ui })({
  color: props.color,
  variant: props.variant,
  size: buttonSize.value,
  loading: isLoading.value,
  block: props.block,
  square: props.square || (!slots.default && !props.label),
  leading: isLeading.value,
  trailing: isTrailing.value,
  buttonGroup: orientation.value
}))

const loadingAutoState = ref(false)
const formLoading = inject<Ref<boolean> | undefined>('form-loading', undefined)

const isLoading = computed(() => {
  console.log(props.loading || (props.loadingAuto && (loadingAutoState.value || (formLoading?.value && props.type === 'submit'))))
  return props.loading || (props.loadingAuto && (loadingAutoState.value || (formLoading?.value && props.type === 'submit')))
})

async function onClickWrapper(event: Event) {
  if (props.onClick) {
  console.log('click', event)
    loadingAutoState.value = true
    await props.onClick(event)
    loadingAutoState.value = false
  }
}
</script>

<template>
  <ULink :type="type" :disabled="disabled || isLoading" :class="ui.base({ class: props.class })" v-bind="linkProps" raw @click="onClickWrapper">
    <slot name="leading">
      <UIcon v-if="isLeading && leadingIconName" :name="leadingIconName" :class="ui.leadingIcon()" />
    </slot>

    <span v-if="label || !!slots.default" :class="ui.label()">
      <slot>
        {{ label }}
      </slot>
    </span>

    <slot name="trailing">
      <UIcon v-if="isTrailing && trailingIconName" :name="trailingIconName" :class="ui.trailingIcon()" />
    </slot>
  </ULink>
</template>
