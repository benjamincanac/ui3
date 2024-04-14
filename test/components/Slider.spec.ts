import { describe, it, expect } from 'vitest'
import Slider, { type SliderProps } from '../../src/runtime/components/Slider.vue'
import ComponentRender from '../component-render'

describe('Slider', () => {
  it.each([
    ['basic case', {}],
    ['with class', { props: { class: '' } }],
    ['with ui', { props: { ui: {} } }],
    ['with custom color', { props: { color: 'red' as const } }],
    ['with disabled', { props: { disabled: true } }],
    ['with size 2xs', { props: { size: '2xs' as const } }],
    ['with size xs', { props: { size: 'xs' as const } }],
    ['with size sm', { props: { size: 'sm' as const } }],
    ['with size md', { props: { size: 'md' as const } }],
    ['with size lg', { props: { size: 'lg' as const } }],
    ['with size xl', { props: { size: 'xl' as const } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: SliderProps, slots?: any }) => {
    const html = await ComponentRender(nameOrHtml, options, Slider)
    expect(html).toMatchSnapshot()
  })
})
