import 'tsconfig-paths/register'

import './env'
import { load } from './processors'
import { formatJson } from './utils/formatJson'

console.log('# Origin Squid Notifications - Digest')
console.log(new Date().toLocaleString())
console.log('=========================================')
load().then((processors) => {
  for (const p of processors.sort((a, b) => a.chainId - b.chainId)) {
    console.log('=========================================')
    console.log(formatJson(p))
  }
})
