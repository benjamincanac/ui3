import { describe, it, expect } from 'vitest'
import { defu } from 'defu'
import Checkbox, { type CheckboxProps } from '../../src/runtime/components/Checkbox.vue'
import ComponentRender from '../component-render'

describe('Checkbox', () => {
  it.each([
    ['basic case', {}],
    ['with label', { props: { label: 'Label' } }],
    ['with slot', { slots: { default: () => 'Label slot' } }],
    ['with slot label', { slots: { label: () => 'Label slot' } }],
    ['with custom id', { props: { id: 'custom-id' } }],
    ['with custom value', { props: { value: 'custom-value' } }],
    ['with custom name', { props: { name: 'custom-name' } }],
    ['with disabled', { props: { disabled: true } }],
    ['with indeterminate', { props: { indeterminate: true } }],
    ['with defaultValue', { props: { defaultValue: true } }],
    ['with help', { props: { label: 'Label', help: 'Help' } }],
    ['with required', { props: { label: 'Label', required: true } }],
    ['with custom color', { props: { label: 'Label', color: 'red' as const } }],
    ['with size 2xs', { props: { size: '2xs' as const } }],
    ['with size xs', { props: { size: 'xs' as const } }],
    ['with size sm', { props: { size: 'sm' as const } }],
    ['with size md', { props: { size: 'md' as const } }],
    ['with size lg', { props: { size: 'lg' as const } }],
    ['with size xl', { props: { size: 'xl' as const } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: CheckboxProps, slots?: any }) => {
    const html = await ComponentRender(nameOrHtml, defu(options, { props: { id: 42 } }), Checkbox)
    expect(html).toMatchSnapshot()
  })
})
