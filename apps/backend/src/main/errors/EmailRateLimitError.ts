import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

export class EmailRateLimitError extends ApplicationError<unknown> {
  public constructor(payload: unknown = undefined) {
    super(ErrorCode.EmailRateLimitError, "Rate limit error", payload)
  }
}
