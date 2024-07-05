import fs from 'node:fs'

export { eventRenderers } from './renderers'

const files = fs.readdirSync(__dirname)
for (const file of files) {
  if (file === 'index.js') continue
  if (file === 'renderers.js') continue
  if (!file.endsWith('.js')) continue
  console.log(file)
  import(`./${file}`)
}
