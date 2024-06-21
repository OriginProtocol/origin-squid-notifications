import { jsonify } from './jsonify'

export function formatJson(json: unknown) {
  const jsonString = jsonify(json, 2)
  return jsonString
    .replace(/^ {2}/gm, '') // Remove base indentation
    .replace(/"/g, '') // Remove quotation marks
    .replace(/,/g, '') // Remove commas
    .replace(/{/g, '') // Remove opening braces
    .replace(/}/g, '') // Remove closing braces
    .replace(/\[/g, '') // Remove opening brackets
    .replace(/]/g, '') // Remove closing brackets
    .replace(/\n\s*\n/g, '\n') // Remove extra newlines
    .trim()
}
