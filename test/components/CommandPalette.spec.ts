import { describe, it, expect } from 'vitest'
import CommandPalette, { type CommandPaletteProps, type CommandPaletteSlots } from '../../src/runtime/components/CommandPalette.vue'
import ComponentRender from '../component-render'

describe('CommandPalette', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'div' } }],
    ['with class', { props: { class: '' } }],
    ['with ui', { props: { ui: {} } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: CommandPaletteProps, slots?: Partial<CommandPaletteSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, CommandPalette)
    expect(html).toMatchSnapshot()
  })
})
