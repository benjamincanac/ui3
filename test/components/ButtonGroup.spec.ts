import { describe, it, expect } from 'vitest'
import ButtonGroup, { type ButtonGroupProps, type ButtonGroupSlots } from '../../src/runtime/components/ButtonGroup.vue'
import ComponentRender from '../component-render'

describe('ButtonGroup', () => {
  it.each([
    // Props
    ['with class', { props: { class: '' } }],
    ['with ui', { props: { ui: {} } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: ButtonGroupProps, slots?: Partial<ButtonGroupSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, ButtonGroup)
    expect(html).toMatchSnapshot()
  })
})
