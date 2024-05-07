import { defu } from 'defu'
import input from './input'

export default (config: { colors: string[] }) => {
  return defu({}, input(config))
}
