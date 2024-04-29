export default {
  slots: {
    root: 'flex flex-col min-h-0 divide-y divide-gray-200 dark:divide-gray-800',
    input: 'h-12 flex items-center shrink-0',
    content: 'relative flex-1 overflow-hidden',
    viewport: 'divide-y divide-gray-200 dark:divide-gray-800 scroll-py-1',
    group: 'p-1 isolate',
    empty: 'py-6 text-center text-sm',
    label: 'p-1.5 text-xs font-semibold text-gray-900 dark:text-white',
    separator: '-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-800',
    item: 'group relative w-full flex items-center gap-1.5 p-1.5 text-sm select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-gray-700 dark:text-gray-200 data-highlighted:text-gray-900 dark:data-highlighted:text-white data-highlighted:before:bg-gray-50 dark:data-highlighted:before:bg-gray-800/50',
    itemLeadingIcon: 'shrink-0 size-5 text-gray-400 dark:text-gray-500 group-data-highlighted:text-gray-700 dark:group-data-highlighted:text-gray-200',
    itemLeadingAvatar: 'shrink-0',
    itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
    itemTrailingIcon: 'shrink-0 size-5',
    itemTrailingKbds: 'hidden lg:inline-flex items-center shrink-0 gap-0.5',
    itemLabel: 'truncate',
    itemLabelPrefix: 'text-gray-400 dark:text-gray-500',
    itemLabelSuffix: 'text-gray-400 dark:text-gray-500'
  }
}
