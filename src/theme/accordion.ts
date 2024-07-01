export default {
  slots: {
    root: 'w-full',
    item: 'border-gray-200 dark:border-gray-800',
    header: 'flex',
    trigger: 'group flex-1 flex items-center gap-1.5 font-medium text-sm px-3.5 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400',
    content: 'text-sm focus:outline-none',
    leadingIcon: 'shrink-0 size-5',
    trailingIcon: 'shrink-0 size-5 group-data-[state=open]:rotate-180 transition-transform duration-200',
    label: ''
  },
  variants: {
    disabled: {
      true: {
        trigger: 'cursor-not-allowed opacity-75'
      }
    },
    orientation: {
      vertical: {
        item: 'border-b last:border-b-0',
        trigger: 'py-3.5',
        content: 'px-3.5 pb-3.5 overflow-hidden data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out]',
        trailingIcon: 'ms-auto',
        label: 'truncate'
      },
      horizontal: {
        root: 'flex',
        item: 'flex border-r last:border-r-0',
        trigger: 'flex flex-col justify-around py-2.5',
        content: 'py-3.5 pr-3.5 overflow-x-hidden data-[state=open]:animate-[accordion-right_200ms_ease-out] data-[state=closed]:animate-[accordion-left_200ms_ease-out]',
        trailingIcon: 'self-center'
      }
    }
  }
}
