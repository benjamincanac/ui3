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
    case rootProps.value.modelValue < 0: return 0
    case rootProps.value.modelValue > (realMax.value as number): return 100
    default: return (rootProps.value.modelValue / (realMax.value as number)) * 100
  }
})

const indicatorDirection = computed(() => {
  function style(dir: 'X' | 'Y', inv: boolean) {
    if (!rootProps.value.modelValue) return undefined

    const direction = inv ? '' : '-'
    return `transform: translate${dir}(${direction}${100 - rootProps.value.modelValue}%)`
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
</template>

<style scoped>
/** These styles are required to animate the bar */
progress:indeterminate {
  @apply relative;

  &:after {
    @apply content-[''];
    @apply absolute inset-0;
    @apply bg-current;
  }

  &::-webkit-progress-value {
    @apply bg-current;
  }

  &::-moz-progress-bar {
    @apply bg-current;
  }

  &.bar-animation-carousel {
    &:after {
      animation: carousel 2s ease-in-out infinite;
    }

    &::-webkit-progress-value {
      animation: carousel 2s ease-in-out infinite;
    }

    &::-moz-progress-bar {
      animation: carousel 2s ease-in-out infinite;
    }
  }

  &.bar-animation-carousel-inverse {
    &:after {
      animation: carousel-inverse 2s ease-in-out infinite;
    }

    &::-webkit-progress-value {
      animation: carousel-inverse 2s ease-in-out infinite;
    }

    &::-moz-progress-bar {
      animation: carousel-inverse 2s ease-in-out infinite;
    }
  }

  &.bar-animation-swing {
    &:after {
      animation: swing 3s ease-in-out infinite;
    }

    &::-webkit-progress-value {
      animation: swing 3s ease-in-out infinite;
    }

    &::-moz-progress-bar {
      animation: swing 3s ease-in-out infinite;
    }
  }

  &.bar-animation-elastic {
    &::after {
      animation: elastic 3s ease-in-out infinite;
    }

    &::-webkit-progress-value {
      animation: elastic 3s ease-in-out infinite;
    }

    &::-moz-progress-bar {
      animation: elastic 3s ease-in-out infinite;
    }
  }
}

@keyframes carousel {

  0%,
  100% {
    width: 50%
  }

  0% {
    transform: translateX(-100%)
  }

  100% {
    transform: translateX(200%)
  }
}

@keyframes carousel-inverse {

  0%,
  100% {
    width: 50%
  }

  0% {
    transform: translateX(200%)
  }

  100% {
    transform: translateX(-100%)
  }
}

@keyframes swing {

  0%,
  100% {
    width: 50%
  }

  0%,
  100% {
    transform: translateX(-25%)
  }

  50% {
    transform: translateX(125%)
  }
}

@keyframes elastic {

  /* Firefox doesn't do "margin: 0 auto", we have to play with margin-left */
  0%,
  100% {
    width: 50%;
    margin-left: 25%;
  }

  50% {
    width: 90%;
    margin-left: 5%
  }
}
</style>
