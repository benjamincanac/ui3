export default (config: { colors: string[] }) => ({
    slots: {
        root: 'relative overflow-hidden rounded-lg ring ring-gray-200 dark:ring-gray-800 p-4 flex gap-2.5',
        wrapper: 'flex-1 flex flex-col gap-1',
        title: 'text-sm font-medium text-gray-900 dark:text-white',
        description: 'text-sm text-gray-500 dark:text-gray-400',
        icon: 'shrink-0 size-5',
        avatar: 'shrink-0',
        actions: 'flex gap-1.5 shrink-0',
        close: 'p-1'
    },
    variants: {
        color: {
            ...Object.fromEntries(config.colors.map((color: string) => [color, ''])),
            white: '',
            gray: '',
            black: ''
        },
        multiline: {
            true: {
                root: 'items-start',
                actions: 'items-start mt-1'
            },
            false: {
                root: 'items-center',
                actions: 'items-center'
            }
        },
        variant: {
            solid: '',
            outline: '',
            soft: '',
            subtle: ''
        }
    },
    compoundVariants: [...config.colors.map((color: string) => ({
        color,
        variant: 'solid',
        class: `bg-${color}-500 dark:bg-${color}-400 text-white dark:text-gray-900`
    })), ...config.colors.map((color: string) => ({
        color,
        variant: 'outline',
        class: `text-${color}-500 dark:text-${color}-400 ring ring-inset ring-${color}-500 dark:ring-${color}-400`
    })), ...config.colors.map((color: string) => ({
        color,
        variant: 'soft',
        class: `bg-${color}-50 dark:bg-${color}-400/10 text-${color}-500 dark:text-${color}-400`
    })), ...config.colors.map((color: string) => ({
        color,
        variant: 'subtle',
        class: `bg-${color}-50 dark:bg-${color}-400/10 text-${color}-500 dark:text-${color}-400 ring ring-inset ring-${color}-500/25 dark:ring-${color}-400/25`
    })), {
        color: 'white',
        variant: 'solid',
        class: 'ring ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white dark:bg-gray-900'
    }, {
        color: 'gray',
        variant: 'solid',
        class: 'ring ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800'
    }, {
        color: 'black',
        variant: 'solid',
        class: 'text-white dark:text-gray-900 bg-gray-900 dark:bg-white'
    }],
    defaultVariants: {
        color: 'primary',
        variant: 'solid'
    }
})
