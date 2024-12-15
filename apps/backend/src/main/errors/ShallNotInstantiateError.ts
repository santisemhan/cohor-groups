import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *	A failed intent to instantiate a class that cannot be instantiated,
 *	because its constructor is private, or because the class is an utility or
 *	support class that shouldn't have any instance under certain
 *	circunstancies.
 */
export class ShallNotInstantiateError extends ApplicationError<unknown> {
  public constructor(payload: unknown = undefined) {
    super(ErrorCode.ShallNotInstantiateError, "You shall not instantiate this class.", payload)
  }
}
