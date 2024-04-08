import type { ToastProps } from '#ui/types'
import { useState } from '#imports'

export interface Toast extends Omit<ToastProps, 'open' | 'defaultOpen'> {
  id: string
}

export function useToast () {
  const toasts = useState<Toast[]>('toasts', () => [])

  function add (toast: Partial<Toast>): Toast {
    const body = {
      id: new Date().getTime().toString(),
      ...toast
    }

    const index = toasts.value.findIndex((t: Toast) => t.id === body.id)
    if (index === -1) {
      toasts.value.push(body)
    }

    return body
  }

  function remove (id: string) {
    toasts.value = toasts.value.filter((t: Toast) => t.id !== id)
  }

  return {
    toasts,
    add,
    remove
  }
}
