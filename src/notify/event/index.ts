import fs from 'node:fs'

export * from './event'

const renderers = fs.readdirSync(`${__dirname}/renderers`)
for (const renderer of renderers) {
  if (!renderer.endsWith('.js')) continue
  console.log(`Loading renderer: ${renderer}`)
  import(`./renderers/${renderer}`)
}
