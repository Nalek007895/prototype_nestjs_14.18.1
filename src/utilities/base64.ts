export const stringToBase64 = (text): string => {
  if (!text) return null
  const encode = Buffer.from(text).toString('base64')
  return encode
}

export const decodeBase64toString = (text): string => {
  if (!text) return null
  const decode = Buffer.from(text, 'base64').toString('utf-8')
  return decode
}
