import { ShallNotInstantiateError } from "../../errors/ShallNotInstantiateError"
import { Enum } from "./Enum"

export class Type {
  private constructor() {
    throw new ShallNotInstantiateError()
  }

  /**
   * @description
   *	Returns the value as a boolean, or undefined if this cannot be
   *	interpreted as such.
   */
  public static asBoolean<T>(value: T): boolean | undefined {
    if (typeof value === "boolean") {
      return value
    } else if (typeof value === "string") {
      if (value === "true") {
        return true
      } else if (value === "false") {
        return false
      }
    }
    return undefined
  }

  /**
   * @description
   *	Return the value as an instance of the specified enum type, or
   *	undefined, if it doesn't belongs to the domain of the enumerated.
   */
  public static asEnumFromValue<T>(enumType: ThisType<T>, value: string | number): T | undefined {
    if (Enum.in(enumType, value)) {
      return value as T
    } else {
      return undefined
    }
  }

  /**
   * @description
   *	Return the key as a value instance of the specified enum type, or
   *	undefined, if the key doesn't belongs to the enumerated.
   */
  public static asEnumFromKey<T>(enumType: ThisType<T>, key: string): T | undefined {
    if (Enum.in(enumType, key)) {
      return Enum.valueFromKey(enumType, key) as T
    } else {
      return undefined
    }
  }

  /**
   * @description
   *	Returns the value as a real number, or undefined if this cannot be
   *	interpreted as a number. Be aware that Infinity and NaN aren't
   *	numbers.
   *
   * @todo
   *	The following cases should be handled to enforce the right semantics:
   *
   *	- A string in a different base other than decimal should not fail.
   *	- A string should fail if it has space characters.
   *	- A BigInt should not fail.
   */
  public static asReal<T>(value: T): number | undefined {
    if (typeof value === "number") {
      if (isFinite(value)) {
        return value
      } else {
        // Is Infinity or -Infinity, and it's not a number.
      }
    } else if (typeof value === "bigint") {
      // Fail for now; see @todo.
    } else if (typeof value === "string") {
      const valueAsNumber = +value
      if (0 < value.trim().length && isFinite(valueAsNumber) && !isNaN(valueAsNumber)) {
        return valueAsNumber
      } else {
        // The string as a number is a NaN, Infinity, -Infinity or is
        // blank, so it's not a number.
      }
    }
    return undefined
  }
}
