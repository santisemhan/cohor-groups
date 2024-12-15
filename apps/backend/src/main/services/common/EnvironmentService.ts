import { Service } from "typedi"
import { UnknownEnvironmentKeyError } from "../../errors/UnknownEnvironmentKeyError"
import { Type } from "../../support/language/Type"

@Service()
export class EnvironmentService {
  public constructor() {}

  public getBooleanOrDefault<T>(key: string, _default: T): boolean | T {
    const value = Type.asBoolean(process.env[key])
    if (value === undefined) {
      return _default
    } else {
      return value
    }
  }

  public getBooleanOrFail(key: string): boolean {
    const value = Type.asBoolean(process.env[key])
    if (value === undefined) {
      throw new UnknownEnvironmentKeyError(key)
    } else {
      return value
    }
  }

  public getEnumFromKeyOrDefault<T, U>(enumType: ThisType<T>, key: string, _default: U): T | U {
    const enumKey = process.env[key]
    if (enumKey === undefined) {
      return _default
    } else {
      const value = Type.asEnumFromKey(enumType, enumKey)
      return value === undefined ? _default : value
    }
  }

  public getEnumFromKeyOrFail<T>(enumType: ThisType<T>, key: string): T {
    const value = this.getEnumFromKeyOrDefault(enumType, key, undefined)
    if (value === undefined) {
      throw new UnknownEnvironmentKeyError(key)
    } else {
      return value
    }
  }

  public getEnumFromValueOrDefault<T, U>(enumType: ThisType<T>, key: string, _default: U): T | U {
    const enumValue = process.env[key]
    if (enumValue === undefined) {
      return _default
    } else {
      const value = Type.asEnumFromValue(enumType, enumValue)
      return value === undefined ? _default : value
    }
  }

  public getEnumFromValueOrFail<T>(enumType: ThisType<T>, key: string): T {
    const value = this.getEnumFromValueOrDefault(enumType, key, undefined)
    if (value === undefined) {
      throw new UnknownEnvironmentKeyError(key)
    } else {
      return value
    }
  }

  public getNumberOrDefault<T>(key: string, _default: T): number | T {
    const value = Type.asReal(process.env[key])
    if (value === undefined) {
      return _default
    } else {
      return value
    }
  }

  public getNumberOrFail(key: string): number {
    const value = Type.asReal(process.env[key])
    if (value === undefined) {
      throw new UnknownEnvironmentKeyError(key)
    } else {
      return value
    }
  }

  public getStringOrDefault<T>(key: string, _default: T): string | T {
    const value = process.env[key]
    if (value === undefined) {
      return _default
    } else {
      return value
    }
  }

  public getStringOrFail(key: string): string {
    const value = process.env[key]
    if (value === undefined) {
      throw new UnknownEnvironmentKeyError(key)
    } else {
      return value
    }
  }
}
