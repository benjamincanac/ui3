import { type InjectionKey } from 'vue'
import { inject, computed } from 'vue'
import type { GetObjectField } from '#ui/types/utils'
import type { ButtonGroupProps } from '../components/ButtonGroup.vue'

export const buttonGroupInjectionKey: InjectionKey<ButtonGroupProps> = Symbol('nuxt-ui.button-group')

type Props<T> = {
  size?: GetObjectField<T, 'size'>
}

export function useButtonGroup<T>(props: Props<T>) {
  const buttonGroup = inject(buttonGroupInjectionKey, undefined)
  const size = computed(() => props?.size ?? buttonGroup?.size)

  return {
    orientation: buttonGroup?.orientation,
    size
  }
}
