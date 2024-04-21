export default (config: { colors: string[] }) => ({
  slots: {
    root: 'relative overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
    indicator: 'rounded-full size-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]'
  },
  variants: {
    animation: {
      'carousel': {
        indicator: 'bar-animation-carousel'
      },
      'carousel-inverse': {
        indicator: 'bar-animation-carousel-inverse'
      },
      'swing': {
        indicator: 'bar-animation-swing'
      },
      'elastic': {
        indicator: 'bar-animation-elastic'
      }
    },
    color: Object.fromEntries(config.colors.map((color: string) => [color, {
      indicator: `bg-${color}-500 dark:bg-${color}-400`
    }])),
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {}
    },
    orientation: {
      horizontal: {
        root: 'w-full'
      },
      vertical: {
        root: 'flex-col h-full'
      }
    }
  },
  compoundVariants: [{
    orientation: 'horizontal',
    size: 'xs',
    class: {
      root: 'h-[6px]'
    }
  }, {
    orientation: 'horizontal',
    size: 'sm',
    class: {
      root: 'h-[7px]'
    }
  }, {
    orientation: 'horizontal',
    size: 'md',
    class: {
      root: 'h-[8px]'
    }
  }, {
    orientation: 'horizontal',
    size: 'lg',
    class: {
      root: 'h-[9px]'
    }
  }, {
    orientation: 'horizontal',
    size: 'xl',
    class: {
      root: 'h-[10px]'
    }
  }, {
    orientation: 'vertical',
    size: 'xs',
    class: {
      root: 'w-[6px]'
    }
  }, {
    orientation: 'vertical',
    size: 'sm',
    class: {
      root: 'w-[7px]'
    }
  }, {
    orientation: 'vertical',
    size: 'md',
    class: {
      root: 'w-[8px]'
    }
  }, {
    orientation: 'vertical',
    size: 'lg',
    class: {
      root: 'w-[9px]'
    }
  }, {
    orientation: 'vertical',
    size: 'xl',
    class: {
      root: 'w-[10px]'
    }
  }],
  defaultVariants: {
    animation: 'carousel',
    color: 'primary',
    orientation: 'horizontal',
    size: 'md'
  }
})
