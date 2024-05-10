import { defu } from 'defu'
import inputMenu from './input-menu'

export default (config: { colors: string[] }) => {
  return defu({
    slots: {
      base: 'relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
      value: 'truncate',
      placeholder: 'text-current/50',
      input: 'text-sm px-2.5 py-1.5 placeholder-gray-400 dark:placeholder-gray-500 border-0 border-b border-gray-200 dark:border-gray-800 focus:outline-none'
    }
  }, inputMenu(config))
}
