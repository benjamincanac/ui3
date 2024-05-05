export const buttonGroupVariant = {
  buttonGroup: {
    true: 'not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none'
  }
}

export const buttonGroupVariantWithRoot = {
  buttonGroup: {
    true: {
      root: 'group',
      base: 'group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none'
    }
  }
}

export default {
  slots: {
    base: 'inline-flex -space-x-px'
  }
}
