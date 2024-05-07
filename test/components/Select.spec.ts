import { describe, it, expect } from 'vitest'
import Select, { type SelectProps, type SelectSlots } from '../../src/runtime/components/Select.vue'
import ComponentRender from '../component-render'

describe('Select', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'div' } }],
    ['with class', { props: { class: '' } }],
    ['with ui', { props: { ui: {} } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: SelectProps, slots?: Partial<SelectSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Select)
    expect(html).toMatchSnapshot()
  })
})
