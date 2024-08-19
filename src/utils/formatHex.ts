export const shortenHex = (hex: string) => {
  if (hex.length <= 10) {
    return hex
  } else {
    return `${hex.slice(0, 6)}...${hex.slice(hex.length - 4, hex.length)}`
  }
}
