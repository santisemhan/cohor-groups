/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @description
 *	Enum-manipulation mechanisms.
 *
 *	@see https://bobbyhadz.com/blog/typescript-convert-enum-to-string
 *	@see https://stackoverflow.com/a/57568856
 */
export class Enum {
  /**
   * @description
   *	Determines if a value belongs to the enum domain, and can be cast to
   *	it in a safely manner.
   */
  public static in<T, V extends string | number>(enumType: T, value: V): boolean {
    return Enum.keyFromValue(enumType, value) !== undefined
  }

  /**
   * @description
   *	Applies the inverse function over the enumerated, that is, swaps key
   *	by values.
   * @example
   *	enum Color { Red = "rojo", Green = "verde", Blue = "azul" }
   *	Enum.inverse(Color) // { rojo: "Red", verde: "Green", azul: "Blue"}
   */
  public static inverse<T>(enumType: T): any {
    const invertedEntries = Object.entries(enumType as any).map(([key, value]) => [value, key])
    return Object.fromEntries(invertedEntries)
  }

  /**
   * @description
   *	Obtiene el nombre de la clave de un enumerado mediante su valor. Es
   *	posible que varias claves de un enumerado posean el mismo valor, con
   *	lo cual, dicho enumerado no representa una biyección. En este caso,
   *	múltiples claves colapsarán debajo de un mismo valor en el orden en el
   *	que fueron definidas originalmente y, por lo tanto, tendrá prioridad
   *	la última clave para un mismo valor.
   * @example
   *	enum Color { Red, Green, Blue }
   *	Enum.keyFromValue(Color, 2) // "Blue".
   *	Enum.keyFromValue(Color, Color.Blue) // "Blue".
   * @example
   *	enum Color { Red = 7, Green = 7, Blue = 8 }
   *	Enum.keyFromValue(Color, 7) // "Green", por ser el último con valor 7.
   */
  public static keyFromValue<T, V extends string | number>(enumType: T, value: V): string {
    return Enum.inverse(enumType)[value]
  }

  /**
   * @description
   *	Obtiene el valor de un enumerado mediante el nombre de su clave. Esta
   *	operación es la función inversa de "Enum.keyFromValue".
   * @example
   *	enum Color { Red, Green, Blue }
   *	Enum.valueFromKey(Color, "Green") // Color.Green (1, en este caso).
   */
  public static valueFromKey<T, V extends string | number>(enumType: T, key: string): V {
    return (enumType as { [key: string]: any })[key]
  }
}
