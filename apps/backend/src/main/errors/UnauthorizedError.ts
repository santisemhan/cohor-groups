import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

export class UnauthorizedError extends ApplicationError<unknown> {
  public constructor() {
    super(ErrorCode.UnauthorizedError, "Unauthorized")
  }
}
