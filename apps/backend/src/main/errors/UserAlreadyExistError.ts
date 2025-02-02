import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *	When the user already exists.
 */
export class UserAlreadyExistError extends ApplicationError<unknown> {
  public constructor() {
    super(ErrorCode.UserAlreadyExistError, "User already exists")
  }
}
