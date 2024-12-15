import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *	An error produced because a specified negative timeout.
 */
export class TimeoutCannotBeNegativeError extends ApplicationError<unknown> {
  public constructor(payload: unknown = undefined) {
    super(ErrorCode.TimeoutCannotBeNegativeError, "The timeout cannot be negative.", payload)
  }
}
