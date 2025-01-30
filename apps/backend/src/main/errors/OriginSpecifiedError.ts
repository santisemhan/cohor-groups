import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *	When there is no origin specified in the request.
 */
export class OriginSpecifiedError extends ApplicationError<unknown> {
  public constructor() {
    super(ErrorCode.OriginSpecifiedError, "Must be at least 1 origin specified.")
  }
}
