import { processors } from './processors'
import { md } from './utils/md'

const tableString = md.blockTable([
  ['Chain', 'Name', 'Description'],
  ...processors.map((p) => [
    p.chainId,
    p.name,
    p.description.length > 100 ? p.description.slice(0, 100) + '...' : p.description,
  ]),
])
console.log(tableString)
