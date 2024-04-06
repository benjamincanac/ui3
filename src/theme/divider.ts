export default {
  slots: {
    base: 'flex items-center align-center text-center',
    border: 'border-gray-200 dark:border-gray-800',
    container: 'font-medium text-gray-700 dark:text-gray-200 flex',
    icon: 'flex-shrink-0 w-6 h-6',
    avatar: 'flex-shrink-0',
    label: 'text-sm'
  },
  variants: {
    orientation: {
      horizontal: {
        base: 'w-full flex-row my-4',
        border: 'w-full border-t',
        container: 'mx-3 whitespace-nowrap'
      },
      vertical: {
        base: 'h-full flex-col mx-4',
        border: 'h-full border-s',
        container: 'my-2'
      }
    },
    type: {
      solid: {
        border: 'border-solid'
      },
      dashed: {
        border: 'border-dashed'
      },
      dotted: {
        border: 'border-dotted'
      }
    }
  },
  defaultVariants: {
    orientation: 'horizontal',
    type: 'solid'
  }
}
