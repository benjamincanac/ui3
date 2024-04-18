import { createSharedComposable } from '@vueuse/core'
import { ref, computed, onMounted } from 'vue'
import type { KbdKey } from '#ui/types'

export const kbdKeysMap: Record<KbdKey, string> = {
  meta: '',
  command: '⌘',
  shift: '⇧',
  ctrl: '⌃',
  option: '⌥',
  alt: '⎇',
  enter: '↵',
  delete: '⌦',
  backspace: '⌫',
  escape: '⎋',
  tab: '⇥',
  capslock: '⇪',
  arrowup: '↑',
  arrowright: '→',
  arrowdown: '↓',
  arrowleft: '←',
  pageup: '⇞',
  pagedown: '⇟',
  home: '↖',
  end: '↘'
}

const _useKbd = () => {
  const macOS = computed(() => import.meta.client && navigator && navigator.userAgent && navigator.userAgent.match(/Macintosh;/))

  const metaSymbol = ref(' ')

  onMounted(() => {
    metaSymbol.value = macOS.value ? kbdKeysMap.command : kbdKeysMap.ctrl
  })

  function getKbdKey(value: KbdKey | string) {
    if (value === 'meta') {
      return metaSymbol.value
    }

    return kbdKeysMap[value as KbdKey] || value.toUpperCase()
  }

  return {
    macOS,
    metaSymbol,
    getKbdKey
  }
}

export const useKbd = createSharedComposable(_useKbd)
