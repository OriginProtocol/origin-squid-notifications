import { padEnd, padStart } from 'lodash'

import { jsonify } from './jsonify'

export const md = {
  construct: (...lines: string[]) => lines.join('\n'),
  inline: (content: string) => `\`${content}\``,
  blockTable: (data: any[][]) => {
    // Find the maximum length of each column
    const colWidths = data[0].map((_, colIndex) => Math.max(...data.map((row) => String(row[colIndex]).length)))

    // Generate the table rows with proper padding
    return data.map((row) => row.map((cell, i) => padEnd(String(cell), colWidths[i], ' ')).join(' | ')).join('\n')
  },
  code: (...content: string[]) => '```\n' + content.join('\n') + '\n```',
  ts: (...content: string[]) => '```ts\n' + content.join('\n') + '\n```',
  json: (object: unknown) => '```json\n' + jsonify(object, 2) + '\n```',
  indent: (content: string, amount = 2) =>
    content
      .split('\n')
      .map((c) => padStart('', amount) + c)
      .join('\n'),
}
