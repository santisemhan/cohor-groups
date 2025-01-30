import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *	When there is no permission to access
 */
export class EndpointPermissionError extends ApplicationError<unknown> {
  public constructor(endpoint: string | undefined = undefined) {
    super(ErrorCode.EndpointPermissionError, `Permissions to endpoint [${endpoint}] was not specified`)
  }
}
