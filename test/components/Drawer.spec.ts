import { describe, it, expect } from 'vitest'
import Drawer, { type DrawerProps, type DrawerSlots } from '../../src/runtime/components/Drawer.vue'
import ComponentRender from '../component-render'

describe('Drawer', () => {
  const props = { open: true, portal: false }

  it.each([
    // Props
    ['with title', { props: { ...props, title: 'Title' } }],
    ['with description', { props: { ...props, title: 'Title', description: 'Description' } }],
    ['without overlay', { props: { ...props, overlay: false, title: 'Title', description: 'Description' } }],
    ['with class', { props: { ...props, class: 'bg-gray-50 dark:bg-gray-800' } }],
    ['with ui', { props: { ...props, ui: { handle: 'w-20' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
    ['with header slot', { props, slots: { header: () => 'Header slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with body slot', { props, slots: { body: () => 'Body slot' } }],
    ['with footer slot', { props, slots: { footer: () => 'Footer slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: DrawerProps, slots?: Partial<DrawerSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Drawer)
    expect(html).toMatchSnapshot()
  })
})
