import { describe, it, expect } from 'vitest'
import Divider, { type DividerProps } from '../../src/runtime/components/Divider.vue'
import ComponentRender from '../component-render'

describe('Divider', () => {
  it.each([
    ['basic case', {}],
    ['with as', { props: { as: 'span' } }],
    ['with class', { props: { class: '' } }],
    ['with ui', { props: { ui: {} } }],
    ['with orientation horizontal', { props: { orientation: 'horizontal' as const } }],
    ['with orientation vertical', { props: { orientation: 'vertical' as const } }],
    ['with decorative', { props: { decorative: true } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: DividerProps, slots?: any }) => {
    const html = await ComponentRender(nameOrHtml, options, Divider)
    expect(html).toMatchSnapshot()
  })
})
