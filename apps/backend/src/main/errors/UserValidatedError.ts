import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *  An error produced due to validate a user when is already validated.
 */
export class UserValidatedError extends ApplicationError<unknown> {
  public constructor() {
    super(ErrorCode.UserValidatedError, "User is already validated")
  }
}
