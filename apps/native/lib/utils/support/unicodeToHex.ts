/**
 * Convierte una cadena Unicode en un número hexadecimal.
 * @param {string} unicode - La cadena a convertir.
 * @returns {number} - El número hexadecimal resultante.
 */
export function unicodeToHex(unicode: string): number {
  const hexValue = unicode.replace("U+", "").toUpperCase()
  return parseInt(hexValue, 16)
}
