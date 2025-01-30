import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *	When the password is invalid.
 */
export class InvalidPasswordError extends ApplicationError<unknown> {
  public constructor() {
    super(ErrorCode.InvalidPasswordError, "Invalid password")
  }
}
