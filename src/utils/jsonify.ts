export const jsonify = (json: unknown, indentation = 0) =>
  JSON.stringify(
    json,
    (key, value) => {
      return typeof value === 'bigint' ? value.toString() : value
    },
    indentation,
  )
