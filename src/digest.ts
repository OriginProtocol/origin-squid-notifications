import 'tsconfig-paths/register'

import './env'
import { load } from './topics'
import { formatJson } from './utils/formatJson'

console.log('# Origin Squid Notifications - Digest')
console.log(new Date().toLocaleString())
console.log('=========================================')
load().then((processors) => {
  for (const p of processors.sort((a, b) => {
    if (a.topic !== b.topic) return a.topic > b.topic ? 1 : -1
    if (a.chainId !== b.chainId) return a.chainId - b.chainId
    return (a.name ?? '') > (b.name ?? '') ? 1 : -1
  })) {
    console.log('=========================================')
    console.log(formatJson(p))
  }
})
