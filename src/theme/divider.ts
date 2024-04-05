export default {
  slots: {
    base: 'bg-gray-200 dark:bg-gray-800 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px'
  },
  variants: {
    orientation: {
      horizontal: 'my-4',
      vertical: 'mx-4'
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
}
