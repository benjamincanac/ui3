export default (config: { colors: string[] }) => ({
  slots: {
    root: 'relative overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
    indicator: 'rounded-full size-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]'
  },
  variants: {
    animation: {
      'carousel': {},
      'carousel-inverse': {},
      'swing': {},
      'elastic': {}
    },
    color: Object.fromEntries(config.colors.map((color: string) => [color, {
      indicator: `bg-${color}-500 dark:bg-${color}-400`
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
    orientation: {
      horizontal: {
        root: 'w-full'
      },
      vertical: {
        root: 'h-full'
      }
    }
  },
  compoundVariants: [{
    orientation: 'horizontal',
    size: '2xs',
    class: { root: 'h-px' }
  }, {
    orientation: 'horizontal',
    size: 'xs',
    class: { root: 'h-0.5' }
  }, {
  }, {
    orientation: 'horizontal',
    size: 'sm',
    class: { root: 'h-1' }
  }, {
    orientation: 'horizontal',
    size: 'md',
    class: { root: 'h-2' }
  }, {
    orientation: 'horizontal',
    size: 'lg',
    class: { root: 'h-3' }
  }, {
    orientation: 'horizontal',
    size: 'xl',
    class: { root: 'h-4' }
  }, {
  }, {
    orientation: 'horizontal',
    size: '2xl',
    class: { root: 'h-5' }
  }, {
    orientation: 'vertical',
    size: '2xs',
    class: { root: 'w-px' }
  }, {
  }, {
    orientation: 'vertical',
    size: 'xs',
    class: { root: 'w-0.5' }
  }, {
    orientation: 'vertical',
    size: 'sm',
    class: { root: 'w-1' }
  }, {
    orientation: 'vertical',
    size: 'md',
    class: { root: 'w-2' }
  }, {
    orientation: 'vertical',
    size: 'lg',
    class: { root: 'w-3' }
  }, {
    orientation: 'vertical',
    size: 'xl',
    class: { root: 'w-4' }
  }, {
  }, {
    orientation: 'vertical',
    size: '2xl',
    class: { root: 'w-5' }
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
    orientation: 'horizontal',
    size: 'md'
  }
})
