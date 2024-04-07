import { describe, it, expect } from 'vitest'
import Divider, { type DividerProps } from '../../src/runtime/components/Divider.vue'
import ComponentRender from '../component-render'

describe('Divider', () => {
  it.each([
    ['basic case', {}],
    ['with as', { props: { as: 'span' } }],
    ['with class', { props: { class: '' } }],
    ['with size xs', { props: { size: 'xs' as const } }],
    ['with size sm', { props: { size: 'sm' as const } }],
    ['with size md', { props: { size: 'md' as const } }],
    ['with size lg', { props: { size: 'lg' as const } }],
    ['with label', { props: { label: '+1' } }],
    ['with icon', { props: { icon: 'i-heroicons-photo' } }],
    ['with avatar', { props: { avatar: { src: 'https://avatars.githubusercontent.com/u/739984?v=4' } } }],
    ['with orientation horizontal', { props: { orientation: 'horizontal' as const } }],
    ['with orientation vertical', { props: { orientation: 'vertical' as const } }],
    ['with type dashed', { props: { type: 'dashed' as const } }],
    ['with type dotted', { props: { type: 'dotted' as const } }],
    ['with decorative', { props: { decorative: true } }],
    ['with ui', { props: { ui: {} } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: DividerProps, slots?: any }) => {
    const html = await ComponentRender(nameOrHtml, options, Divider)
    expect(html).toMatchSnapshot()
  })
})
