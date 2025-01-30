import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *	when the login method is invalid.
 */
export class InvalidLoginMethodError extends ApplicationError<unknown> {
  public constructor() {
    super(ErrorCode.InvalidLoginMethodError, "Invalid login method")
  }
}
