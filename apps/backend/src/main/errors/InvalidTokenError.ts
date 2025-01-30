import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *	When the token is invalid.
 */
export class InvalidTokenError extends ApplicationError<unknown> {
  public constructor() {
    super(ErrorCode.InvalidTokenError, "Invalid token")
  }
}
