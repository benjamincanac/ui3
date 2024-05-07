import { computed } from 'vue'
import { useAppConfig } from '#imports'
import type { AvatarProps } from '#ui/types'
import type { GetObjectField } from '#ui/types/utils'

export interface UseComponentIconsProps {
  /** Display an avatar. */
  avatar?: AvatarProps
  /** Display an icon based on the `leading` and `trailing` props. */
  icon?: string
  /** When `true`, the icon will be displayed on the left side. */
  leading?: boolean
  /** Display an icon on the left side. */
  leadingIcon?: string
  /** When `true`, the icon will be displayed on the right side. */
  trailing?: boolean
  /** Display an icon on the right side. */
  trailingIcon?: string
  /** When `true`, the loading icon will be displayed. */
  loading?: boolean
  /**
   * The icon when the `loading` prop is `true`.
   * @defaultValue `appConfig.ui.icons.loading`
   */
  loadingIcon?: string
}

export function useComponentIcons<T>(props: UseComponentIconsProps & { size: GetObjectField<T, 'size'> }) {
  const appConfig = useAppConfig()

  const isLeading = computed(() => !!props.avatar || (props.icon && props.leading) || (props.icon && !props.trailing) || (props.loading && !props.trailing && !props.trailingIcon) || !!props.leadingIcon)
  const isTrailing = computed(() => (props.icon && props.trailing) || (props.loading && props.trailing) || !!props.trailingIcon)

  const leadingIconName = computed(() => {
    if (props.loading) {
      return props.loadingIcon || appConfig.ui.icons.loading
    }

    return props.leadingIcon || props.icon
  })
  const trailingIconName = computed(() => {
    if (props.loading && !isLeading.value) {
      return props.loadingIcon || appConfig.ui.icons.loading
    }

    return props.trailingIcon || props.icon
  })

  const avatarSize = computed<AvatarProps['size']>(() => {
    return ({
      xs: '3xs' as const,
      sm: '3xs' as const,
      md: '2xs' as const,
      lg: '2xs' as const,
      xl: 'xs' as const
    })[props.size || 'md']
  })

  return {
    isLeading,
    isTrailing,
    leadingIconName,
    trailingIconName,
    avatarSize
  }
}
