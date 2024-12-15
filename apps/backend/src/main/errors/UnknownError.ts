import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *	Representa un error desconocido. Se espera que dichos errores se terminen
 *	manipulando mediante códigos de error más específicos.
 */
export class UnknownError extends ApplicationError<unknown> {
  public constructor(payload: unknown = undefined) {
    super(ErrorCode.UnknownError, "Unknown error. Contact an engineer.", payload)
  }
}
