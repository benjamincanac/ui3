export default (config: { colors: string[] }) => ({
  slots: {
    root: 'relative bg-white dark:bg-gray-900 shadow-lg rounded-lg ring ring-gray-200 dark:ring-gray-800 p-4',
    title: 'text-sm font-medium text-gray-900 dark:text-white',
    description: 'mt-1 text-sm text-gray-500 dark:text-gray-400',
    icon: 'shrink-0 size-5',
    avatar: 'shrink-0',
    progress: 'absolute bottom-0 end-0 start-0 h-1',
    close: 'absolute top-4 right-4'
  },
  variants: {
    color: Object.fromEntries(config.colors.map((color: string) => [
      color, {
        base: `test-${color}-500 dark:text-${color}-400`,
        progress: `bg-${color}-500 dark:bg-${color}-400`
      }
    ]))
  },
  defaultVariants: {
    color: 'primary'
  }
})
