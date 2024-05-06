import { describe, it, expect } from 'vitest'
import Breadcrumb, { type BreadcrumbProps, type BreadcrumbSlots } from '../../src/runtime/components/Breadcrumb.vue'
import ComponentRender from '../component-render'

describe('Breadcrumb', () => {
  const links = [{
    label: 'Home',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    },
    to: '/'
  }, {
    label: 'Navigation',
    icon: 'i-heroicons-square-3-stack-3d',
    disabled: true
  }, {
    label: 'Breadcrumb',
    icon: 'i-heroicons-link',
    slot: 'custom'
  }]

  const props = { links }

  it.each([
    // Props
    ['with links', { props }],
    ['with separatorIcon', { props: { ...props, separatorIcon: 'i-heroicons-minus' } }],
    ['with class', { props: { ...props, class: 'w-48' } }],
    ['with ui', { props: { ui: { ...props, link: 'font-bold' } } }],
    // Slots
    ['with link slot', { props, slots: { link: () => 'Link slot' } }],
    ['with link-leading slot', { props, slots: { 'link-leading': () => 'Link leading slot' } }],
    ['with link-label slot', { props, slots: { 'link-label': () => 'Link label slot' } }],
    ['with link-trailing slot', { props, slots: { 'link-trailing': () => 'Link trailing slot' } }],
    ['with custom slot', { props, slots: { custom: () => 'Custom slot' } }],
    ['with separator slot', { props, slots: { separator: () => '/' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: BreadcrumbProps<typeof links[number]>, slots?: Partial<BreadcrumbSlots<typeof links[number]>> }) => {
    const html = await ComponentRender(nameOrHtml, options, Breadcrumb)
    expect(html).toMatchSnapshot()
  })
})
