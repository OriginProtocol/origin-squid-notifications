export const max = (values: bigint[], start = 0n) => {
  return values.reduce((max, v) => (max > v ? max : v), start)
}
