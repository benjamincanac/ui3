---
title: defineShortcuts
description: 'A composable to define keyboard shortcuts in your app.'
---

## Usage

Use the auto-imported `defineShortcuts` composable to define keyboard shortcuts.

```vue
<script setup lang="ts">
const open = ref(false)

defineShortcuts({
  meta_k: () => {
    open.value = !open.value
  }
})
</script>
```

- Shortcuts are automatically adjusted for non-macOS platforms, converting `meta` to `ctrl`.
- The composable uses Vue's `useEventListener` to handle keydown events.
- For a complete list of available shortcut keys, refer to the [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values) API documentation. Note that the key should be written in lowercase.

::tip{to="/components/kbd"}
Learn how to display shortcuts in components in the **Kbd** component documentation.
::

## API

### `defineShortcuts(config: ShortcutsConfig, options?: ShortcutsOptions)`

Define keyboard shortcuts for your application.

- `config`: An object where keys are shortcut definitions and values are either handler functions or shortcut configuration objects.
- `options`: Optional configuration for the shortcuts behavior.

#### Shortcut Definition

Shortcuts are defined using the following format:

- Single key: `'a'`, `'b'`, `'1'`, `'?'`, etc.
- Key combinations: Use `_` to separate keys, e.g., `'meta_k'`, `'ctrl_shift_f'`
- Key sequences: Use `-` to define a sequence, e.g., `'g-d'`

#### Modifiers

- `meta`: Represents Command (⌘) on macOS and Control on other platforms
- `ctrl`: Represents Control key
- `shift`: Used for alphabetic keys when Shift is required

#### Special Keys

- `escape`: Triggers on Esc key
- `enter`: Triggers on Enter key
- `arrowleft`, `arrowright`, `arrowup`, `arrowdown`: Trigger on respective arrow keys

#### Shortcut Configuration

Each shortcut can be defined as a function or an object with the following properties:

```ts
interface ShortcutConfig {
  handler: () => void
  usingInput?: boolean | string
}
```

- `handler`: Function to be executed when the shortcut is triggered
- `usingInput`:
  - `false` (default): Shortcut only triggers when no input is focused
  - `true`: Shortcut triggers even when any input is focused
  - `string`: Shortcut only triggers when the specified input (by name) is focused

#### ShortcutsOptions

The `options` parameter allows you to configure the behavior of the shortcuts. It has the following properties:

```ts
interface ShortcutsOptions {
  repeat?: boolean
  trigger?: 'keydown' | 'keyup'
  capture?: boolean
  passive?: boolean
}
```

- `repeat`: If `true`, the shortcut will trigger repeatedly while the key is held down. Default is `false`.
- `trigger`: Specifies whether the shortcut should trigger on 'keydown' or 'keyup' events. Default is 'keydown'.
- `capture`: If `true`, the event listener will be set to capture phase. Default is `false`.
- `passive`: If `true`, indicates that the function specified by listener will never call preventDefault(). Default is `false`.

## Examples

### Basic usage

```vue
<script setup lang="ts">
defineShortcuts({
  '?': () => openHelpModal(),
  'meta_k': () => openCommandPalette(),
  'g-d': () => navigateToDashboard()
})
</script>
```

### With input focus handling

The `usingInput` option allows you to specify that a shortcut should only trigger when a specific input is focused.

```vue
<template>
  <UInput v-model="query" name="queryInput" />
</template>

<script setup lang="ts">
const query = ref('')

defineShortcuts({
  enter: {
    usingInput: 'queryInput',
    handler: () => performSearch()
  },
  escape: {
    usingInput: true,
    handler: () => clearSearch()
  }
})
</script>
```

### Extracting shortcuts from menu items

The `extractShortcuts` utility can be used to automatically define shortcuts from menu items:

```vue
<script setup lang="ts">
const items = [{
  label: 'Save',
  icon: 'i-heroicons-document-arrow-down',
  kbds: ['meta', 'S'],
  select: () => save()
}, {
  label: 'Copy',
  icon: 'i-heroicons-document-duplicate',
  kbds: ['meta', 'C'],
  select: () => copy()
}]

defineShortcuts(extractShortcuts(items))
</script>
```
