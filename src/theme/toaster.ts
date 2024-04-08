export default {
  slots: {
    viewport: 'fixed flex flex-col w-full sm:w-96 p-4 gap-4 z-[100]',
    base: 'data-[swipe=move]:transition-none'
  },
  variants: {
    position: {
      'top-left': {
        viewport: 'left-0'
      },
      'top-center': {
        viewport: 'left-1/2 transform -translate-x-1/2'
      },
      'top-right': {
        viewport: 'right-0'
      },
      'bottom-left': {
        viewport: 'left-0'
      },
      'bottom-center': {
        viewport: 'left-1/2 transform -translate-x-1/2'
      },
      'bottom-right': {
        viewport: 'right-0'
      }
    },
    swipeDirection: {
      up: {
        base: 'data-[swipe=end]:animate-[slide-out-to-top_200ms_ease-in-out]'
      },
      right: {
        base: 'data-[swipe=end]:animate-[slide-out-to-right_200ms_ease-in-out]'
      },
      down: {
        base: 'data-[swipe=end]:animate-[slide-out-to-bottom_200ms_ease-in-out]'
      },
      left: {
        base: 'data-[swipe=end]:animate-[slide-out-to-left_200ms_ease-in-out]'
      }
    }
  },
  compoundVariants: [{
    position: ['top-left', 'top-center', 'top-right'],
    class: {
      viewport: 'top-0 flex-col-reverse',
      base: 'data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-top_200ms_ease-in-out]'
    }
  }, {
    position: ['bottom-left', 'bottom-center', 'bottom-right'],
    class: {
      viewport: 'bottom-0',
      base: 'data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-bottom_200ms_ease-in-out]'
    }
  }, {
    swipeDirection: ['left', 'right'],
    class: {
      base: 'data-[swipe=move]:translate-x-[--radix-toast-swipe-move-x] data-[swipe=end]:translate-x-[--radix-toast-swipe-end-x] data-[swipe=cancel]:translate-x-0'
    }
  }, {
    swipeDirection: ['up', 'down'],
    class: {
      base: 'data-[swipe=move]:translate-y-[--radix-toast-swipe-move-y] data-[swipe=end]:translate-y-[--radix-toast-swipe-end-y] data-[swipe=cancel]:translate-y-0'
    }
  }],
  defaultVariants: {
    position: 'bottom-right'
  }
}
