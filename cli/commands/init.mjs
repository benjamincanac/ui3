import { existsSync, promises as fsp } from 'node:fs'
import { resolve } from 'pathe'
import { defineCommand } from 'citty'
import { consola } from 'consola'
import { splitByCase, upperFirst, camelCase, kebabCase } from 'scule'
import { appendFile, sortFile } from '../utils.mjs'
import templates from '../templates.mjs'

export default defineCommand({
  meta: {
    name: 'init',
    description: 'Init a new component.'
  },
  args: {
    name: {
      type: 'positional',
      required: true,
      description: 'Name of the component.'
    },
    primitive: {
      type: 'boolean',
      description: 'Create a primitive component.'
    },
    pro: {
      type: 'boolean',
      description: 'Create a pro component.'
    }
  },
  async setup({ args }) {
    const name = args.name
    if (!name) {
      consola.error('name argument is missing!')
      process.exit(1)
    }

    const path = resolve('.')

    for (const template of Object.keys(templates)) {
      const { filename, contents } = templates[template](args)
      if (!contents) {
        continue
      }

      const filePath = resolve(path, filename)

      if (existsSync(filePath)) {
        consola.error(`🚨 ${filePath} already exists!`)
        continue
      }

      await fsp.writeFile(filePath, contents.trim() + '\n')

      consola.success(`🪄 Generated ${filePath}!`)
    }

    const themePath = resolve(path, 'src/theme/index.ts')
    await appendFile(themePath, `export { default as ${camelCase(name)} } from './${kebabCase(name)}'`)
    await sortFile(themePath)

    const typesPath = resolve(path, 'src/runtime/types/index.d.ts')
    await appendFile(typesPath, `export * from '../components/${splitByCase(name).map(p => upperFirst(p)).join('')}.vue'`)
    await sortFile(typesPath)
  }
})
