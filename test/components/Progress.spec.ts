import { describe, it, expect } from 'vitest'
import Progress, { type ProgressProps, type ProgressSlots } from '../../src/runtime/components/Progress.vue'
import ComponentRender from '../component-render'

describe('Progress', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'div' } }],
    ['with class', { props: { class: '' } }],
    ['with ui', { props: { ui: {} } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: ProgressProps, slots?: Partial<ProgressSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Progress)
    expect(html).toMatchSnapshot()
  })
})
