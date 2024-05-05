import { inject, computed } from 'vue'
import type { ButtonProps } from '#ui/types'

export function useButtonGroup(props: { size: ButtonProps['size'] }) {
  const buttonGroup = inject<any>('button-group', undefined)
  const size = computed(() => props?.size ?? buttonGroup?.size)

  return {
    buttonGroup: !!buttonGroup,
    size
  }
}
