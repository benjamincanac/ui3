import { inject, provide, computed, type ComputedRef } from 'vue'
import type { AvatarProps } from '#ui/types'

export function useAvatarGroup(props: { size: AvatarProps['size'] }) {
  const injectedSize = inject<ComputedRef<AvatarProps['size']> | undefined>('avatar-size', undefined)
  const size = computed(() => props.size ?? injectedSize?.value)
  provide('avatar-size', size)

  return {
    size
  }
}
