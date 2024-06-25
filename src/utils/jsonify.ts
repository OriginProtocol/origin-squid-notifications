export const jsonify = (
  json: unknown,
  replacer?: null | ((this: any, key: string, value: any) => any),
  indentation = 0,
) =>
  JSON.stringify(
    json,
    (key, value) => {
      value = typeof value === 'bigint' ? value.toString() : value
      return replacer?.(key, value) ?? value
    },
    indentation,
  )
