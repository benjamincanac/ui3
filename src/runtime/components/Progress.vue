<script lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { ProgressRootProps, ProgressRootEmits } from 'radix-vue'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui/progress'

const appConfig = _appConfig as AppConfig & { ui: { progress: Partial<typeof theme> } }

const progress = tv({ extend: tv(theme), ...(appConfig.ui?.progress || {}) })

type ProgressVariants = VariantProps<typeof progress>

export interface ProgressProps extends Omit<ProgressRootProps, 'asChild' | 'max'> {
  animation?: ProgressVariants['animation']
  status?: boolean
  size?: ProgressVariants['size']
  color?: ProgressVariants['color']
  orientation?: ProgressVariants['orientation']
  inverted?: boolean
  max?: number | Array<any>
  class?: any
  ui?: Partial<typeof progress.slots>
}

export interface ProgressEmits extends ProgressRootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ProgressIndicator, ProgressRoot, useForwardPropsEmits } from 'radix-vue'
import { reactivePick } from '@vueuse/core'

const props = withDefaults(defineProps<ProgressProps>(), {
  inverted: false,
  max: 100,
  modelValue: null,
  orientation: 'horizontal'
})
const emits = defineEmits<ProgressEmits>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'getValueLabel', 'max', 'modelValue'), emits)

const isIndeterminate = computed(() => rootProps.value.modelValue === null)
const isSteps = computed(() => Array.isArray(rootProps.value.max))

const realMax = computed(() => {
  if (isIndeterminate.value) {
    return undefined
  }

  if (Array.isArray(rootProps.value.max)) {
    return rootProps.value.max.length - 1
  }

  return Number(rootProps.value.max)
})

const percent = computed(() => {
  if (isIndeterminate.value) {
    return undefined
  }

  switch (true) {
    case rootProps.value.modelValue! < 0: return 0
    case rootProps.value.modelValue! > (realMax.value as number): return 100
    default: return (rootProps.value.modelValue! / (realMax.value as number)) * 100
  }
})

const indicatorDirection = computed(() => {
  function style(dir: 'X' | 'Y', inv: boolean) {
    if (!rootProps.value.modelValue) return undefined

    const direction = inv ? '' : '-'
    return `transform: translate${dir}(${direction}${100 - rootProps.value.modelValue}%);`
  }

  const dir = props.orientation === 'vertical' ? 'Y' : 'X'
  return style(dir, props.inverted)
})

const ui = computed(() => tv({ extend: progress, slots: props.ui })({
  animation: props.animation,
  size: props.size,
  color: props.color,
  orientation: props.orientation
}))
</script>

<template>
  <div :class="ui.wrapper({ class: props.class })">
    <slot v-if="status || $slots.status" name="status" v-bind="{ percent }">
      <div
        v-if="!isSteps"
        :class="ui.statusContainer({ class: props.class })"
        :style="indicatorDirection + `justify-content: ${props.inverted ? 'flex-start' : 'flex-end'};`"
      >
        <div :class="ui.status({ class: props.class })">
          {{ percent && Math.round(percent) }}%
        </div>
      </div>
    </slot>
    <ProgressRoot
      v-bind="rootProps"
      :max="realMax"
      :class="ui.root({ class: props.class })"
      style="transform: translateZ(0)"
    >
      <ProgressIndicator
        :class="ui.indicator({ class: props.class })"
        :style="indicatorDirection"
      />
    </ProgressRoot>
  </div>
</template>
