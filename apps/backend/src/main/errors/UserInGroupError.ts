import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

export class UserInGroupError extends ApplicationError<unknown> {
  public constructor() {
    super(ErrorCode.UserInGroupError, "User is already in a group")
  }
}
