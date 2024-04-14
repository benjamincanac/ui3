export default (config: { colors: string[] }) => ({
  slots: {
    root: 'relative flex items-center select-none touch-none',
    track: 'relative bg-gray-200 rounded-full rounded-full min-w-60',
    range: 'absolute h-full rounded-full',
    thumb: 'rounded-full bg-white dark:bg-gray-800 ring-2 outline-none'
  },

  variants: {
    color: Object.fromEntries(config.colors.map((color: string) => [color, {
      range: `bg-${color}-500 dark:bg-${color}-400`,
      thumb: `ring-${color}-500`
    }])),

    size: {
      '2xs': {
        root: 'h-1.5',
        track: 'h-px',
        thumb: 'size-1.5'
      },
      xs: {
        root: 'h-2',
        track: 'h-0.5',
        thumb: 'size-2'
      },
      sm: {
        root: 'h-3',
        track: 'h-1',
        thumb: 'size-3'
      },
      md: {
        root: 'h-4',
        track: 'h-2',
        thumb: 'size-4'
      },
      lg: {
        root: 'h-5',
        track: 'h-3',
        thumb: 'size-5'
      },
      xl: {
        root: 'h-6',
        track: 'h-4',
        thumb: 'size-6'
      }
    },

    disabled: {
      true: {
        root: 'opacity-75 cursor-not-allowed'
      }
    }
  },

  defaultVariants: {
    size: 'sm',
    color: 'primary'
  }
})
