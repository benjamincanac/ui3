import { describe, it, expect } from 'vitest'
import AvatarGroup, { type AvatarGroupProps } from '../../src/runtime/components/AvatarGroup.vue'
import ComponentRender from '../component-render'

describe('AvatarGroup', () => {
  it.each([
    // Props
    ['with class', { props: { class: '' } }],
    ['with ui', { props: { ui: {} } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: AvatarGroupProps, slots?: any }) => {
    const html = await ComponentRender(nameOrHtml, options, AvatarGroup)
    expect(html).toMatchSnapshot()
  })
})
