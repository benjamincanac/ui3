export default (config: { colors: string[] }) => ({
  slots: {
    root: '',
    base: 'relative overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
    indicator: 'rounded-full size-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]',
    statusContainer: 'flex transition-all duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]',
    status: 'text-end w-fit text-gray-400 dark:text-gray-500',
    stepsContainer: 'grid grid-cols-1',
    step: 'transition-all truncate text-end row-start-1 col-start-1'
  },
  variants: {
    animation: {
      'carousel': {},
      'carousel-inverse': {},
      'swing': {},
      'elastic': {}
    },
    color: Object.fromEntries(config.colors.map((color: string) => [color, {
      indicator: `bg-${color}-500 dark:bg-${color}-400`,
      stepsContainer: `text-${color}-500 dark:text-${color}-400`
    }])),
    size: {
      '2xs': '',
      'xs': '',
      'sm': '',
      'md': '',
      'lg': '',
      'xl': '',
      '2xl': ''
    },
    step: {
      active: {
        step: 'opacity-100'
      },
      first: {
        step: 'opacity-100 text-gray-500 dark:text-gray-400'
      },
      other: {
        step: 'opacity-0'
      }
    },
    orientation: {
      horizontal: {
        root: 'w-full',
        base: 'w-full'
      },
      vertical: {
        root: 'h-full flex flex-row-reverse gap-x-1',
        base: 'h-full'
      }
    }
  },
  compoundVariants: [{
    orientation: 'horizontal',
    size: '2xs',
    class: {
      base: 'h-px',
      statusContainer: 'flex-row min-w-fit',
      status: 'text-xs'
    }
  }, {
    orientation: 'horizontal',
    size: 'xs',
    class: {
      base: 'h-0.5',
      statusContainer: 'flex-row min-w-fit',
      status: 'text-xs',
      stepsContainer: 'text-xs'
    }
  }, {
    orientation: 'horizontal',
    size: 'sm',
    class: {
      base: 'h-1',
      statusContainer: 'flex-row min-w-fit',
      status: 'text-sm',
      stepsContainer: 'text-sm'
    }
  }, {
    orientation: 'horizontal',
    size: 'md',
    class: {
      base: 'h-2',
      statusContainer: 'flex-row min-w-fit',
      status: 'text-sm',
      stepsContainer: 'text-sm'
    }
  }, {
    orientation: 'horizontal',
    size: 'lg',
    class: {
      base: 'h-3',
      statusContainer: 'flex-row min-w-fit',
      status: 'text-sm',
      stepsContainer: 'text-sm'
    }
  }, {
    orientation: 'horizontal',
    size: 'xl',
    class: {
      base: 'h-4',
      statusContainer: 'flex-row min-w-fit',
      status: 'text-base',
      stepsContainer: 'text-base'
    }
  }, {
    orientation: 'horizontal',
    size: '2xl',
    class: {
      base: 'h-5',
      statusContainer: 'flex-row min-w-fit',
      status: 'text-base',
      stepsContainer: 'text-base'
    }
  }, {
    orientation: 'vertical',
    size: '2xs',
    class: {
      base: 'w-px',
      statusContainer: 'flex-col min-h-fit',
      status: 'text-xs',
      stepsContainer: 'text-xs'
    }
  }, {
    orientation: 'vertical',
    size: 'xs',
    class: {
      base: 'w-0.5',
      statusContainer: 'flex-col min-h-fit',
      status: 'text-xs',
      stepsContainer: 'text-xs'
    }
  }, {
    orientation: 'vertical',
    size: 'sm',
    class: {
      base: 'w-1',
      statusContainer: 'flex-col min-h-fit',
      status: 'text-sm',
      stepsContainer: 'text-sm'
    }
  }, {
    orientation: 'vertical',
    size: 'md',
    class: {
      base: 'w-2',
      statusContainer: 'flex-col min-h-fit',
      status: 'text-sm',
      stepsContainer: 'text-sm'
    }
  }, {
    orientation: 'vertical',
    size: 'lg',
    class: {
      base: 'w-3',
      statusContainer: 'flex-col min-h-fit',
      status: 'text-sm',
      stepsContainer: 'text-sm'
    }
  }, {
    orientation: 'vertical',
    size: 'xl',
    class: {
      base: 'w-4',
      statusContainer: 'flex-col min-h-fit',
      status: 'text-base',
      stepsContainer: 'text-base'
    }
  }, {
    orientation: 'vertical',
    size: '2xl',
    class: {
      base: 'w-5',
      statusContainer: 'flex-col min-h-fit',
      status: 'text-base',
      stepsContainer: 'text-base'
    }
  }, {
    orientation: 'horizontal',
    animation: 'carousel',
    class: { indicator: 'data-[state=indeterminate]:animate-[carousel_2s_ease-in-out_infinite]' }
  }, {
    orientation: 'vertical',
    animation: 'carousel',
    class: { indicator: 'data-[state=indeterminate]:animate-[carousel-vertical_2s_ease-in-out_infinite]' }
  }, {
    orientation: 'horizontal',
    animation: 'carousel-inverse',
    class: { indicator: 'data-[state=indeterminate]:animate-[carousel-inverse_2s_ease-in-out_infinite]' }
  }, {
    orientation: 'vertical',
    animation: 'carousel-inverse',
    class: { indicator: 'data-[state=indeterminate]:animate-[carousel-inverse-vertical_2s_ease-in-out_infinite]' }
  }, {
    orientation: 'horizontal',
    animation: 'swing',
    class: { indicator: 'data-[state=indeterminate]:animate-[swing_2s_ease-in-out_infinite]' }
  }, {
    orientation: 'vertical',
    animation: 'swing',
    class: { indicator: 'data-[state=indeterminate]:animate-[swing-vertical_2s_ease-in-out_infinite]' }
  }, {
    orientation: 'horizontal',
    animation: 'elastic',
    class: { indicator: 'data-[state=indeterminate]:animate-[elastic_2s_ease-in-out_infinite]' }
  }, {
    orientation: 'vertical',
    animation: 'elastic',
    class: { indicator: 'data-[state=indeterminate]:animate-[elastic-vertical_2s_ease-in-out_infinite]' }
  }],
  defaultVariants: {
    animation: 'carousel',
    color: 'primary',
    size: 'md'
  }
})
