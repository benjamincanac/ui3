<script lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { SliderRootProps, SliderRootEmits } from 'radix-vue'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/ui/slider'
import { useFormField } from '#imports'

const appConfig = _appConfig as AppConfig & { ui: { slider: Partial<typeof theme> } }

const slider = tv({ extend: tv(theme), ...(appConfig.ui?.slider || {}) })

type SliderVariants = VariantProps<typeof slider>

export interface SliderProps extends Omit<SliderRootProps, 'asChild'> {
  size?: SliderVariants['size']
  color?: SliderVariants['color']
  min?: number,
  max?: number,
  step?: number,
  class?: any
  ui?: Partial<typeof slider.slots>
}

export interface SliderEmits extends SliderRootEmits { }

export interface SliderSlots { }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { SliderRoot, SliderRange, SliderTrack, SliderThumb, useForwardPropsEmits } from 'radix-vue'
import { reactivePick } from '@vueuse/core'

const props = withDefaults(defineProps<SliderProps>(), {
  min: 0,
  max: 100,
  step: 1
})

const modelValue = defineModel<number | number[]>()

const sliderValue = computed({
  get () {
    if (typeof modelValue.value === 'number') {
      return [modelValue.value]
    }
    return modelValue.value ?? []
  },
  set (value) {
    modelValue.value = value.length === 1 ? value[0] : value
  }
})


const emits = defineEmits<SliderEmits>()
defineSlots<SliderSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'orientation', 'defaultValue', 'min', 'max', 'step'), emits)

const { inputId, emitFormChange, size, color, name, disabled } = useFormField<SliderProps>(props)

const ui = computed(() => tv({ extend: slider, slots: props.ui })({
  disabled: disabled.value,
  size: size.value,
  color: color.value
}))
</script>

<template>
  <SliderRoot
    v-bind="rootProps"
    :id="inputId"
    v-model="sliderValue"
    :name="name"
    :disabled="disabled"
    :class="ui.root({ class: props.class })"
    @update:model-value="emitFormChange()"
  >
    <SliderTrack :class="ui.track()">
      <SliderRange :class="ui.range()" />
    </SliderTrack>
    <SliderThumb :class="ui.thumb()" />
  </SliderRoot>
</template>
