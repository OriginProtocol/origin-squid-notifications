import { compact, padEnd, padStart } from 'lodash'

import { jsonify } from './jsonify'

/**
 * Markdown helpers
 */
export const md = {
  /**
   * Take multiple string inputs and convert them into multiple lines.
   */
  construct: (...lines: string[]) => lines.join('\n'),
  /**
   * Create an inline code block.
   */
  inlineCode: (content: string) => `\`${content}\``,
  /**
   * Create a nice looking table for placement within a code block.
   */
  blockTable: (data: Array<undefined | Array<any>>) => {
    // Find the maximum length of each column
    const colWidths = compact(data[0]).map((_, colIndex) =>
      Math.max(...compact(data).map((row) => String(row[colIndex]).length)),
    )

    // Generate the table rows with proper padding
    return compact(data)
      .map((row) => row.map((cell, i) => padEnd(String(cell), colWidths[i], ' ')).join(' | '))
      .join('\n')
  },
  /**
   * Create a code block
   */
  code: (...content: string[]) => '```\n' + compact(content).join('\n') + '\n```',
  /**
   * Create a typescript code block
   */
  ts: (...content: string[]) => '```ts\n' + compact(content).join('\n') + '\n```',
  /**
   * Create a json code block
   */
  json: (object: unknown) => '```json\n' + jsonify(object, null, 2) + '\n```',
  /**
   * Indent `content` by `amount`
   */
  indent: (content: string, amount = 2) =>
    content
      .split('\n')
      .map((c) => padStart('', amount) + c)
      .join('\n'),
}
