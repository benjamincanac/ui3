import { describe, it, expect } from 'vitest'
import Chip, { type ChipProps, type ChipSlots } from '../../src/runtime/components/Chip.vue'
import ComponentRender from '../component-render'
import theme from '#build/ui/chip'

describe('Chip', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const colors = Object.keys(theme.variants.color) as any
  const positions = Object.keys(theme.variants.position) as any

  it.each([
    // Props
    ['with as', { props: { as: 'span' } }],
    ['with text', { props: { text: 'Text' } }],
    ['with inset', { props: { inset: true } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ...colors.map((color: string) => [`with color ${color}`, { props: { color } }]),
    ...positions.map((position: string) => [`with position ${position}`, { props: { position } }]),
    ['without show', { props: { show: false } }],
    ['with class', { props: { class: 'mx-auto' } }],
    ['with ui', { props: { ui: { base: 'text-gray-500 dark:text-gray-400' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with content slot', { slots: { content: () => 'Content slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: ChipProps & { show?: boolean }, slots?: Partial<ChipSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Chip)
    expect(html).toMatchSnapshot()
  })
})
