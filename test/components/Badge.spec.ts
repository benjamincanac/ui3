import { describe, it, expect } from 'vitest'
import Badge, { type BadgeProps, type BadgeSlots } from '../../src/runtime/components/Badge.vue'
import ComponentRender from '../component-render'
import theme from '#build/ui/badge'

describe('Badge', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const colors = Object.keys(theme.variants.color) as any
  const variants = Object.keys(theme.variants.variant) as any

  it.each([
    // Props
    ['with label', { props: { label: 'Badge' } }],
    ['with as', { props: { label: 'Badge', as: 'div' } }],
    ['with class', { props: { label: 'Badge', class: 'rounded-full font-bold' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { label: 'Badge', size } }]),
    ...colors.map((color: string) => [`with color ${color}`, { props: { label: 'Badge', color } }]),
    ...variants.map((variant: string) => [`with variant ${variant}`, { props: { label: 'Badge', variant } }]),
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: BadgeProps, slots?: Partial<BadgeSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Badge)
    expect(html).toMatchSnapshot()
  })
})
