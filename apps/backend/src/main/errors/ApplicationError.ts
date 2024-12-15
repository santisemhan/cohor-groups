import { Enum } from "../support/language/Enum"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *	Represents an application error. The instances must be immutable after
 *	extending it from a subclass.
 */
export class ApplicationError<T> implements Error {
  /**
   * @description
   *	The error code, that must be unique accross the entire application.
   */
  public readonly code: ErrorCode

  /**
   * @description
   *	A descriptive message in US-english. This message shaould not be used
   *	in a business UI.
   */
  public readonly message: string

  /**
   * @description
   *	The name of the error, usually the class name that implements it.
   */
  public readonly name: string

  /**
   * @description
   *	An optional object that provides additional information about the error.
   */
  public readonly payload: T | undefined

  /**
   * @description
   *	The stack-trace that localizes the error origin.
   */
  public readonly stack: string | undefined

  public constructor(
    code: ErrorCode,
    message: string,
    payload: T | undefined = undefined,
    stack: string | undefined = undefined
  ) {
    this.code = code
    this.message = message
    this.name = Enum.inverse(ErrorCode)[code]
    this.payload = payload
    this.stack = stack
  }
}
