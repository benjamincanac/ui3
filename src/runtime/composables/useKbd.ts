import { createSharedComposable } from '@vueuse/core'
import { ref, computed, onMounted } from 'vue'
import type { KbdKey } from '#ui/types'

export const kbdKeysMap: Record<KbdKey, string> = {
  command: '⌘',
  shift: '⇧',
  ctrl: '⌃',
  option: '⌥',
  enter: '↵',
  delete: '⌫',
  escape: '⎋',
  tab: '⇥',
  capslock: '⇪',
  up: '↑',
  right: '→',
  down: '↓',
  left: '←',
  pageup: '⇞',
  pagedown: '⇟',
  home: '↖',
  end: '↘',
  help: '?',
  space: '␣'
}

const _useKbd = () => {
  const macOS = computed(() => import.meta.client && navigator && navigator.userAgent && navigator.userAgent.match(/Macintosh;/))

  const metaSymbol = ref(' ')

  onMounted(() => {
    metaSymbol.value = macOS.value ? kbdKeysMap.command : kbdKeysMap.ctrl
  })

  function getKbdKey(value: KbdKey) {
    if (value === 'meta') {
      return metaSymbol.value
    }

    return kbdKeysMap[value] || value
  }

  return {
    macOS,
    metaSymbol,
    getKbdKey
  }
}

export const useKbd = createSharedComposable(_useKbd)
