import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *	A request made with an undefined endpoint.
 */
export class EndpointCannotBeUndefinedError extends ApplicationError<unknown> {
  public constructor(payload: unknown = undefined) {
    super(ErrorCode.EndpointCannotBeUndefinedError, "The endpoint cannot be undefined.", payload)
  }
}
