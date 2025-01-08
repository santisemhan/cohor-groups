import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *  An error produced due to exceeding the allowed number of requests within a specified time frame.
 */
export class TooManyRequestError extends ApplicationError<unknown> {
  public constructor() {
    super(ErrorCode.TooManyRequestError, "Too many requests. Please try again later.")
  }
}
