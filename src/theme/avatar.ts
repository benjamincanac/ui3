export default {
  slots: {
    root: '@container/avatar inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-full align-middle bg-gray-100 dark:bg-gray-800',
    image: 'text-[50cqi] h-full w-full rounded-[inherit] object-cover',
    fallback: 'text-[50cqi] font-medium leading-none text-gray-500 dark:text-gray-400 truncate',
    icon: 'text-[50cqi] text-gray-500 dark:text-gray-400 shrink-0'
  },
  variants: {
    size: {
      '3xs': {
        root: 'size-4'
      },
      '2xs': {
        root: 'size-5'
      },
      xs: {
        root: 'size-6'
      },
      sm: {
        root: 'size-7'
      },
      md: {
        root: 'size-8'
      },
      lg: {
        root: 'size-9'
      },
      xl: {
        root: 'size-10'
      },
      '2xl': {
        root: 'size-11'
      },
      '3xl': {
        root: 'size-12'
      }
    }
  },
  defaultVariants: {
    size: 'sm'
  }
}
