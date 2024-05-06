import { describe, it, expect } from 'vitest'
import InputMenu, { type InputMenuProps, type InputMenuSlots } from '../../src/runtime/components/InputMenu.vue'
import ComponentRender from '../component-render'

describe('InputMenu', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'div' } }],
    ['with class', { props: { class: '' } }],
    ['with ui', { props: { ui: {} } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: InputMenuProps<any>, slots?: Partial<InputMenuSlots<any>> }) => {
    const html = await ComponentRender(nameOrHtml, options, InputMenu)
    expect(html).toMatchSnapshot()
  })
})
