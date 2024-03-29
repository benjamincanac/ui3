export function pick<Data extends object, Keys extends keyof Data> (data: Data, keys: Keys[]): Pick<Data, Keys> {
  const result = {} as Pick<Data, Keys>

  for (const key of keys) {
    result[key] = data[key]
  }

  return result
}

export function omit<Data extends object, Keys extends keyof Data> (data: Data, keys: Keys[]): Omit<Data, Keys> {
  const result = { ...data }

  for (const key of keys) {
    delete result[key]
  }

  return result as Omit<Data, Keys>
}

export function looseToNumber (val: any): any {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

export function get (object: Record<string, any>, path: (string | number)[] | string, defaultValue?: any): any {
  if (typeof path === 'string') {
    path = path.split('.').map(key => {
      const numKey = Number(key)
      return isNaN(numKey) ? key : numKey
    })
  }

  let result: any = object

  for (const key of path) {
    if (result === undefined || result === null) {
      return defaultValue
    }

    result = result[key]
  }

  return result !== undefined ? result : defaultValue
}
