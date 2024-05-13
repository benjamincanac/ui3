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
  modelValue: null,
  orientation: 'horizontal'
})
const emits = defineEmits<ProgressEmits>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'getValueLabel', 'modelValue'), emits)

const isIndeterminate = computed(() => rootProps.value.modelValue === null)
const isSteps = computed(() => Array.isArray(props.max))

const realMax = computed(() => {
  if (isIndeterminate.value || !props.max) {
    return undefined
  }

  if (Array.isArray(props.max)) {
    return props.max.length - 1
  }

  return Number(props.max)
})

const percent = computed(() => {
  if (isIndeterminate.value) {
    return undefined
  }

  switch (true) {
    case rootProps.value.modelValue! < 0: return 0
    case rootProps.value.modelValue! > (realMax.value ?? 100): return 100
    default: return (rootProps.value.modelValue! / (realMax.value ?? 100)) * 100
  }
})

const indicatorDirection = computed(() => {
  function style(dir: 'X' | 'Y', inv: boolean) {
    if (!rootProps.value.modelValue) return undefined

    const direction = inv ? '' : '-'
    return `transform: translate${dir}(${direction}${100 - Math.round(percent.value!)}%);`
  }

  const dir = props.orientation === 'vertical' ? 'Y' : 'X'
  return style(dir, props.inverted)
})

function isActive(index: number) {
  return index === Number(props.modelValue)
}

function isFirst(index: number) {
  return index === 0
}

function stepVariant(index: number | string) {
  index = Number(index)

  if (isActive(index) && !isFirst(index)) {
    return 'active'
  }

  if (isFirst(index) && isActive(index)) {
    return 'first'
  }

  return 'other'
}

const ui = computed(() => tv({ extend: progress, slots: props.ui })({
  animation: props.animation,
  size: props.size,
  color: props.color,
  orientation: props.orientation
}))
</script>

<template>
  <div :class="ui.root({ class: props.class })">
    <slot v-if="status || $slots.status" name="status" v-bind="{ percent }">
      <div
        v-if="!isSteps"
        :class="ui.statusContainer()"
        :style="indicatorDirection + `justify-content: ${props.inverted ? 'flex-start' : 'flex-end'};`"
      >
        <div :class="ui.status()">
          {{ percent && Math.round(percent) }}%
        </div>
      </div>
    </slot>
    <ProgressRoot
      v-bind="rootProps"
      :max="realMax"
      :class="ui.base()"
      style="transform: translateZ(0)"
    >
      <ProgressIndicator
        :class="ui.indicator()"
        :style="indicatorDirection"
      />
    </ProgressRoot>
    <div v-if="isSteps" :class="ui.stepsContainer()">
      <div v-for="(step, index) in max" :key="index" :class="ui.step({ step: stepVariant(index) })">
        <slot :name="`step-${index}`" v-bind="{ step }">
          {{ step }}
        </slot>
      </div>
    </div>
  </div>
</template>
