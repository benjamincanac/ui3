import { describe, it, expect } from 'vitest'
import NavigationMenu, { type NavigationMenuProps, type NavigationMenuSlots } from '../../src/runtime/components/NavigationMenu.vue'
import ComponentRender from '../component-render'

describe('NavigationMenu', () => {
  const links = [
    [{
      label: 'Profile',
      active: true,
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/739984?v=4'
      },
      badge: 100,
      select() {
        console.log('Profile clicked')
      }
    }, {
      label: 'Modal',
      icon: 'i-heroicons-home',
      to: '/modal'
    }, {
      label: 'NavigationMenu',
      icon: 'i-heroicons-chart-bar',
      to: '/navigation-menu'
    }, {
      label: 'Popover',
      icon: 'i-heroicons-command-line',
      to: '/popover'
    }], [{
      label: 'Examples',
      icon: 'i-heroicons-light-bulb',
      to: 'https://ui.nuxt.com',
      target: '_blank',
      slot: 'custom'
    }, {
      label: 'Help',
      icon: 'i-heroicons-question-mark-circle',
      disabled: true
    }]
  ]

  const props = { links }

  it.each([
    // Props
    ['with links', { props }],
    ['with orientation vertical', { props: { ...props, orientation: 'vertical' as const } }],
    ['with class', { props: { ...props, class: 'w-48' } }],
    ['with ui', { props: { links, ui: { linkLeadingIcon: 'size-4' } } }],
    // Slots
    ['with link slot', { props, slots: { link: () => 'Link slot' } }],
    ['with link-leading slot', { props, slots: { 'link-leading': () => 'Link leading slot' } }],
    ['with link-label slot', { props, slots: { 'link-label': () => 'Link label slot' } }],
    ['with link-trailing slot', { props, slots: { 'link-trailing': () => 'Link trailing slot' } }],
    ['with custom slot', { props, slots: { custom: () => 'Custom slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: NavigationMenuProps<typeof links[number][number]>, slots?: Partial<NavigationMenuSlots<any>> }) => {
    const html = await ComponentRender(nameOrHtml, options, NavigationMenu)
    expect(html).toMatchSnapshot()
  })
})
