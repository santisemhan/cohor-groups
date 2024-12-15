import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *	An error produced when trying to access an enviornment key that is not
 *	currently defined.
 */
export class UnknownEnvironmentKeyError extends ApplicationError<string> {
  public constructor(key: string) {
    super(ErrorCode.UnknownEnvironmentKeyError, "The specified key is undefined in the current environment.", key)
  }
}
