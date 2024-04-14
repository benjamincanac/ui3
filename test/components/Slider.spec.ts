import { describe, it, expect } from 'vitest'
import Slider, { type SliderProps } from '../../src/runtime/components/Slider.vue'
import ComponentRender from '../component-render'

describe('Slider', () => {
  it.each([
    ['basic case', {}],
    ['with class', { props: { class: '' } }],
    ['with ui', { props: { ui: {} } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: SliderProps, slots?: any }) => {
    const html = await ComponentRender(nameOrHtml, options, Slider)
    expect(html).toMatchSnapshot()
  })
})
