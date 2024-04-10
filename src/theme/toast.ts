export default (config: { colors: string[] }) => ({
  slots: {
    root: 'relative overflow-hidden bg-white dark:bg-gray-900 shadow-lg rounded-lg ring ring-gray-200 dark:ring-gray-800 p-4 flex items-start gap-2.5',
    wrapper: 'flex flex-col gap-1',
    title: 'text-sm font-medium text-gray-900 dark:text-white',
    description: 'text-sm text-gray-500 dark:text-gray-400',
    icon: 'shrink-0 size-5',
    avatar: 'shrink-0',
    progress: 'absolute inset-0 rounded-lg border-b-2 z-[-1]',
    mask: 'absolute top-0 inset-0 bottom-[2px] bg-white dark:bg-gray-900 z-[-1]',
    close: 'absolute top-2.5 right-2.5'
  },
  variants: {
    color: Object.fromEntries(config.colors.map((color: string) => [
      color, {
        icon: `text-${color}-500 dark:text-${color}-400`,
        progress: `border-${color}-500 dark:border-${color}-400`
      }
    ]))
  },
  defaultVariants: {
    color: 'primary'
  }
})
