import type { ModuleOptions } from '../module'

export default (options: Required<ModuleOptions>) => ({
  slots: {
    content: 'min-w-32 shadow-lg rounded-md ring divide-y overflow-y-auto scroll-py-1 data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]',
    arrow: '',
    group: 'p-1 isolate',
    label: 'w-full flex items-center font-semibold text-gray-900 dark:text-white',
    separator: '-mx-1 my-1 h-px',
    item: 'group relative w-full flex items-center select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75',
    itemLeadingIcon: 'shrink-0',
    itemLeadingAvatar: 'shrink-0',
    itemLeadingAvatarSize: '',
    itemTrailing: 'ms-auto inline-flex',
    itemTrailingIcon: 'shrink-0',
    itemTrailingKbds: 'hidden lg:inline-flex items-center shrink-0',
    itemTrailingKbdsSize: '',
    itemLabel: 'truncate',
    itemLabelExternalIcon: 'size-3 align-top text-gray-400 dark:text-gray-500'
  },
  variants: {
    active: {
      true: {
        item: 'text-gray-900 dark:text-white',
        itemLeadingIcon: 'text-gray-700 dark:text-gray-200'
      },
      false: {
        item: ['text-gray-700 dark:text-gray-200 data-highlighted:text-gray-900 dark:data-highlighted:text-white data-[state=open]:text-gray-900 dark:data-[state=open]:text-white', options.transitions && 'transition-colors before:transition-colors'],
        itemLeadingIcon: ['text-gray-400 dark:text-gray-500 group-data-highlighted:text-gray-700 dark:group-data-highlighted:text-gray-200 group-data-[state=open]:text-gray-700 dark:group-data-[state=open]:text-gray-200', options.transitions && 'transition-colors']
      }
    },
    size: {
      xs: {
        label: 'p-1 text-xs gap-1',
        item: 'p-1 text-xs gap-1',
        itemLeadingIcon: 'size-4',
        itemLeadingAvatarSize: '3xs',
        itemTrailingIcon: 'size-4',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'sm'
      },
      sm: {
        label: 'p-1.5 text-xs gap-1.5',
        item: 'p-1.5 text-xs gap-1.5',
        itemLeadingIcon: 'size-4',
        itemLeadingAvatarSize: '3xs',
        itemTrailingIcon: 'size-4',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'sm'
      },
      md: {
        label: 'p-1.5 text-sm gap-1.5',
        item: 'p-1.5 text-sm gap-1.5',
        itemLeadingIcon: 'size-5',
        itemLeadingAvatarSize: '2xs',
        itemTrailingIcon: 'size-5',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'md'
      },
      lg: {
        label: 'p-2 text-sm gap-2',
        item: 'p-2 text-sm gap-2',
        itemLeadingIcon: 'size-5',
        itemLeadingAvatarSize: '2xs',
        itemTrailingIcon: 'size-5',
        itemTrailingKbds: 'gap-1',
        itemTrailingKbdsSize: 'md'
      },
      xl: {
        label: 'p-2 text-base gap-2',
        item: 'p-2 text-base gap-2',
        itemLeadingIcon: 'size-6',
        itemLeadingAvatarSize: 'xs',
        itemTrailingIcon: 'size-6',
        itemTrailingKbds: 'gap-1',
        itemTrailingKbdsSize: 'lg'
      }
    },
    variant: {
      outline: {
        content: 'bg-white dark:bg-gray-900 ring-gray-200 dark:ring-gray-800 divide-gray-200 dark:divide-gray-800',
        arrow: 'fill-gray-200 dark:fill-gray-800',
        separator: 'bg-gray-200 dark:bg-gray-800'
      },
      subtle: {
        content: 'bg-gray-100 dark:bg-gray-800 ring-gray-300 dark:ring-gray-700 divide-gray-300 dark:divide-gray-700',
        arrow: 'fill-gray-300 dark:fill-gray-700',
        separator: 'bg-gray-300 dark:bg-gray-700'
      }
    }
  },
  compoundVariants: [{
    active: true,
    variant: 'outline',
    class: {
      item: 'before:bg-gray-100 dark:before:bg-gray-800'
    }
  }, {
    active: false,
    variant: 'outline',
    class: {
      item: 'data-highlighted:before:bg-gray-50 dark:data-highlighted:before:bg-gray-800/50 data-[state=open]:before:bg-gray-50 dark:data-[state=open]:before:bg-gray-800/50'
    }
  }, {
    active: true,
    variant: 'subtle',
    class: {
      item: 'before:bg-white dark:before:bg-gray-900'
    }
  }, {
    active: false,
    variant: 'subtle',
    class: {
      item: 'data-highlighted:before:bg-gray-100 dark:data-highlighted:before:bg-gray-700/50 data-[state=open]:before:bg-gray-100 dark:data-[state=open]:before:bg-gray-700/50'
    }
  }],
  defaultVariants: {
    size: 'md',
    variant: 'outline'
  }
})
