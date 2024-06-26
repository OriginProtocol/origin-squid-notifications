export const jsonify = (
  json: unknown,
  replacer?: null | ((this: any, key: string, value: any) => any),
  indentation = 0,
) =>
  JSON.stringify(
    json,
    (key, value) => {
      value = replacer?.(key, value) ?? value
      value = typeof value === 'bigint' ? value.toString() : value
      return value
    },
    indentation,
  )
