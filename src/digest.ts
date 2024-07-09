import { load } from './processors'
import { formatJson } from './utils/formatJson'

load().then((processors) => {
  console.log(formatJson(processors))
})
