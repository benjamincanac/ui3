import { splitByCase, upperFirst, camelCase, kebabCase } from 'scule'

const playground = ({ name, pro }) => {
  const upperName = splitByCase(name).map(p => upperFirst(p)).join('')
  const kebabName = kebabCase(name)

  return {
    filename: `playground/pages/${kebabName}.vue`,
    contents: pro
      ? undefined
      : `
<template>
  <div>
    <U${upperName} />
  </div>
</template>
    `
  }
}

const component = ({ name, primitive, pro }) => {
  const upperName = splitByCase(name).map(p => upperFirst(p)).join('')
  const camelName = camelCase(name)
  const kebabName = kebabCase(name)
  const key = pro ? 'uiPro' : 'ui'
  const path = pro ? 'ui-pro' : 'ui'

  return {
    filename: `src/runtime/components/${upperName}.vue`,
    contents: primitive
      ? `
<script lang="ts">
import { tv } from 'tailwind-variants'
import type { PrimitiveProps } from 'radix-vue'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/${path}/${kebabName}'

const appConfig = _appConfig as AppConfig & { ${key}: { ${camelName}: Partial<typeof theme> } }

const ${camelName} = tv({ extend: tv(theme), ...(appConfig.${key}?.${camelName} || {}) })

export interface ${upperName}Props extends Omit<PrimitiveProps, 'asChild'> {
  class?: any
  ui?: Partial<typeof ${camelName}.slots>
}

export interface ${upperName}Slots {
  default: any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'radix-vue'

const props = withDefaults(defineProps<${upperName}Props>(), { as: 'div' })
defineSlots<${upperName}Slots>()

const ui = computed(() => tv({ extend: ${camelName}, slots: props.ui })())
</script>

<template>
  <Primitive :as="as" :class="ui.root({ class: props.class })">
    <slot />
  </Primitive>
</template>
`
      : `
<script lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { ${upperName}RootProps, ${upperName}RootEmits } from 'radix-vue'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/${path}/${kebabName}'

const appConfig = _appConfig as AppConfig & { ${key}: { ${camelName}: Partial<typeof theme> } }

const ${camelName} = tv({ extend: tv(theme), ...(appConfig.${key}?.${camelName} || {}) })

type ${upperName}Variants = VariantProps<typeof ${camelName}>

export interface ${upperName}Props extends Omit<${upperName}RootProps, 'asChild'> {
  class?: any
  ui?: Partial<typeof ${camelName}.slots>
}

export interface ${upperName}Emits extends ${upperName}RootEmits {}

export interface ${upperName}Slots {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ${upperName}Root, useForwardPropsEmits } from 'radix-vue'
import { reactivePick } from '@vueuse/core'

const props = defineProps<${upperName}Props>()
const emits = defineEmits<${upperName}Emits>()
const slots = defineSlots<${upperName}Slots>()

const rootProps = useForwardPropsEmits(reactivePick(props), emits)

const ui = computed(() => tv({ extend: ${camelName}, slots: props.ui })())
</script>

<template>
  <${upperName}Root v-bind="rootProps" :class="ui.root({ class: props.class })" />
</template>
`
  }
}

const theme = ({ name }) => {
  const kebabName = kebabCase(name)

  return {
    filename: `src/theme/${kebabName}.ts`,
    contents: `
export default {
  slots: {
    root: ''
  }
}
    `
  }
}

const test = ({ name }) => {
  const upperName = splitByCase(name).map(p => upperFirst(p)).join('')

  return {
    filename: `test/components/${upperName}.spec.ts`,
    contents: `
import { describe, it, expect } from 'vitest'
import ${upperName}, { type ${upperName}Props, type ${upperName}Slots } from '../../src/runtime/components/${upperName}.vue'
import ComponentRender from '../component-render'

describe('${upperName}', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'div' } }],
    ['with class', { props: { class: '' } }],
    ['with ui', { props: { ui: {} } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: ${upperName}Props, slots?: Partial<${upperName}Slots> }) => {
    const html = await ComponentRender(nameOrHtml, options, ${upperName})
    expect(html).toMatchSnapshot()
  })
})
    `
  }
}

export default {
  playground,
  component,
  theme,
  test
}
