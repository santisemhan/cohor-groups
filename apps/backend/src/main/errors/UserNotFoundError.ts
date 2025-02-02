import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *	When the user is not found.
 */
export class UserNotFoundError extends ApplicationError<unknown> {
  public constructor() {
    super(ErrorCode.UserNotFoundError, "User not found")
  }
}
