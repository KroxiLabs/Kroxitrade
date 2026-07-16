const bytesToBinaryString = (bytes: Uint8Array) => {
  let binary = ""

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return binary
}

export const encodeBase64Utf8 = (value: string) =>
  btoa(bytesToBinaryString(new TextEncoder().encode(value)))

export const decodeBase64Utf8 = (value: string) => {
  const normalized = value
    .replace(/\s/g, "")
    .replace(/-/g, "+")
    .replace(/_/g, "/")
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=")
  const binary = atob(padded)
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))

  return new TextDecoder().decode(bytes)
}
