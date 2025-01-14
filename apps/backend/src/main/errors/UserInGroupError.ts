import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *	Representa un error desconocido. Se espera que dichos errores se terminen
 *	manipulando mediante códigos de error más específicos.
 */
export class UserInGroupError extends ApplicationError<unknown> {
  public constructor() {
    super(ErrorCode.UnknownError, "User is already in a group")
  }
}
