---
description: A callout to draw user's attention.
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/benjamincanac/ui3/tree/dev/src/runtime/components/Alert.vue
---

## Usage

### Title

Use the `title` prop to set the title of the Alert.

::component-code
---
props:
  title: 'Heads up!'
---
::

### Description

Use the `description` prop to set the description of the Alert.

::component-code
---
prettier: true
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
---
::

### Icon

Use the `icon` prop to show an [Icon](/components/icon).

::component-code
---
prettier: true
ignore:
  - title
  - description
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  icon: 'i-heroicons-command-line'
---
::

### Avatar

Use the `avatar` prop to show an [Avatar](/components/avatar).

::component-code
---
prettier: true
ignore:
  - title
  - description
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  avatar.src: 'https://github.com/benjamincanac.png'
---
::

### Color

Use the `color` prop to change the color of the Alert.

::component-code
---
prettier: true
ignore:
  - title
  - description
  - icon
props:
  color: gray
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  icon: 'i-heroicons-command-line'
---
::

### Variant

Use the `variant` prop to change the variant of the Alert.

::component-code
---
prettier: true
ignore:
  - title
  - description
  - icon
props:
  color: gray
  variant: solid
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  icon: 'i-heroicons-command-line'
---
::

### Close

Use the `close` prop to display a [Button](/components/button) to dismiss the Alert.

::tip
A `close` event will be emitted when the close button is clicked.
::

Use the `close-icon` prop to customize the button [Icon](/components/icon). Defaults to `i-heroicons-x-mark-20-solid`.

::component-code
---
prettier: true
ignore:
  - title
  - description
  - close
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  close: true
  closeIcon: ''
---
::

::tip
You can customize this icon globally in your `app.config.ts` under `ui.icons.close` key.
::

You can pass all the props of the [Button](/components/button) component to customize it.

::component-code
---
prettier: true
ignore:
  - title
  - description
  - close.color
  - close.variant
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  close:
    color: primary
    variant: outline
    class: 'rounded-full'
---
::

### Actions

Use the `actions` prop to add some [Button](/components/button) actions to the Alert.

::component-code
---
prettier: true
ignore:
  - title
  - actions
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  actions:
    - label: Action 1
    - label: Action 2
      color: gray
      variant: subtle
---
::

::note
Actions renders differently when the description is not set. You can try to remove it.
::

## Examples

### `class` prop

Use the `class` prop to override the base styles of the Button.

::component-code
---
prettier: true
ignore:
  - title
  - description
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  class: 'rounded-none'
---
::

### `ui` prop

Use the `ui` prop to override the slots styles of the Button.

::component-code
---
prettier: true
ignore:
  - ui
  - title
  - description
  - icon
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  icon: i-heroicons-rocket-launch
  ui:
    icon: 'size-11'
---
::

## API

### Props

::component-props
---
ignore:
  - as
  - to
  - target
  - active
  - activeClass
  - inactiveClass
  - exactActiveClass
  - ariaCurrentValue
  - href
  - rel
  - noRel
  - prefetch
  - noPrefetch
  - prefetchedClass
  - replace
  - exact
  - exactQuery
  - exactHash
  - external
---
::

### Slots

:component-slots

### Emits

:component-emits

## Theme

:component-theme
